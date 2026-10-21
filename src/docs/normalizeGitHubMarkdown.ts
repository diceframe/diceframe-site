function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'");
}

function attributeValue(tag: string, name: string): string {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"),
  );
  return decodeHtmlEntities(match?.[1] ?? match?.[2] ?? "");
}

function markdownText(value: string): string {
  return decodeHtmlEntities(value.replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

function markdownDestination(value: string): string {
  return value.trim().replace(/\s/g, "%20");
}

function imageMarkdown(tag: string): string {
  const source = attributeValue(tag, "src");
  if (!source) return "";
  const alt = attributeValue(tag, "alt").replace(/[[\]]/g, "");
  return `![${alt}](${markdownDestination(source)})`;
}

function convertHtmlInline(html: string): string {
  return html
    .replace(/\r?\n/g, " ")
    .replace(
      /(<a\b[^>]*>)\s*(<img\b[^>]*\/?>)\s*<\/a>/gi,
      (_, anchorTag: string, imageTag: string) => {
        const href = attributeValue(anchorTag, "href");
        const image = imageMarkdown(imageTag);
        return href && image
          ? `[${image}](${markdownDestination(href)})`
          : image;
      },
    )
    .replace(/<img\b[^>]*\/?>/gi, (tag) => imageMarkdown(tag))
    .replace(
      /(<a\b[^>]*>)([\s\S]*?)<\/a>/gi,
      (_, anchorTag: string, label: string) => {
        const href = attributeValue(anchorTag, "href");
        const text = markdownText(label);
        return href && text
          ? `[${text}](${markdownDestination(href)})`
          : text;
      },
    )
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\s*\n\s*/g, "\n")
    .trim();
}

/**
 * GitHub README files sometimes ship HTML headings and paragraphs instead of
 * Markdown. Fold that HTML back into Markdown so the lightweight renderer and
 * the outline builder see one consistent format.
 */
export function normalizeGitHubMarkdown(markdown: string): string {
  return markdown
    .replace(
      /<h([1-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi,
      (_, level: string, content: string) => {
        const heading = convertHtmlInline(content).replace(/\n+/g, " ");
        return heading ? `\n${"#".repeat(Number(level))} ${heading}\n` : "\n";
      },
    )
    .replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_, content: string) => {
      const paragraph = convertHtmlInline(content);
      return paragraph ? `\n${paragraph}\n` : "\n";
    });
}
