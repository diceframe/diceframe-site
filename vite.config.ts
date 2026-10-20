import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";

// Keep Wrangler and Miniflare state project-local.
process.env.WRANGLER_WRITE_LOGS ??= "false";
process.env.WRANGLER_LOG_PATH ??= ".wrangler/logs";
process.env.MINIFLARE_REGISTRY_PATH ??= ".wrangler/registry";

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    // Native Vite 8 support for the `~/*` paths in tsconfig.json — required
    // by the dev-server module runner (the production build resolves them
    // regardless).
    tsconfigPaths: true,
  },
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart({
      server: {
        // Custom fetch wrapper: canonical-host redirects, the Baidu
        // verification file, and permanent redirects from the legacy
        // `/docs?doc={id}` URLs.
        entry: "./server.ts",
      },
      prerender: {
        enabled: true,
        // The homepages are pure marketing content and are frozen into static
        // HTML at build time. Docs pages (parameterized routes) stay on
        // runtime SSR so they always read the latest Markdown from GitHub.
        filter: ({ path }) => path === "/" || path === "/en",
      },
    }),
    viteReact(),
  ],
});
