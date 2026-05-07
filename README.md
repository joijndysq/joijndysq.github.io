![Github Forks](https://img.shields.io/github/forks/Yixin0313/personal-homepage-template?style=flat)
![Github Stars](https://img.shields.io/github/stars/Yixin0313/personal-homepage-template?style=flat)
![License](https://img.shields.io/github/license/Yixin0313/personal-homepage-template)

# 通用个人主页模板：适用于学术和求职场景 | A general-purpose template: suitable for both academic and professional use.

## 预览 | Preview
[![Screenshot of the Website](https://raw.githubusercontent.com/Yixin0313/personal-homepage-template/main/screenshot_full.png)](https://yixin0313.github.io/personal-homepage-template/)

## 介绍 | Introduction

Lyric 的个人主页，基于 GitHub Pages 构建，支持深色/浅色主题切换。

Bilibili教程视频：【【2025最新保姆级教程】手把手教你用github制作个人主页（申学找工作必备）】https://www.bilibili.com/video/BV16nNMeFEzm?vd_source=79b688b1a191b9f9e8204aa1c3d0adab

CSDN教程：https://blog.csdn.net/qq_45743991/article/details/145505150?spm=1001.2014.3001.5502

## 快速开始 | Getting Start
### 1. Fork 该仓库 | Fork this repository
仓库名称应命名为 `<用户名>.github.io`，这样你的个人网站地址将是 `https://<用户名>.github.io/`。

The repository name should be `<username>.github.io`, which will also be your website's URL.


### 2.  编辑页面内容 | Edit page content
(1) 进入你想存放项目的文件夹，并克隆新的仓库 | Go to the folder where you want to store your project, and clone the new repository:
```
git clone https://github.com/<username>/<username>.github.io.git
```
项目的目录结构如下 | The directory structure is as follows:

```.
.
├── contents
└── static
    ├── assets
    │   └── img
    ├── css
    └── js
```

(2) 修改各个板块的内容 | Modify the content of each section, which corresponds to `contents/*.md`.

(3) 调整网站设置 | Adjust the title, copyright information, and other text of the website in `contents/config.yml`

(4) 替换图片 | Replace background image and photo with new ones for your web pages in `static/assets/img/`

(5) 提交更改 | Push it: 
```
git commit -am 'init'
git push
```


### 3. 访问你的网站 | Enjoy

打开浏览器，访问 https://<用户名>.github.io，即可查看你的个人主页

Fire up a browser and go to `https://<username>.github.io`



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

---

## License
本项目基于 MIT 许可协议，你可以自由使用和修改此模板。 Yixin Huang 2025年2月7号

Copyright Yixin Huang, 2025. Licensed under an MIT license. You can copy and mess with this template.
