import { Link } from "@tanstack/react-router";
import type { DocContentResult } from "~/docs/github";
import { docSourceUrl } from "~/docs/github";
import { MarkdownDocument } from "~/docs/MarkdownDocument";
import { createMarkdownModel, type HeadingEntry } from "~/docs/markdownOutline";
import {
  DOC_GROUPS,
  documents,
  type DocDefinition,
} from "~/docs/documents";
import type { SiteLanguage } from "~/config/site";
import { docsPath } from "~/config/site";
import { SiteFooter, SiteHeader } from "~/components/SiteChrome";

const interfaceCopy = {
  zh: {
    languageLabel: "文档语言",
    groups: {
      use: "使用",
      deploy: "部署",
      extend: "扩展",
      maintain: "维护",
    } as Record<(typeof DOC_GROUPS)[number], string>,
    original: "GitHub 原文 ↗",
    sourceStatus: "文档来源",
    errorTitle: "文档读取失败",
    error: "暂时无法读取文档。你仍然可以打开 GitHub 原文继续查看。",
    openOriginal: "打开 GitHub 原文 ↗",
    heroTitle: "DiceFrame 使用与部署文档",
    heroLead:
      "从第一次启动 AI 跑团，到 DND / COC 规则设置、Docker / NAS 部署、版本更新与插件开发，都可以在这里找到说明。",
    outline: "本页目录",
  },
  en: {
    languageLabel: "Documentation language",
    groups: {
      use: "Use",
      deploy: "Deployment",
      extend: "Extensions",
      maintain: "Maintenance",
    } as Record<(typeof DOC_GROUPS)[number], string>,
    original: "View on GitHub ↗",
    sourceStatus: "Documentation source",
    errorTitle: "Unable to load documentation",
    error:
      "The documentation is temporarily unavailable. You can still read the source on GitHub.",
    openOriginal: "Open on GitHub ↗",
    heroTitle: "DiceFrame setup and user documentation",
    heroLead:
      "From your first AI-powered session to DND and COC rules, Docker and NAS deployment, updates, and plugin development, you will find the guidance here.",
    outline: "On this page",
  },
} as const;

function DocumentOutline({
  headings,
  label,
  mobile = false,
}: {
  headings: HeadingEntry[];
  label: string;
  mobile?: boolean;
}) {
  const items = headings.filter(
    (heading) => heading.level === 2 || heading.level === 3,
  );
  if (!items.length) return null;
  const links = (
    <nav>
      {items.map((heading) => (
        <a
          className={`outline-level-${heading.level}`}
          href={`#${heading.id}`}
          key={`${heading.lineIndex}-${heading.id}`}
        >
          {heading.title}
        </a>
      ))}
    </nav>
  );

  if (mobile) {
    return (
      <details className="docs-outline-mobile">
        <summary>
          <span>{label}</span>
          <small>{items.length}</small>
        </summary>
        {links}
      </details>
    );
  }

  return (
    <aside className="docs-outline" aria-label={label}>
      <span>{label}</span>
      {links}
    </aside>
  );
}

export function DocsPage({
  language,
  doc,
  result,
}: {
  language: SiteLanguage;
  doc: DocDefinition;
  result: DocContentResult;
}) {
  const copy = interfaceCopy[language];
  const currentPath = language === "zh" ? doc.zh : doc.en;
  const sourceUrl = docSourceUrl(doc.repo, currentPath);
  const otherLanguage: SiteLanguage = language === "en" ? "zh" : "en";
  const markdownModel = createMarkdownModel(result.markdown);

  return (
    <main className="docs-page">
      <SiteHeader language={language} languageHref={docsPath(otherLanguage, doc.id)} />
      <section className="docs-hero">
        <div className="page-shell">
          <p className="eyebrow">
            <span />
            DICEFRAME · TRPG HELP CENTER
          </p>
          <div className="docs-hero-row">
            <div>
              <h1>{copy.heroTitle}</h1>
              <p>{copy.heroLead}</p>
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

      <section className="docs-workspace">
        <div className="page-shell docs-layout">
          <aside className="docs-sidebar">
            <div className="docs-language" aria-label={copy.languageLabel}>
              <a
                href={docsPath("zh", doc.id)}
                hrefLang="zh-CN"
                className={language === "zh" ? "active" : ""}
                aria-current={language === "zh" ? "true" : undefined}
              >
                中文
              </a>
              <a
                href={docsPath("en", doc.id)}
                hrefLang="en"
                className={language === "en" ? "active" : ""}
                aria-current={language === "en" ? "true" : undefined}
              >
                English
              </a>
            </div>
            {DOC_GROUPS.map((group) => (
              <div className="docs-group" key={group}>
                <span>{copy.groups[group]}</span>
                {documents
                  .filter((entry) => entry.group === group)
                  .map((entry) => (
                    <Link
                      key={entry.id}
                      to={language === "en" ? "/en/docs/$docId" : "/docs/$docId"}
                      params={{ docId: entry.id }}
                      className={entry.id === doc.id ? "active" : ""}
                    >
                      <strong>{entry.title[language]}</strong>
                      <small>{entry.description[language]}</small>
                    </Link>
                  ))}
              </div>
            ))}
          </aside>

          <div className="docs-content">
            <header className="docs-content-head">
              <div>
                <span className="docs-breadcrumb">
                  docs / {currentPath.split("/").at(-1)}
                </span>
                <h2>{doc.title[language]}</h2>
                <p>{doc.description[language]}</p>
              </div>
              <a href={sourceUrl} target="_blank" rel="noreferrer">
                {copy.original}
              </a>
            </header>

            <div className="source-notice">
              <span>
                <i /> {copy.sourceStatus}
              </span>
              <code>diceframe/{doc.repo}@main</code>
            </div>

            {result.status === "error" && (
              <div className="docs-error" role="alert">
                <strong>{copy.errorTitle}</strong>
                <p>{copy.error}</p>
                <a href={sourceUrl} target="_blank" rel="noreferrer">
                  {copy.openOriginal}
                </a>
              </div>
            )}

            {result.status === "ok" && (
              <div className="docs-reading-grid">
                <DocumentOutline
                  headings={markdownModel.headings}
                  label={copy.outline}
                  mobile
                />
                <MarkdownDocument
                  model={markdownModel}
                  currentPath={currentPath}
                  repo={doc.repo}
                />
                <DocumentOutline
                  headings={markdownModel.headings}
                  label={copy.outline}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <SiteFooter language={language} />
    </main>
  );
}
