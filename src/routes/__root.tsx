import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
  useLocation,
} from "@tanstack/react-router";
import { rootSeo } from "~/config/seo";
import appCss from "~/styles/globals.css?url";

export const Route = createRootRoute({
  head: () => {
    const base = rootSeo();
    return {
      meta: base.meta,
      links: [
        ...base.links,
        { rel: "stylesheet", href: appCss },
        { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
      ],
      scripts: base.scripts,
    };
  },
  shellComponent: RootDocument,
  errorComponent: RootError,
  notFoundComponent: RootNotFound,
});

/**
 * The document shell derives <html lang> from the URL so each language gets
 * correct markup in the server-rendered HTML (crawlers never run JS).
 */
function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useLocation({ select: (state) => state.pathname });
  const language = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "zh-CN";

  return (
    <html lang={language}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootError({ error }: { error: unknown }) {
  const message =
    error instanceof Error ? error.message : "Unexpected error. Please try again later.";
  return (
    <main className="docs-page">
      <section className="docs-hero">
        <div className="page-shell">
          <p className="eyebrow">
            <span />
            DICEFRAME
          </p>
          <h1>Something went wrong</h1>
          <p>{message}</p>
          <p>
            <Link to="/">返回首页 / Back to home</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

function RootNotFound() {
  return (
    <main className="docs-page">
      <section className="docs-hero">
        <div className="page-shell">
          <p className="eyebrow">
            <span />
            404
          </p>
          <h1>页面不存在 / Page not found</h1>
          <p>
            这里没有你要找的内容。你可以回到首页，或继续阅读使用文档。
            <br />
            The page you are looking for does not exist. Head back home or
            continue reading the documentation.
          </p>
          <p>
            <Link to="/">DiceFrame 首页</Link> ·{" "}
            <Link to="/docs/$docId" params={{ docId: "guide" }}>
              使用文档 / Documentation
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
