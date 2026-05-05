# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

纯静态个人主页 (GitHub Pages)，无构建工具、无 npm、无打包步骤。直接编辑 HTML/CSS/JS/Markdown 文件即可发布。

## 架构

### 页面类型

| 文件 | 用途 | 加载的 JS |
|------|------|-----------|
| `index.html` | 多区块单页主页（home/articles/experience/publications/achievements/awards/share/links） | `scripts.js` |
| `article.html` | 博客文章页，通过 URL 参数 `?name=blog-realsense` 加载内容 | `article.js` |
| `experience.html` | 独立经历页 | `page.js` |
| `publications.html` | 独立论文页 | `page.js` |

### 内容驱动方式

- **配置**: `contents/config.yml` — 网站标题、版权信息等，通过 js-yaml 解析后注入到 DOM 中对应 `id` 的元素
- **内容**: `contents/*.md` — Markdown 文件，运行时通过 marked.js 渲染为 HTML 后注入 `<div id="{section}-md">`
- **对应关系**: `home.md` → `#home-md`, `articles.md` → `#articles-md`, 以此类推
- `page.js` 的对应逻辑不同：根据当前 HTML 文件名自动加载同名 `.md` 文件（如 `experience.html` → `experience.md`），并注入到 `#page-md`

### JS 文件职责

- `scripts.js` — 首页逻辑：YAML 配置注入、8 个 section 的 markdown 加载、主题切换、代码块复制按钮、Bootstrap scrollspy、导航滚动效果、鼠标光效、打字机效果
- `article.js` — 文章页逻辑：URL 参数解析 (`?name=`)、配置加载、markdown 渲染、主题切换、代码复制、滚动动画
- `page.js` — 通用子页逻辑：根据页面文件名自动加载对应 markdown、配置加载、主题切换、代码复制

三个 JS 文件存在明显的代码重复（主题切换、代码复制功能 `addCopyButtonsToCodeBlocks()`），修改这些功能时需要同步更新。

### CSS 结构

- `static/css/styles.css` — Bootstrap 5.2.3 + Start Bootstrap New Age 主题，不应手动编辑
- `static/css/main.css` — **所有自定义样式**：通过 `@import "./styles.css"` 引入 Bootstrap 基础，然后定义 CSS 变量（`--h-*` 前缀）、浅色/暗色主题变量、动画、卡片效果、代码块样式等。暗色主题通过 `[data-theme="dark"]` 选择器覆盖变量

### 主题系统

- CSS 变量方案，变量定义在 `main.css` 的 `:root` 和 `[data-theme="dark"]` 中
- JS 通过 `document.documentElement.setAttribute('data-theme', ...)` 切换
- 主题偏好持久化在 `localStorage` 的 `theme` 键中
- 无已保存偏好时跟随系统 `prefers-color-scheme`

### 关键依赖（本地）

- `static/js/bootstrap.bundle.min.js` — Bootstrap 5
- `static/js/marked.min.js` — Markdown 渲染
- `static/js/js-yaml.min.js` — YAML 解析

## 开发方式

无构建步骤。直接用浏览器打开 HTML 文件，或使用任意静态文件服务器：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080`。

编辑内容只需修改 `contents/*.md` 和 `contents/config.yml`。修改样式编辑 `static/css/main.css`。

## 添加新页面

1. 复制 `experience.html` 或 `publications.html` 作为模板
2. 修改 `<title>`、顶部标题文字、`<section>` 内的图标和标题
3. 页面 JS 加载 `page.js`，会自动加载与 HTML 文件同名的 `.md` 文件
4. 在 `contents/` 下创建对应的 `.md` 文件
5. 在 `index.html` 和各子页的导航栏中添加链接
