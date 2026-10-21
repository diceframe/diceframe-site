import { useEffect, useState } from "react";

type SuggestedLanguage = "zh" | "en";

export function LanguageSwitch({
  href,
  hrefLang,
  label,
  ariaLabel,
  className,
}: {
  href: string;
  hrefLang: string;
  label: string;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={href}
      hrefLang={hrefLang}
      aria-label={ariaLabel}
      onClick={() =>
        window.localStorage.setItem("diceframe-language-choice", "set")
      }
    >
      {label}
    </a>
  );
}

export function LanguageSuggestion({
  currentLanguage,
}: {
  currentLanguage: SuggestedLanguage;
}) {
  const [suggestedLanguage, setSuggestedLanguage] =
    useState<SuggestedLanguage | null>(null);

  useEffect(() => {
    if (window.localStorage.getItem("diceframe-language-choice")) return;

    const browserLanguage = navigator.language.toLowerCase();
    const preferredLanguage = browserLanguage.startsWith("zh") ? "zh" : "en";
    if (preferredLanguage !== currentLanguage) {
      const timer = window.setTimeout(
        () => setSuggestedLanguage(preferredLanguage),
        0,
      );
      return () => window.clearTimeout(timer);
    }
  }, [currentLanguage]);

  function rememberChoice() {
    window.localStorage.setItem("diceframe-language-choice", "set");
  }

  if (!suggestedLanguage) return null;

  const isEnglishSuggestion = suggestedLanguage === "en";

  return (
    <aside className="language-suggestion" aria-live="polite">
      <span>
        {isEnglishSuggestion
          ? "English version available."
          : "检测到中文浏览器，可切换到中文版。"}
      </span>
      <a
        href={isEnglishSuggestion ? "/en" : "/"}
        hrefLang={isEnglishSuggestion ? "en" : "zh-CN"}
        onClick={rememberChoice}
      >
        {isEnglishSuggestion ? "View in English" : "查看中文版"}
      </a>
      <button
        type="button"
        onClick={() => {
          rememberChoice();
          setSuggestedLanguage(null);
        }}
        aria-label={isEnglishSuggestion ? "Dismiss" : "关闭"}
      >
        ×
      </button>
    </aside>
  );
}
