import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { documents } from "../src/docs/documents.ts";

const CANNED_GUIDE_ZH = [
  "# 用户手册",
  "",
  "## 开始第一局",
  "",
  "下载后启动 DiceFrame，创建角色并邀请朋友。",
  "",
  "```bash",
  "docker run -d -p 9876:9876 ghcr.io/diceframe/diceframe:latest",
  "```",
  "",
  "## 多人与群聊",
  "",
  "分享邀请链接，或通过 QQ 群 1060613588 绑定对局。",
  "",
].join("\n");

const CANNED_GUIDE_EN = [
  "# User guide",
  "",
  "## Start your first session",
  "",
  "Launch DiceFrame, create a character, and invite your friends.",
  "",
  "## Multiplayer and chat",
  "",
  "Share an invite link, or bind the session to a QQ group chat.",
  "",
].join("\n");

/**
 * Serve canned GitHub Markdown for raw.githubusercontent.com so the docs SSR
 * tests are deterministic; everything else hits the real network (nothing
 * should).
 */
function installFetchMock() {
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (input, _init) => {
    const url = String(input instanceof Request ? input.url : input);
    if (url.startsWith("https://raw.githubusercontent.com/")) {
      const body = url.endsWith("/docs/zh/guide.md")
        ? CANNED_GUIDE_ZH
        : url.endsWith("/docs/en/guide.md")
          ? CANNED_GUIDE_EN
          : "";
      return new Response(body, {
        status: body ? 200 : 404,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }
    throw new Error(`unexpected external fetch in tests: ${url}`);
  };
  return () => {
    globalThis.fetch = realFetch;
  };
}

async function loadWorker() {
  const workerUrl = new URL(
    `../dist/server/index.js?test=${process.pid}-${Date.now()}`,
    import.meta.url,
  );
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

function workerEnv() {
  return [{}, { waitUntil() {}, passThroughOnException() {} }];
}

async function render(path) {
  const worker = await loadWorker();
  return worker.fetch(
    new Request(`https://diceframe.com${path}`, {
      headers: { accept: "text/html" },
    }),
    ...workerEnv(),
  );
}

function meta(html, pattern) {
  const match = html.match(pattern);
  assert.ok(match, `expected ${pattern} in html`);
  return match[1];
}

test("prerenders the Chinese homepage as static HTML", async () => {
  const html = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );

  assert.match(
    html,
    /<title>DiceFrame — 开源自托管 AI 跑团（TRPG）平台<\/title>/i,
  );
  assert.match(html, /<html lang="zh-CN">/);
  assert.match(html, /<span>和朋友一起，<\/span>/);
  assert.match(html, /<span>在 DiceFrame，<\/span>/);
  assert.match(html, /把故事/);
  assert.match(html, /<em>跑下去<\/em>/);
  assert.match(html, /一套 AI TRPG 引擎/);
  assert.doesNotMatch(html, /href="\/demo"/i);
  assert.equal(
    meta(html, /<link rel="canonical" href="([^"]*)"/),
    "https://diceframe.com/",
  );
  assert.match(
    html,
    /hrefLang="zh-CN" href="https:\/\/diceframe\.com\/"/i,
  );
  assert.match(html, /hrefLang="en" href="https:\/\/diceframe\.com\/en"/i);
  assert.match(
    html,
    /<meta name="msvalidate\.01" content="D836E0E0DD0B81055E1D84C58E0C9A93"/i,
  );
  assert.match(html, /diceframe-app\.jpg/);
  // Structured data: WebSite + Organization + SoftwareSourceCode + FAQ (GEO).
  assert.match(html, /"@type":"WebSite"/);
  assert.match(html, /"@type":"Organization"/);
  assert.match(html, /"@type":"SoftwareSourceCode"/);
  assert.match(html, /"@type":"FAQPage"/);
  // The FAQ is visible content, not only schema.
  assert.match(html, /DiceFrame 是什么？/);
  // Answer-first: every FAQ question heading is directly followed by its
  // visible answer paragraph, not hidden inside a collapsed <details>.
  assert.match(html, /<h3>DiceFrame 是什么？<\/h3><p>DiceFrame 是一个开源/);
  assert.doesNotMatch(html, /<details class="faq-item"/);
  // Citations: named sources carry outbound links, and the AGPL preamble is
  // quoted with attribution.
  assert.match(html, /class="cite-link" href="https:\/\/www\.dndbeyond\.com\/srd"/);
  assert.match(
    html,
    /<blockquote cite="https:\/\/www\.gnu\.org\/licenses\/agpl-3\.0\.html" lang="en">/,
  );
  assert.match(html, /<cite><a href="https:\/\/www\.gnu\.org\/licenses\/agpl-3\.0\.html"/);
  // JSON-LD answers stay plain text — no inline link markup leaks into schema.
  assert.doesNotMatch(html, /"text":"[^"]*\]\(https?:/);
  assert.match(html, /docs \/ zh\/guide\.md/);
  // Internal links use the new per-document routes.
  assert.match(html, /href="\/docs\/guide"/);
  assert.doesNotMatch(html, /\/docs\?doc=/);
});

test("prerenders the English homepage with language alternates", async () => {
  const html = await readFile(
    new URL("../dist/client/en/index.html", import.meta.url),
    "utf8",
  );

  assert.match(
    html,
    /<title>DiceFrame — Open-source, self-hosted AI TRPG platform<\/title>/i,
  );
  assert.match(html, /<html lang="en">/);
  assert.match(html, /Gather your party/);
  assert.match(html, /<em>unfold<\/em>/);
  assert.equal(
    meta(html, /<link rel="canonical" href="([^"]*)"/),
    "https://diceframe.com/en",
  );
  assert.match(html, /hrefLang="zh-CN" href="https:\/\/diceframe\.com\/"/i);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /What is DiceFrame?/);
  assert.match(html, /<h3>What is DiceFrame\?<\/h3><p>DiceFrame is an open-source/);
  assert.match(html, /<blockquote cite="https:\/\/www\.gnu\.org\/licenses\/agpl-3\.0\.html"/);
  assert.doesNotMatch(html, /\[NapCat\]\(/);
  assert.doesNotMatch(html, /\/en\/demo/i);
});

test("permanently redirects legacy /docs?doc= URLs to real routes", async () => {
  const cases = [
    ["/docs", "/docs/guide"],
    ["/docs?doc=guide", "/docs/guide"],
    ["/docs?doc=docker", "/docs/docker"],
    ["/docs?doc=standalone&lang=en", "/en/docs/standalone"],
    ["/en/docs", "/en/docs/guide"],
    ["/en/docs?doc=readme", "/en/docs/readme"],
  ];

  for (const [from, to] of cases) {
    const response = await render(from);
    assert.equal(response.status, 301, `expected 301 for ${from}`);
    assert.equal(
      response.headers.get("location"),
      `https://diceframe.com${to}`,
      `redirect target for ${from}`,
    );
  }
});

test("server-renders the Chinese documentation page with GitHub content", async () => {
  const restore = installFetchMock();
  try {
    const response = await render("/docs/guide");
    assert.equal(response.status, 200);
    const html = await response.text();

    assert.match(html, /<title>DiceFrame 文档 — 用户手册与开团指南<\/title>/);
    assert.equal(
      meta(html, /<link rel="canonical" href="([^"]*)"/),
      "https://diceframe.com/docs/guide",
    );
    assert.match(html, /<html lang="zh-CN">/);
    assert.match(html, /hrefLang="en" href="https:\/\/diceframe\.com\/en\/docs\/guide"/i);
    assert.match(html, /"@type":"BreadcrumbList"/);
    assert.match(html, /"@type":"WebPage"/);
    // The Markdown itself is in the server-rendered HTML — this is the core
    // SEO/GEO improvement over the client-fetched version.
    assert.match(html, /开始第一局/);
    assert.match(html, /<h2 id="[^"]*">/);
    assert.match(html, /md-code/);
    assert.match(html, /href="\/docs\/docker"/);
    assert.match(
      html,
      /https:\/\/github\.com\/diceframe\/diceframe-content\/blob\/main\/docs\/zh\/guide\.md/,
    );
    assert.doesNotMatch(html, /docs-error/);
  } finally {
    restore();
  }
});

test("server-renders the English documentation page", async () => {
  const restore = installFetchMock();
  try {
    const response = await render("/en/docs/guide");
    assert.equal(response.status, 200);
    const html = await response.text();

    assert.match(
      html,
      /<title>DiceFrame Documentation — User guide<\/title>/,
    );
    assert.equal(
      meta(html, /<link rel="canonical" href="([^"]*)"/),
      "https://diceframe.com/en/docs/guide",
    );
    assert.match(html, /<html lang="en">/);
    assert.match(
      html,
      /"isPartOf":\{"@id":"https:\/\/diceframe\.com\/en#website"\}/,
    );
    assert.match(html, /Start your first session/);
  } finally {
    restore();
  }
});

test("renders the GitHub fallback when the document is unavailable", async () => {
  const restore = installFetchMock();
  try {
    const response = await render("/docs/plugin-dev");
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, /docs-error/);
    assert.match(
      html,
      /https:\/\/github\.com\/diceframe\/diceframe-content\/blob\/main\/docs\/zh\/plugin-development\.md/,
    );
  } finally {
    restore();
  }
});

test("unknown document ids return not found", async () => {
  const restore = installFetchMock();
  try {
    for (const path of ["/docs/nope", "/en/docs/nope", "/demo", "/en/demo"]) {
      const response = await render(path);
      assert.equal(response.status, 404, `expected 404 for ${path}`);
    }
  } finally {
    restore();
  }
});

test("redirects alternate production hosts to the canonical domain", async () => {
  const worker = await loadWorker();
  const [env, ctx] = workerEnv();

  const workersDev = await worker.fetch(
    new Request("https://diceframe-official.yurloe0.workers.dev/docs?doc=guide"),
    env,
    ctx,
  );
  assert.equal(workersDev.status, 308);
  assert.equal(
    workersDev.headers.get("location"),
    "https://diceframe.com/docs?doc=guide",
  );

  const workersDevPath = await worker.fetch(
    new Request(
      "https://diceframe-official.yurloe0.workers.dev//evil.example/path?x=1",
    ),
    env,
    ctx,
  );
  assert.equal(workersDevPath.status, 308);
  assert.equal(
    workersDevPath.headers.get("location"),
    "https://diceframe.com/evil.example/path?x=1",
  );

  const www = await worker.fetch(
    new Request("https://www.diceframe.com/docs?probe=1"),
    env,
    ctx,
  );
  assert.equal(www.status, 301);
  assert.equal(
    www.headers.get("location"),
    "https://diceframe.com/docs?probe=1",
  );

  const wwwPath = await worker.fetch(
    new Request("https://www.diceframe.com//evil.example/path?x=1"),
    env,
    ctx,
  );
  assert.equal(wwwPath.status, 301);
  assert.equal(
    wwwPath.headers.get("location"),
    "https://diceframe.com/evil.example/path?x=1",
  );
});

test("serves the Baidu verification file on www without redirecting", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("https://www.diceframe.com/baidu_verify_codeva-xQ6459zscX.html"),
    ...workerEnv(),
  );
  assert.equal(response.status, 200);
  assert.equal(await response.text(), "a002cb47fe23e866b602b1b677c36dd2");
});

test("publishes crawl directives, AI-crawler policy, and canonical sitemap URLs", async () => {
  const robots = await readFile(
    new URL("../public/robots.txt", import.meta.url),
    "utf8",
  );
  const sitemap = await readFile(
    new URL("../public/sitemap.xml", import.meta.url),
    "utf8",
  );
  const llms = await readFile(
    new URL("../public/llms.txt", import.meta.url),
    "utf8",
  );

  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Sitemap: https:\/\/diceframe\.com\/sitemap\.xml/);
  // GEO: AI crawlers are explicitly welcomed.
  for (const bot of [
    "GPTBot",
    "OAI-SearchBot",
    "ClaudeBot",
    "PerplexityBot",
    "Google-Extended",
    "CCBot",
  ]) {
    assert.match(robots, new RegExp(`User-agent: ${bot}`));
  }

  // Sitemap: one URL pair per document plus both homepages, with hreflang.
  assert.match(sitemap, /<loc>https:\/\/diceframe\.com\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/diceframe\.com\/docs\/guide<\/loc>/);
  assert.match(
    sitemap,
    /<loc>https:\/\/diceframe\.com\/en\/docs\/docker<\/loc>/,
  );
  assert.match(
    sitemap,
    /<xhtml:link rel="alternate" hreflang="en" href="https:\/\/diceframe\.com\/en\/docs\/guide" \/>/,
  );
  for (const doc of documents) {
    assert.ok(
      sitemap.includes(`<loc>https://diceframe.com/docs/${doc.id}</loc>`),
      `sitemap is missing zh /docs/${doc.id}`,
    );
    assert.ok(
      sitemap.includes(`<loc>https://diceframe.com/en/docs/${doc.id}</loc>`),
      `sitemap is missing en /en/docs/${doc.id}`,
    );
  }

  // llms.txt gives AI systems a machine-readable product summary.
  assert.match(llms, /^# DiceFrame/);
  assert.match(llms, /AGPL-3\.0/);
  assert.match(llms, /https:\/\/diceframe\.com\/docs\/guide/);
  assert.match(llms, /https:\/\/diceframe\.com\/en\/docs\/guide/);
});

test("reads the project overview from each language's own README", () => {
  const overview = documents.find((document) => document.id === "readme");
  assert.ok(overview, "the readme document is missing from the catalog");
  // The main repository publishes README.md in English. The Chinese overview
  // therefore has to read README_zh-CN.md instead of the English default.
  assert.equal(overview.repo, "diceframe");
  assert.equal(overview.zh, "README_zh-CN.md");
  assert.equal(overview.en, "README.md");
});

test("serves on-site trust pages with author and freshness signals", async () => {
  const cases = [
    ["/about", "zh-CN", /"@type":"AboutPage"/, /关于 DiceFrame/],
    ["/contact", "zh-CN", /"@type":"ContactPage"/, /联系我们/],
    ["/privacy", "zh-CN", /"@type":"WebPage"/, /隐私政策/],
    ["/terms", "zh-CN", /"@type":"WebPage"/, /AGPL-3\.0/],
    ["/en/about", "en", /"@type":"AboutPage"/, /About DiceFrame/],
    ["/en/privacy", "en", /"@type":"WebPage"/, /Privacy Policy/],
  ];

  for (const [path, lang, schema, body] of cases) {
    const response = await render(path);
    assert.equal(response.status, 200, `expected 200 for ${path}`);
    const html = await response.text();
    assert.match(html, new RegExp(`<html lang="${lang}">`), path);
    assert.match(html, schema, path);
    assert.match(html, body, path);
    assert.equal(
      meta(html, /<link rel="canonical" href="([^"]*)"/),
      `https://diceframe.com${path}`,
    );
    // Machine-readable freshness + author signals.
    assert.match(html, /<time dateTime="\d{4}-\d{2}-\d{2}">/, path);
    assert.match(html, /property="article:modified_time"/, path);
    assert.match(html, /"@id":"https:\/\/diceframe\.com\/#author"/, path);
    assert.match(html, /<a rel="author" href="\/(en\/)?about">/, path);
  }
});

test("homepage footer links to on-site about, contact, privacy and terms pages", async () => {
  const html = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );
  for (const id of ["about", "contact", "privacy", "terms"]) {
    assert.match(html, new RegExp(`href="/${id}"`), id);
  }
  assert.match(html, /<time dateTime="\d{4}-\d{2}-\d{2}">/);
  assert.match(html, /property="article:published_time"/);
});
