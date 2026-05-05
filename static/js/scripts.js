const content_dir = 'contents/'
const config_file = 'config.yml'
const section_names = ['home', 'articles', 'experience', 'publications', 'achievements', 'awards', 'share', 'links'];

window.addEventListener('DOMContentLoaded', event => {
    // 初始化主题
    initTheme();

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // ===== 导航栏滚动效果 =====
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // 添加/移除滚动样式
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ===== 滚动显示动画 =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有 section
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // ===== 鼠标跟随光效 =====
    document.addEventListener('mousemove', (e) => {
        const cursor = document.querySelector('.cursor-glow');
        if (!cursor) {
            const newCursor = document.createElement('div');
            newCursor.className = 'cursor-glow';
            newCursor.style.cssText = `
                position: fixed;
                width: 300px;
                height: 300px;
                background: radial-gradient(circle, rgba(255, 126, 179, 0.15) 0%, transparent 70%);
                pointer-events: none;
                z-index: 9999;
                transform: translate(-50%, -50%);
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(newCursor);
        }
        
        const cursorElement = document.querySelector('.cursor-glow');
        cursorElement.style.left = e.clientX + 'px';
        cursorElement.style.top = e.clientY + 'px';
    });

    // ===== 打字机效果 for 顶部标题 =====
    const typeWriter = (element, text, speed = 100) => {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    };


    // Yaml
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString())
                }

            })
        })
        .catch(error => console.log(error));


    // Marked
    marked.use({ mangle: false, headerIds: false })
    section_names.forEach((name, idx) => {
        fetch(content_dir + name + '.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                document.getElementById(name + '-md').innerHTML = html;
            }).then(() => {
                // 为代码块添加复制按钮
                addCopyButtonsToCodeBlocks();
                // MathJax
                MathJax.typeset();
                // 时间轴 / 卡片网格
                if (name === 'experience') createTimeline(name + '-md');
                if (name === 'articles') createCardGrid(name + '-md');
            })
            .catch(error => console.log(error));
    })

}); 
