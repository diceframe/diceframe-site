/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const BAIDU_VERIFY_PATH = "/baidu_verify_codeva-xQ6459zscX.html";
const BAIDU_VERIFY_CONTENT = "a002cb47fe23e866b602b1b677c36dd2";

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (
      url.hostname.endsWith(".workers.dev") ||
      url.hostname.endsWith(".chatgpt.site")
    ) {
      const canonicalUrl = new URL(`${url.pathname}${url.search}`, "https://diceframe.com");
      return Response.redirect(canonicalUrl, 308);
    }

    if (url.hostname === "www.diceframe.com") {
      if (url.pathname === BAIDU_VERIFY_PATH) {
        return new Response(BAIDU_VERIFY_CONTENT, {
          headers: { "content-type": "text/html; charset=utf-8" },
        });
      }
      return Response.redirect(
        new URL(`${url.pathname}${url.search}`, "https://diceframe.com"),
        301,
      );
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
