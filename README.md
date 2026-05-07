# Lyric's Homepage

二次元开发者的个人主页，基于 GitHub Pages 构建，支持深色/浅色主题切换。

## 运行

```bash
# 使用任意静态服务器，例如 Live Server 或
python3 -m http.server 8080
```

## 项目结构

```
├── index.html          # 首页（多区块单页）
├── article.html        # 博客文章页（?name=xxx）
├── articles.html       # 文章列表页
├── experience.html     # 经历页
├── publications.html   # 论文页
├── 404.html            # 自定义 404
├── contents/           # Markdown 内容 + YAML 配置
│   ├── config.yml      # 网站配置
│   ├── *.md            # 各板块内容
│   └── blog/           # 博客文章
└── static/
    ├── assets/img/     # 图片资源
    ├── css/main.css    # 自定义样式
    └── js/
        ├── common.js   # 公共（主题/代码复制/粒子/进度条）
        ├── scripts.js  # 首页逻辑
        ├── article.js  # 文章页逻辑
        └── page.js     # 子页通用逻辑
```

## 添加博客

### 1. 创建 Markdown 文件

在 `contents/blog/` 下新建 `.md` 文件，例如 `contents/blog/my-new-post.md`。

支持标准 Markdown 语法 + MathJax 数学公式（`$...$` 行内 / `$$...$$` 块级）。

### 2. 注册到文章列表

编辑 `contents/articles.md`，添加条目：

```markdown
#### [文章标题](article.html?name=my-new-post)

![封面图](static/assets/img/blog/my-cover.png)

**关键词**: tag1, tag2, tag3

**内容简介**: 简短描述...
```

### 3. 添加标题映射

编辑 `static/js/article.js`，在 `titles` 对象中添加：

```js
const titles = {
    'blog-realsense': '香橙派AIpro 安装 Intel Realsense D456 深度相机完整指南',
    'my-new-post': '你的文章标题'
}
```

### 4. 图片存放

博客配图放入 `static/assets/img/blog/`，在文章中引用：`![描述](static/assets/img/blog/xxx.png)`。

## License

MIT
