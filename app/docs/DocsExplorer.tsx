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
const REPO = "diceframe";
const BRANCH = "main";
const RAW_ROOT = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}`;
const BLOB_ROOT = `https://github.com/${OWNER}/${REPO}/blob/${BRANCH}`;

type DocDefinition = {
  id: string;
  zh: string;
  en: string;
  title: string;
  description: string;
  group: "使用" | "部署" | "扩展" | "维护";
};

const docs: DocDefinition[] = [
  {
    id: "guide",
    zh: "docs/USER_GUIDE_CN.md",
    en: "docs/USER_GUIDE_EN.md",
    title: "用户手册",
    description: "开第一局、多人玩法、掷骰、状态与群聊 Bot",
    group: "使用",
  },
  {
    id: "readme",
    zh: "README.md",
    en: "README_EN.md",
    title: "项目总览",
    description: "功能概览、快速开始、数据与项目结构",
    group: "使用",
  },
  {
    id: "docker",
    zh: "docs/DOCKER_DEPLOY_CN.md",
    en: "docs/DOCKER_DEPLOY_EN.md",
    title: "Docker 部署",
    description: "Docker、Compose、NAS 与数据挂载",
    group: "部署",
  },
  {
    id: "updater",
    zh: "docs/UPDATER_CN.md",
    en: "docs/UPDATER_EN.md",
    title: "应用更新",
    description: "便携版、源码与 Docker 的安全升级流程",
    group: "部署",
  },
  {
    id: "plugin-dev",
    zh: "docs/PLUGIN_DEVELOPMENT_CN.md",
    en: "docs/PLUGIN_DEVELOPMENT_EN.md",
    title: "插件开发",
    description: "插件结构、能力、打包与本地测试",
    group: "扩展",
  },
  {
    id: "plugin-registry",
    zh: "docs/PLUGIN_REGISTRY_CN.md",
    en: "docs/PLUGIN_REGISTRY_EN.md",
    title: "插件索引与审核",
    description: "插件中心投稿、审核与安全边界",
    group: "扩展",
  },
  {
    id: "bot-bridge",
    zh: "docs/BOT_BRIDGE_CORE_CN.md",
    en: "docs/BOT_BRIDGE_CORE_EN.md",
    title: "Bot Bridge 核心",
    description: "群聊适配器与 Web 服务之间的接口",
    group: "扩展",
  },
  {
    id: "release-notes",
    zh: "RELEASE_NOTES.md",
    en: "RELEASE_NOTES.md",
    title: "发布说明",
    description: "当前版本变化与历史发布记录",
    group: "维护",
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

function resolveAsset(path: string, currentPath: string) {
  if (/^(https?:|mailto:|#)/i.test(path)) return path;
  return `${RAW_ROOT}/${normalizeRelativePath(path, currentPath)}`;
}

function resolveLink(path: string, currentPath: string) {
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
    return `/docs?doc=${known.id}&lang=${lang}`;
  }
  return `${BLOB_ROOT}/${normalizeRelativePath(path, currentPath)}`;
}

function InlineMarkdown({
  text,
  currentPath,
}: {
  text: string;
  currentPath: string;
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
          const href = resolveLink(linkedImage[3], currentPath);
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
                src={resolveAsset(linkedImage[2], currentPath)}
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
              src={resolveAsset(image[2], currentPath)}
              alt={image[1]}
              loading="lazy"
            />
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const href = resolveLink(link[2], currentPath);
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
}: {
  markdown: string;
  currentPath: string;
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
          <InlineMarkdown text={heading[2]} currentPath={currentPath} />
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
                    <InlineMarkdown text={cell} currentPath={currentPath} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>
                      <InlineMarkdown text={cell} currentPath={currentPath} />
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
              <InlineMarkdown text={item} currentPath={currentPath} />
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

export function DocsExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requested = searchParams.get("doc");
  const language: Language = searchParams.get("lang") === "en" ? "en" : "zh";
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
  const sourceUrl = `${BLOB_ROOT}/${currentPath}`;
  const loading = documentState.path !== currentPath;
  const markdown = loading ? "" : documentState.markdown;
  const error = loading ? "" : documentState.error;

  useEffect(() => {
    let active = true;

    fetch(`${RAW_ROOT}/${currentPath}`, { cache: "no-store" })
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
            error: "暂时无法读取 GitHub 文档。你仍然可以打开原文继续查看。",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [currentPath]);

  function selectDoc(doc: DocDefinition) {
    router.replace(`/docs?doc=${doc.id}&lang=${language}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectLanguage(nextLanguage: Language) {
    router.replace(`/docs?doc=${selectedDoc.id}&lang=${nextLanguage}`, {
      scroll: false,
    });
  }

  const groups = ["使用", "部署", "扩展", "维护"] as const;

  return (
    <section className="docs-workspace">
      <div className="page-shell docs-layout">
        <aside className="docs-sidebar">
          <div className="docs-language" aria-label="文档语言">
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
              <span>{group}</span>
              {docs
                .filter((doc) => doc.group === group)
                .map((doc) => (
                  <button
                    type="button"
                    key={doc.id}
                    className={selectedDoc.id === doc.id ? "active" : ""}
                    onClick={() => selectDoc(doc)}
                  >
                    <strong>{doc.title}</strong>
                    <small>{doc.description}</small>
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
              <h2>{selectedDoc.title}</h2>
              <p>{selectedDoc.description}</p>
            </div>
            <a href={sourceUrl} target="_blank" rel="noreferrer">
              GitHub 原文 ↗
            </a>
          </header>

          <div className="source-notice">
            <span>
              <i /> 正在读取 GitHub
            </span>
            <code>{OWNER}/{REPO}@{BRANCH}</code>
          </div>

          {loading && (
            <div className="docs-loading" role="status">
              <i />
              <strong>正在从 GitHub 读取文档…</strong>
            </div>
          )}

          {error && (
            <div className="docs-error" role="alert">
              <strong>文档读取失败</strong>
              <p>{error}</p>
              <a href={sourceUrl} target="_blank" rel="noreferrer">
                打开 GitHub 原文 ↗
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
