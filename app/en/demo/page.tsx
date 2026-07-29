import type { Metadata } from "next";
import { DemoExperience } from "../../components/DemoExperience";
import { DocumentLanguage } from "../../components/LanguageSuggestion";

export const metadata: Metadata = {
  title: {
    absolute: "Try DiceFrame — Interactive AI TRPG demo without an API",
  },
  description:
    "Experience DiceFrame actions, dice checks, GM narration, and state changes in a scripted browser demo with no model API required.",
  alternates: {
    canonical: "/en/demo",
    languages: {
      "zh-CN": "/demo",
      en: "/en/demo",
      "x-default": "/demo",
    },
  },
};

export default function EnglishDemoPage() {
  return (
    <main className="demo-page" lang="en">
      <DocumentLanguage language="en" />
      <DemoExperience language="en" />
    </main>
  );
}
