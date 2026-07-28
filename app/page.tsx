import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

export const metadata: Metadata = {
  title: {
    absolute: "DiceFrame — 开源自托管 AI 跑团（TRPG）平台",
  },
  description:
    "DiceFrame 是支持 DND、COC 与自定义规则的开源自托管 AI 跑团（TRPG）平台，提供 AI GM、多人 WebUI、角色卡、世界书、骰子和 QQ Bot。",
  alternates: {
    canonical: "/",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://diceframe.com/#website",
    url: "https://diceframe.com/",
    name: "DiceFrame",
    alternateName: "DiceFrame AI 跑团平台",
    description:
      "支持 DND、COC 与自定义规则的开源自托管 AI 跑团（TRPG）平台。",
    inLanguage: "zh-CN",
    publisher: {
      "@id": "https://diceframe.com/#organization",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://diceframe.com/#organization",
    name: "DiceFrame Contributors",
    url: "https://diceframe.com/",
    logo: "https://diceframe.com/diceframe-logo.svg",
    sameAs: ["https://github.com/diceframe/diceframe"],
    description: "DiceFrame 开源 AI 跑团（TRPG）平台的开发与维护社区。",
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": "https://diceframe.com/#source",
    name: "DiceFrame",
    url: "https://diceframe.com/",
    operatingSystem: "Windows, Linux, Docker, NAS, Web Browser",
    description:
      "连接 AI GM、多人 WebUI、角色卡、世界书、骰子、状态追踪与群聊 Bot 的自托管 TRPG 平台。",
    codeRepository: "https://github.com/diceframe/diceframe",
    license: "https://www.gnu.org/licenses/agpl-3.0.html",
  },
] as const;

const features = [
  {
    index: "01",
    title: "AI GM，不抢走规则",
    copy: "自然语言叙事与结构化状态分开处理。模型负责讲故事，引擎负责让 HP、物品、金币与检定真正落地。",
  },
  {
    index: "02",
    title: "一张实时多人桌",
    copy: "邀请链接、角色认领、行动等待、暂离与 GM 推进都在同一套 WebUI 里，通过 SSE 实时同步。",
  },
  {
    index: "03",
    title: "世界会记得",
    copy: "世界书按关键词注入上下文，长团自动压缩历史，还可以接入 embedding 做语义召回。",
  },
  {
    index: "04",
    title: "规则不被写死",
    copy: "内置 DND 5e、COC 与自由规则模板。你也可以编辑规则、角色模板与世界设定，搭自己的桌。",
  },
  {
    index: "05",
    title: "从网页走进群聊",
    copy: "通过 QQ / NapCat 将网页对局绑定到群聊，玩家可以提交行动、看状态、查前情与掷骰。",
  },
  {
    index: "06",
    title: "部署在你手里",
    copy: "Windows 便携版、Docker、NAS 与源码运行均有入口。存档、配置与密钥都留在你的环境。",
  },
] as const;

const steps = [
  ["部署", "下载 Windows 便携版，或用 Docker 在自己的设备上启动。"],
  ["设定", "选择规则与世界模板，也可以让 AI 先生成一份可编辑草稿。"],
  ["入席", "创建角色并分享邀请链接，网页玩家与群聊玩家进入同一局。"],
  ["开团", "描述行动、等待检定、推动叙事，让每次变化都写回真实状态。"],
] as const;

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />

      <section className="hero">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="page-shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              OPEN-SOURCE · SELF-HOSTED · AI TRPG
            </p>
            <h1>
              让 AI 做 GM，
              <br />
              和朋友一起把故事
              <em>跑下去</em>。
            </h1>
            <p className="hero-lead">
              DiceFrame 是一套开源、自托管的 AI 跑团（TRPG）平台，支持 DND、
              COC 与自定义规则。它把 AI GM、多人 WebUI、角色卡、世界书、骰子、
              状态追踪和 QQ 群聊连接成一场可以持续推进的线上跑团。
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/docs">
                5 分钟开始第一局
                <span aria-hidden="true">→</span>
              </Link>
              <a
                className="button button-quiet"
                href="https://github.com/diceframe/diceframe"
                target="_blank"
                rel="noreferrer"
              >
                查看 GitHub
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="hero-trust" aria-label="项目特性">
              <span>AGPL-3.0 开源</span>
              <span>数据自主掌控</span>
              <span>兼容 OpenAI API</span>
            </div>
          </div>

          <div className="hero-stage" aria-label="DiceFrame WebUI 产品预览">
            <div className="stage-glow" />
            <div className="app-frame">
              <div className="app-frame-top">
                <div className="window-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <span>DiceFrame · 冒险桌面</span>
                <span className="system-live">
                  <i />
                  ONLINE
                </span>
              </div>
              <Image
                className="app-screenshot"
                src="/diceframe-app.png"
                alt="DiceFrame 多人跑团 WebUI，包含叙事、角色状态与行动区"
                width={1904}
                height={1224}
                priority
                unoptimized
              />
            </div>
            <div className="stage-card stage-card-left">
              <span className="stage-label">CHECK</span>
              <strong>D20</strong>
              <small>骰点已写入行动</small>
            </div>
            <div className="stage-card stage-card-right">
              <span className="stage-label">MEMORY</span>
              <strong>世界仍在生长</strong>
              <small>世界书 · 摘要 · 语义召回</small>
            </div>
          </div>
        </div>
        <div className="hero-rule page-shell">
          <span>SELF-HOSTED</span>
          <i />
          <span>DND · COC · CUSTOM RULES</span>
          <i />
          <span>WEB · QQ BOT</span>
        </div>
      </section>

      <section className="section section-features" id="features">
        <div className="page-shell">
          <div className="section-heading split-heading">
            <div>
              <p className="section-kicker">BUILT FOR THE WHOLE TABLE</p>
              <h2>一套 AI TRPG 引擎，撑起整张跑团桌。</h2>
            </div>
            <p>
              DiceFrame 不是一个只会续写剧情的聊天框。它让 AI GM、每位玩家、
              每张角色卡和每次状态变化，都进入同一个可追踪的 TRPG 世界。
            </p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.index}>
                <span className="feature-index">{feature.index}</span>
                <div className="feature-mark" aria-hidden="true">
                  <i />
                  <i />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section narrative-section">
        <div className="page-shell narrative-grid">
          <div className="narrative-visual">
            <div className="story-card">
              <div className="story-meta">
                <span>GM NARRATION</span>
                <span>ROUND 12</span>
              </div>
              <p>
                门后的风带着潮湿铁锈味。伊莱莎举高提灯时，墙上的符文并没有反光——它们在缓慢地呼吸。
              </p>
              <div className="story-state">
                <span>场景</span>
                <strong>沉没回廊</strong>
                <span>状态变动</span>
                <strong>发现 · 古代符文</strong>
              </div>
            </div>
            <div className="dice-seal" aria-hidden="true">
              <span>20</span>
              <small>CRITICAL</small>
            </div>
          </div>
          <div className="narrative-copy">
            <p className="section-kicker">STORY, WITH CONSEQUENCES</p>
            <h2>
              叙事可以自由，
              <br />
              状态必须可信。
            </h2>
            <p>
              DiceFrame
              会把模型返回的故事与内部状态指令分开。玩家看到干净的叙事，而伤害、物品、支付、经验与场景变化由引擎校验后写入存档。
            </p>
            <ul className="check-list">
              <li>骰点先发生，结果再被叙述</li>
              <li>支付需要玩家确认，余额校验后生效</li>
              <li>网页与 Bot 消费同一套游戏状态</li>
            </ul>
            <Link className="text-link" href="/docs?doc=USER_GUIDE_CN.md">
              阅读游戏流程 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section steps-section" id="start">
        <div className="page-shell">
          <div className="section-heading centered-heading">
            <p className="section-kicker">FROM ZERO TO SESSION ONE</p>
            <h2>四步，开始第一场 AI 跑团。</h2>
            <p>
              无论是 DND、COC 还是自定义 TRPG 规则，把 DiceFrame
              部署到自己的机器上，配置模型接口，然后邀请朋友入席。
            </p>
          </div>
          <div className="steps-grid">
            {steps.map(([title, copy], index) => (
              <article className="step-card" key={title}>
                <span className="step-number">0{index + 1}</span>
                <div className="step-line" aria-hidden="true">
                  <i />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="quick-command">
            <div>
              <span>DOCKER · 一条命令启动</span>
              <code>
                docker run -d -p 9876:9876 -v ./data:/app/data
                ghcr.io/diceframe/diceframe:latest
              </code>
            </div>
            <span className="command-mark" aria-hidden="true">⌘</span>
          </div>
        </div>
      </section>

      <section className="section docs-section" id="docs">
        <div className="page-shell docs-callout">
          <div>
            <p className="section-kicker">GUIDES &amp; DOCUMENTATION</p>
            <h2>需要帮助？从这里开始。</h2>
            <p>
              无论是第一次部署 DiceFrame，还是配置更新、开发插件，都能在这里找到对应的说明。
              文档会随 DiceFrame 的新版本持续更新。
            </p>
            <div className="docs-actions">
              <Link className="button button-primary" href="/docs">
                查看使用文档
                <span aria-hidden="true">→</span>
              </Link>
              <a
                className="text-link"
                href="https://github.com/diceframe/diceframe/tree/main/docs"
                target="_blank"
                rel="noreferrer"
              >
                前往 GitHub 文档库 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="repo-card" aria-label="GitHub 文档源">
            <div className="repo-card-head">
              <Image
                src="/diceframe-logo.svg"
                alt=""
                width={52}
                height={52}
              />
              <div>
                <span>github.com</span>
                <strong>diceframe / diceframe</strong>
              </div>
            </div>
            <div className="repo-tree">
              <span>main</span>
              <ul>
                <li><i /> docs / USER_GUIDE_CN.md</li>
                <li><i /> docs / DOCKER_DEPLOY_CN.md</li>
                <li><i /> docs / PLUGIN_DEVELOPMENT_CN.md</li>
                <li><i /> docs / UPDATER_CN.md</li>
              </ul>
            </div>
            <div className="repo-sync">
              <span><i /> CONTINUOUSLY UPDATED</span>
              <span>持续更新</span>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="page-shell final-cta-inner">
          <Image
            className="cta-logo"
            src="/diceframe-logo.svg"
            alt=""
            width={116}
            height={116}
          />
          <p className="section-kicker">YOUR WORLD. YOUR RULES. YOUR TABLE.</p>
          <h2>下一场 TRPG 冒险，从你自己的服务器开始。</h2>
          <p>开源、自托管、可扩展。下载 DiceFrame，把朋友叫到 AI 跑团桌边。</p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="https://github.com/diceframe/diceframe/releases"
              target="_blank"
              rel="noreferrer"
            >
              下载 Windows 便携版
              <span aria-hidden="true">↗</span>
            </a>
            <Link className="button button-quiet" href="/docs?doc=DOCKER_DEPLOY_CN.md">
              查看 Docker 部署
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
