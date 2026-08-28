import Image from "next/image";
import Link from "next/link";
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
    core: "核心能力",
    footer:
      "开源自托管的 AI 跑团（TRPG）平台，让规则、角色与想象持续生长。",
    group: "群聊 · 1060613588",
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
    core: "Core features",
    footer:
      "An open-source, self-hosted AI TRPG platform where rules, characters, and imagination keep growing.",
    group: "Community chat · 1060613588",
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
  const docsHref = language === "en" ? "/en/docs" : "/docs";
  const languageHref =
    languageHrefOverride ?? (language === "en" ? "/" : "/en");
  const languageLabel = language === "en" ? "中文" : "EN";

  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <Link className="brand" href={homeHref} aria-label={copy.homeLabel}>
          <Image
            src="/diceframe-logo.svg"
            alt=""
            width={42}
            height={42}
            priority
          />
          <span>
            <strong>DiceFrame</strong>
            <small>OPEN-SOURCE AI TRPG</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label={copy.navLabel}>
          <Link href={`${homeHref}#features`}>{copy.features}</Link>
          <Link href={`${homeHref}#start`}>{copy.start}</Link>
          <Link href={docsHref}>{copy.docs}</Link>
          <a
            href="https://github.com/diceframe/diceframe"
            target="_blank"
            rel="noreferrer"
          >
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
            href="https://github.com/diceframe/diceframe/releases/latest"
            target="_blank"
            rel="noreferrer"
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
            <Link href={`${homeHref}#features`}>{copy.features}</Link>
            <Link href={`${homeHref}#start`}>{copy.start}</Link>
            <Link href={docsHref}>{copy.docs}</Link>
            <LanguageSwitch
              href={languageHref}
              hrefLang={language === "en" ? "zh-CN" : "en"}
              ariaLabel={language === "en" ? "切换到中文" : "Switch to English"}
              label={language === "en" ? "中文" : "English"}
            />
            <a
              href="https://github.com/diceframe/diceframe"
              target="_blank"
              rel="noreferrer"
            >
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
  const docsHref = language === "en" ? "/en/docs" : "/docs";

  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div className="footer-brand">
          <Link className="brand" href={homeHref}>
            <Image
              src="/diceframe-logo.svg"
              alt=""
              width={38}
              height={38}
            />
            <span>
              <strong>DiceFrame</strong>
              <small>OPEN-SOURCE AI TRPG</small>
            </span>
          </Link>
          <p>{copy.footer}</p>
        </div>
        <div className="footer-links">
          <div>
            <strong>{copy.product}</strong>
            <Link href={`${homeHref}#features`}>{copy.core}</Link>
            <Link href={`${homeHref}#start`}>{copy.start}</Link>
            <Link href={docsHref}>{copy.docs}</Link>
          </div>
          <div>
            <strong>{copy.community}</strong>
            <a
              href="https://github.com/diceframe/diceframe"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://github.com/diceframe/diceframe/issues"
              target="_blank"
              rel="noreferrer"
            >
              Issues
            </a>
            <span>{copy.group}</span>
          </div>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>© {new Date().getFullYear()} DiceFrame Contributors</span>
        <span>AGPL-3.0 · Open source, self-hosted, community driven.</span>
      </div>
    </footer>
  );
}
