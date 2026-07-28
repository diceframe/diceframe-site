import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { DocsExplorer } from "./DocsExplorer";

export const metadata: Metadata = {
  title: {
    absolute: "DiceFrame 文档 — AI 跑团部署、使用与插件开发",
  },
  description:
    "DiceFrame AI 跑团（TRPG）使用文档：Windows、Docker 与 NAS 部署，DND/COC 规则配置，版本更新、Bot 接入和插件开发。",
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    type: "website",
    url: "/docs",
    title: "DiceFrame 文档 — AI 跑团部署、使用与插件开发",
    description:
      "查阅 DiceFrame AI 跑团平台的安装部署、规则配置、更新与插件开发说明。",
  },
};

export default function DocsPage() {
  return (
    <main className="docs-page">
      <SiteHeader />
      <section className="docs-hero">
        <div className="page-shell">
          <p className="eyebrow">
            <span />
            DICEFRAME · TRPG HELP CENTER
          </p>
          <div className="docs-hero-row">
            <div>
              <h1>DiceFrame 使用与部署文档</h1>
              <p>
                从第一次启动 AI 跑团，到 DND / COC 规则设置、Docker / NAS
                部署、版本更新与插件开发，都可以在这里找到说明。文档与
                <a
                  href="https://github.com/diceframe/diceframe"
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  diceframe/diceframe
                </a>
                {" "}主仓库的 <code>main</code> 分支保持同步。
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
