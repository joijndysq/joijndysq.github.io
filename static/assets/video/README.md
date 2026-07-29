# 视频资源目录

本目录用于保存个人主页中的本地视频。

推荐格式：

- 容器：MP4
- 视频编码：H.264
- 音频编码：AAC
- 分辨率：720p 或 1080p
- 单段时长：建议 30–90 秒

示例路径：

```text
static/assets/video/arm-demo.mp4
```

在 Markdown 或 HTML 博客中使用：

```html
<figure class="video-block">
  <video class="local-video" controls preload="metadata"
         poster="static/assets/img/blog/arm-cover.jpg">
    <source src="static/assets/video/arm-demo.mp4" type="video/mp4">
  </video>
  <figcaption>机械臂演示</figcaption>
</figure>
```

较大的视频建议上传到哔哩哔哩后通过 `.video-embed` 响应式容器嵌入。
