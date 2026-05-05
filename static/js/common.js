// ===== 粒子动效（Hero 区域） =====
function initParticles() {
    const topSection = document.querySelector('.top-section');
    if (!topSection) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    topSection.style.position = topSection.style.position || 'relative';
    topSection.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const particles = [];
    const count = 40;
    const colors = ['#ff7eb3', '#7ec8ff', '#a8acff', '#ffb8d4', '#b8d4ff'];

    function resize() {
        canvas.width = topSection.offsetWidth;
        canvas.height = topSection.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2.5 + 1,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4 - 0.3,
            color: colors[Math.floor(Math.random() * colors.length)],
            opacity: Math.random() * 0.6 + 0.2,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: Math.random() * 0.02 + 0.01
        });
    }

    function animate() {
        if (!document.getElementById('particles-canvas')) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.pulse += p.pulseSpeed;

            // 边界环绕
            if (p.x < -10) p.x = canvas.width + 10;
            if (p.x > canvas.width + 10) p.x = -10;
            if (p.y < -10) p.y = canvas.height + 10;
            if (p.y > canvas.height + 10) p.y = -10;

            const alpha = p.opacity + Math.sin(p.pulse) * 0.2;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alpha;
            ctx.fill();

            // 光晕
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
            const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
            glow.addColorStop(0, p.color);
            glow.addColorStop(1, 'transparent');
            ctx.fillStyle = glow;
            ctx.globalAlpha = alpha * 0.4;
            ctx.fill();
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }
    animate();
}

// ===== 滚动指示器 =====
function initScrollIndicator() {
    const topSection = document.querySelector('.top-section');
    if (!topSection) return;

    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    topSection.appendChild(indicator);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            indicator.classList.add('hidden');
        } else {
            indicator.classList.remove('hidden');
        }
    });
}

// ===== 阅读进度条 =====
function initProgressBar() {
    const bar = document.createElement('div');
    bar.className = 'reading-progress';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = Math.min(progress, 100) + '%';
    });
}

// ===== 返回顶部按钮 =====
function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="bi bi-chevron-up"></i>';
    btn.title = '返回顶部';
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== 经历时间轴 =====
function createTimeline(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 收集所有 h3 及其后续内容
    const groups = [];
    let current = null;

    Array.from(container.children).forEach(el => {
        if (el.tagName === 'H3') {
            if (current) groups.push(current);
            current = { title: el, content: [] };
        } else if (current && el.tagName !== 'HR') {
            current.content.push(el);
        } else if (!current) {
            // h3 之前的内容保留
            groups.push({ standalone: el });
        }
    });
    if (current) groups.push(current);

    // 没有 h3 则不处理
    if (groups.every(g => g.standalone)) return;

    container.classList.add('timeline');
    container.innerHTML = '';

    groups.forEach(group => {
        if (group.standalone) {
            container.appendChild(group.standalone);
            return;
        }

        const item = document.createElement('div');
        item.className = 'timeline-item';

        const dot = document.createElement('div');
        dot.className = 'timeline-dot';
        item.appendChild(dot);

        const body = document.createElement('div');
        body.className = 'timeline-body';

        body.appendChild(group.title);
        group.content.forEach(el => body.appendChild(el));
        item.appendChild(body);
        container.appendChild(item);
    });
}

// ===== 文章/项目卡片网格 =====
function createCardGrid(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // 找到第一个 h3 作为分类标题，其后的 h4 + 内容作为卡片
    const groups = [];
    let currentCategory = null;
    let currentCard = null;

    Array.from(container.children).forEach(el => {
        if (el.tagName === 'H3') {
            if (currentCard) { currentCategory.cards.push(currentCard); currentCard = null; }
            if (currentCategory) groups.push(currentCategory);
            currentCategory = { title: el, cards: [] };
        } else if (el.tagName === 'H4' && currentCategory) {
            if (currentCard) currentCategory.cards.push(currentCard);
            currentCard = { title: el, content: [] };
        } else if (el.tagName === 'HR') {
            if (currentCard) { currentCategory.cards.push(currentCard); currentCard = null; }
        } else if (currentCard) {
            currentCard.content.push(el);
        } else if (currentCategory) {
            if (!currentCategory.intro) currentCategory.intro = [];
            currentCategory.intro.push(el);
        } else {
            // h3 之前或之间的独立内容（如 h2, table 等）
            groups.push({ standalone: el });
        }
    });
    if (currentCard && currentCategory) currentCategory.cards.push(currentCard);
    if (currentCategory) groups.push(currentCategory);

    // 没有 h4 卡片则不处理
    if (!groups.some(g => !g.standalone && g.cards && g.cards.length > 0)) return;

    container.innerHTML = '';

    groups.forEach(group => {
        if (group.standalone) {
            container.appendChild(group.standalone);
            return;
        }
        container.appendChild(group.title);
        if (group.intro) group.intro.forEach(el => container.appendChild(el));

        if (group.cards.length > 0) {
            const grid = document.createElement('div');
            grid.className = 'card-grid';

            group.cards.forEach(card => {
                const cardEl = document.createElement('div');
                cardEl.className = 'article-card';

                // 提取图片
                const imgEl = card.content.find(el => el.tagName === 'P' && el.querySelector('img'));
                // 只保留关键词行，排除"涉及内容"、列表、长描述
                const textEls = card.content.filter(el => el !== imgEl);
                const briefEls = textEls.filter(el => {
                    if (el.tagName !== 'P') return false;
                    const strong = el.querySelector('strong');
                    if (strong && /涉及内容|内容简介/.test(strong.textContent)) return false;
                    if (el.textContent.length < 30) return true;
                    if (strong) return true;
                    return false;
                });

                // 图片放左边
                if (imgEl) {
                    const imgWrap = document.createElement('div');
                    imgWrap.className = 'card-image';
                    imgWrap.appendChild(imgEl.querySelector('img').cloneNode(true));
                    cardEl.appendChild(imgWrap);
                }

                // 精简文字放右边
                const bodyEl = document.createElement('div');
                bodyEl.className = 'card-body';
                bodyEl.appendChild(card.title);
                if (briefEls.length > 0) {
                    briefEls.forEach(el => bodyEl.appendChild(el));
                } else {
                    // fallback: 只保留第一个非空短段落
                    const firstP = textEls.find(el => el.tagName === 'P' && el.textContent.trim());
                    if (firstP) bodyEl.appendChild(firstP);
                }
                cardEl.appendChild(bodyEl);

                grid.appendChild(cardEl);
            });

            container.appendChild(grid);
        }
    });
}

// ===== 主题切换功能 =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle && !themeToggle._bound) {
        themeToggle._bound = true;
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// ===== 代码块复制功能 =====
function addCopyButtonsToCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.main-body pre');

    codeBlocks.forEach((pre) => {
        if (pre.querySelector('.code-block-header')) return;

        const codeElement = pre.querySelector('code');
        let language = 'code';
        if (codeElement && codeElement.className) {
            const match = codeElement.className.match(/language-(\w+)/);
            if (match) {
                language = match[1];
            }
        }

        const header = document.createElement('div');
        header.className = 'code-block-header';

        const languageLabel = document.createElement('span');
        languageLabel.className = 'code-language';
        languageLabel.textContent = language;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<i class="bi bi-clipboard"></i> Copy';

        copyBtn.addEventListener('click', async () => {
            const codeText = codeElement ? codeElement.textContent : pre.textContent;

            try {
                await navigator.clipboard.writeText(codeText);
                copyBtn.classList.add('copied');
                copyBtn.innerHTML = '<i class="bi bi-check-circle"></i> Copied!';
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyBtn.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
                }, 2000);
            } catch (err) {
                console.error('复制失败:', err);
                copyBtn.innerHTML = '<i class="bi bi-x-circle"></i> Failed';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="bi bi-clipboard"></i> Copy';
                }, 2000);
            }
        });

        header.appendChild(languageLabel);
        header.appendChild(copyBtn);
        pre.insertBefore(header, pre.firstChild);
    });
}

// ===== 自动初始化 =====
window.addEventListener('DOMContentLoaded', () => {
    // 主题切换（确保所有页面都绑定）
    initTheme();

    initParticles();
    initScrollIndicator();
    initProgressBar();
    initBackToTop();
});
