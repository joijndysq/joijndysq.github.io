const content_dir = 'contents/'
const config_file = 'config.yml'

// Fetch text file
async function fetch_text(filename) {
    const file = await fetch(filename)
    const text = await file.text()
    return text
}

// Load config file
async function load_config() {
    let config = jsyaml.load(await fetch_text(content_dir + config_file))
    document.getElementById('title').innerHTML = config['title'] + ' - 博客'
    document.getElementById('copyright-text').innerHTML = config['copyright-text']
    return config
}

// Get URL parameter
function get_url_param(name) {
    const url_params = new URLSearchParams(window.location.search)
    return url_params.get(name)
}

// Load single markdown file
async function load_markdown(filename, container_id) {
    const md_text = await fetch_text(filename)
    const html_content = marked.parse(md_text)
    document.getElementById(container_id).innerHTML = html_content

    // 为代码块添加复制按钮
    addCopyButtonsToCodeBlocks();
    
    // Render MathJax
    if (window.MathJax && window.MathJax.typesetPromise) {
        await window.MathJax.typesetPromise()
    }
}

// Scroll animation observer
function init_scroll_animation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.main-body').forEach(el => {
        observer.observe(el);
    });
}

// Navbar scroll effect
function init_navbar_scroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });
}

// Main
window.addEventListener('DOMContentLoaded', async (event) => {
    // 初始化主题
    initTheme();

    await load_config()

    const article_name = get_url_param('name') || 'blog-realsense'

    if (article_name) {
        await load_markdown(content_dir + 'blog/' + article_name + '.md', 'article-md')
        
        const titles = {
            'blog-realsense': '香橙派AIpro 安装 Intel Realsense D456 深度相机完整指南'
        }
        document.getElementById('article-title').textContent = titles[article_name] || '博客文章'
    }

    init_scroll_animation()
    init_navbar_scroll()
})
