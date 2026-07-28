import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { DocsExplorer } from "./DocsExplorer";

export const metadata: Metadata = {
  title: "技术帮助",
  description:
    "直接读取 DiceFrame GitHub 主仓库的用户手册、部署说明、更新流程、插件开发与架构文档。",
};

export default function DocsPage() {
  return (
    <main className="docs-page">
      <SiteHeader />
      <section className="docs-hero">
        <div className="page-shell">
          <p className="eyebrow">
            <span />
            GITHUB-SOURCED DOCUMENTATION
          </p>
          <div className="docs-hero-row">
            <div>
              <h1>技术帮助</h1>
              <p>
                这里不保存文档副本。每次打开都会从
                <a
                  href="https://github.com/diceframe/diceframe"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  diceframe/diceframe
                </a>
                {" "}主仓库读取内容，以 GitHub 的 <code>main</code> 分支为准。
              </p>
            </div>
            <div className="live-source">
              <span>
                <i /> SOURCE ONLINE
              </span>
              <strong>GitHub / main</strong>
            </div>
          </div>
        </div>
      </section>
      <DocsExplorer />
      <SiteFooter />
    </main>
  );
}
