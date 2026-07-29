import type { Metadata } from "next";
import { DemoExperience } from "../components/DemoExperience";
import { DocumentLanguage } from "../components/LanguageSuggestion";

export const metadata: Metadata = {
  title: {
    absolute: "DiceFrame 在线试玩 — 无需 API 的交互式 TRPG 演示",
  },
  description:
    "在浏览器中体验 DiceFrame 的行动、掷骰、AI GM 叙事与状态同步流程。预设剧情本地运行，无需模型 API。",
  alternates: {
    canonical: "/demo",
    languages: {
      "zh-CN": "/demo",
      en: "/en/demo",
      "x-default": "/demo",
    },
  },
};

export default function DemoPage() {
  return (
    <main className="demo-page">
      <DocumentLanguage language="zh" />
      <DemoExperience language="zh" />
    </main>
  );
}
