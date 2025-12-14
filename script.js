// script.js - 完整交互版本
document.addEventListener('DOMContentLoaded', function() {
    console.log('知行教育研究课题组网站已加载');

    // ========== 1. 原有平滑滚动功能 (保留) ==========
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 只处理锚点链接 (#home, #research 等)
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // 更新导航激活状态
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                    
                    // 平滑滚动到目标区域
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
            // 如果是外链（如 data-dashboard.html），则正常跳转
        });
    });
    
    // 滚动时更新导航激活状态
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
    // 修改导航切换逻辑
document.querySelectorAll('.nav-btn').forEach(btn => {
    if (!btn.href) {
        btn.addEventListener('click', function() {
            // 更新按钮状态
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 显示对应部分
            const section = this.dataset.section;
            const sections = ['charts', 'cases', 'tables', 'comparison'];
            
            sections.forEach(sec => {
                const element = document.getElementById(`${sec}-section`);
                if (element) {
                    element.style.display = (sec === section) ? 'block' : 'none';
                }
            });
        });
    }
});

    // ========== 2. 新增：动态内容加载功能 ==========
    console.log('正在初始化动态内容加载功能...');
    
    // 获取动态内容所需的DOM元素
    const dynamicContainer = document.getElementById('dynamic-content-container');
    const dynamicTitle = document.getElementById('dynamic-title');
    const dynamicContent = document.getElementById('dynamic-content');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('close-dynamic-content');
    
    // 检查必要元素是否存在
    if (!dynamicContainer || !overlay) {
        console.error('错误：动态内容容器或遮罩层未找到！请检查 index.html 中是否添加了 #dynamic-content-container 和 #overlay');
        return; // 如果基础元素缺失，则停止初始化此功能
    }
    
    // 2.1 为所有具有 data-page 属性的卡片绑定点击事件
    const interactiveCards = document.querySelectorAll('[data-page]');
    console.log(`找到 ${interactiveCards.length} 个可交互卡片`);
    
    interactiveCards.forEach(card => {
        card.style.cursor = 'pointer'; // 添加手型光标提示
        card.addEventListener('click', function() {
            const pageUrl = this.getAttribute('data-page');
            const cardTitle = this.querySelector('h4').textContent;
            console.log(`点击卡片，加载: ${pageUrl}, 标题: ${cardTitle}`);
            loadDynamicContent(pageUrl, cardTitle);
        });
    });

    // 2.2 加载动态内容的函数
    function loadDynamicContent(url, title) {
        console.log(`开始加载: ${url}`);
        
        // 显示加载状态
        dynamicContent.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i> 
                <p>正在加载「${title}」的详细内容...</p>
                <p class="loading-sub">请稍候</p>
            </div>
        `;
        
        dynamicTitle.textContent = title;
        dynamicContainer.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
        
        // 使用 Fetch API 获取子页面内容
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: 无法加载 ${url}`);
                }
                return response.text();
            })
            .then(html => {
                console.log(`成功获取 ${url} 的内容`);
                
                // 解析HTML，提取主要内容
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // 尝试获取子页面的 <main> 或 <body> 内容
                let mainContent = doc.querySelector('main');
                if (!mainContent) {
                    mainContent = doc.body;
                }
                
                if (mainContent && mainContent.innerHTML.trim().length > 0) {
                    // 成功获取内容
                    dynamicContent.innerHTML = mainContent.innerHTML;
                    
                    // 添加一个返回提示
                    const backHint = document.createElement('div');
                    backHint.className = 'back-hint';
                    backHint.innerHTML = `<p><i class="fas fa-info-circle"></i> 点击弹窗外部或按ESC键可关闭此窗口</p>`;
                    dynamicContent.appendChild(backHint);
                    
                } else {
                    // 内容为空
                    dynamicContent.innerHTML = `
                        <div class="error">
                            <i class="fas fa-exclamation-triangle"></i>
                            <h4>内容加载完成，但未找到有效内容</h4>
                            <p>文件 ${url} 可能存在或内容结构不匹配。</p>
                            <a href="${url}" target="_blank" class="card-btn card-btn-primary">
                                <i class="fas fa-external-link-alt"></i> 尝试直接访问该页面
                            </a>
                        </div>
                    `;
                }
            })
            .catch(error => {
                console.error('加载动态内容失败:', error);
                
                // 显示错误信息
                dynamicContent.innerHTML = `
                    <div class="error">
                        <i class="fas fa-exclamation-circle"></i>
                        <h4>内容加载失败</h4>
                        <p>抱歉，加载「${title}」内容时出现错误。</p>
                        <p class="error-detail">可能原因：</p>
                        <ul>
                            <li>文件 <strong>${url}</strong> 不存在</li>
                            <li>网络连接问题</li>
                            <li>文件路径不正确</li>
                        </ul>
                        <p>请检查文件是否已上传至正确位置。</p>
                        <div class="error-actions">
                            <button onclick="location.reload()" class="card-btn card-btn-secondary">
                                <i class="fas fa-redo"></i> 刷新页面
                            </button>
                            <a href="${url}" target="_blank" class="card-btn card-btn-primary">
                                <i class="fas fa-external-link-alt"></i> 直接访问
                            </a>
                        </div>
                    </div>
                `;
            });
    }

    // 2.3 关闭动态内容窗口
    function closeDynamicContent() {
        dynamicContainer.style.display = 'none';
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // 恢复背景滚动
        dynamicContent.innerHTML = ''; // 清空内容
        console.log('已关闭动态内容窗口');
    }

    // 绑定关闭事件
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDynamicContent);
    } else {
        console.error('关闭按钮未找到！');
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeDynamicContent);
    }
    
    // 按ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && dynamicContainer.style.display === 'block') {
            closeDynamicContent();
        }
    });
    
    // ========== 3. 数据数字动画效果 ==========
    const dataNumbers = document.querySelectorAll('.data-number');
    
    if (dataNumbers.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalValue = parseInt(element.textContent.replace(/,/g, ''));
                    const duration = 1500;
                    const startTime = Date.now();
                    
                    function updateNumber() {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const currentValue = Math.floor(finalValue * progress);
                        
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
        }, observerOptions);
        
        dataNumbers.forEach(number => {
            observer.observe(number);
        });
    }
    
    // ========== 4. 打印功能 ==========
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> 打印本页';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #1a56db;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
        font-family: inherit;
    `;
    
    document.body.appendChild(printButton);
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    });
    
    printButton.addEventListener('click', function() {
        window.print();
    });

    console.log('网站初始化完成，所有功能已加载');
});
