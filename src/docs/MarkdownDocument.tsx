import { Fragment, type ReactNode } from "react";
import type { MarkdownModel } from "./markdownOutline";
import { documents } from "./documents";
import { blobRoot, rawRoot } from "./github";

type DocPath = string;

function normalizeRelativePath(path: string, currentPath: DocPath): string {
  const base = currentPath.includes("/")
    ? currentPath.slice(0, currentPath.lastIndexOf("/") + 1)
    : "";
  const parts = `${base}${path}`.split("/");
  const resolved: string[] = [];
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") resolved.pop();
    else resolved.push(part);
  }
  return resolved.join("/");
}

function resolveAsset(
  path: string,
  currentPath: DocPath,
  repo: string,
): string {
  if (/^(https?:|mailto:|#)/i.test(path)) return path;
  return `${rawRoot(repo)}/${normalizeRelativePath(path, currentPath)}`;
}

/**
 * Repo-relative doc links become in-site `/docs/{id}` links (or the GitHub
 * blob URL when the target is not a catalogued document).
 */
function resolveLink(
  path: string,
  currentPath: DocPath,
  repo: string,
): string {
  if (/^(https?:|mailto:|#)/i.test(path)) return path;
  const cleanPath = path.split("#")[0];
  const known = documents.find(
    (entry) =>
      entry.zh.endsWith(cleanPath) ||
      entry.en.endsWith(cleanPath) ||
      entry.zh.endsWith(`/${cleanPath}`) ||
      entry.en.endsWith(`/${cleanPath}`),
  );
  if (known) {
    const lang = known.en.endsWith(cleanPath) ? "en" : "zh";
    return lang === "en" ? `/en/docs/${known.id}` : `/docs/${known.id}`;
  }
  return `${blobRoot(repo)}/${normalizeRelativePath(path, currentPath)}`;
}

function InlineMarkdown({
  text,
  currentPath,
  repo,
}: {
  text: string;
  currentPath: DocPath;
  repo: string;
}) {
  const tokenPattern =
    /(\[!\[[^\]]*\]\([^)]+\)\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenPattern).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={index}>{part.slice(1, -1)}</code>;
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        const linkedImage = part.match(
          /^\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)$/,
        );
        if (linkedImage) {
          const href = resolveLink(linkedImage[3], currentPath, repo);
          const external = href.startsWith("http");
          return (
            <a
              className="md-image-link"
              href={href}
              key={index}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
            >
              <img
                src={resolveAsset(linkedImage[2], currentPath, repo)}
                alt={linkedImage[1]}
                loading="lazy"
              />
            </a>
          );
        }
        const image = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (image) {
          return (
            // GitHub 文档中的图片地址在运行时才能确定。
            <img
              key={index}
              src={resolveAsset(image[2], currentPath, repo)}
              alt={image[1]}
              loading="lazy"
            />
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const href = resolveLink(link[2], currentPath, repo);
          const external = href.startsWith("http");
          return (
            <a
              key={index}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
            >
              {link[1]}
            </a>
          );
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}

function isTableDivider(line: string): boolean {
  return /^\s*\|?[\s:|-]+\|[\s:|-]*\|?\s*$/.test(line);
}

function tableCells(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

export function MarkdownDocument({
  model,
  currentPath,
  repo,
}: {
  model: MarkdownModel;
  currentPath: DocPath;
  repo: string;
}) {
  const nodes: ReactNode[] = [];
  const lines = model.lines;
  const headingIds = new Map(
    model.headings.map((heading) => [heading.lineIndex, heading.id]),
  );
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      nodes.push(
        <div className="md-code" key={`code-${index}`}>
          {language && <span>{language}</span>}
          <pre>
            <code>{code.join("\n")}</code>
          </pre>
        </div>,
      );
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
      nodes.push(
        <Tag id={headingIds.get(index)} key={`heading-${index}`}>
          <InlineMarkdown
            text={heading[2]}
            currentPath={currentPath}
            repo={repo}
          />
        </Tag>,
      );
      index += 1;
      continue;
    }

    if (
      index + 1 < lines.length &&
      line.includes("|") &&
      isTableDivider(lines[index + 1])
    ) {
      const header = tableCells(line);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && lines[index].includes("|")) {
        rows.push(tableCells(lines[index]));
        index += 1;
      }
      nodes.push(
        <div className="md-table-wrap" key={`table-${index}`}>
          <table>
            <thead>
              <tr>
                {header.map((cell, cellIndex) => (
                  <th key={cellIndex}>
                    <InlineMarkdown
                      text={cell}
                      currentPath={currentPath}
                      repo={repo}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <InlineMarkdown
                        text={cell}
                        currentPath={currentPath}
                        repo={repo}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (/^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line)) {
      const ordered = /^\d+\.\s+/.test(line);
      const items: string[] = [];
      const pattern = ordered ? /^\d+\.\s+(.+)$/ : /^[-*]\s+(.+)$/;
      while (index < lines.length) {
        const match = lines[index].match(pattern);
        if (!match) break;
        items.push(match[1]);
        index += 1;
      }
      const List = ordered ? "ol" : "ul";
      nodes.push(
        <List key={`list-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>
              <InlineMarkdown
                text={item}
                currentPath={currentPath}
                repo={repo}
              />
            </li>
          ))}
        </List>,
      );
      continue;
    }

    if (line.startsWith("> ")) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].startsWith("> ")) {
        quote.push(lines[index].slice(2));
        index += 1;
      }
      nodes.push(
        <blockquote key={`quote-${index}`}>
          <InlineMarkdown
            text={quote.join(" ")}
            currentPath={currentPath}
            repo={repo}
          />
        </blockquote>,
      );
      continue;
    }

    if (/^---+$/.test(line.trim())) {
      nodes.push(<hr key={`hr-${index}`} />);
      index += 1;
      continue;
    }

    const paragraph = [line.trim()];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,4})\s+/.test(lines[index]) &&
      !lines[index].startsWith("```") &&
      !/^[-*]\s+/.test(lines[index]) &&
      !/^\d+\.\s+/.test(lines[index]) &&
      !lines[index].startsWith("> ") &&
      !(
        index + 1 < lines.length &&
        lines[index].includes("|") &&
        isTableDivider(lines[index + 1])
      )
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    nodes.push(
      <p key={`paragraph-${index}`}>
        <InlineMarkdown
          text={paragraph.join(" ")}
          currentPath={currentPath}
          repo={repo}
        />
      </p>,
    );
  }

  return <article className="markdown-body">{nodes}</article>;
}
