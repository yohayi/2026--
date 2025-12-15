// script.js - 主页专用交互脚本

document.addEventListener('DOMContentLoaded', function() {
    console.log('知行教育研究课题组网站已加载');
    
    // 1. 初始化页面元素
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.card');
    const dataNumbers = document.querySelectorAll('.data-number');
    
    // 2. 平滑滚动导航
    function setupSmoothScrolling() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        // 移除所有active类
                        navLinks.forEach(l => l.classList.remove('active'));
                        
                        // 添加当前active类
                        this.classList.add('active');
                        
                        // 平滑滚动到目标区域
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // 更新浏览器历史记录
                        history.pushState(null, null, `#${targetId}`);
                    }
                }
            });
        });
        
        // 处理浏览器的前进/后退按钮
        window.addEventListener('popstate', function() {
            const hash = window.location.hash.substring(1);
            if (hash) {
                const targetSection = document.getElementById(hash);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    navLinks.forEach(l => {
                        l.classList.remove('active');
                        if (l.getAttribute('href') === `#${hash}`) {
                            l.classList.add('active');
                        }
                    });
                }
            }
        });
    }
    
    // 3. 滚动时更新导航激活状态
    function setupScrollSpy() {
        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // 4. 数字动画效果
    function animateNumbers() {
        if (dataNumbers.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalValue = parseInt(element.textContent.replace(/,/g, ''));
                    const duration = 2000;
                    const startTime = Date.now();
                    
                    // 临时清空内容
                    element.textContent = '0';
                    
                    function updateNumber() {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // 使用缓动函数
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        const currentValue = Math.floor(finalValue * easeOutQuart);
                        
                        element.textContent = currentValue.toLocaleString();
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateNumber);
                        } else {
                            element.textContent = finalValue.toLocaleString();
                        }
                    }
                    
                    updateNumber();
                    observer.unobserve(element);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '50px'
        });
        
        dataNumbers.forEach(number => {
            observer.observe(number);
        });
    }
    
    // 5. 卡片悬停效果
    function setupCardHover() {
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // 6. 页面加载动画
    function setupPageAnimations() {
        // 英雄区域动画
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.opacity = '0';
            heroSection.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                heroSection.style.opacity = '1';
                heroSection.style.transform = 'translateY(0)';
            }, 300);
        }
        
        // 卡片延迟显示
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 400 + (index * 100));
        });
    }
    
    // 7. 语言切换功能
    function setupLanguageSwitch() {
        const langLinks = document.querySelectorAll('.language-switch a');
        
        langLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 移除所有active类
                langLinks.forEach(l => l.classList.remove('active'));
                
                // 添加当前active类
                this.classList.add('active');
                
                // 这里可以添加实际的语言切换逻辑
                const lang = this.textContent;
                console.log(`切换到${lang}语言`);
                
                // 显示加载提示
                showNotification(`正在切换至${lang === 'EN' ? '英文' : '中文'}界面...`);
            });
        });
    }
    
    // 8. 通知系统
    function showNotification(message, type = 'info') {
        // 防止重复通知
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // 添加样式
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // 3秒后自动移除
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
    
    // 9. 初始化所有功能
    function initializeAll() {
        setupSmoothScrolling();
        setupScrollSpy();
        animateNumbers();
        setupCardHover();
        setupPageAnimations();
        setupLanguageSwitch();
        
        // 添加CSS动画关键帧
        if (!document.querySelector('#animation-styles')) {
            const style = document.createElement('style');
            style.id = 'animation-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        console.log('所有功能初始化完成');
    }
    
    // 启动所有功能
    initializeAll();
    
    // 页面加载完成提示
    window.addEventListener('load', function() {
        console.log('页面完全加载完成');
        document.body.classList.add('loaded');
    });
});
