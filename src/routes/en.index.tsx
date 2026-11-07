import { createFileRoute } from "@tanstack/react-router";
import { pageSeo } from "~/config/seo";
import { homeContent } from "~/content/home";
import { HomePage, homeJsonLd } from "~/pages/HomePage";

const content = homeContent.en;

export const Route = createFileRoute("/en/")({
  head: () =>
    pageSeo({
      title: "DiceFrame — Open-source, self-hosted AI TRPG platform",
      description:
        "DiceFrame is an open-source, self-hosted AI TRPG platform for DND, COC, and custom rules, with an AI GM, multiplayer WebUI, character sheets, lorebooks, dice, and chat bots.",
      path: "/en",
      language: content.language,
      alternates: { zh: "/", en: "/en" },
      keywords: [
        "DiceFrame",
        "AI TRPG",
        "TRPG platform",
        "DND",
        "COC",
        "AI GM",
        "AI game master",
        "self-hosted",
        "open source",
        "multiplayer WebUI",
        "lorebook",
        "tabletop RPG",
      ],
      jsonLd: homeJsonLd(content),
    }),
  component: () => <HomePage content={content} />,
});
