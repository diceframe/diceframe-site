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
  featureCards: Array<{ index: string; title: string; copy: string }>;
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
      lead: "DiceFrame 不是一个只会续写剧情的聊天框。它让 AI GM、每位玩家、每张角色卡和每次状态变化，都进入同一个可追踪的 TRPG 世界。",
    },
    featureCards: [
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
    ],
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
      lead: "无论是 DND、COC 还是自定义 TRPG 规则，把 DiceFrame 部署到自己的机器上，配置模型接口，然后邀请朋友入席。",
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
      body: "无论是第一次部署 DiceFrame，还是配置更新、开发插件，都能在这里找到对应的说明。文档会随 DiceFrame 的新版本持续更新。",
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
      lead: "如果你在评估 DiceFrame，或者准备向朋友介绍它，这些答案可以直接引用。",
      items: [
        {
          question: "DiceFrame 是什么？",
          answer:
            "DiceFrame 是一个开源（AGPL-3.0）、自托管的 AI 跑团（TRPG）平台。它把 AI GM、多人 WebUI、角色卡、世界书、骰子与状态追踪连接到同一场线上跑团，还可以通过 QQ Bot 延伸到群聊。",
        },
        {
          question: "DiceFrame 支持哪些跑团规则？",
          answer:
            "内置 DND 5e 与 COC（克苏鲁的呼唤）模板，也提供自由规则模式：你可以编辑规则、角色模板与世界设定，搭建完全属于自己的跑团桌。",
        },
        {
          question: "使用 DiceFrame 需要付费或注册云端服务吗？",
          answer:
            "不需要。DiceFrame 开源免费，部署在你自己的 Windows、Docker 或 NAS 环境中；模型接口使用你自己的 API Key，存档、配置与密钥都保存在你的设备上。",
        },
        {
          question: "可以和朋友一起在线跑团吗？",
          answer:
            "可以。创建角色后分享邀请链接，朋友在浏览器中入席同一场对局；也可以通过 QQ / NapCat 把对局绑定到群聊，让玩家在群里掷骰、查看状态并提交行动。",
        },
        {
          question: "如何开始第一局 AI 跑团？",
          answer:
            "下载 Windows 便携版，或用 Docker 一条命令启动；选择规则与世界模板，配置模型接口，然后按照「5 分钟开始第一局」指南邀请朋友入席开团。",
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
      lead: "DiceFrame is more than a chat box that continues a story. It puts the AI GM, every player, every character sheet, and every state change into the same trackable TRPG world.",
    },
    featureCards: [
      {
        index: "01",
        title: "An AI GM that respects the rules",
        copy: "Narration and structured state are handled separately. The model tells the story; the engine makes HP, items, currency, and checks count.",
      },
      {
        index: "02",
        title: "One live multiplayer table",
        copy: "Invites, character claims, action queues, pauses, and GM turns all live in one WebUI and stay synchronized in real time.",
      },
      {
        index: "03",
        title: "A world that remembers",
        copy: "Lorebooks inject relevant context, long campaigns condense their history, and embeddings can bring back semantically related memories.",
      },
      {
        index: "04",
        title: "Rules that are not hard-coded",
        copy: "Start with DND 5e, COC, or freeform templates, then edit the rules, character templates, and world setting to build your own table.",
      },
      {
        index: "05",
        title: "From the web into group chat",
        copy: "Connect a web session to group chat through QQ and NapCat so players can act, check status, review the story, and roll dice.",
      },
      {
        index: "06",
        title: "Deployment stays in your hands",
        copy: "Run the Windows portable build, Docker, NAS, or source version. Saves, settings, and API keys remain in your environment.",
      },
    ],
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
      lead: "Whether you play DND, COC, or a custom TRPG system, deploy DiceFrame on your own machine, connect a model API, and invite your friends to the table.",
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
      body: "From your first DiceFrame deployment to updates and plugin development, the documentation covers each part of the journey and evolves with the project.",
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
      lead: "Evaluating DiceFrame or introducing it to your group? These answers are meant to be quoted.",
      items: [
        {
          question: "What is DiceFrame?",
          answer:
            "DiceFrame is an open-source (AGPL-3.0), self-hosted AI TRPG platform. It connects an AI GM, a multiplayer WebUI, character sheets, lorebooks, dice, and state tracking into one persistent online campaign, and extends into QQ group chat through bots.",
        },
        {
          question: "Which TRPG systems does DiceFrame support?",
          answer:
            "It ships with DND 5e and Call of Cthulhu (COC) templates plus a freeform mode: you can edit the rules, character templates, and world setting to build a table of your own.",
        },
        {
          question: "Does DiceFrame cost anything or require a cloud account?",
          answer:
            "No. DiceFrame is free and open source, running on your own Windows, Docker, or NAS environment. Model calls use your own API keys, and saves, settings, and secrets stay on your devices.",
        },
        {
          question: "Can I play online with friends?",
          answer:
            "Yes. Create a character, share an invite link, and friends join the same session in a browser. You can also bind the session to a QQ group chat through NapCat so players roll dice, check status, and submit actions from chat.",
        },
        {
          question: "How do I start my first AI-powered session?",
          answer:
            "Download the Windows portable build or start the Docker image, choose a ruleset and world template, connect a model API, and follow the five-minute setup guide to bring your friends to the table.",
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
