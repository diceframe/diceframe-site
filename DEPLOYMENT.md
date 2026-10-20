# DiceFrame 官网部署

## 当前方案：GitHub 私有仓库 + Cloudflare Workers Builds

官网源码位于私有仓库 `diceframe/diceframe-site`，使用 TanStack Start
（Vite）+ `@cloudflare/vite-plugin` 构建，部署为 Cloudflare Worker。
Cloudflare Workers Builds 连接该仓库后，会监听 `main` 分支；每次提交都会
自动构建并发布。

首次连接：

1. 在 Cloudflare Dashboard 打开 **Workers & Pages**。
2. 选择 **Create application** → **Import a repository**。
3. 授权 Cloudflare 读取私有仓库 `diceframe/diceframe-site`。
4. 生产分支选择 `main`。
5. 构建命令填写 `npm run build`。
6. 部署命令填写 `npx wrangler deploy`。
7. 保存并开始第一次部署。

项目根目录的 `wrangler.jsonc` 是 Worker 配置来源（`main` 指向
`src/server.ts`，由 `@cloudflare/vite-plugin` 在构建时解析为
`dist/server/index.js`）。首次部署会先使用 Cloudflare 分配的
`workers.dev` 地址进行验证；任何 `*.workers.dev` 访问都会被 308 回
`https://diceframe.com`。确认页面正常后，再把 `diceframe.com` 添加为
Worker 的自定义域名。Cloudflare 会自动管理新域名记录与 HTTPS 证书。

以后只需修改 GitHub 的 `main` 分支，Workers Builds 就会自动发布。
技术帮助页会在服务端渲染时读取 `diceframe/diceframe@main` 等仓库的最新
Markdown（边缘缓存约 5 分钟），无需重新部署官网即可更新文档内容。

## 构建产物

- `dist/client/`：静态资源 + 预渲染的 `/`、`/en` 静态 HTML
- `dist/server/`：Worker 入口（由 `src/server.ts` 打包）
- `public/sitemap.xml` 在构建前由 `build/generate-sitemap.ts` 重新生成

## GitHub Pages 能不能用

不建议。官网现在是「静态预渲染 + SSR Worker」的混合形态：文档页需要在
服务端实时读取 GitHub 并渲染 Markdown，GitHub Pages 只能托管静态产物，
无法承载这部分逻辑。Cloudflare Workers 的链路更短，也更适合后续扩展。

## 正式域名

- 官网：`https://diceframe.com`
- 文档路由：`https://diceframe.com/docs/{id}` 与 `/en/docs/{id}`
- GitHub 主仓库：`github.com/diceframe/diceframe`

站点元数据默认使用 `https://diceframe.com`。如果以后更换域名，在构建
环境中设置 `VITE_SITE_URL`，并同步更新 `src/server.ts` 与
`build/generate-sitemap.ts` 中的域名常量（见 README「本地开发」）。
