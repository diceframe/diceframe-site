function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'");
}

function attributeValue(tag, name) {
  const match = tag.match(
    new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i"),
  );
  return decodeHtmlEntities(match?.[1] ?? match?.[2] ?? "");
}

function markdownText(value) {
  return decodeHtmlEntities(value.replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

function markdownDestination(value) {
  return value.trim().replace(/\s/g, "%20");
}

function imageMarkdown(tag) {
  const source = attributeValue(tag, "src");
  if (!source) return "";
  const alt = attributeValue(tag, "alt").replace(/[[\]]/g, "");
  return `![${alt}](${markdownDestination(source)})`;
}

function convertHtmlInline(html) {
  return html
    .replace(/\r?\n/g, " ")
    .replace(
      /(<a\b[^>]*>)\s*(<img\b[^>]*\/?>)\s*<\/a>/gi,
      (_, anchorTag, imageTag) => {
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
      (_, anchorTag, label) => {
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

export function normalizeGitHubMarkdown(markdown) {
  return markdown
    .replace(
      /<h([1-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi,
      (_, level, content) => {
        const heading = convertHtmlInline(content).replace(/\n+/g, " ");
        return heading ? `\n${"#".repeat(Number(level))} ${heading}\n` : "\n";
      },
    )
    .replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, (_, content) => {
      const paragraph = convertHtmlInline(content);
      return paragraph ? `\n${paragraph}\n` : "\n";
    });
}
