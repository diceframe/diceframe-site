"use client";

import {
  Fragment,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { normalizeGitHubMarkdown } from "./normalizeGitHubMarkdown";

const OWNER = "diceframe";
const BRANCH = "main";

function rawRoot(repo: string) {
  return `https://raw.githubusercontent.com/${OWNER}/${repo}/${BRANCH}`;
}

function blobRoot(repo: string) {
  return `https://github.com/${OWNER}/${repo}/blob/${BRANCH}`;
}

type DocDefinition = {
  id: string;
  zh: string;
  en: string;
  title: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  group: "use" | "deploy" | "extend" | "maintain";
  repo: string;
};

const docs: DocDefinition[] = [
  {
    id: "guide",
    zh: "docs/zh/guide.md",
    en: "docs/en/guide.md",
    title: { zh: "用户手册", en: "User guide" },
    description: {
      zh: "开第一局、多人玩法、掷骰、状态与群聊 Bot",
      en: "First session, multiplayer, dice, state, and chat bots",
    },
    group: "use",
    repo: "diceframe-content",
  },
  {
    id: "docker",
    zh: "docs/zh/deploy.md",
    en: "docs/en/deploy.md",
    title: { zh: "Docker 部署", en: "Docker deployment" },
    description: {
      zh: "Docker、Linux 与本地启动方式",
      en: "Docker, Linux, and local launch options",
    },
    group: "deploy",
    repo: "diceframe-content",
  },
  {
    id: "updater",
    zh: "docs/zh/updates.md",
    en: "docs/en/updates.md",
    title: { zh: "应用更新", en: "Application updates" },
    description: {
      zh: "主程序与插件的更新流程",
      en: "Updating DiceFrame and its plugins",
    },
    group: "deploy",
    repo: "diceframe",
  },
  {
    id: "plugin-dev",
    zh: "docs/zh/plugin-development.md",
    en: "docs/en/plugin-development.md",
    title: { zh: "插件开发", en: "Plugin development" },
    description: {
      zh: "插件结构、能力、打包与本地测试",
      en: "Plugin structure, capabilities, packaging, and local testing",
    },
    group: "extend",
    repo: "diceframe",
  },
  {
    id: "plugin-registry",
    zh: "docs/zh/plugin-registry.md",
    en: "docs/en/plugin-registry.md",
    title: { zh: "插件索引与审核", en: "Plugin registry and review" },
    description: {
      zh: "插件中心投稿、审核与安全边界",
      en: "Registry submissions, review, and security boundaries",
    },
    group: "extend",
    repo: "diceframe",
  },
];

type Language = "zh" | "en";

function normalizeRelativePath(path: string, currentPath: string) {
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

function resolveAsset(path: string, currentPath: string, repo: string) {
  if (/^(https?:|mailto:|#)/i.test(path)) return path;
  return `${rawRoot(repo)}/${normalizeRelativePath(path, currentPath)}`;
}

function resolveLink(path: string, currentPath: string, repo: string) {
  if (/^(https?:|mailto:|#)/i.test(path)) return path;
  const cleanPath = path.split("#")[0];
  const known = docs.find(
    (entry) =>
      entry.zh.endsWith(cleanPath) ||
      entry.en.endsWith(cleanPath) ||
      entry.zh.endsWith(`/${cleanPath}`) ||
      entry.en.endsWith(`/${cleanPath}`),
  );
  if (known) {
    const lang = known.en.endsWith(cleanPath) ? "en" : "zh";
    const basePath = lang === "en" ? "/en/docs" : "/docs";
    return `${basePath}?doc=${known.id}`;
  }
  return `${blobRoot(repo)}/${normalizeRelativePath(path, currentPath)}`;
}

function InlineMarkdown({
  text,
  currentPath,
  repo,
}: {
  text: string;
  currentPath: string;
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
            // eslint-disable-next-line @next/next/no-img-element
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

function isTableDivider(line: string) {
  return /^\s*\|?[\s:|-]+\|[\s:|-]*\|?\s*$/.test(line);
}

function tableCells(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function MarkdownDocument({
  markdown,
  currentPath,
  repo,
}: {
  markdown: string;
  currentPath: string;
  repo: string;
}) {
  const nodes: ReactNode[] = [];
  const lines = normalizeGitHubMarkdown(markdown)
    .replace(/\r\n/g, "\n")
    .split("\n");
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
      const id = heading[2]
        .replace(/[*`]/g, "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
      nodes.push(
        <Tag id={id} key={`heading-${index}`}>
          <InlineMarkdown text={heading[2]} currentPath={currentPath} repo={repo} />
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
                    <InlineMarkdown text={cell} currentPath={currentPath} repo={repo} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <InlineMarkdown text={cell} currentPath={currentPath} repo={repo} />
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
              <InlineMarkdown text={item} currentPath={currentPath} repo={repo} />
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
        />
      </p>,
    );
  }

  return <article className="markdown-body">{nodes}</article>;
}

const interfaceCopy = {
  zh: {
    languageLabel: "文档语言",
    groups: {
      use: "使用",
      deploy: "部署",
      extend: "扩展",
      maintain: "维护",
    },
    original: "GitHub 原文 ↗",
    sourceStatus: "文档来源",
    loading: "正在读取文档…",
    errorTitle: "文档读取失败",
    error:
      "暂时无法读取文档。你仍然可以打开 GitHub 原文继续查看。",
    openOriginal: "打开 GitHub 原文 ↗",
  },
  en: {
    languageLabel: "Documentation language",
    groups: {
      use: "Use",
      deploy: "Deployment",
      extend: "Extensions",
      maintain: "Maintenance",
    },
    original: "View on GitHub ↗",
    sourceStatus: "Documentation source",
    loading: "Loading documentation…",
    errorTitle: "Unable to load documentation",
    error:
      "The documentation is temporarily unavailable. You can still read the source on GitHub.",
    openOriginal: "Open on GitHub ↗",
  },
} as const;

export function DocsExplorer({
  initialLanguage,
}: {
  initialLanguage?: Language;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requested = searchParams.get("doc");
  const language: Language =
    initialLanguage ?? (searchParams.get("lang") === "en" ? "en" : "zh");
  const copy = interfaceCopy[language];
  const selectedDoc =
    docs.find(
      (entry) =>
        entry.id === requested ||
        entry.zh.endsWith(requested ?? "__missing__") ||
        entry.en.endsWith(requested ?? "__missing__"),
    ) ?? docs[0];
  const [documentState, setDocumentState] = useState({
    path: "",
    markdown: "",
    error: "",
  });

  const currentPath =
    language === "zh" ? selectedDoc.zh : selectedDoc.en;
  const repo = selectedDoc.repo;
  const sourceUrl = `${blobRoot(repo)}/${currentPath}`;
  const loading = documentState.path !== currentPath;
  const markdown = loading ? "" : documentState.markdown;
  const error = loading ? "" : documentState.error;

  useEffect(() => {
    let active = true;

    fetch(`${rawRoot(repo)}/${currentPath}`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`GitHub returned ${response.status}`);
        }
        return response.text();
      })
      .then((content) => {
        if (active) {
          setDocumentState({
            path: currentPath,
            markdown: content,
            error: "",
          });
        }
      })
      .catch(() => {
        if (active) {
          setDocumentState({
            path: currentPath,
            markdown: "",
            error: copy.error,
          });
        }
      });

    return () => {
      active = false;
    };
  }, [copy.error, currentPath, repo]);

  function selectDoc(doc: DocDefinition) {
    const basePath = language === "en" ? "/en/docs" : "/docs";
    router.replace(`${basePath}?doc=${doc.id}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectLanguage(nextLanguage: Language) {
    const basePath = nextLanguage === "en" ? "/en/docs" : "/docs";
    router.push(`${basePath}?doc=${selectedDoc.id}`, {
      scroll: false,
    });
  }

  const groups = ["use", "deploy", "extend"] as const;

  return (
    <section className="docs-workspace">
      <div className="page-shell docs-layout">
        <aside className="docs-sidebar">
          <div className="docs-language" aria-label={copy.languageLabel}>
            <button
              type="button"
              className={language === "zh" ? "active" : ""}
              onClick={() => selectLanguage("zh")}
            >
              中文
            </button>
            <button
              type="button"
              className={language === "en" ? "active" : ""}
              onClick={() => selectLanguage("en")}
            >
              English
            </button>
          </div>
          {groups.map((group) => (
            <div className="docs-group" key={group}>
              <span>{copy.groups[group]}</span>
              {docs
                .filter((doc) => doc.group === group)
                .map((doc) => (
                  <button
                    type="button"
                    key={doc.id}
                    className={selectedDoc.id === doc.id ? "active" : ""}
                    onClick={() => selectDoc(doc)}
                  >
                    <strong>{doc.title[language]}</strong>
                    <small>{doc.description[language]}</small>
                  </button>
                ))}
            </div>
          ))}
        </aside>

        <div className="docs-content">
          <header className="docs-content-head">
            <div>
              <span className="docs-breadcrumb">
                docs / {currentPath.split("/").at(-1)}
              </span>
              <h2>{selectedDoc.title[language]}</h2>
              <p>{selectedDoc.description[language]}</p>
            </div>
            <a href={sourceUrl} target="_blank" rel="noreferrer">
              {copy.original}
            </a>
          </header>

          <div className="source-notice">
            <span>
              <i /> {copy.sourceStatus}
            </span>
            <code>{OWNER}/{repo}@{BRANCH}</code>
          </div>

          {loading && (
            <div className="docs-loading" role="status">
              <i />
              <strong>{copy.loading}</strong>
            </div>
          )}

          {error && (
            <div className="docs-error" role="alert">
              <strong>{copy.errorTitle}</strong>
              <p>{error}</p>
              <a href={sourceUrl} target="_blank" rel="noreferrer">
                {copy.openOriginal}
              </a>
            </div>
          )}

          {!loading && !error && (
            <MarkdownDocument
              markdown={markdown}
              currentPath={currentPath}
            />
          )}
        </div>
      </div>
    </section>
  );
}
