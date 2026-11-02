import type { InfoPageId, SiteLanguage } from "~/config/site";

export interface InfoSection {
  heading: string;
  /** Paragraphs rendered in order. */
  paragraphs?: string[];
  /** Optional bullet list rendered after the paragraphs. */
  points?: string[];
  /** Optional links rendered as a list after the bullets. */
  links?: Array<{ label: string; href: string }>;
}

export interface InfoPageContent {
  title: string;
  description: string;
  heading: string;
  lead: string;
  sections: InfoSection[];
}

const REPO = "https://github.com/diceframe/diceframe";
const SITE_REPO = "https://github.com/diceframe/diceframe-site";

const zh: Record<InfoPageId, InfoPageContent> = {
  about: {
    title: "关于 DiceFrame — 开源 AI 跑团平台与维护团队",
    description:
      "了解 DiceFrame 是什么、由谁维护、如何开源协作，以及项目的许可证与数据边界。",
    heading: "关于 DiceFrame",
    lead: "DiceFrame（骰框）是一个开源、自托管的 AI 跑团（TRPG）平台，由 DiceFrame Contributors 社区开发与维护。",
    sections: [
      {
        heading: "项目是什么",
        paragraphs: [
          "DiceFrame 把 AI GM、多人 WebUI、角色卡、世界书、骰子、状态追踪和群聊 Bot 放进同一场持续的线上跑团里，支持 DND 5e、COC 与自定义规则。",
          "AI 负责叙事，游戏状态由经过校验的规则引擎维护，让长战役里的数值与设定保持一致。",
        ],
      },
      {
        heading: "谁在维护",
        paragraphs: [
          "项目由开源社区 DiceFrame Contributors 维护。所有代码、文档与发布记录都公开在 GitHub，贡献者与提交历史可以直接核查。",
        ],
        links: [
          { label: "源代码仓库（GitHub）", href: REPO },
          { label: "提交与贡献者记录", href: `${REPO}/graphs/contributors` },
          { label: "版本发布记录", href: `${REPO}/releases` },
        ],
      },
      {
        heading: "许可证与数据边界",
        points: [
          "许可证：AGPL-3.0，完全开源。",
          "部署方式：自托管（Windows、Docker、Linux、NAS），不是托管的 SaaS 服务。",
          "数据：存档、配置与 API Key 都保存在你自己的设备上，项目方不收集遥测数据。",
          "模型：自带 LLM API Key，请求由你的服务器直接发往所选的模型服务商。",
        ],
      },
      {
        heading: "官网内容从哪里来",
        paragraphs: [
          "本站的使用文档实时同步自 GitHub 上的项目仓库，每个页面都标注了原文位置，可对照核实。",
        ],
      },
    ],
  },
  contact: {
    title: "联系 DiceFrame — 反馈问题与加入社区",
    description:
      "通过 GitHub Issues 或 QQ 群联系 DiceFrame 项目：反馈缺陷、提出建议、报告安全问题。",
    heading: "联系我们",
    lead: "DiceFrame 是社区项目，没有商业客服热线。下面是响应最快的几种方式。",
    sections: [
      {
        heading: "反馈问题与建议",
        paragraphs: [
          "缺陷报告、功能建议和使用问题请在 GitHub Issues 提出，便于其他用户检索与跟进。",
        ],
        links: [{ label: "GitHub Issues", href: `${REPO}/issues` }],
      },
      {
        heading: "社区交流",
        points: ["QQ 群：1060613588（玩家与部署经验交流）"],
      },
      {
        heading: "安全问题",
        paragraphs: [
          "如发现安全漏洞，请不要公开发帖，使用 GitHub 的私密安全公告（Security → Report a vulnerability）提交。",
        ],
        links: [
          { label: "提交私密安全报告", href: `${REPO}/security/advisories/new` },
        ],
      },
      {
        heading: "关于本网站",
        paragraphs: [
          "官网内容错误、链接失效等问题，请在官网仓库提交 Issue 或 Pull Request。",
        ],
        links: [{ label: "官网仓库 Issues", href: `${SITE_REPO}/issues` }],
      },
    ],
  },
  privacy: {
    title: "隐私政策 — DiceFrame",
    description:
      "DiceFrame 官网不使用 Cookie 与分析追踪；自托管实例的数据完全留在你自己的服务器上。",
    heading: "隐私政策",
    lead: "DiceFrame 是开源、自托管的软件。项目方不运营托管服务，也不收集终端用户的个人数据。",
    sections: [
      {
        heading: "本网站收集什么",
        paragraphs: [
          "diceframe.com 是托管在 Cloudflare 上的信息展示网站，不使用 Cookie、分析脚本或任何形式的用户追踪。Cloudflare 可能按其隐私政策保留标准的 HTTP 访问日志（IP 地址、User-Agent、时间戳）。",
        ],
        links: [
          {
            label: "Cloudflare 隐私政策",
            href: "https://www.cloudflare.com/privacypolicy/",
          },
        ],
      },
      {
        heading: "自托管实例",
        paragraphs: [
          "你在自己服务器上部署 DiceFrame 后，存档、角色卡、API Key、聊天记录等数据都只保存在你的基础设施中。项目方无法访问你的实例，也不接收任何遥测或统计数据。你需要自行负责所部署实例的数据处理与隐私合规。",
        ],
      },
      {
        heading: "第三方服务",
        paragraphs: [
          "DiceFrame 使用你提供的 API Key 连接第三方大模型服务（如 OpenAI、Anthropic 或兼容接口），连接由你的服务器直接发起。请阅读你所选服务商的隐私政策。",
        ],
      },
      {
        heading: "联系与变更",
        paragraphs: [
          "对本政策有疑问，请通过联系页面与我们沟通。政策更新会发布在本页，并同步修改页面底部的“最后更新”日期。",
        ],
      },
    ],
  },
  terms: {
    title: "服务条款 — DiceFrame",
    description:
      "DiceFrame 官网使用条款与软件许可说明：AGPL-3.0 开源许可、按现状提供、自托管责任。",
    heading: "服务条款",
    lead: "使用本网站或 DiceFrame 软件，即表示你同意以下条款。",
    sections: [
      {
        heading: "软件许可",
        paragraphs: [
          "DiceFrame 软件以 AGPL-3.0 许可证发布。你可以按该许可证的条件使用、修改与分发；若通过网络向他人提供修改后的版本，需要按许可证要求公开对应源代码。",
        ],
        links: [{ label: "查看许可证全文", href: `${REPO}/blob/main/LICENSE` }],
      },
      {
        heading: "按现状提供",
        paragraphs: [
          "本网站内容与 DiceFrame 软件均“按现状”提供，不附带任何明示或默示的担保。在适用法律允许的范围内，维护者不对使用本软件造成的损失承担责任。",
        ],
      },
      {
        heading: "自托管与内容责任",
        points: [
          "你自行负责所部署实例的安全、备份与合规。",
          "你自行负责通过 DiceFrame 创作、分享的内容，以及所接入的大模型服务的使用条款与费用。",
          "请勿将本项目用于违法用途或侵害他人权益。",
        ],
      },
      {
        heading: "第三方内容与链接",
        paragraphs: [
          "本站文档同步自 GitHub，并链接到第三方网站。这些内容由其各自的所有者负责，本站不对其准确性或可用性作出保证。",
        ],
      },
      {
        heading: "条款变更",
        paragraphs: [
          "条款可能不定期更新，更新后继续使用即视为接受。最新版本以本页为准。",
        ],
      },
    ],
  },
};

const en: Record<InfoPageId, InfoPageContent> = {
  about: {
    title: "About DiceFrame — open-source AI TRPG platform and its maintainers",
    description:
      "What DiceFrame is, who maintains it, how it is developed in the open, and where its license and data boundaries lie.",
    heading: "About DiceFrame",
    lead: "DiceFrame is an open-source, self-hosted AI tabletop role-playing (TRPG) platform developed and maintained by the DiceFrame Contributors community.",
    sections: [
      {
        heading: "What the project is",
        paragraphs: [
          "DiceFrame combines an AI Game Master, a multiplayer WebUI, character sheets, lorebooks, dice, state tracking, and chat bots into one persistent online campaign, with support for DND 5e, Call of Cthulhu (COC), and custom rules.",
          "The AI narrates while a validated rules engine owns the game state, so numbers and canon stay consistent across long campaigns.",
        ],
      },
      {
        heading: "Who maintains it",
        paragraphs: [
          "The project is maintained by the open-source community DiceFrame Contributors. All code, documentation, and release history are public on GitHub, so contributors and commit history can be verified directly.",
        ],
        links: [
          { label: "Source repository (GitHub)", href: REPO },
          {
            label: "Commits and contributors",
            href: `${REPO}/graphs/contributors`,
          },
          { label: "Release history", href: `${REPO}/releases` },
        ],
      },
      {
        heading: "License and data boundaries",
        points: [
          "License: AGPL-3.0, fully open source.",
          "Hosting: self-hosted (Windows, Docker, Linux, NAS). It is not a hosted SaaS.",
          "Data: saves, configuration, and API keys stay on your own machine; the project collects no telemetry.",
          "Models: bring your own LLM API keys; requests go from your server directly to the provider you choose.",
        ],
      },
      {
        heading: "Where this site's content comes from",
        paragraphs: [
          "The documentation on this site is rendered live from the project repositories on GitHub, and every page links to its original source so you can verify it.",
        ],
      },
    ],
  },
  contact: {
    title: "Contact DiceFrame — report issues and join the community",
    description:
      "Reach the DiceFrame project through GitHub Issues or the community chat: report bugs, suggest features, or disclose security issues.",
    heading: "Contact",
    lead: "DiceFrame is a community project with no commercial support line. These are the fastest ways to reach us.",
    sections: [
      {
        heading: "Bugs and suggestions",
        paragraphs: [
          "Please file bug reports, feature requests, and usage questions on GitHub Issues so other users can find and follow them.",
        ],
        links: [{ label: "GitHub Issues", href: `${REPO}/issues` }],
      },
      {
        heading: "Community",
        points: ["QQ group: 1060613588 (players and deployment tips)"],
      },
      {
        heading: "Security issues",
        paragraphs: [
          "If you find a vulnerability, please do not post it publicly. Use GitHub's private security advisory (Security → Report a vulnerability).",
        ],
        links: [
          {
            label: "Report a vulnerability privately",
            href: `${REPO}/security/advisories/new`,
          },
        ],
      },
      {
        heading: "About this website",
        paragraphs: [
          "For wrong content or broken links on this site, open an issue or pull request in the website repository.",
        ],
        links: [
          { label: "Website repository issues", href: `${SITE_REPO}/issues` },
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy — DiceFrame",
    description:
      "The DiceFrame website uses no cookies or analytics trackers; data in self-hosted instances stays entirely on your own server.",
    heading: "Privacy Policy",
    lead: "DiceFrame is open-source, self-hosted software. The project operates no hosted service and does not collect personal data from end users.",
    sections: [
      {
        heading: "What this website collects",
        paragraphs: [
          "diceframe.com is an informational site hosted on Cloudflare. It does not use cookies, analytics scripts, or any form of user tracking. Cloudflare may retain standard HTTP logs (IP address, User-Agent, timestamp) under its own privacy policy.",
        ],
        links: [
          {
            label: "Cloudflare privacy policy",
            href: "https://www.cloudflare.com/privacypolicy/",
          },
        ],
      },
      {
        heading: "Self-hosted instances",
        paragraphs: [
          "When you deploy DiceFrame on your own server, all data — game saves, character sheets, API keys, chat logs — stays on your infrastructure. The project has no access to your instance and receives no telemetry or analytics. You are responsible for the data handling and privacy practices of your own deployment.",
        ],
      },
      {
        heading: "Third-party services",
        paragraphs: [
          "DiceFrame connects to third-party LLM providers (such as OpenAI, Anthropic, or compatible APIs) using API keys you provide. Those connections are made directly from your server. Please review the privacy policy of the provider you choose.",
        ],
      },
      {
        heading: "Contact and changes",
        paragraphs: [
          "If you have questions about this policy, reach us through the contact page. Updates are published on this page and the “Last updated” date in the footer is revised accordingly.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Use — DiceFrame",
    description:
      "Terms for using the DiceFrame website and software: AGPL-3.0 license, provided as-is, and self-hosting responsibilities.",
    heading: "Terms of Use",
    lead: "By using this website or the DiceFrame software, you agree to the following terms.",
    sections: [
      {
        heading: "Software license",
        paragraphs: [
          "DiceFrame is released under the AGPL-3.0 license. You may use, modify, and distribute it under that license; if you offer a modified version to others over a network, the license requires you to make the corresponding source code available.",
        ],
        links: [{ label: "Read the full license", href: `${REPO}/blob/main/LICENSE` }],
      },
      {
        heading: "Provided as-is",
        paragraphs: [
          "This website and the DiceFrame software are provided “as is” without warranties of any kind, express or implied. To the extent permitted by law, the maintainers are not liable for losses arising from their use.",
        ],
      },
      {
        heading: "Self-hosting and content responsibility",
        points: [
          "You are responsible for the security, backups, and compliance of the instance you deploy.",
          "You are responsible for content you create or share with DiceFrame, and for the terms and costs of any LLM service you connect.",
          "Do not use the project for unlawful purposes or to infringe the rights of others.",
        ],
      },
      {
        heading: "Third-party content and links",
        paragraphs: [
          "Documentation here is synced from GitHub and links to third-party sites. Those materials are the responsibility of their owners, and this site makes no guarantee of their accuracy or availability.",
        ],
      },
      {
        heading: "Changes to these terms",
        paragraphs: [
          "These terms may be updated from time to time; continued use after an update means you accept it. The current version is the one on this page.",
        ],
      },
    ],
  },
};

export const infoContent: Record<
  SiteLanguage,
  Record<InfoPageId, InfoPageContent>
> = { zh, en };
