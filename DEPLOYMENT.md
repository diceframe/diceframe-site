# DiceFrame 官网部署

## 当前方案：GitHub 私有仓库 + Cloudflare Workers Builds

官网源码位于私有仓库 `diceframe/diceframe-site`。Cloudflare Workers
Builds 连接该仓库后，会监听 `main` 分支；每次提交都会自动构建并发布。

首次连接：

1. 在 Cloudflare Dashboard 打开 **Workers & Pages**。
2. 选择 **Create application** → **Import a repository**。
3. 授权 Cloudflare 读取私有仓库 `diceframe/diceframe-site`。
4. 生产分支选择 `main`。
5. 构建命令填写 `npm run build`。
6. 部署命令填写 `npx wrangler deploy`。
7. 保存并开始第一次部署。

项目根目录的 `wrangler.jsonc` 是 Worker 配置来源。首次部署会先使用
Cloudflare 分配的 `workers.dev` 地址进行验证。确认页面正常后，再把
`diceframe.com` 添加为 Worker 的自定义域名，并移除旧托管入口所需的
两条 A 记录。Cloudflare 会自动管理新域名记录与 HTTPS 证书。

以后只需修改 GitHub 的 `main` 分支，Workers Builds 就会自动发布。
技术帮助页仍会在访问时读取 `diceframe/diceframe@main` 的最新 Markdown。

## GitHub Pages 能不能用

可以用 Cloudflare DNS 为 GitHub Pages 配置自定义域名，GitHub Pages 也支持 HTTPS。但 GitHub Pages 本质上托管静态产物，而当前官网按 Cloudflare Worker 运行时构建，并不是直接可上传的纯静态目录。

因此不建议把当前项目直接交给 GitHub Pages。若以后必须使用 GitHub Pages，需要增加一套独立的静态导出流程，并处理仓库子路径、路由回退和资源前缀。对目前这个官网而言，GitHub + Cloudflare Workers 的链路更短，也更适合后续扩展。

## 正式域名

- 官网：`https://diceframe.com`
- 文档仍使用官网内的 `/docs`
- GitHub 主仓库：`github.com/diceframe/diceframe`

站点元数据默认使用 `https://diceframe.com`。如果以后更换域名，可以在
Cloudflare 构建环境中设置 `NEXT_PUBLIC_SITE_URL` 覆盖默认值。
