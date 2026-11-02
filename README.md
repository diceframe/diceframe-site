# DiceFrame 官网

DiceFrame 的独立官网项目。它与主程序仓库分离，面向产品介绍、下载引导与技术帮助。
基于 [TanStack Start](https://tanstack.com/start)（Vite + React 19）构建，
部署在 Cloudflare Workers 上。

## 许可证

本项目与 DiceFrame 主项目一样，采用 [GNU Affero General Public License v3.0](LICENSE)（AGPL-3.0）授权。

## 内容来源

- 产品能力与视觉资产来自 [diceframe/diceframe](https://github.com/diceframe/diceframe)。
- 技术帮助页不会在官网保存 Markdown 副本。
- 服务端会在渲染文档页时直接读取 `diceframe/diceframe` 与
  `diceframe/diceframe-content` 仓库 `main` 分支下的文档（边缘缓存 5 分钟），
  因此 GitHub 是唯一事实来源，爬虫与 AI 助手也能拿到完整正文。
- 「项目总览」按语言分流：中文读取主仓 `README_zh-CN.md`，英文读取主仓
  `README.md`（主仓以英文 README 为默认）。
- 如果 GitHub 暂时不可访问，文档页会显示原文链接作为兜底。

文档清单（每篇文档的中英文仓库与路径）集中在 `src/docs/documents.ts`，
它同时驱动路由、侧边栏和 sitemap 生成。

## 路由结构

| 路由 | 说明 |
| --- | --- |
| `/` | 中文首页（构建时静态预渲染） |
| `/en` | 英文首页（构建时静态预渲染） |
| `/docs/{id}` | 中文文档页，按文档独立成页并 SSR GitHub 正文 |
| `/en/docs/{id}` | 英文文档页 |

旧链接兼容：`/docs`、`/docs?doc={id}`（含 `?lang=en`）由 `src/server.ts`
以 301 永久重定向到新的文档路由；`www.diceframe.com` 与 `*.workers.dev`
也会 301/308 回主域名。

## SEO 与 GEO

- 每页独立的 title / description / canonical / hreflang（zh-CN、en、x-default）
  与 Open Graph、Twitter 卡片，见 `src/config/seo.ts`。
- 首页带 WebSite + Organization + SoftwareSourceCode + FAQPage 结构化数据，
  FAQ 同时以可见内容渲染；文档页带 BreadcrumbList + WebPage。
- `public/sitemap.xml` 由 `build/generate-sitemap.ts` 在每次构建前按文档目录
  重新生成（含 hreflang 交替链接）。
- `public/robots.txt` 显式欢迎各大 AI 爬虫；`public/llms.txt`
  提供面向 AI 助手的机器可读产品摘要与文档索引。

## 本地开发

```powershell
npm install
npm run dev        # http://localhost:3000
npm run verify     # eslint + vite build + tsc + node --test
npm run preview    # 本地以 workerd 运行构建产物
```

域名如需更换：改 `src/config/site.ts` 中的 `SITE_URL`（或构建时设置
`VITE_SITE_URL`），并同步 `build/generate-sitemap.ts` 的 `HOST` 与
`src/server.ts` 的 `CANONICAL_HOST`。

## 自动部署

本仓库使用 Cloudflare Workers Builds 自动部署。Cloudflare 连接
`diceframe/diceframe-site` 公开仓库后，每次推送 `main` 分支都会自动构建
（`npm run build`）并发布（`npx wrangler deploy`）。

完整说明见 [DEPLOYMENT.md](DEPLOYMENT.md)。日常修改和上线规则见
[RELEASE.md](RELEASE.md)。正式站点地址默认为 `https://diceframe.com`。
