# DiceFrame 官网部署

## 推荐：GitHub 存源码 + Cloudflare Workers 运行

这套官网使用 vinext 输出 Cloudflare Worker 兼容的应用，因此最合适的方式是：

1. 新建 GitHub 仓库并推送本目录。
2. 在 Cloudflare Dashboard 打开 **Workers & Pages**。
3. 创建 Worker，连接该 GitHub 仓库。
4. 让 Workers Builds 自动识别项目；若 Cloudflare 创建配置 PR，合并该 PR。
5. 生产分支选择 `main`，推送后自动构建与部署。
6. 把构建环境变量 `NEXT_PUBLIC_SITE_URL` 设为正式官网地址，例如 `https://www.example.com`。
7. 在 Worker 的自定义域名设置中绑定同一个官网域名。

这种方案中：

- GitHub 是源码和技术文档的事实来源；
- Cloudflare 负责构建、运行、CDN、HTTPS 和自定义域名；
- Pull Request 可以生成独立预览；
- 技术帮助页仍在访问时读取 `diceframe/diceframe@main` 的最新 Markdown。

## GitHub Pages 能不能用

可以用 Cloudflare DNS 为 GitHub Pages 配置自定义域名，GitHub Pages 也支持 HTTPS。但 GitHub Pages 本质上托管静态产物，而当前官网按 Cloudflare Worker 运行时构建，并不是直接可上传的纯静态目录。

因此不建议把当前项目直接交给 GitHub Pages。若以后必须使用 GitHub Pages，需要增加一套独立的静态导出流程，并处理仓库子路径、路由回退和资源前缀。对目前这个官网而言，GitHub + Cloudflare Workers 的链路更短，也更适合后续扩展。

## 域名建议

- 官网：`diceframe.dev` 或 `www.diceframe.dev`
- 文档仍使用官网内的 `/docs`
- GitHub 主仓库：`github.com/diceframe/diceframe`

正式绑定域名前，需要在 Cloudflare 构建设置中把 `NEXT_PUBLIC_SITE_URL` 设为实际域名。未设置时，本地开发会回退到 `http://localhost:3000`。
