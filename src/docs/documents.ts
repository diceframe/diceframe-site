/**
 * Documentation catalog for the GitHub-sourced help pages.
 *
 * Every entry names one document per language. The paths are the only contract
 * between this site and the source repositories, so keep them pointing at a
 * file that actually exists on `main`: a language must never read the other
 * language's file.
 *
 * The catalog doubles as the routing table (`/docs/{id}`, `/en/docs/{id}`),
 * the sitemap generator input, and the legacy `?doc=` redirect map.
 */

export type DocGroup = "use" | "deploy" | "extend" | "maintain";

export interface DocDefinition {
  /** Stable URL segment used by `/docs/{id}` and legacy `?doc={id}` links. */
  id: string;
  /** Repository path of the Simplified Chinese source. */
  zh: string;
  /** Repository path of the English source. */
  en: string;
  /** Navigation label per language. */
  title: { zh: string; en: string };
  /** Navigation subtitle and meta description per language. */
  description: { zh: string; en: string };
  /** Sidebar section. */
  group: DocGroup;
  /** Source repository under the `diceframe` owner. */
  repo: string;
}

export const DOC_GROUPS: readonly DocGroup[] = [
  "use",
  "deploy",
  "extend",
  "maintain",
];

export const DEFAULT_DOC_ID = "guide";

export const documents: readonly DocDefinition[] = [
  {
    id: "guide",
    zh: "docs/zh/guide.md",
    en: "docs/en/guide.md",
    title: { zh: "用户手册", en: "User guide" },
    description: {
      zh: "开第一局、多人玩法、掷骰、状态与群聊 Bot",
      en: "First session, multiplayer, dice, state, and chat bots",
    },
    group: "use",
    repo: "diceframe-content",
  },
  {
    // The main repository publishes English as the default README. The Chinese
    // overview therefore has to read README_zh-CN.md explicitly.
    id: "readme",
    zh: "README_zh-CN.md",
    en: "README.md",
    title: { zh: "项目总览", en: "Project overview" },
    description: {
      zh: "功能概览、快速开始、数据与项目结构",
      en: "Features, quick start, plugins, and data privacy",
    },
    group: "use",
    repo: "diceframe",
  },
  {
    id: "docker",
    zh: "docs/zh/deploy.md",
    en: "docs/en/deploy.md",
    title: { zh: "Docker 部署", en: "Docker deployment" },
    description: {
      zh: "Docker、Linux 与本地启动方式",
      en: "Docker, Linux, and local launch options",
    },
    group: "deploy",
    repo: "diceframe-content",
  },
  {
    id: "standalone",
    zh: "docs/zh/standalone-webui.md",
    en: "docs/en/standalone-webui.md",
    title: { zh: "独立部署 WebUI", en: "Standalone WebUI" },
    description: {
      zh: "静态托管、后端 HTTPS 与跨域配置",
      en: "Static hosting, backend HTTPS, and CORS setup",
    },
    group: "deploy",
    repo: "diceframe-content",
  },
  {
    id: "updater",
    zh: "docs/zh/updates.md",
    en: "docs/en/updates.md",
    title: { zh: "应用更新", en: "Application updates" },
    description: {
      zh: "主程序与插件的更新流程",
      en: "Updating DiceFrame and its plugins",
    },
    group: "deploy",
    repo: "diceframe",
  },
  {
    id: "plugin-dev",
    zh: "docs/zh/plugin-development.md",
    en: "docs/en/plugin-development.md",
    title: { zh: "插件开发", en: "Plugin development" },
    description: {
      zh: "插件结构、能力、打包与本地测试",
      en: "Plugin structure, capabilities, packaging, and local testing",
    },
    group: "extend",
    repo: "diceframe-content",
  },
  {
    id: "voice-pack-publishing",
    zh: "docs/zh/voice-pack-publishing.md",
    en: "docs/en/voice-pack-publishing.md",
    title: { zh: "发布音色预设", en: "Publish voice presets" },
    description: {
      zh: "授权、打包、本地测试与商店投稿",
      en: "Licensing, packaging, local tests, and store submission",
    },
    group: "extend",
    repo: "diceframe-content",
  },
  {
    id: "plugin-registry",
    zh: "docs/zh/plugin-registry.md",
    en: "docs/en/plugin-registry.md",
    title: { zh: "插件索引与审核", en: "Plugin registry and review" },
    description: {
      zh: "插件中心投稿、审核与安全边界",
      en: "Registry submissions, review, and security boundaries",
    },
    group: "extend",
    repo: "diceframe-content",
  },
  {
    id: "bot-bridge",
    zh: "docs/zh/bot-bridge-core.md",
    en: "docs/en/bot-bridge-core.md",
    title: { zh: "Bot Bridge 核心", en: "Bot Bridge core" },
    description: {
      zh: "群聊适配器与 Web 服务之间的接口",
      en: "The interface between chat adapters and the Web service",
    },
    group: "extend",
    repo: "diceframe-content",
  },
  {
    id: "release-notes",
    zh: "RELEASE_NOTES.md",
    en: "RELEASE_NOTES.md",
    title: { zh: "发布说明", en: "Release notes" },
    description: {
      zh: "当前版本变化与历史发布记录",
      en: "Current changes and previous release history",
    },
    group: "maintain",
    repo: "diceframe",
  },
];

export function findDoc(id: string | undefined | null): DocDefinition | undefined {
  if (!id) return undefined;
  return documents.find((doc) => doc.id === id);
}

/** Resolve a legacy `?doc=` value (id or repo path fragment) to a catalog entry. */
export function findDocByLegacyValue(
  value: string | undefined | null,
): DocDefinition | undefined {
  if (!value) return undefined;
  const direct = findDoc(value);
  if (direct) return direct;
  return documents.find(
    (doc) => doc.zh.endsWith(value) || doc.en.endsWith(value),
  );
}
