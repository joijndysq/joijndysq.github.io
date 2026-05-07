// ===== 页面初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    // 初始化主题 (common.js)
    initTheme();

    // 加载内容
    loadContent();

    // 加载配置
    loadConfig();

    // 导航栏滚动
    initNavbarScroll();
});

// ===== 导航栏滚动效果 =====
function initNavbarScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ===== 内容加载 =====
function loadContent() {
    const pageName = getPageName();
    if (pageName) {
        loadMarkdown(pageName);
    }
}

function getPageName() {
    const pathname = window.location.pathname;
    const filename = pathname.split('/').pop();
    const name = filename.replace('.html', '');
    return name;
}

function loadMarkdown(pageName) {
    const contentDir = 'contents/';
    const filename = `${contentDir}${pageName}.md`;
    
    fetch(filename)
        .then(response => response.text())
        .then(markdown => {
            marked.use({ mangle: false, headerIds: false });
            const html = marked.parse(markdown);
            document.getElementById('page-md').innerHTML = html;
        })
        .then(() => {
            // 为代码块添加复制按钮
            addCopyButtonsToCodeBlocks();

            // 时间轴 / 卡片网格
            if (pageName === 'experience') createTimeline('page-md');
            if (pageName === 'articles') createCardGrid('page-md');

            // MathJax
            if (window.MathJax && window.MathJax.typesetPromise) {
                window.MathJax.typesetPromise();
            }
        })
        .catch(error => {
            console.error('加载内容失败:', error);
            document.getElementById('page-md').innerHTML = '<p>内容加载失败</p>';
        });
}

// ===== 配置加载 =====
function loadConfig() {
    fetch('contents/config.yml')
        .then(response => response.text())
        .then(yamlText => {
            const config = jsyaml.load(yamlText);
            const copyrightText = document.getElementById('copyright-text');
            if (copyrightText && config && config['copyright-text']) {
                copyrightText.innerHTML = config['copyright-text'];
            }
        })
        .catch(error => console.log('加载配置失败:', error));
}
