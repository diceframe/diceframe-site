import {
  AUTHOR_NAME,
  GITHUB_REPO_URL,
  GITHUB_RELEASES_URL,
  SITE_UPDATED,
  infoPath,
} from "~/config/site";
import { LanguageSwitch } from "./LanguageSuggestion";

type SiteLanguage = "zh" | "en";

const chromeCopy = {
  zh: {
    homeLabel: "DiceFrame 首页",
    navLabel: "主导航",
    features: "能力",
    start: "快速开始",
    docs: "技术帮助",
    download: "获取 DiceFrame",
    menu: "打开导航菜单",
    product: "产品",
    community: "社区",
    legal: "信息",
    core: "核心能力",
    about: "关于项目",
    contact: "联系我们",
    privacy: "隐私政策",
    terms: "服务条款",
    updated: "最后更新",
    footer:
      "开源自托管的 AI 跑团（TRPG）平台，让规则、角色与想象持续生长。",
  },
  en: {
    homeLabel: "DiceFrame home",
    navLabel: "Main navigation",
    features: "Features",
    start: "Get started",
    docs: "Documentation",
    download: "Get DiceFrame",
    menu: "Open navigation menu",
    product: "Product",
    community: "Community",
    legal: "Legal",
    core: "Core features",
    about: "About",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms",
    updated: "Last updated",
    footer:
      "An open-source, self-hosted AI TRPG platform where rules, characters, and imagination keep growing.",
  },
} as const;

export function SiteHeader({
  language = "zh",
  languageHref: languageHrefOverride,
}: {
  language?: SiteLanguage;
  languageHref?: string;
}) {
  const copy = chromeCopy[language];
  const homeHref = language === "en" ? "/en" : "/";
  const docsHref = language === "en" ? "/en/docs/guide" : "/docs/guide";
  const languageHref =
    languageHrefOverride ?? (language === "en" ? "/" : "/en");
  const languageLabel = language === "en" ? "中文" : "EN";

  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <a className="brand" href={homeHref} aria-label={copy.homeLabel}>
          {/* Decorative next to the visible "DiceFrame" name: hidden from
              assistive tech, but still carries alt text for crawlers. */}
          <img
            src="/diceframe-logo.svg"
            alt="DiceFrame"
            aria-hidden="true"
            width={42}
            height={42}
            decoding="async"
          />
          <span>
            <strong>DiceFrame</strong>
            <small>OPEN-SOURCE AI TRPG</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label={copy.navLabel}>
          <a href={`${homeHref}#features`}>{copy.features}</a>
          <a href={`${homeHref}#start`}>{copy.start}</a>
          <a href={docsHref}>{copy.docs}</a>
          <a href={infoPath(language, "about")}>{copy.about}</a>
          <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>

        <div className="header-actions">
          <LanguageSwitch
            className="language-switch"
            href={languageHref}
            hrefLang={language === "en" ? "zh-CN" : "en"}
            ariaLabel={language === "en" ? "切换到中文" : "Switch to English"}
            label={languageLabel}
          />
          <a
            className="header-download"
            href={GITHUB_RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.download}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <details className="mobile-menu">
          <summary aria-label={copy.menu}>
            <i />
            <i />
          </summary>
          <nav aria-label={copy.navLabel}>
            <a href={`${homeHref}#features`}>{copy.features}</a>
            <a href={`${homeHref}#start`}>{copy.start}</a>
            <a href={docsHref}>{copy.docs}</a>
            <a href={infoPath(language, "about")}>{copy.about}</a>
            <LanguageSwitch
              href={languageHref}
              hrefLang={language === "en" ? "zh-CN" : "en"}
              ariaLabel={language === "en" ? "切换到中文" : "Switch to English"}
              label={language === "en" ? "中文" : "English"}
            />
            <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter({ language = "zh" }: { language?: SiteLanguage }) {
  const copy = chromeCopy[language];
  const homeHref = language === "en" ? "/en" : "/";
  const docsHref = language === "en" ? "/en/docs/guide" : "/docs/guide";

  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div className="footer-brand">
          <a className="brand" href={homeHref}>
            <img
              src="/diceframe-logo.svg"
              alt="DiceFrame"
              aria-hidden="true"
              width={38}
              height={38}
              loading="lazy"
              decoding="async"
            />
            <span>
              <strong>DiceFrame</strong>
              <small>OPEN-SOURCE AI TRPG</small>
            </span>
          </a>
          <p>{copy.footer}</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>{copy.product}</strong>
            <a href={`${homeHref}#features`}>{copy.core}</a>
            <a href={`${homeHref}#start`}>{copy.start}</a>
            <a href={docsHref}>{copy.docs}</a>
          </div>
          <div>
            <strong>{copy.community}</strong>
            <a href={infoPath(language, "about")}>{copy.about}</a>
            <a href={GITHUB_REPO_URL} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href={infoPath(language, "contact")}>{copy.contact}</a>
          </div>
          <div>
            <strong>{copy.legal}</strong>
            <a href={infoPath(language, "privacy")}>{copy.privacy}</a>
            <a href={infoPath(language, "terms")}>{copy.terms}</a>
          </div>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>
          © {new Date().getFullYear()}{" "}
          <a rel="author" href={infoPath(language, "about")}>
            {AUTHOR_NAME}
          </a>
          {" · "}
          {copy.updated} <time dateTime={SITE_UPDATED}>{SITE_UPDATED}</time>
        </span>
        <span>AGPL-3.0 · Open source, self-hosted, community driven.</span>
      </div>
    </footer>
  );
}
