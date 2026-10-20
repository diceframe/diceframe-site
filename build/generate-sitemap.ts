/**
 * Generates public/sitemap.xml from the documentation catalog so new help
 * pages enter the sitemap automatically. Run by the `prebuild` npm script.
 *
 * The catalog is plain type-erased TypeScript, imported directly with
 * `node --experimental-strip-types` (Node >= 22.6).
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { documents } from "../src/docs/documents.ts";

const HOST = "https://diceframe.com";

interface PageAlternates {
  zh: string;
  en: string;
}

const pages: PageAlternates[] = [
  { zh: "/", en: "/en" },
  ...documents.map((doc) => ({
    zh: `/docs/${doc.id}`,
    en: `/en/docs/${doc.id}`,
  })),
];

function urlEntry(loc: string, alternates: PageAlternates): string {
  const entries = [
    { hreflang: "zh-CN", href: `${HOST}${alternates.zh}` },
    { hreflang: "en", href: `${HOST}${alternates.en}` },
    { hreflang: "x-default", href: `${HOST}${alternates.zh}` },
  ];
  const links = entries
    .map(
      (entry) =>
        `    <xhtml:link rel="alternate" hreflang="${entry.hreflang}" href="${entry.href}" />`,
    )
    .join("\n");
  return `  <url>
    <loc>${HOST}${loc}</loc>
${links}
  </url>`;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${pages.map((page) => `${urlEntry(page.zh, page)}\n${urlEntry(page.en, page)}`).join("\n")}
</urlset>
`;

const target = fileURLToPath(new URL("../public/sitemap.xml", import.meta.url));
writeFileSync(target, xml, "utf8");
console.log(
  `sitemap: wrote ${pages.length * 2} URLs (${documents.length} docs x 2 locales + 2 homepages)`,
);
