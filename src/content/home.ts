import type { SiteLanguage } from "~/config/site";
import type { FaqEntry } from "~/config/seo";

export interface HomeSegment {
  text: string;
  /** Rendered inside an <em> accent when set. */
  accent?: boolean;
}

export interface HomeContent {
  language: SiteLanguage;
  eyebrow: string;
  heroTitleLines: HomeSegment[][];
  heroLead: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryCtaDocId: string;
  trustLabel: string;
  trust: string;
  stageFrameTitle: string;
  screenshotAlt: string;
  stageCardLeft: { label: string; strong: string; small: string };
  stageCardRight: { label: string; strong: string; small: string };
  ruleStrip: string[];
  features: { kicker: string; heading: string; lead: string };
  /** Copy may contain `[label](https://…)` citation links (see inlineLinks.ts). */
  featureCards: Array<{ index: string; title: string; copy: string }>;
  /**
   * Verifiable project facts shown after the feature grid. Counts are a
   * snapshot from GitHub — update them together with `source`'s date.
   */
  facts: {
    label: string;
    items: Array<{ value: string; label: string; detail: string }>;
    /** May contain `[label](https://…)` citation links. */
    source: string;
  };
  /** An attributed quotation from a primary source, shown after the facts. */
  licenseQuote: {
    /** Verbatim text in the source's original language (English). */
    quote: string;
    /** Translation for non-English pages; omitted when the page is English. */
    translation?: string;
    author: string;
    work: string;
    href: string;
    context: string;
  };
  narrative: {
    kicker: string;
    headingA: string;
    headingB: string;
    body: string;
    checklist: string[];
    linkLabel: string;
    linkDocId: string;
    story: {
      meta: [string, string];
      text: string;
      stateLabels: [string, string];
      stateValues: [string, string];
    };
  };
  steps: {
    kicker: string;
    heading: string;
    lead: string;
    items: Array<{ title: string; copy: string }>;
    dockerLabel: string;
    dockerCommand: string;
  };
  docs: {
    kicker: string;
    heading: string;
    body: string;
    primaryLabel: string;
    githubLabel: string;
    repoFiles: string[];
    repoCaption: string;
    updated: string;
  };
  faq: { kicker: string; heading: string; lead: string; items: FaqEntry[] };
  finalCta: {
    kicker: string;
    heading: string;
    body: string;
    downloadLabel: string;
    dockerLabel: string;
  };
}

export const homeContent: Record<SiteLanguage, HomeContent> = {
  zh: {
    language: "zh",
    eyebrow: "OPEN-SOURCE · SELF-HOSTED · AI TRPG",
    heroTitleLines: [
      [{ text: "和朋友一起，" }],
      [{ text: "在 DiceFrame，" }],
      [{ text: "把故事" }, { text: "跑下去", accent: true }, { text: "。" }],
    ],
    heroLead:
      "DiceFrame 是一套开源、自托管的 AI 跑团（TRPG）平台，支持 DND、COC 与自定义规则。它把 AI GM、多人 WebUI、角色卡、世界书、骰子、状态追踪和群聊连接成一场可以持续推进的线上跑团。",
    primaryCta: "下载 DiceFrame",
    secondaryCta: "5 分钟开始第一局",
    secondaryCtaDocId: "guide",
    trustLabel: "项目特性",
    trust: "AGPL-3.0 开源",
    stageFrameTitle: "DiceFrame · 冒险桌面",
    screenshotAlt: "DiceFrame 多人跑团 WebUI，包含叙事、角色状态与行动区",
    stageCardLeft: {
      label: "CHECK",
      strong: "D20",
      small: "骰点已写入行动",
    },
    stageCardRight: {
      label: "MEMORY",
      strong: "世界仍在生长",
      small: "世界书 · 摘要 · 语义召回",
    },
    ruleStrip: ["SELF-HOSTED", "DND · COC · CUSTOM RULES", "BOT"],
    features: {
      kicker: "BUILT FOR THE WHOLE TABLE",
      heading: "一套 AI TRPG 引擎，撑起整张跑团桌。",
      lead: "DiceFrame 是一套面向整张跑团桌的 AI TRPG 引擎。AI GM、每位玩家、每张角色卡和每次状态变化，都进入同一个可追踪的世界。它不只是一个续写剧情的聊天框。",
    },
    featureCards: [
      {
        index: "01",
        title: "AI GM，不抢走规则",
        copy: "DiceFrame 将自然语言叙事与结构化状态分开处理。模型负责讲故事，引擎负责让 HP、物品、金币与检定真正落地。",
      },
      {
        index: "02",
        title: "一张实时多人桌",
        copy: "DiceFrame 提供实时同步跑团桌：邀请链接、角色认领、行动等待、暂离与 GM 推进都在同一套 WebUI 里，通过 SSE 实时同步。",
      },
      {
        index: "03",
        title: "世界会记得",
        copy: "DiceFrame 内置世界书与记忆机制：按关键词注入上下文，长团自动压缩历史，还可以接入 embedding 做语义召回。",
      },
      {
        index: "04",
        title: "规则不被写死",
        copy: "DiceFrame 内置 [DND 5e](https://www.dndbeyond.com/srd)、[COC](https://www.chaosium.com/call-of-cthulhu-rpg/) 与自由规则模板。你也可以编辑规则、角色模板与世界设定，搭自己的桌。",
      },
      {
        index: "05",
        title: "从网页走进群聊",
        copy: "DiceFrame 通过 QQ / [NapCat](https://github.com/NapNeko/NapCatQQ) 将网页对局绑定到群聊，玩家可以直接在群里提交行动、看状态、查前情与掷骰。",
      },
      {
        index: "06",
        title: "部署在你手里",
        copy: "DiceFrame 支持 Windows 便携版、[Docker](https://docs.docker.com/get-started/)、NAS 与源码运行。存档、配置与密钥完全保留在你的本地环境。",
      },
    ],
    facts: {
      label: "DiceFrame 数据一览",
      items: [
        { value: "3 套", label: "内置规则模板", detail: "DND 5e · COC · 自由规则" },
        { value: "4 种", label: "部署方式", detail: "Windows · Docker · NAS · 源码" },
        { value: "44 个", label: "正式发布版本", detail: "最新 v3.0.5（2026-11-04）" },
        { value: "13 位", label: "开源贡献者", detail: "AGPL-3.0 · GitHub 协作开发" },
      ],
      source:
        "以上版本与贡献者数据根据 DiceFrame 官方 GitHub 仓库统计，截至 2026-11-05。来源：[github.com/diceframe/diceframe](https://github.com/diceframe/diceframe)。",
    },
    licenseQuote: {
      quote:
        "The GNU Affero General Public License is a free, copyleft license for software and other kinds of works, specifically designed to ensure cooperation with the community in the case of network server software.",
      translation:
        "GNU Affero 通用公共许可证是一份自由的著佐权（copyleft）许可证，适用于软件及其他类型的作品，专为确保网络服务器软件场景下与社区的协作而设计。",
      author: "Free Software Foundation",
      work: "GNU AGPL v3 序言",
      href: "https://www.gnu.org/licenses/agpl-3.0.html",
      context:
        "DiceFrame 以 AGPL-3.0 发布，你可以免费部署、修改和自托管。如果把修改后的版本作为网络服务提供给他人，也需要向这些用户公开对应源码。",
    },
    narrative: {
      kicker: "STORY, WITH CONSEQUENCES",
      headingA: "叙事可以自由，",
      headingB: "状态必须可信。",
      body: "DiceFrame 会把模型返回的故事与内部状态指令分开。玩家看到干净的叙事，而伤害、物品、支付、经验与场景变化由引擎校验后写入存档。",
      checklist: [
        "骰点先发生，结果再被叙述",
        "支付需要玩家确认，余额校验后生效",
        "网页与 Bot 消费同一套游戏状态",
      ],
      linkLabel: "阅读游戏流程",
      linkDocId: "guide",
      story: {
        meta: ["GM NARRATION", "ROUND 12"],
        text: "门后的风带着潮湿铁锈味。伊莱莎举高提灯时，墙上的符文并没有反光——它们在缓慢地呼吸。",
        stateLabels: ["场景", "状态变动"],
        stateValues: ["沉没回廊", "发现 · 古代符文"],
      },
    },
    steps: {
      kicker: "FROM ZERO TO SESSION ONE",
      heading: "四步，开始第一场 AI 跑团。",
      lead: "开始第一局 AI 跑团只需四步：部署 DiceFrame、选择规则与世界、邀请朋友入席、开团。DND、COC 与自定义 TRPG 规则都按同样的流程开始。",
      items: [
        { title: "部署", copy: "下载 Windows 便携版，或用 Docker 在自己的设备上启动。" },
        { title: "设定", copy: "选择规则与世界模板，也可以让 AI 先生成一份可编辑草稿。" },
        { title: "入席", copy: "创建角色并分享邀请链接，网页玩家与群聊玩家进入同一局。" },
        { title: "开团", copy: "描述行动、等待检定、推动叙事，让每次变化都写回真实状态。" },
      ],
      dockerLabel: "DOCKER · 一条命令启动",
      dockerCommand:
        "docker run -d -p 9876:9876 -v ./data:/app/data ghcr.io/diceframe/diceframe:latest",
    },
    docs: {
      kicker: "GUIDES & DOCUMENTATION",
      heading: "需要帮助？从这里开始。",
      body: "DiceFrame 文档覆盖部署、更新、独立 WebUI、Bot 桥接与插件开发，并随每个新版本持续更新。第一次部署或开发插件，都可以从这里开始。",
      primaryLabel: "查看使用文档",
      githubLabel: "前往 GitHub 文档库",
      repoFiles: [
        "docs / zh/guide.md",
        "docs / zh/deploy.md",
        "docs / zh/standalone-webui.md",
        "docs / zh/plugin-development.md",
        "docs / zh/bot-bridge-core.md",
      ],
      repoCaption: "GitHub 文档源",
      updated: "持续更新",
    },
    faq: {
      kicker: "QUESTIONS, ANSWERED",
      heading: "关于 DiceFrame 的常见问题。",
      lead: "以下五个问题回答了 DiceFrame 是什么、支持哪些规则、是否收费、能否多人在线，以及如何开始。答案可以直接引用。",
      items: [
        {
          question: "DiceFrame 是什么？",
          answer:
            "DiceFrame 是一个开源（[AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)）、自托管的 AI 跑团（TRPG）平台。它把 AI GM、多人 WebUI、角色卡、世界书、骰子与状态追踪连接到同一场线上跑团，还可以通过 QQ Bot 延伸到群聊。",
        },
        {
          question: "DiceFrame 支持哪些跑团规则？",
          answer:
            "DiceFrame 拥有内置官方模板与完全开放的规则引擎，开箱支持多种主流及自制 TRPG 规则：",
          answerPoints: [
            "DND 5e（龙与地下城第五版，由 Wizards of the Coast 出版，公开规则见 [D&D SRD](https://www.dndbeyond.com/srd)）",
            "COC（克苏鲁的呼唤，由 [Chaosium](https://www.chaosium.com/call-of-cthulhu-rpg/) 出版的经典调查恐怖规则）",
            "自由规则模式（自由编辑属性、技能判定、角色卡模板与世界观）",
          ],
        },
        {
          question: "使用 DiceFrame 需要付费或注册云端服务吗？",
          answer:
            "不需要。DiceFrame 开源免费，部署在你自己的 Windows、Docker 或 NAS 环境中。模型接口使用你自己的 API Key，存档、配置与密钥都保存在你的设备上。",
        },
        {
          question: "可以和朋友一起在线跑团吗？",
          answer:
            "可以。创建角色后分享邀请链接，朋友在浏览器中就能入席同一场对局。你也可以通过 QQ / [NapCat](https://github.com/NapNeko/NapCatQQ) 把对局绑定到群聊，让玩家在群里掷骰、查看状态并提交行动。",
        },
        {
          question: "如何开始第一局 AI 跑团？",
          answer:
            "先下载 Windows 便携版，或用 Docker 一条命令启动。然后选择规则与世界模板，配置模型接口。最后按照「5 分钟开始第一局」指南邀请朋友入席开团。",
        },
      ],
    },
    finalCta: {
      kicker: "YOUR WORLD. YOUR RULES. YOUR TABLE.",
      heading: "下一场 TRPG 冒险，从你自己的服务器开始。",
      body: "开源、自托管、可扩展。下载 DiceFrame，把朋友叫到 DiceFrame 一起游戏。",
      downloadLabel: "下载 Windows 便携版",
      dockerLabel: "查看 Docker 部署",
    },
  },
  en: {
    language: "en",
    eyebrow: "OPEN-SOURCE · SELF-HOSTED · AI TRPG",
    heroTitleLines: [
      [{ text: "Gather your party." }],
      [{ text: "Set the scene." }],
      [{ text: "Let the story " }, { text: "unfold", accent: true }, { text: "." }],
    ],
    heroLead:
      "DiceFrame is an open-source, self-hosted AI TRPG platform for DND, COC, and custom rules. It brings an AI GM, multiplayer WebUI, character sheets, lorebooks, dice, state tracking, and group chat into one persistent online campaign.",
    primaryCta: "Download DiceFrame",
    secondaryCta: "Set up DiceFrame",
    secondaryCtaDocId: "guide",
    trustLabel: "Project highlights",
    trust: "AGPL-3.0 open source",
    stageFrameTitle: "DiceFrame · Adventure table",
    screenshotAlt:
      "DiceFrame multiplayer TRPG WebUI with narration, character status, and actions",
    stageCardLeft: {
      label: "CHECK",
      strong: "D20",
      small: "Roll added to the action",
    },
    stageCardRight: {
      label: "MEMORY",
      strong: "The world keeps growing",
      small: "Lorebook · Summary · Semantic recall",
    },
    ruleStrip: ["SELF-HOSTED", "DND · COC · CUSTOM RULES", "BOT"],
    features: {
      kicker: "BUILT FOR THE WHOLE TABLE",
      heading: "One AI TRPG engine for the entire table.",
      lead: "DiceFrame is an AI TRPG engine built for the whole table. The AI GM, every player, every character sheet, and every state change live in one trackable world. It is not a chat box that merely continues a story.",
    },
    featureCards: [
      {
        index: "01",
        title: "An AI GM that respects the rules",
        copy: "DiceFrame separates narration from structured game state. The LLM tells the story while the engine validates HP, items, currency, and skill checks.",
      },
      {
        index: "02",
        title: "One live multiplayer table",
        copy: "DiceFrame keeps the party synchronized in real time: invites, character claims, action queues, pauses, and GM turns all live in one SSE-powered WebUI.",
      },
      {
        index: "03",
        title: "A world that remembers",
        copy: "DiceFrame provides persistent memory: lorebooks inject relevant context by keywords, long campaigns condense history, and embeddings enable semantic recall.",
      },
      {
        index: "04",
        title: "Rules that are not hard-coded",
        copy: "DiceFrame ships with [DND 5e](https://www.dndbeyond.com/srd), [COC](https://www.chaosium.com/call-of-cthulhu-rpg/), and freeform templates. You can also customize rule parameters, character sheets, and world settings.",
      },
      {
        index: "05",
        title: "From the web into group chat",
        copy: "DiceFrame connects active web sessions to group chat through QQ and [NapCat](https://github.com/NapNeko/NapCatQQ) so players can act, check status, review the story, and roll dice.",
      },
      {
        index: "06",
        title: "Deployment stays in your hands",
        copy: "DiceFrame runs as a Windows portable build, [Docker](https://docs.docker.com/get-started/) container, NAS app, or from source. Saves, settings, and API keys remain strictly in your environment.",
      },
    ],
    facts: {
      label: "DiceFrame at a glance",
      items: [
        { value: "3", label: "built-in rule templates", detail: "DND 5e · COC · Freeform" },
        { value: "4", label: "ways to deploy", detail: "Windows · Docker · NAS · Source" },
        { value: "44", label: "stable releases", detail: "Latest v3.0.5 (2026-11-04)" },
        { value: "13", label: "open-source contributors", detail: "AGPL-3.0 · built on GitHub" },
      ],
      source:
        "Release and contributor counts are based on DiceFrame's official GitHub repository statistics as of 2026-11-05. Source: [github.com/diceframe/diceframe](https://github.com/diceframe/diceframe).",
    },
    licenseQuote: {
      quote:
        "The GNU Affero General Public License is a free, copyleft license for software and other kinds of works, specifically designed to ensure cooperation with the community in the case of network server software.",
      author: "Free Software Foundation",
      work: "GNU AGPL v3, Preamble",
      href: "https://www.gnu.org/licenses/agpl-3.0.html",
      context:
        "DiceFrame is released under AGPL-3.0, so you can deploy, modify, and self-host it for free. If you offer a modified version to others as a network service, you share the corresponding source with those users.",
    },
    narrative: {
      kicker: "STORY, WITH CONSEQUENCES",
      headingA: "Let the story roam.",
      headingB: "Keep the state reliable.",
      body: "DiceFrame separates the model's narrative from internal state instructions. Players get clean prose while damage, items, payments, experience, and scene changes are validated before reaching the save.",
      checklist: [
        "The roll happens before its result is narrated",
        "Payments require confirmation and balance validation",
        "The WebUI and bots share the same game state",
      ],
      linkLabel: "Read the gameplay guide",
      linkDocId: "guide",
      story: {
        meta: ["GM NARRATION", "ROUND 12"],
        text: "The wind beyond the door carries the scent of wet iron. When Eliza raises her lantern, the runes do not reflect the light—they are slowly breathing.",
        stateLabels: ["Scene", "State change"],
        stateValues: ["Sunken Gallery", "Discovered · Ancient runes"],
      },
    },
    steps: {
      kicker: "FROM ZERO TO SESSION ONE",
      heading: "Four steps to your first AI-powered session.",
      lead: "Your first AI TRPG session takes four steps: deploy DiceFrame, pick rules and a world, invite your friends, and start playing. DND, COC, and custom systems all follow the same flow.",
      items: [
        {
          title: "Deploy",
          copy: "Download the Windows portable build or start DiceFrame with Docker on your own device.",
        },
        {
          title: "Set the table",
          copy: "Choose rules and a world template, or let AI draft an editable starting point.",
        },
        {
          title: "Invite players",
          copy: "Create characters and share an invite link so web and chat players join the same session.",
        },
        {
          title: "Start playing",
          copy: "Describe actions, resolve checks, and move the story forward while every change is written back to game state.",
        },
      ],
      dockerLabel: "DOCKER · START WITH ONE COMMAND",
      dockerCommand:
        "docker run -d -p 9876:9876 -v ./data:/app/data ghcr.io/diceframe/diceframe:latest",
    },
    docs: {
      kicker: "GUIDES & DOCUMENTATION",
      heading: "Need help? Start here.",
      body: "The DiceFrame documentation covers deployment, updates, the standalone WebUI, the bot bridge, and plugin development. It is updated with every release. Start here for your first deployment or your first plugin.",
      primaryLabel: "Browse documentation",
      githubLabel: "View docs on GitHub",
      repoFiles: [
        "docs / en/guide.md",
        "docs / en/deploy.md",
        "docs / en/standalone-webui.md",
        "docs / en/plugin-development.md",
        "docs / en/bot-bridge-core.md",
      ],
      repoCaption: "GitHub documentation source",
      updated: "Up to date",
    },
    faq: {
      kicker: "QUESTIONS, ANSWERED",
      heading: "Frequently asked questions about DiceFrame.",
      lead: "These five answers cover what DiceFrame is, which rules it supports, what it costs, how online play works, and how to start. They are meant to be quoted.",
      items: [
        {
          question: "What is DiceFrame?",
          answer:
            "DiceFrame is an open-source ([AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html)), self-hosted AI TRPG platform. It connects an AI GM, a multiplayer WebUI, character sheets, lorebooks, dice, and state tracking into one persistent online campaign. Bots extend the same campaign into QQ group chat.",
        },
        {
          question: "Which TRPG systems does DiceFrame support?",
          answer:
            "DiceFrame provides both ready-to-play built-in presets and a fully extensible rule engine:",
          answerPoints: [
            "DND 5e (Dungeons & Dragons 5th Edition, published by Wizards of the Coast; open rules in the [D&D SRD](https://www.dndbeyond.com/srd))",
            "Call of Cthulhu / COC (the classic investigative horror game published by [Chaosium](https://www.chaosium.com/call-of-cthulhu-rpg/))",
            "Freeform rule system (Full customizability for stats, rolls, sheets, and lore)",
          ],
        },
        {
          question: "Does DiceFrame cost anything or require a cloud account?",
          answer:
            "No. DiceFrame is free and open source, running on your own Windows, Docker, or NAS environment. Model calls use your own API keys, and saves, settings, and secrets stay on your devices.",
        },
        {
          question: "Can I play online with friends?",
          answer:
            "Yes. Create a character, share an invite link, and friends join the same session in a browser. You can also bind the session to a QQ group chat through [NapCat](https://github.com/NapNeko/NapCatQQ) so players roll dice, check status, and submit actions from chat.",
        },
        {
          question: "How do I start my first AI-powered session?",
          answer:
            "Download the Windows portable build or start the Docker image. Choose a ruleset and world template, then connect a model API. Finally, follow the five-minute setup guide to bring your friends to the table.",
        },
      ],
    },
    finalCta: {
      kicker: "YOUR WORLD. YOUR RULES. YOUR TABLE.",
      heading: "Your next TRPG adventure starts on your own server.",
      body: "Open-source, self-hosted, and extensible. Download DiceFrame and bring your friends along.",
      downloadLabel: "Download for Windows",
      dockerLabel: "Docker deployment",
    },
  },
};
