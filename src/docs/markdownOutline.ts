import { normalizeGitHubMarkdown } from "./normalizeGitHubMarkdown";

function plainHeadingText(value: string): string {
  return value
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~`]/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function headingSlug(value: string): string {
  const slug = plainHeadingText(value)
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return slug || "section";
}

export interface HeadingEntry {
  lineIndex: number;
  level: number;
  title: string;
  id: string;
}

export interface MarkdownModel {
  lines: string[];
  headings: HeadingEntry[];
}

/**
 * Normalize one document once, then give the renderer and page outline the
 * same stable, duplicate-safe heading IDs.
 */
export function createMarkdownModel(markdown: string): MarkdownModel {
  const lines = normalizeGitHubMarkdown(markdown)
    .replace(/\r\n/g, "\n")
    .split("\n");
  const counts = new Map<string, number>();
  const headings: HeadingEntry[] = [];
  let inFence = false;

  lines.forEach((line, lineIndex) => {
    if (line.startsWith("```")) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;

    const match = line.match(/^(#{1,4})\s+(.+)$/);
    if (!match) return;

    const title = plainHeadingText(match[2]);
    const baseId = headingSlug(title);
    const occurrence = (counts.get(baseId) ?? 0) + 1;
    counts.set(baseId, occurrence);
    headings.push({
      lineIndex,
      level: match[1].length,
      title,
      id: occurrence === 1 ? baseId : `${baseId}-${occurrence}`,
    });
  });

  return { lines, headings };
}
