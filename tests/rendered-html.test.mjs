import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { normalizeGitHubMarkdown } from "../app/docs/normalizeGitHubMarkdown.js";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the DiceFrame homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>DiceFrame — 开源自托管 AI 跑团（TRPG）平台<\/title>/i,
  );
  assert.match(html, /<span>和朋友一起，<\/span>/);
  assert.match(html, /<span>在 DiceFrame，<\/span>/);
  assert.match(html, /把故事/);
  assert.match(html, /跑下去/);
  assert.match(html, /<span>BOT<\/span>/i);
  assert.match(html, /href="\/demo"/i);
  assert.match(html, /一套 AI TRPG 引擎/);
  assert.match(html, /AI 跑团（TRPG）平台/);
  assert.match(html, /rel="canonical" href="https:\/\/diceframe\.com\/"/i);
  assert.match(html, /"@type":"WebSite"/);
  assert.match(html, /"@type":"SoftwareSourceCode"/);
  assert.match(
    html,
    /<meta name="msvalidate\.01" content="D836E0E0DD0B81055E1D84C58E0C9A93"\/?>/i,
  );
  assert.match(html, /diceframe-app\.jpg/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the English homepage with language alternates", async () => {
  const response = await render("/en");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(
    html,
    /<title>DiceFrame — Open-source, self-hosted AI TRPG platform<\/title>/i,
  );
  assert.match(html, /Gather your party/);
  assert.match(html, /Let the story/);
  assert.match(html, /unfold/);
  assert.match(html, /href="\/en\/demo"/i);
  assert.match(html, /rel="canonical" href="https:\/\/diceframe\.com\/en"/i);
  assert.match(html, /hrefLang="zh-CN" href="https:\/\/diceframe\.com\/"/i);
});

test("server-renders the GitHub-sourced documentation shell", async () => {
  const response = await render("/docs");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /DiceFrame 使用与部署文档/);
  assert.match(html, /DICEFRAME · TRPG HELP CENTER/);
  assert.match(html, /diceframe\/diceframe-content/);
  assert.match(html, /rel="canonical" href="https:\/\/diceframe\.com\/docs"/i);
  assert.match(html, /main/);
});

test("server-renders the English documentation shell", async () => {
  const response = await render("/en/docs");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /DiceFrame setup and user documentation/);
  assert.match(html, /User guide/);
  assert.match(
    html,
    /rel="canonical" href="https:\/\/diceframe\.com\/en\/docs"/i,
  );
});

test("server-renders the Chinese and English demo shells", async () => {
  const [zhResponse, enResponse] = await Promise.all([
    render("/demo"),
    render("/en/demo"),
  ]);
  assert.equal(zhResponse.status, 200);
  assert.equal(enResponse.status, 200);

  const zhHtml = await zhResponse.text();
  const enHtml = await enResponse.text();
  assert.match(zhHtml, /沉没回廊/);
  assert.match(zhHtml, /沉没回廊 · 试玩桌/);
  assert.match(zhHtml, /GM 控台 · 单人冒险/);
  assert.match(enHtml, /The Sunken Gallery/);
  assert.match(enHtml, /Sunken Gallery · Demo Table/);
  assert.match(enHtml, /GM Console · Solo Adventure/);
});

test("redirects alternate production hosts to the canonical domain", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("redirect-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request(
      "https://diceframe-official.yurloe0.workers.dev/docs?doc=guide",
    ),
    {},
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 308);
  assert.equal(
    response.headers.get("location"),
    "https://diceframe.com/docs?doc=guide",
  );
});

test("publishes crawl directives and canonical sitemap URLs", async () => {
  const robots = await readFile(
    new URL("../public/robots.txt", import.meta.url),
    "utf8",
  );
  const sitemap = await readFile(
    new URL("../public/sitemap.xml", import.meta.url),
    "utf8",
  );

  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /Sitemap: https:\/\/diceframe\.com\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/diceframe\.com\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/diceframe\.com\/docs<\/loc>/);
});

test("normalizes common GitHub README HTML without injecting raw markup", () => {
  const markdown = normalizeGitHubMarkdown(`
<p align="center">
  <img src="docs/assets/diceframe-logo.svg" width="144" height="144" alt="DiceFrame Logo">
</p>
<h1 align="center">DiceFrame</h1>
<p align="center"><a href="README_EN.md">English</a> | 中文</p>
<p align="center">
  <a href="https://github.com/diceframe/diceframe/stargazers"><img src="https://img.shields.io/github/stars/diceframe/diceframe" alt="GitHub Stars"></a>
  <script>alert("unsafe")</script>
</p>
`);

  assert.match(
    markdown,
    /!\[DiceFrame Logo\]\(docs\/assets\/diceframe-logo\.svg\)/,
  );
  assert.match(markdown, /# DiceFrame/);
  assert.match(markdown, /\[English\]\(README_EN\.md\) \| 中文/);
  assert.match(
    markdown,
    /\[!\[GitHub Stars\]\(https:\/\/img\.shields\.io\/github\/stars\/diceframe\/diceframe\)\]\(https:\/\/github\.com\/diceframe\/diceframe\/stargazers\)/,
  );
  assert.doesNotMatch(markdown, /<(?:p|h1|a|img|script)\b/i);
});
