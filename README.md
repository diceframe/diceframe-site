# DiceFrame 官网

DiceFrame 的独立官网项目。它与主程序仓库分离，面向产品介绍、下载引导与技术帮助。

## 内容来源

- 产品能力与视觉资产来自 [diceframe/diceframe](https://github.com/diceframe/diceframe)。
- 技术帮助页不会在官网保存 Markdown 副本。
- 浏览器会直接读取 `diceframe/diceframe` 仓库 `main` 分支下的文档，因此 GitHub 是唯一事实来源。
- 「项目总览」按语言分流：中文读取主仓 `README_zh-CN.md`，英文读取主仓 `README.md`
  （主仓以英文 README 为默认，`README_EN.md` 只是指向它的占位文件）。
- 如果 GitHub 暂时不可访问，帮助页会显示原文链接作为兜底。

文档清单（每篇文档的中英文仓库与路径）集中定义在 `app/docs/documents.js`。

## 本地开发

Windows PowerShell：

```powershell
$env:WRANGLER_LOG_PATH=".wrangler/wrangler.log"
.\node_modules\.bin\vinext.cmd dev
```

构建与测试：

```powershell
$env:WRANGLER_LOG_PATH=".wrangler/wrangler.log"
.\node_modules\.bin\vinext.cmd build
node --test tests/rendered-html.test.mjs
```

## 自动部署

本仓库使用 Cloudflare Workers Builds 自动部署。Cloudflare 连接
`diceframe/diceframe-site` 私有仓库后，每次推送 `main` 分支都会自动构建并发布。

完整说明见 [DEPLOYMENT.md](DEPLOYMENT.md)。
日常修改和上线规则见 [RELEASE.md](RELEASE.md)。

正式站点地址默认为 `https://diceframe.com`；如需更换，可以通过
`NEXT_PUBLIC_SITE_URL` 覆盖。
