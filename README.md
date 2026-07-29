# Lyric's Homepage

二次元开发者的个人主页，基于 GitHub Pages 构建，支持深色/浅色主题、Markdown / HTML 博客和响应式视频。

## 运行

```bash
python3 -m http.server 8080
```

打开 `http://localhost:8080`。

## 项目结构

```text
├── index.html
├── article.html
├── articles.html
├── contents/
│   ├── config.yml
│   ├── *.md
│   └── blog/
│       ├── *.md
│       └── *.html
└── static/
    ├── assets/
    │   ├── img/
    │   └── video/
    ├── css/main.css
    └── js/article.js
```

## 发布 Markdown 博客

1. 在 `contents/blog/` 新建 `my-post.md`。
2. 在 `contents/articles.md` 添加链接：

```markdown
#### [文章标题](article.html?name=my-post)
```

3. 可在 `static/js/article.js` 的 `titles` 对象登记标题。
4. 图片放入 `static/assets/img/blog/`。

## 发布 HTML 博客

HTML 博客应保存为可注入文章容器的 HTML 片段，不要包含 `<html>`、`<head>` 或 `<body>`。

1. 创建 `contents/blog/my-html-post.html`。
2. 在文章列表中添加：

```markdown
#### [HTML文章标题](article.html?name=my-html-post&format=html)
```

博客阅读器支持以下写法：

- `article.html?name=my-post`：优先查找 Markdown，找不到时尝试 HTML
- `article.html?name=my-post&format=md`：只读取 Markdown
- `article.html?name=my-post&format=html`：只读取 HTML
- `article.html?name=my-post.html`：通过扩展名直接指定格式

出于安全考虑，只提交自己编写或审核过的 HTML，不要加入来源不明的脚本。

## 方案 A：本地 MP4

视频放入 `static/assets/video/`：

```html
<figure class="video-block">
  <video class="local-video" controls preload="metadata"
         poster="static/assets/img/blog/demo-cover.jpg">
    <source src="static/assets/video/demo.mp4" type="video/mp4">
    你的浏览器不支持视频播放。
  </video>
  <figcaption>项目演示</figcaption>
</figure>
```

推荐使用 MP4 + H.264 + AAC，并设置封面和 `preload="metadata"`。

## 方案 B：哔哩哔哩

```html
<figure class="video-block">
  <div class="video-embed">
    <iframe
      src="https://player.bilibili.com/player.html?bvid=BV_ID&page=1"
      title="项目演示视频"
      loading="lazy"
      scrolling="no"
      frameborder="0"
      allowfullscreen>
    </iframe>
  </div>
  <figcaption>项目完整演示</figcaption>
</figure>
```

将 `BV_ID` 替换为真实 BV 号。播放器会自动保持 16:9 并适配移动端。

## License

MIT
