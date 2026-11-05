/**
 * Minimal inline-link markup for homepage copy: `[label](https://…)`.
 *
 * Copy strings stay plain text so they are easy to edit, while named sources
 * (rulesets, licenses, third-party tools) can carry an outbound citation link.
 * Only absolute http(s) URLs are recognised; anything else stays literal text.
 */
const INLINE_LINK = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;

export type InlineSegment =
  | { kind: "text"; text: string }
  | { kind: "link"; text: string; href: string };

export function parseInlineLinks(source: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  let cursor = 0;
  for (const match of source.matchAll(INLINE_LINK)) {
    const start = match.index ?? 0;
    if (start > cursor) {
      segments.push({ kind: "text", text: source.slice(cursor, start) });
    }
    segments.push({ kind: "link", text: match[1], href: match[2] });
    cursor = start + match[0].length;
  }
  if (cursor < source.length) {
    segments.push({ kind: "text", text: source.slice(cursor) });
  }
  return segments;
}

/** The same copy with link markup removed — for meta tags and JSON-LD. */
export function stripInlineLinks(source: string): string {
  return source.replace(INLINE_LINK, "$1");
}
