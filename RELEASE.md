# DiceFrame 官网轻量发布规范

官网采用 GitHub 私有仓库与 Cloudflare Workers Builds。日常发布不维护版本号，
也不创建安装包；`main` 分支合并成功后，Cloudflare 会自动发布到
`https://diceframe.com`。

## 日常流程

1. 从 `main` 创建一个短分支，完成本次修改。
2. 在本地运行 `npm run verify`。
3. 提交 Pull Request，等待 **Site Quality** 检查通过。
4. 合并到 `main`。
5. 等待 **Workers Builds: diceframe-official** 完成。
6. 检查首页和 `/docs`。

只修改一两处文字时，可以直接在 GitHub 网页中创建分支并提交 Pull Request，
不必在本地启动网站。

## 哪些修改需要 Pull Request

- 页面结构、样式、交互或依赖变更。
- Cloudflare、Worker、域名和自动部署配置。
- 下载地址、外部链接和 GitHub 文档路径。
- 多处文案或图片调整。

紧急错别字也建议使用 GitHub 网页创建一个小 Pull Request。这样仍然很快，
同时能保留检查和回退记录。

## 上线检查

- 首页 `https://diceframe.com/` 可以打开。
- 帮助页 `https://diceframe.com/docs` 可以打开。
- GitHub 文档原文链接正确。
- 桌面端和手机端没有明显布局问题。
- 没有提交 `.env`、Token、密码、本地日志、缓存或构建目录。

## 版本与标签

普通官网修改不更新 `package.json` 版本，也不创建 GitHub Release。只有重大改版
需要留下里程碑时，才创建类似 `site-v1.0` 的标签。

## 回退

线上异常时，优先在 Cloudflare 回滚到上一条正常部署，然后在 GitHub 回退引发
问题的提交。修复仍通过 Pull Request 合并，避免直接修改线上产物。
