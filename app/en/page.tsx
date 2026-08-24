import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  DocumentLanguage,
  LanguageSuggestion,
} from "../components/LanguageSuggestion";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: {
    absolute: "DiceFrame — Open-source, self-hosted AI TRPG platform",
  },
  description:
    "DiceFrame is an open-source, self-hosted AI TRPG platform for DND, COC, and custom rules, with an AI GM, multiplayer WebUI, character sheets, lorebooks, dice, and chat bots.",
  alternates: {
    canonical: "/en",
    languages: {
      "zh-CN": "/",
      en: "/en",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: "/en",
    locale: "en_US",
    alternateLocale: ["zh_CN"],
    title: "DiceFrame — Open-source, self-hosted AI TRPG platform",
    description:
      "Bring your rules, characters, friends, and AI GM together at one persistent online TRPG table.",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://diceframe.com/en#website",
    url: "https://diceframe.com/en",
    name: "DiceFrame",
    alternateName: "DiceFrame AI TRPG Platform",
    description:
      "An open-source, self-hosted AI TRPG platform for DND, COC, and custom rules.",
    inLanguage: "en",
    publisher: {
      "@id": "https://diceframe.com/#organization",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": "https://diceframe.com/en#source",
    name: "DiceFrame",
    url: "https://diceframe.com/en",
    operatingSystem: "Windows, Linux, Docker, NAS, Web Browser",
    description:
      "A self-hosted TRPG platform connecting an AI GM, multiplayer WebUI, character sheets, lorebooks, dice, state tracking, and chat bots.",
    codeRepository: "https://github.com/diceframe/diceframe",
    license: "https://www.gnu.org/licenses/agpl-3.0.html",
    inLanguage: "en",
  },
] as const;

const features = [
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
] as const;

const steps = [
  ["Deploy", "Download the Windows portable build or start DiceFrame with Docker on your own device."],
  ["Set the table", "Choose rules and a world template, or let AI draft an editable starting point."],
  ["Invite players", "Create characters and share an invite link so web and chat players join the same session."],
  ["Start playing", "Describe actions, resolve checks, and move the story forward while every change is written back to game state."],
] as const;

export default function EnglishHome() {
  return (
    <main lang="en">
      <DocumentLanguage language="en" />
      <LanguageSuggestion currentLanguage="en" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader language="en" />

      <section className="hero english-hero">
        <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
        <div className="page-shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              OPEN-SOURCE · SELF-HOSTED · AI TRPG
            </p>
            <h1 className="english-hero-title">
              <span>Gather your party.</span>
              <span>Set the scene.</span>
              <span>
                Let the story <em>unfold</em>.
              </span>
            </h1>
            <p className="hero-lead">
              DiceFrame is an open-source, self-hosted AI TRPG platform for
              DND, COC, and custom rules. It brings an AI GM, multiplayer
              WebUI, character sheets, lorebooks, dice, state tracking, and
              group chat into one persistent online campaign.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#download">
                Download DiceFrame
                <span aria-hidden="true">→</span>
              </a>
              <Link className="button button-quiet" href="/en/demo">
                View demo
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                className="button button-quiet"
                href="/en/docs?doc=guide"
              >
                Set up DiceFrame
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="hero-trust" aria-label="Project highlights">
              <span>AGPL-3.0 open source</span>
            </div>
          </div>

          <div className="hero-stage" aria-label="Preview of the DiceFrame WebUI">
            <div className="stage-glow" />
            <div className="app-frame">
              <div className="app-frame-top">
                <div className="window-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <span>DiceFrame · Adventure table</span>
                <span className="system-live">
                  <i />
                  ONLINE
                </span>
              </div>
              <Image
                className="app-screenshot"
                src="/diceframe-app.jpg?v=2"
                alt="DiceFrame multiplayer TRPG WebUI with narration, character status, and actions"
                width={1904}
                height={1224}
                priority
                unoptimized
              />
            </div>
            <div className="stage-card stage-card-left">
              <span className="stage-label">CHECK</span>
              <strong>D20</strong>
              <small>Roll added to the action</small>
            </div>
            <div className="stage-card stage-card-right">
              <span className="stage-label">MEMORY</span>
              <strong>The world keeps growing</strong>
              <small>Lorebook · Summary · Semantic recall</small>
            </div>
          </div>
        </div>
        <div className="hero-rule page-shell">
          <span>SELF-HOSTED</span>
          <i />
          <span>DND · COC · CUSTOM RULES</span>
          <i />
          <span>BOT</span>
        </div>
      </section>

      <section className="section section-features" id="features">
        <div className="page-shell">
          <div className="section-heading split-heading">
            <div>
              <p className="section-kicker">BUILT FOR THE WHOLE TABLE</p>
              <h2>One AI TRPG engine for the entire table.</h2>
            </div>
            <p>
              DiceFrame is more than a chat box that continues a story. It puts
              the AI GM, every player, every character sheet, and every state
              change into the same trackable TRPG world.
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
                The wind beyond the door carries the scent of wet iron. When
                Eliza raises her lantern, the runes do not reflect the
                light—they are slowly breathing.
              </p>
              <div className="story-state">
                <span>Scene</span>
                <strong>Sunken Gallery</strong>
                <span>State change</span>
                <strong>Discovered · Ancient runes</strong>
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
              Let the story roam.
              <br />
              Keep the state reliable.
            </h2>
            <p>
              DiceFrame separates the model&apos;s narrative from internal
              state instructions. Players get clean prose while damage, items,
              payments, experience, and scene changes are validated before
              reaching the save.
            </p>
            <ul className="check-list">
              <li>The roll happens before its result is narrated</li>
              <li>Payments require confirmation and balance validation</li>
              <li>The WebUI and bots share the same game state</li>
            </ul>
            <Link className="text-link" href="/en/docs?doc=guide">
              Read the gameplay guide <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section steps-section" id="start">
        <div className="page-shell">
          <div className="section-heading centered-heading">
            <p className="section-kicker">FROM ZERO TO SESSION ONE</p>
            <h2>Four steps to your first AI-powered session.</h2>
            <p>
              Whether you play DND, COC, or a custom TRPG system, deploy
              DiceFrame on your own machine, connect a model API, and invite
              your friends to the table.
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
              <span>DOCKER · START WITH ONE COMMAND</span>
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
            <h2>Need help? Start here.</h2>
            <p>
              From your first DiceFrame deployment to updates and plugin
              development, the documentation covers each part of the journey
              and evolves with the project.
            </p>
            <div className="docs-actions">
              <Link className="button button-primary" href="/en/docs">
                Browse documentation
                <span aria-hidden="true">→</span>
              </Link>
              <a
                className="text-link"
                href="https://github.com/diceframe/diceframe-content/tree/main/docs"
                target="_blank"
                rel="noreferrer"
              >
                View docs on GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="repo-card" aria-label="GitHub documentation source">
            <div className="repo-card-head">
              <Image src="/diceframe-logo.svg" alt="" width={52} height={52} />
              <div>
                <span>github.com</span>
                <strong>diceframe / diceframe-content</strong>
              </div>
            </div>
            <div className="repo-tree">
              <span>main</span>
              <ul>
                <li><i /> docs / en/guide.md</li>
                <li><i /> docs / en/deploy.md</li>
                <li><i /> docs / en/standalone-webui.md</li>
                <li><i /> docs / en/plugin-development.md</li>
                <li><i /> docs / en/bot-bridge-core.md</li>
              </ul>
            </div>
            <div className="repo-sync">
              <span><i /> CONTINUOUSLY UPDATED</span>
              <span>Up to date</span>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta" id="download">
        <div className="page-shell final-cta-inner">
          <Image
            className="cta-logo"
            src="/diceframe-logo.svg"
            alt=""
            width={116}
            height={116}
          />
          <p className="section-kicker">YOUR WORLD. YOUR RULES. YOUR TABLE.</p>
          <h2>Your next TRPG adventure starts on your own server.</h2>
          <p>
            Open-source, self-hosted, and extensible. Download DiceFrame and
            bring your friends along.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="https://github.com/diceframe/diceframe/releases"
              target="_blank"
              rel="noreferrer"
            >
              Download for Windows
              <span aria-hidden="true">↗</span>
            </a>
            <Link className="button button-quiet" href="/en/docs?doc=docker">
              Docker deployment
              <span aria-hidden="true">→</span>
            </Link>
            <Link className="button button-quiet" href="/en/docs?doc=standalone">
              Standalone WebUI
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter language="en" />
    </main>
  );
}
