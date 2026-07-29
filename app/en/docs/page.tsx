import type { Metadata } from "next";
import { DocumentLanguage } from "../../components/LanguageSuggestion";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { DocsExplorer } from "../../docs/DocsExplorer";

export const metadata: Metadata = {
  title: {
    absolute: "DiceFrame Documentation — Setup, play, and plugin development",
  },
  description:
    "Learn how to install, configure, update, and extend the DiceFrame AI TRPG platform on Windows, Docker, and NAS.",
  alternates: {
    canonical: "/en/docs",
    languages: {
      "zh-CN": "/docs",
      en: "/en/docs",
      "x-default": "/docs",
    },
  },
  openGraph: {
    type: "website",
    url: "/en/docs",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    title: "DiceFrame Documentation",
    description:
      "Installation, gameplay, updates, and plugin development for DiceFrame.",
  },
};

export default function EnglishDocsPage() {
  return (
    <main className="docs-page" lang="en">
      <DocumentLanguage language="en" />
      <SiteHeader language="en" languageHref="/docs" />
      <section className="docs-hero">
        <div className="page-shell">
          <p className="eyebrow">
            <span />
            DICEFRAME · TRPG HELP CENTER
          </p>
          <div className="docs-hero-row">
            <div>
              <h1>DiceFrame setup and user documentation</h1>
              <p>
                From your first AI-powered session to DND and COC rules,
                Docker and NAS deployment, updates, and plugin development,
                you will find the guidance here.
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
      <DocsExplorer initialLanguage="en" />
      <SiteFooter language="en" />
    </main>
  );
}
