const content_dir = 'contents/'
const config_file = 'config.yml'

// Fetch a text file and preserve HTTP status for format fallback.
async function fetch_text(filename) {
    const response = await fetch(filename)
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${filename}`)
    }
    return response.text()
}

// Load config file
async function load_config() {
    const config = jsyaml.load(await fetch_text(content_dir + config_file))
    document.getElementById('title').textContent = config['title'] + ' - 博客'
    document.getElementById('copyright-text').innerHTML = config['copyright-text']
    return config
}

// Get URL parameter
function get_url_param(name) {
    const url_params = new URLSearchParams(window.location.search)
    return url_params.get(name)
}

function valid_article_name(name) {
    return /^[a-z0-9][a-z0-9_-]*(?:\.(?:md|html))?$/i.test(name)
}

function article_candidates(name, format) {
    if (/\.(md|html)$/i.test(name)) {
        return [name]
    }
    if (format === 'html') return [name + '.html']
    if (format === 'md') return [name + '.md']
    // Backward compatible: existing links without format prefer Markdown.
    return [name + '.md', name + '.html']
}

async function load_article(name, format, container_id) {
    if (!valid_article_name(name)) {
        throw new Error('Invalid article name')
    }

    const candidates = article_candidates(name, format)
    let last_error

    for (const candidate of candidates) {
        try {
            const source = await fetch_text(content_dir + 'blog/' + candidate)
            const container = document.getElementById(container_id)
            const is_html = candidate.toLowerCase().endsWith('.html')
            container.innerHTML = is_html ? source : marked.parse(source)
            container.dataset.articleFormat = is_html ? 'html' : 'markdown'

            addCopyButtonsToCodeBlocks()

            if (window.MathJax && window.MathJax.typesetPromise) {
                await window.MathJax.typesetPromise([container])
            }
            return { candidate, is_html }
        } catch (error) {
            last_error = error
        }
    }

    throw last_error || new Error('Article not found')
}

function show_article_error(container_id) {
    document.getElementById(container_id).innerHTML = `
        <div class="article-error" role="alert">
            <h3>文章暂时无法加载</h3>
            <p>请检查文章名称或返回文章列表重新选择。</p>
            <a href="articles.html">← 返回文章列表</a>
        </div>`
}

// Scroll animation observer
function init_scroll_animation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible')
        })
    }, { threshold: 0.1 })

    document.querySelectorAll('.main-body').forEach(el => observer.observe(el))
}

// Navbar scroll effect
function init_navbar_scroll() {
    const header = document.querySelector('.header')
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.pageYOffset > 50)
    })
}

// Main
window.addEventListener('DOMContentLoaded', async () => {
    initTheme()

    try {
        await load_config()
    } catch (error) {
        console.error('Config load failed:', error)
    }

    const article_name = get_url_param('name') || 'blog-realsense'
    const format = get_url_param('format')
    const titles = {
        'blog-realsense': '香橙派 AIpro 安装 Intel RealSense D456 深度相机完整指南',
        'blog-publishing-guide': '在个人主页发布 HTML 博客与视频'
    }

    document.getElementById('article-title').textContent =
        titles[article_name.replace(/\.(md|html)$/i, '')] || '博客文章'

    try {
        await load_article(article_name, format, 'article-md')
    } catch (error) {
        console.error('Article load failed:', error)
        show_article_error('article-md')
    }

    init_scroll_animation()
    init_navbar_scroll()
})
