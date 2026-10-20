/**
 * Canonical site identity. Every absolute URL (canonicals, hreflang,
 * sitemap, JSON-LD, Open Graph) is derived from SITE_URL so the whole
 * site can be re-pointed at a new domain by changing this one value.
 * Override per environment with `VITE_SITE_URL` at build time.
 */
export const SITE_URL = (
  import.meta.env?.VITE_SITE_URL ?? "https://diceframe.com"
).replace(/\/$/, "");

export const SITE_HOST = "diceframe.com";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "/" : path}`;
}

/** Two-locale model shared by every page: Simplified Chinese + English. */
export type SiteLanguage = "zh" | "en";

export function languageToLocale(language: SiteLanguage): "zh-CN" | "en" {
  return language === "en" ? "en" : "zh-CN";
}

export function homePath(language: SiteLanguage): string {
  return language === "en" ? "/en" : "/";
}

export function docsPath(language: SiteLanguage, docId: string): string {
  return language === "en" ? `/en/docs/${docId}` : `/docs/${docId}`;
}

export const GITHUB_ORG = "https://github.com/diceframe";
export const GITHUB_REPO_URL = `${GITHUB_ORG}/diceframe`;
export const GITHUB_RELEASES_URL = `${GITHUB_REPO_URL}/releases/latest`;
export const GITHUB_CONTENT_REPO_URL = `${GITHUB_ORG}/diceframe-content`;
