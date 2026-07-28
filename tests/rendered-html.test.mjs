import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

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
  assert.match(html, /让 AI 做 GM/);
  assert.match(html, /和朋友一起把故事/);
  assert.match(html, /跑下去/);
  assert.match(html, /<span>BOT<\/span>/i);
  assert.match(html, /一套 AI TRPG 引擎/);
  assert.match(html, /AI 跑团（TRPG）平台/);
  assert.match(html, /rel="canonical" href="https:\/\/diceframe\.com\/"/i);
  assert.match(html, /"@type":"WebSite"/);
  assert.match(html, /"@type":"SoftwareSourceCode"/);
  assert.match(
    html,
    /<meta name="msvalidate\.01" content="D836E0E0DD0B81055E1D84C58E0C9A93"\/?>/i,
  );
  assert.match(html, /diceframe-app\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("server-renders the GitHub-sourced documentation shell", async () => {
  const response = await render("/docs");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /DiceFrame 使用与部署文档/);
  assert.match(html, /DICEFRAME · TRPG HELP CENTER/);
  assert.match(html, /diceframe\/diceframe/);
  assert.match(html, /rel="canonical" href="https:\/\/diceframe\.com\/docs"/i);
  assert.match(html, /main/);
});

test("redirects alternate production hosts to the canonical domain", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("redirect-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request(
      "https://diceframe-official.yurloe0.workers.dev/docs?doc=USER_GUIDE_CN.md",
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
    "https://diceframe.com/docs?doc=USER_GUIDE_CN.md",
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
