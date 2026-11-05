import {
  breadcrumbJsonLd,
  faqJsonLd,
  organizationJsonLd,
  personAuthorJsonLd,
  softwareJsonLd,
  websiteJsonLd,
} from "~/config/seo";
import {
  GITHUB_RELEASES_URL,
  GITHUB_CONTENT_REPO_URL,
  docsPath,
  homePath,
} from "~/config/site";
import type { HomeContent } from "~/content/home";
import { InlineText } from "~/components/InlineText";
import { LanguageSuggestion } from "~/components/LanguageSuggestion";
import { SiteFooter, SiteHeader } from "~/components/SiteChrome";

export function HomePage({ content }: { content: HomeContent }) {
  const { language } = content;
  const en = language === "en";

  return (
    // Header and footer sit outside <main> so readers and extractors see the
    // page's own content (hero definition first), not navigation, as main.
    <>
      <LanguageSuggestion currentLanguage={language} />
      <SiteHeader language={language} />
      <main>

        <section className="hero" id="overview">
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <div className="page-shell hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span />
                {content.eyebrow}
              </div>
              <h1 className={en ? "english-hero-title" : undefined}>
                {content.heroTitleLines.map((line, lineIndex) => (
                  <span key={lineIndex}>
                    {line.map((segment, segmentIndex) =>
                      segment.accent ? (
                        <em key={segmentIndex}>{segment.text}</em>
                      ) : (
                        <span key={segmentIndex}>{segment.text}</span>
                      ),
                    )}
                  </span>
                ))}
              </h1>
              <p className="hero-lead">{content.heroLead}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#download">
                  {content.primaryCta}
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  className="button button-quiet"
                  href={docsPath(language, content.secondaryCtaDocId)}
                >
                  {content.secondaryCta}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
              <div className="hero-trust" aria-label={content.trustLabel}>
                <span>{content.trust}</span>
              </div>
            </div>

            <div
              className="hero-stage"
              aria-label={en ? "Preview of the DiceFrame WebUI" : "DiceFrame WebUI 产品预览"}
            >
              <div className="stage-glow" />
              <div className="app-frame">
                <div className="app-frame-top">
                  <div className="window-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>{content.stageFrameTitle}</span>
                  <span className="system-live">
                    <i />
                    ONLINE
                  </span>
                </div>
                <img
                  className="app-screenshot"
                  src="/diceframe-app.webp?v=3"
                  alt={content.screenshotAlt}
                  width={1280}
                  height={720}
                  decoding="async"
                  // Above-the-fold product shot: hint the browser to load it now.
                  fetchPriority="high"
                />
              </div>
              <div className="stage-card stage-card-left">
                <span className="stage-label">{content.stageCardLeft.label}</span>
                <strong>{content.stageCardLeft.strong}</strong>
                <small>{content.stageCardLeft.small}</small>
              </div>
              <div className="stage-card stage-card-right">
                <span className="stage-label">{content.stageCardRight.label}</span>
                <strong>{content.stageCardRight.strong}</strong>
                <small>{content.stageCardRight.small}</small>
              </div>
            </div>
          </div>
          <div className="hero-rule page-shell">
            <span>{content.ruleStrip[0]}</span>
            <i />
            <span>{content.ruleStrip[1]}</span>
            <i />
            <span>{content.ruleStrip[2]}</span>
          </div>
        </section>

        <section className="section section-features" id="features">
          <div className="page-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="section-kicker">{content.features.kicker}</p>
                <h2>{content.features.heading}</h2>
              </div>
              <p>{content.features.lead}</p>
            </div>
            <div className="feature-grid">
              {content.featureCards.map((feature) => (
                <article className="feature-card" key={feature.index}>
                  <span className="feature-index">{feature.index}</span>
                  <div className="feature-mark" aria-hidden="true">
                    <i />
                    <i />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>
                    <InlineText text={feature.copy} />
                  </p>
                </article>
              ))}
            </div>
            <div className="fact-strip">
              <dl aria-label={content.facts.label}>
                {content.facts.items.map((fact) => (
                  <div className="fact-item" key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>
                      <strong>{fact.value}</strong>
                      <span>{fact.detail}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="fact-source">
                <InlineText text={content.facts.source} />
              </p>
            </div>
            <figure className="license-quote">
              <blockquote cite={content.licenseQuote.href} lang="en">
                <p>“{content.licenseQuote.quote}”</p>
              </blockquote>
              {content.licenseQuote.translation && (
                <p className="license-quote-translation">
                  {en ? "Translation: " : "译文："}
                  {content.licenseQuote.translation}
                </p>
              )}
              <figcaption>
                —{" "}
                <cite>
                  <a href={content.licenseQuote.href} target="_blank" rel="noopener noreferrer">
                    {content.licenseQuote.author}, {content.licenseQuote.work}
                  </a>
                </cite>
              </figcaption>
              <p className="license-quote-context">{content.licenseQuote.context}</p>
            </figure>
          </div>
        </section>

        <section className="section narrative-section" id="gameplay">
          <div className="page-shell narrative-grid">
            <div className="narrative-visual">
              <div className="story-card">
                <div className="story-meta">
                  <span>{content.narrative.story.meta[0]}</span>
                  <span>{content.narrative.story.meta[1]}</span>
                </div>
                <p>{content.narrative.story.text}</p>
                <div className="story-state">
                  <span>{content.narrative.story.stateLabels[0]}</span>
                  <strong>{content.narrative.story.stateValues[0]}</strong>
                  <span>{content.narrative.story.stateLabels[1]}</span>
                  <strong>{content.narrative.story.stateValues[1]}</strong>
                </div>
              </div>
              <div className="dice-seal" aria-hidden="true">
                <span>20</span>
                <small>CRITICAL</small>
              </div>
            </div>
            <div className="narrative-copy">
              <p className="section-kicker">{content.narrative.kicker}</p>
              <h2>
                {content.narrative.headingA}
                <br />
                {content.narrative.headingB}
              </h2>
              <p>{content.narrative.body}</p>
              <ul className="check-list">
                {content.narrative.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a className="text-link" href={docsPath(language, content.narrative.linkDocId)}>
                {content.narrative.linkLabel} <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section steps-section" id="start">
          <div className="page-shell">
            <div className="section-heading centered-heading">
              <p className="section-kicker">{content.steps.kicker}</p>
              <h2>{content.steps.heading}</h2>
              <p>{content.steps.lead}</p>
            </div>
            <div className="steps-grid">
              {content.steps.items.map((step, index) => (
                <article className="step-card" key={step.title}>
                  <span className="step-number">0{index + 1}</span>
                  <div className="step-line" aria-hidden="true">
                    <i />
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
            <div className="quick-command">
              <div>
                <span>{content.steps.dockerLabel}</span>
                <code>{content.steps.dockerCommand}</code>
              </div>
              <span className="command-mark" aria-hidden="true">⌘</span>
            </div>
          </div>
        </section>

        <section className="section docs-section" id="docs">
          <div className="page-shell docs-callout">
            <div>
              <p className="section-kicker">{content.docs.kicker}</p>
              <h2>{content.docs.heading}</h2>
              <p>{content.docs.body}</p>
              <div className="docs-actions">
                <a
                  className="button button-primary"
                  href={docsPath(language, "guide")}
                >
                  {content.docs.primaryLabel}
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  className="text-link"
                  href={`${GITHUB_CONTENT_REPO_URL}/tree/main/docs`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content.docs.githubLabel} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div className="repo-card" aria-label={content.docs.repoCaption}>
              <div className="repo-card-head">
                <img
                  src="/diceframe-logo.svg"
                  alt="DiceFrame"
                  aria-hidden="true"
                  width={52}
                  height={52}
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <span>github.com</span>
                  <strong>diceframe / diceframe-content</strong>
                </div>
              </div>
              <div className="repo-tree">
                <span>main</span>
                <ul>
                  {content.docs.repoFiles.map((file) => (
                    <li key={file}>
                      <i /> {file}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="repo-sync">
                <span>
                  <i /> CONTINUOUSLY UPDATED
                </span>
                <span>{content.docs.updated}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="page-shell">
            <div className="section-heading centered-heading">
              <p className="section-kicker">{content.faq.kicker}</p>
              <h2>{content.faq.heading}</h2>
              <p>{content.faq.lead}</p>
            </div>
            <div className="faq-list">
              {content.faq.items.map((item) => (
                // Answer-first: each question heading is immediately followed by
                // its visible answer (no collapsed <details>), so readers and
                // AI extractors get the direct answer right under the question.
                <article className="faq-item" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>
                    <InlineText text={item.answer} />
                  </p>
                  {item.answerPoints && item.answerPoints.length > 0 && (
                    <ul className="faq-points">
                      {item.answerPoints.map((point) => (
                        <li key={point}>
                          <InlineText text={point} />
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta" id="download">
          <div className="page-shell final-cta-inner">
            <img
              className="cta-logo"
              src="/diceframe-logo.svg"
              alt="DiceFrame"
              aria-hidden="true"
              width={116}
              height={116}
              loading="lazy"
              decoding="async"
            />
            <p className="section-kicker">{content.finalCta.kicker}</p>
            <h2>{content.finalCta.heading}</h2>
            <p>{content.finalCta.body}</p>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href={GITHUB_RELEASES_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.finalCta.downloadLabel}
                <span aria-hidden="true">↗</span>
              </a>
              <a
                className="button button-quiet"
                href={docsPath(language, "docker")}
              >
                {content.finalCta.dockerLabel}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

      </main>
      <SiteFooter language={language} />
    </>
  );
}

/** JSON-LD blocks injected into the homepage head. */
export function homeJsonLd(content: HomeContent): object[] {
  return [
    websiteJsonLd(content.language),
    breadcrumbJsonLd([{ name: "DiceFrame", path: homePath(content.language) }]),
    organizationJsonLd(),
    personAuthorJsonLd(),
    softwareJsonLd(content.language),
    faqJsonLd(content.faq.items),
  ];
}
