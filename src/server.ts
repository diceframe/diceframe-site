import handler from "@tanstack/react-start/server-entry";
import { DEFAULT_DOC_ID, findDocByLegacyValue } from "./docs/documents";
import { SECURITY_HEADERS } from "./securityHeaders";

const CANONICAL_HOST = "diceframe.com";
const BAIDU_VERIFY_PATH = "/baidu_verify_codeva-xQ6459zscX.html";
const BAIDU_VERIFY_CONTENT = "a002cb47fe23e866b602b1b677c36dd2";

/**
 * The Start fetch handler is called with the standard Workers arguments
 * (request, env, ctx) — the same shape Cloudflare documents for custom
 * entrypoints that wrap it.
 */
type StartFetch = (
  request: Request,
  env: unknown,
  ctx: unknown,
) => Response | Promise<Response>;

const startFetch = handler.fetch as StartFetch;

/** Workers static-assets binding (`assets.binding` in wrangler.jsonc). */
interface WorkerEnv {
  ASSETS?: { fetch(request: Request): Promise<Response> };
}

/**
 * Prerendered homepages: request path → path of the static HTML in the asset
 * directory. wrangler.jsonc routes these paths through the Worker first (so
 * redirects and security headers apply), and the Worker then serves the
 * prerendered file instead of rendering the page again.
 */
const PRERENDERED_PAGES: Readonly<Record<string, string>> = {
  "/": "/",
  "/en": "/en/",
};

async function serve(
  request: Request,
  url: URL,
  env: unknown,
  ctx: unknown,
): Promise<Response> {
  const assetPath = PRERENDERED_PAGES[url.pathname];
  const assets = (env as WorkerEnv | undefined)?.ASSETS;
  if (
    assetPath &&
    assets &&
    (request.method === "GET" || request.method === "HEAD")
  ) {
    const assetUrl = new URL(`${assetPath}${url.search}`, url);
    const asset = await assets.fetch(new Request(assetUrl, request));
    if (asset.ok || asset.status === 304) return asset;
  }
  return startFetch(request, env, ctx);
}

function redirect(url: URL, status: number): Response {
  return new Response(null, {
    status,
    headers: { location: url.toString() },
  });
}

function toCanonical(pathWithSearch: string, status: number): Response {
  // A URL beginning with `//` is scheme-relative. If it is passed directly
  // to the URL constructor, it replaces the canonical host and turns this
  // redirect into an open redirect. The request pathname is always rooted,
  // so collapse any extra leading slashes before resolving it.
  const safePath = pathWithSearch.replace(/^\/+/, "/");
  return redirect(new URL(safePath, `https://${CANONICAL_HOST}`), status);
}

/**
 * The docs used to live behind `/docs?doc={id}`. Every catalogued document now
 * has a real route (`/docs/{id}`, `/en/docs/{id}`), so legacy URLs — including
 * anything already indexed by search engines — redirect permanently.
 */
function matchLegacyDocsPath(url: URL): string | null {
  const pathname = url.pathname.replace(/\/+$/, "") || "/";
  const isZhDocs = pathname === "/docs";
  const isEnDocs = pathname === "/en/docs";
  if (!isZhDocs && !isEnDocs) return null;

  const language =
    isEnDocs || url.searchParams.get("lang") === "en" ? "en" : "zh";
  const doc = findDocByLegacyValue(url.searchParams.get("doc"));
  const id = doc?.id ?? DEFAULT_DOC_ID;
  return language === "en" ? `/en/docs/${id}` : `/docs/${id}`;
}

export default {
  async fetch(
    request: Request,
    env: unknown,
    ctx: unknown,
  ): Promise<Response> {
    const url = new URL(request.url);
    const host = url.hostname;

    if (host.endsWith(".workers.dev") || host.endsWith(".chatgpt.site")) {
      return toCanonical(`${url.pathname}${url.search}`, 308);
    }

    if (host === `www.${CANONICAL_HOST}`) {
      if (url.pathname === BAIDU_VERIFY_PATH) {
        return new Response(BAIDU_VERIFY_CONTENT, {
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      }
      return toCanonical(`${url.pathname}${url.search}`, 301);
    }

    const legacyDocsUrl = matchLegacyDocsPath(url);
    if (legacyDocsUrl) {
      return toCanonical(legacyDocsUrl, 301);
    }

    // The English homepage's canonical URL is `/en` (no trailing slash).
    // Relative Location keeps the build-time prerenderer (served from a
    // localhost preview) able to follow it.
    if (url.pathname === "/en/") {
      return new Response(null, {
        status: 308,
        headers: { location: `/en${url.search}` },
      });
    }

    const response = await serve(request, url, env, ctx);

    // Apply Cloudflare edge caching for crawler & discovery metadata files
    const pathname = url.pathname;
    const isCrawlerDiscoveryFile =
      pathname === "/llms.txt" ||
      pathname === "/llms-full.txt" ||
      pathname === "/robots.txt" ||
      pathname === "/sitemap.xml";

    const headers = new Headers(response.headers);

    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      headers.set(name, value);
    }

    if (isCrawlerDiscoveryFile && response.ok) {
      headers.set(
        "Cache-Control",
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400",
      );
      headers.set("CDN-Cache-Control", "max-age=86400");
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
