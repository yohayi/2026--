// 页面交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动导航
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    // 导航点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // 移除所有active类
                navLinks.forEach(l => l.classList.remove('active'));
                // 添加当前active类
                this.classList.add('active');
                
                // 平滑滚动到目标部分
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时更新导航激活状态
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // 数据动画效果
    const dataNumbers = document.querySelectorAll('.data-number');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    dataNumbers.forEach(number => {
        observer.observe(number.parentElement.parentElement);
    });
    
    function animateNumbers() {
        dataNumbers.forEach(element => {
            const target = parseInt(element.textContent.replace(/,/g, ''));
            const duration = 1500;
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    element.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        });
    }
    
    // 页面加载时的动画
    const heroSection = document.querySelector('.hero-section');
    heroSection.style.opacity = '0';
    heroSection.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        heroSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }, 300);
    
    // 卡片悬停效果增强
    const cards = document.querySelectorAll('.research-card, .data-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 打印友好功能
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> 打印本页';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        box-shadow: var(--shadow);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: var(--transition);
    `;
    
    document.body.appendChild(printButton);
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = 'var(--shadow-lg)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow)';
    });
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    // 响应式调整
    window.addEventListener('resize', function() {
        const nav = document.querySelector('.nav-links');
        if (window.innerWidth < 768) {
            nav.style.flexWrap = 'wrap';
        } else {
            nav.style.flexWrap = 'nowrap';
        }
    });
    
    // 初始化
    console.log('知行教育研究课题组网站已加载');
    console.log('联系方式: lizhixing@education-research.cn');
});
