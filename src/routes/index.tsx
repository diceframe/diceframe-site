import { createFileRoute } from "@tanstack/react-router";
import { pageSeo } from "~/config/seo";
import { homeContent } from "~/content/home";
import { HomePage, homeJsonLd } from "~/pages/HomePage";

const content = homeContent.zh;

export const Route = createFileRoute("/")({
  head: () =>
    pageSeo({
      title: "DiceFrame — 开源自托管 AI 跑团（TRPG）平台",
      description:
        "DiceFrame（骰框）是支持 DND、COC 与自定义规则的开源自托管 AI 跑团（TRPG）平台，可接入 DeepSeek 等大模型，提供 AI GM、多人 WebUI、角色卡、世界书、骰子和 QQ Bot。",
      path: "/",
      language: content.language,
      alternates: { zh: "/", en: "/en" },
      keywords: [
        "DiceFrame",
        "骰框",
        "DeepSeek 跑团",
        "AI 跑团",
        "AI TRPG",
        "TRPG",
        "DND",
        "COC",
        "AI GM",
        "AI KP",
        "线上跑团",
        "跑团工具",
        "TRPG 平台",
        "自托管",
        "多人 WebUI",
      ],
      jsonLd: homeJsonLd(content),
    }),
  component: () => <HomePage content={content} />,
});
