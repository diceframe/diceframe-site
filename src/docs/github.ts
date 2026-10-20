import { createServerFn } from "@tanstack/react-start";

const OWNER = "diceframe";
const BRANCH = "main";

/** Give up on a slow GitHub response so SSR renders the fallback UI in time. */
const FETCH_TIMEOUT_MS = 8000;

/** Edge-cache window for raw.githubusercontent.com responses (Workers only). */
const CACHE_TTL_SECONDS = 300;

function rawRoot(repo: string): string {
  return `https://raw.githubusercontent.com/${OWNER}/${repo}/${BRANCH}`;
}

export { rawRoot };

export function blobRoot(repo: string): string {
  return `https://github.com/${OWNER}/${repo}/blob/${BRANCH}`;
}

export function docSourceUrl(repo: string, path: string): string {
  return `${blobRoot(repo)}/${path}`;
}

interface CacheLike {
  match(request: RequestInfo | URL): Promise<Response | undefined>;
  put(request: RequestInfo | URL, response: Response): Promise<void>;
}

/**
 * Cloudflare Workers expose `caches.default`; the local Node dev server does
 * not. Missing cache support is not an error, it just skips caching.
 */
function workerCache(): CacheLike | undefined {
  try {
    const candidate = (globalThis as {
      caches?: { default?: CacheLike };
    }).caches?.default;
    return candidate;
  } catch {
    return undefined;
  }
}

async function fetchMarkdown(repo: string, path: string): Promise<string> {
  const url = `${rawRoot(repo)}/${path}`;
  const cache = workerCache();

  if (cache) {
    try {
      const cached = await cache.match(url);
      if (cached) return await cached.text();
    } catch {
      // Cache read failures fall through to a direct fetch.
    }
  }

  const response = await fetch(url, {
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  if (!response.ok) {
    throw new Error(`GitHub returned ${response.status} for ${path}`);
  }
  const body = await response.text();

  if (cache) {
    try {
      await cache.put(
        url,
        new Response(body, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": `public, max-age=${CACHE_TTL_SECONDS}`,
          },
        }),
      );
    } catch {
      // Cache write failures are harmless.
    }
  }

  return body;
}

export interface DocContentResult {
  status: "ok" | "error";
  markdown: string;
}

/**
 * Loads one documentation file from the source repository. Runs during SSR in
 * the route loader so crawlers always receive fully rendered documentation.
 */
export const fetchDocContent = createServerFn({ method: "GET" })
  .validator((input: { repo: string; path: string }) => input)
  .handler(async ({ data }): Promise<DocContentResult> => {
    try {
      const markdown = await fetchMarkdown(data.repo, data.path);
      if (!markdown.trim()) {
        return { status: "error", markdown: "" };
      }
      return { status: "ok", markdown };
    } catch {
      return { status: "error", markdown: "" };
    }
  });
