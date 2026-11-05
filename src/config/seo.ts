import {
  ABOUT_URL,
  AUTHOR_NAME,
  CONTACT_URL,
  GITHUB_REPO_URL,
  SITE_PUBLISHED,
  SITE_UPDATED,
  SITE_URL,
  absoluteUrl,
  docsPath,
  homePath,
  infoPath,
  languageToLocale,
  type InfoPageId,
  type SiteLanguage,
} from "./site";
import { infoContent } from "~/content/info";
import { stripInlineLinks } from "~/content/inlineLinks";
import type { DocDefinition } from "~/docs/documents";

export interface HreflangAlternates {
  zh: string;
  en: string;
}

export interface PageSeoInput {
  title: string;
  description: string;
  /** Canonical path of the current page, e.g. "/en/docs/guide". */
  path: string;
  language: SiteLanguage;
  alternates: HreflangAlternates;
  keywords?: readonly string[];
  jsonLd?: readonly object[];
}

export interface RouteHead {
  meta: Array<Record<string, string>>;
  links: Array<Record<string, string>>;
  scripts: Array<{ type: string; children: string }>;
}

function jsonLdScript(blocks: readonly object[]): RouteHead["scripts"] {
  return blocks.map((block) => ({
    type: "application/ld+json",
    children: JSON.stringify(block).replace(/</g, "\\u003c"),
  }));
}

/**
 * Builds the complete head payload for one page: title, description, canonical,
 * hreflang alternates, Open Graph / Twitter cards, and JSON-LD structured data.
 */
export function pageSeo(input: PageSeoInput): RouteHead {
  const canonical = absoluteUrl(input.path);
  const ogLocale = languageToLocale(input.language);
  const alternateLocale = input.language === "en" ? "zh_CN" : "en_US";
  const image = absoluteUrl("/diceframe-app.jpg");
  const imageAlt =
    input.language === "en"
      ? "DiceFrame multiplayer TRPG WebUI"
      : "DiceFrame 多人跑团 WebUI";

  const meta: RouteHead["meta"] = [
    { title: input.title },
    { name: "description", content: input.description },
    { name: "author", content: AUTHOR_NAME },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "DiceFrame" },
    { property: "og:title", content: input.title },
    { property: "og:description", content: input.description },
    { property: "og:url", content: canonical },
    { property: "og:locale", content: ogLocale },
    { property: "og:locale:alternate", content: alternateLocale },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: imageAlt },
    { property: "article:published_time", content: SITE_PUBLISHED },
    { property: "article:modified_time", content: SITE_UPDATED },
    { property: "og:updated_time", content: SITE_UPDATED },
    { property: "article:author", content: ABOUT_URL },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: input.description },
    { name: "twitter:image", content: image },
  ];

  if (input.keywords?.length) {
    meta.splice(2, 0, { name: "keywords", content: input.keywords.join(", ") });
  }

  return {
    meta,
    links: [
      { rel: "canonical", href: canonical },
      { rel: "author", href: ABOUT_URL },
      { rel: "alternate", hrefLang: "zh-CN", href: absoluteUrl(input.alternates.zh) },
      { rel: "alternate", hrefLang: "en", href: absoluteUrl(input.alternates.en) },
      { rel: "alternate", hrefLang: "x-default", href: absoluteUrl(input.alternates.zh) },
    ],
    scripts: input.jsonLd ? jsonLdScript(input.jsonLd) : [],
  };
}

/** Site-level head entries that apply to every page. */
export function rootSeo(): RouteHead {
  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "robots", content: "index, follow" },
      {
        name: "msvalidate.01",
        content: "D836E0E0DD0B81055E1D84C58E0C9A93",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "shortcut icon", href: "/favicon.svg" },
    ],
    scripts: [],
  };
}

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const PERSON_AUTHOR_ID = `${SITE_URL}/#author`;

/**
 * A Person author entry satisfying GEO Author Signals.
 * name, url, and sameAs are required by most GEO checkers.
 */
export function personAuthorJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_AUTHOR_ID,
    name: AUTHOR_NAME,
    url: ABOUT_URL,
    sameAs: [GITHUB_REPO_URL, `${GITHUB_REPO_URL}/issues`],
    contactPoint: { "@type": "ContactPoint", contactType: "community support", url: CONTACT_URL },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: AUTHOR_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/diceframe-logo.svg"),
    sameAs: [GITHUB_REPO_URL],
    description:
      "DiceFrame 开源 AI 跑团（TRPG）平台的开发与维护社区。",
    founder: { "@id": PERSON_AUTHOR_ID },
  };
}

export function websiteJsonLd(language: SiteLanguage) {
  const english = language === "en";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}${english ? "/en#website" : "/#website"}`,
    url: absoluteUrl(english ? "/en" : "/"),
    name: "DiceFrame",
    alternateName: english ? "DiceFrame AI TRPG Platform" : "DiceFrame AI 跑团平台",
    description: english
      ? "An open-source, self-hosted AI TRPG platform for DND, COC, and custom rules."
      : "支持 DND、COC 与自定义规则的开源自托管 AI 跑团（TRPG）平台。",
    inLanguage: languageToLocale(language),
    publisher: { "@id": ORGANIZATION_ID },
    datePublished: SITE_PUBLISHED,
    dateModified: SITE_UPDATED,
  };
}

export function softwareJsonLd(language: SiteLanguage) {
  const english = language === "en";
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "@id": `${SITE_URL}${english ? "/en#source" : "/#source"}`,
    name: "DiceFrame",
    url: absoluteUrl(english ? "/en" : "/"),
    operatingSystem: "Windows, Linux, Docker, NAS, Web Browser",
    description: english
      ? "A self-hosted TRPG platform connecting an AI GM, multiplayer WebUI, character sheets, lorebooks, dice, state tracking, and chat bots."
      : "连接 AI GM、多人 WebUI、角色卡、世界书、骰子、状态追踪与群聊 Bot 的自托管 TRPG 平台。",
    codeRepository: GITHUB_REPO_URL,
    license: "https://www.gnu.org/licenses/agpl-3.0.html",
    author: { "@id": PERSON_AUTHOR_ID },
    datePublished: SITE_PUBLISHED,
    dateModified: SITE_UPDATED,
    ...(english ? { inLanguage: "en" } : {}),
  };
}

/** `answer` and `answerPoints` may contain `[label](https://…)` citation links. */
export interface FaqEntry {
  question: string;
  answer: string;
  /** Optional bullet points rendered below the answer paragraph for structured quoting. */
  answerPoints?: string[];
}

/**
 * FAQ structured data. Question-and-answer blocks are the format AI systems
 * extract most reliably, so the homepage ships one alongside the visible FAQ.
 */
export function faqJsonLd(faqs: readonly FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripInlineLinks(
          faq.answerPoints
            ? `${faq.answer} ${faq.answerPoints.join(". ")}.`
            : faq.answer,
        ),
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function docsWebPageJsonLd(options: {
  language: SiteLanguage;
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: absoluteUrl(options.path),
    name: options.name,
    description: options.description,
    inLanguage: languageToLocale(options.language),
    isPartOf: { "@id": `${SITE_URL}${homePath(options.language)}#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    author: { "@id": PERSON_AUTHOR_ID },
    datePublished: SITE_PUBLISHED,
    dateModified: SITE_UPDATED,
  };
}

/**
 * Per-document SEO for `/docs/{id}` and `/en/docs/{id}`. Each document gets
 * its own title, description, canonical URL, hreflang alternates, breadcrumb,
 * and WebPage structured data — one indexable page per help topic.
 */
export function docsPageSeo(
  doc: DocDefinition,
  language: SiteLanguage,
): RouteHead {
  const english = language === "en";
  const title = english
    ? doc.id === "guide"
      ? "DiceFrame Documentation — User guide"
      : `${doc.title[language]} · DiceFrame Documentation`
    : doc.id === "guide"
      ? "DiceFrame 文档 — 用户手册与开团指南"
      : `${doc.title[language]} · DiceFrame 文档`;
  const description = english
    ? `${doc.title[language]} — ${doc.description[language]}. DiceFrame AI TRPG platform documentation, synced live from GitHub.`
    : `${doc.title[language]} — ${doc.description[language]}。DiceFrame AI 跑团（TRPG）平台使用文档，实时同步自 GitHub。`;
  const path = docsPath(language, doc.id);

  return pageSeo({
    title,
    description,
    path,
    language,
    alternates: { zh: docsPath("zh", doc.id), en: docsPath("en", doc.id) },
    jsonLd: [
      breadcrumbJsonLd([
        { name: "DiceFrame", path: english ? "/en" : "/" },
        {
          name: english ? "Documentation" : "技术帮助",
          path: docsPath(language, doc.id),
        },
      ]),
      docsWebPageJsonLd({
        language,
        name: `${doc.title[language]} · DiceFrame`,
        description: doc.description[language],
        path,
      }),
    ],
  });
}

/**
 * SEO for the on-site trust pages (/about, /contact, /privacy, /terms and
 * their /en counterparts). Each is a plain WebPage (AboutPage / ContactPage
 * where schema.org has a dedicated type) authored by the Person entry.
 */
export function infoPageSeo(id: InfoPageId, language: SiteLanguage): RouteHead {
  const page = infoContent[language][id];
  const path = infoPath(language, id);
  const type = id === "about" ? "AboutPage" : id === "contact" ? "ContactPage" : "WebPage";

  return pageSeo({
    title: page.title,
    description: page.description,
    path,
    language,
    alternates: { zh: infoPath("zh", id), en: infoPath("en", id) },
    jsonLd: [
      breadcrumbJsonLd([
        { name: "DiceFrame", path: homePath(language) },
        { name: page.heading, path },
      ]),
      {
        "@context": "https://schema.org",
        "@type": type,
        url: absoluteUrl(path),
        name: page.title,
        description: page.description,
        inLanguage: languageToLocale(language),
        isPartOf: { "@id": `${SITE_URL}${homePath(language)}#website` },
        publisher: { "@id": ORGANIZATION_ID },
        author: { "@id": PERSON_AUTHOR_ID },
        datePublished: SITE_PUBLISHED,
        dateModified: SITE_UPDATED,
      },
      ...(id === "about" ? [personAuthorJsonLd(), organizationJsonLd()] : []),
    ],
  });
}

