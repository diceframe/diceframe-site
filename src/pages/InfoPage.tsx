import { SiteFooter, SiteHeader } from "~/components/SiteChrome";
import { infoContent } from "~/content/info";
import {
  AUTHOR_NAME,
  INFO_PAGE_IDS,
  SITE_UPDATED,
  infoPath,
  type InfoPageId,
  type SiteLanguage,
} from "~/config/site";

const copy = {
  zh: {
    eyebrow: "DICEFRAME · 项目信息",
    by: "作者",
    updated: "最后更新",
    related: "更多信息",
    navLabel: "项目信息页面",
  },
  en: {
    eyebrow: "DICEFRAME · PROJECT INFO",
    by: "By",
    updated: "Last updated",
    related: "More information",
    navLabel: "Project information pages",
  },
} as const;

const navLabels: Record<SiteLanguage, Record<InfoPageId, string>> = {
  zh: { about: "关于项目", contact: "联系我们", privacy: "隐私政策", terms: "服务条款" },
  en: { about: "About", contact: "Contact", privacy: "Privacy Policy", terms: "Terms" },
};

export function InfoPage({
  id,
  language,
}: {
  id: InfoPageId;
  language: SiteLanguage;
}) {
  const t = copy[language];
  const page = infoContent[language][id];
  const otherLanguage: SiteLanguage = language === "en" ? "zh" : "en";

  return (
    <main className="docs-page">
      <SiteHeader language={language} languageHref={infoPath(otherLanguage, id)} />
      <section className="docs-hero">
        <div className="page-shell">
          <p className="eyebrow">
            <span />
            {t.eyebrow}
          </p>
          <h1>{page.heading}</h1>
          <p className="info-lead">{page.lead}</p>
          <p className="info-byline">
            {t.by}{" "}
            <a rel="author" href={infoPath(language, "about")}>
              {AUTHOR_NAME}
            </a>
            {" · "}
            {t.updated} <time dateTime={SITE_UPDATED}>{SITE_UPDATED}</time>
          </p>
        </div>
      </section>

      <article className="page-shell info-body">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((text) => <p key={text}>{text}</p>)}
            {section.points && (
              <ul>
                {section.points.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            )}
            {section.links && (
              <ul className="info-links">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <nav className="info-related" aria-label={t.navLabel}>
          <strong>{t.related}</strong>
          {INFO_PAGE_IDS.filter((other) => other !== id).map((other) => (
            <a key={other} href={infoPath(language, other)}>
              {navLabels[language][other]}
            </a>
          ))}
        </nav>
      </article>

      <SiteFooter language={language} />
    </main>
  );
}
