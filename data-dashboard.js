// 数据仪表盘交互脚本
document.addEventListener('DOMContentLoaded', function() {
    console.log('数据展示页面已加载');
    
    // 图表数据 - 来自PDF报告
    const chartData = {
        // 高中毕业生去向数据
        graduate: {
            labels: ['2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: '普通高校',
                    data: [45.2, 46.5, 47.1, 47.8, 48.3],
                    borderColor: '#1a56db',
                    backgroundColor: 'rgba(26, 86, 219, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: '职业院校',
                    data: [38.7, 37.9, 37.2, 36.5, 35.9],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: '直接就业',
                    data: [10.1, 9.8, 10.2, 10.5, 10.8],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: '其他',
                    data: [6.0, 5.8, 5.5, 5.2, 5.0],
                    borderColor: '#6b7280',
                    backgroundColor: 'rgba(107, 114, 128, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        
        // 心理健康数据
        mentalHealth: {
            labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
            datasets: [
                {
                    label: '焦虑比例 (%)',
                    data: [24.1, 25.3, 26.7, 28.2, 29.8, 31.5, 32.9, 33.8, 34.2, 34.7],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    yAxisID: 'y',
                    tension: 0.4
                },
                {
                    label: '幸福感指数',
                    data: [78.5, 76.8, 75.2, 73.6, 72.1, 70.3, 69.2, 68.5, 67.9, 67.2],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    yAxisID: 'y1',
                    tension: 0.4
                }
            ]
        },
        
        // 职业教育就业数据
        vocational: {
            labels: ['信息技术', '机械制造', '护理', '餐饮服务', '艺术设计'],
            datasets: [
                {
                    label: '就业率 (%)',
                    data: [95.2, 92.1, 96.5, 88.7, 84.3],
                    backgroundColor: [
                        'rgba(26, 86, 219, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(16, 185, 129, 0.8)',
                        'rgba(245, 158, 11, 0.8)',
                        'rgba(139, 92, 246, 0.8)'
                    ],
                    borderColor: [
                        '#1a56db',
                        '#3b82f6',
                        '#10b981',
                        '#f59e0b',
                        '#8b5cf6'
                    ],
                    borderWidth: 2
                },
                {
                    label: '企业满意度 (%)',
                    data: [88.5, 85.3, 91.2, 76.4, 79.8],
                    backgroundColor: 'rgba(107, 114, 128, 0.6)',
                    borderColor: '#6b7280',
                    borderWidth: 2
                }
            ]
        },
        
        // 地区教育资源分布
        regional: {
            labels: ['北京', '上海', '江苏', '浙江', '广东', '山东', '河南', '四川', '甘肃', '贵州'],
            datasets: [
                {
                    label: '投入指数',
                    data: [92.0, 90.0, 85.0, 83.0, 81.0, 78.0, 72.0, 70.0, 62.0, 60.0],
                    borderColor: '#1a56db',
                    backgroundColor: 'rgba(26, 86, 219, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.2
                },
                {
                    label: '公平指数',
                    data: [88.0, 86.0, 82.0, 81.0, 78.0, 75.0, 70.0, 68.0, 58.0, 55.0],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.2
                }
            ]
        }
    };
    
    // 图表实例存储
    let charts = {};
    
    // 初始化所有图表
    function initCharts() {
        // 1. 高中毕业生去向趋势图 (折线图)
        const graduateCtx = document.getElementById('graduateChart').getContext('2d');
        charts.graduate = new Chart(graduateCtx, {
            type: 'line',
            data: chartData.graduate,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false // 使用自定义图例
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 0,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        title: {
                            display: true,
                            text: '比例 (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '年份'
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'nearest'
                }
            }
        });
        
        // 2. 学生心理健康趋势图 (双Y轴折线图)
        const mentalHealthCtx = document.getElementById('mentalHealthChart').getContext('2d');
        charts.mentalHealth = new Chart(mentalHealthCtx, {
            type: 'line',
            data: chartData.mentalHealth,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: '焦虑比例 (%)'
                        },
                        min: 20,
                        max: 40
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: '幸福感指数'
                        },
                        min: 60,
                        max: 80,
                        grid: {
                            drawOnChartArea: false
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '年份'
                        }
                    }
                }
            }
        });
        
        // 3. 职业教育就业数据 (分组柱状图)
        const vocationalCtx = document.getElementById('vocationalChart').getContext('2d');
        charts.vocational = new Chart(vocationalCtx, {
            type: 'bar',
            data: chartData.vocational,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        title: {
                            display: true,
                            text: '比例 (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '专业类别'
                        }
                    }
                }
            }
        });
        
        // 4. 地区教育资源分布 (折线图)
        const regionalCtx = document.getElementById('regionalChart').getContext('2d');
        charts.regional = new Chart(regionalCtx, {
            type: 'line',
            data: chartData.regional,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 50,
                        max: 100,
                        title: {
                            display: true,
                            text: '指数'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: '地区'
                        }
                    }
                }
            }
        });
    }
    
    // 图表切换功能
    function initChartSwitcher() {
        const chartBtns = document.querySelectorAll('.chart-control-btn');
        const chartWrappers = document.querySelectorAll('.chart-wrapper');
        
        chartBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 更新按钮状态
                chartBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // 获取目标图表ID
                const chartId = this.getAttribute('data-chart');
                
                // 切换图表显示
                chartWrappers.forEach(wrapper => {
                    if (wrapper.id === `${chartId}-chart`) {
                        wrapper.style.display = 'block';
                        // 重新渲染图表以适应容器变化
                        setTimeout(() => {
                            if (charts[chartId]) {
                                charts[chartId].resize();
                            }
                        }, 50);
                    } else {
                        wrapper.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // 案例标签切换
    function initCaseTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 更新按钮状态
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // 获取目标标签ID
                const tabId = this.getAttribute('data-tab');
                
                // 切换内容显示
                tabContents.forEach(content => {
                    if (content.id === `${tabId}-tab`) {
                        content.style.display = 'block';
                    } else {
                        content.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // 数据表格展开/收起
    function initDataTable() {
        const toggleBtn = document.querySelector('.table-toggle-btn');
        const tableWrapper = document.querySelector('.data-table-wrapper');
        const icon = toggleBtn.querySelector('i');
        
        toggleBtn.addEventListener('click', function() {
            if (tableWrapper.style.display === 'none') {
                tableWrapper.style.display = 'block';
                icon.className = 'fas fa-chevron-up';
                this.innerHTML = '<i class="fas fa-chevron-up"></i> 收起数据表';
            } else {
                tableWrapper.style.display = 'none';
                icon.className = 'fas fa-chevron-down';
                this.innerHTML = '<i class="fas fa-chevron-down"></i> 展开数据表';
            }
        });
    }
    
    // 平滑滚动导航
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        // 更新导航状态
                        navLinks.forEach(l => l.classList.remove('active'));
                        this.classList.add('active');
                        
                        // 平滑滚动
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
        
        // 滚动时更新导航状态
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }
    
    // 动画效果：进度条动画
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target;
                    const targetWidth = fill.getAttribute('data-target');
                    fill.style.width = targetWidth;
                    observer.unobserve(fill);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }
    
    // 动画效果：数字计数
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalValue = parseFloat(element.textContent);
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
        }, { threshold: 0.5 });
        
        statNumbers.forEach(number => observer.observe(number));
    }
    
    // 数据导出功能（简化版）
    function initDataExport() {
        const exportBtn = document.createElement('button');
        exportBtn.className = 'export-btn';
        exportBtn.innerHTML = '<i class="fas fa-file-export"></i> 导出图表数据';
        exportBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            box-shadow: var(--card-shadow);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: var(--transition);
        `;
        
        document.body.appendChild(exportBtn);
        
        exportBtn.addEventListener('click', function() {
            // 简化版：提示用户下载原始PDF
            alert('完整数据请下载原始PDF报告文件。');
        });
        
        exportBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = 'var(--card-shadow-hover)';
        });
        
        exportBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--card-shadow)';
        });
    }
    // 在文件末尾的init()函数前添加以下代码

// 案例动态渲染系统
function initCaseStudies() {
    console.log(`初始化案例系统，共 ${Object.keys(educationCases).length} 个案例`);
    
    const tabButtonsContainer = document.querySelector('.tab-buttons');
    const tabContentContainer = document.querySelector('.cases-tabs');
    
    if (!tabButtonsContainer || !tabContentContainer) {
        console.error('案例容器未找到');
        return;
    }
    
    // 清空现有内容（保留第一个作为模板或完全重建）
    tabButtonsContainer.innerHTML = '';
    
    // 创建案例筛选器
    createCaseFilter();
    
    // 获取所有案例ID
    const caseIds = Object.keys(educationCases);
    
    // 生成标签按钮和内容
    caseIds.forEach((caseId, index) => {
        const caseData = educationCases[caseId];
        
        // 创建标签按钮
        const tabButton = document.createElement('button');
        tabButton.className = `tab-btn ${index === 0 ? 'active' : ''}`;
        tabButton.setAttribute('data-tab', caseId);
        tabButton.innerHTML = `<i class="fas fa-${caseData.icon}"></i> ${caseData.title.split(' ')[0]}`; // 取标题第一个词
        
        tabButtonsContainer.appendChild(tabButton);
        
        // 创建标签内容
        const tabContent = document.createElement('div');
        tabContent.className = `tab-content ${index === 0 ? 'active' : ''}`;
        tabContent.id = `${caseId}-tab`;
        if (index > 0) tabContent.style.display = 'none';
        
        // 生成案例卡片
        tabContent.innerHTML = generateCaseCardHTML(caseData);
        tabContentContainer.appendChild(tabContent);
    });
    
    // 重新绑定标签切换事件
    initCaseTabs();
    
    // 更新案例统计
    updateCaseStats();
}

// 生成案例卡片的HTML
function generateCaseCardHTML(caseData) {
    return `
        <div class="case-card" data-category="${caseData.category}" data-tags="${caseData.tags.join(',')}">
            <div class="case-header">
                <h4>${caseData.title}</h4>
                <div class="case-meta">
                    <span class="case-period"><i class="fas fa-calendar-alt"></i> ${caseData.period}</span>
                    <span class="case-location"><i class="fas fa-map-marker-alt"></i> ${caseData.location}</span>
                    <span class="case-category" style="background: ${caseData.color}20; color: ${caseData.color}">${caseData.category}</span>
                </div>
            </div>
            
            <div class="case-stats">
                ${caseData.stats.map(stat => `
                    <div class="case-stat">
                        <div class="case-stat-icon">
                            <i class="fas fa-${stat.icon}"></i>
                        </div>
                        <div class="case-stat-value">${stat.value}</div>
                        <div class="case-stat-label">${stat.label}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="case-mechanism">
                <h5><i class="fas fa-cogs"></i> 核心机制（对应主建议方向）</h5>
                <div class="mechanisms-grid">
                    ${caseData.mechanisms.map((mechanism, idx) => `
                        <div class="mechanism-item">
                            <div class="mechanism-number">${idx + 1}</div>
                            <div class="mechanism-content">
                                <h6>${mechanism.title}</h6>
                                <p>${mechanism.description}</p>
                                <span class="mechanism-relevance">${mechanism.relevance}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="case-outcomes">
                <div class="outcome-column">
                    <h6><i class="fas fa-check-circle" style="color: #10b981;"></i> 成效</h6>
                    <ul>
                        ${caseData.outcomes.positive.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                <div class="outcome-column">
                    <h6><i class="fas fa-exclamation-triangle" style="color: #f59e0b;"></i> 挑战</h6>
                    <ul>
                        ${caseData.outcomes.challenges.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            ${caseData.dataReferences.length > 0 ? `
            <div class="case-data">
                <h6><i class="fas fa-database"></i> 数据参考</h6>
                <div class="data-grid">
                    ${caseData.dataReferences.map(ref => `
                        <div class="data-item">
                            <div class="data-label">${ref.label}</div>
                            <div class="data-value">${ref.value}</div>
                            <div class="data-meta">${ref.year} | ${ref.source}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="case-insight">
                <h5><i class="fas fa-lightbulb"></i> 对本建议的启示</h5>
                <div class="insights-list">
                    ${caseData.insights.map(insight => `
                        <div class="insight-item">
                            <i class="fas fa-arrow-right"></i>
                            <p>${insight}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            ${caseData.resources.length > 0 ? `
            <div class="case-resources">
                <h6><i class="fas fa-link"></i> 相关资源</h6>
                <div class="resources-grid">
                    ${caseData.resources.map(resource => `
                        <a href="${resource.url}" class="resource-link" target="_blank">
                            <span class="resource-type">${resource.type}</span>
                            <span class="resource-title">${resource.title}</span>
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            <div class="case-footer">
                <div class="case-tags">
                    ${caseData.tags.map(tag => `<span class="case-tag">${tag}</span>`).join('')}
                </div>
                <div class="case-source">
                    <small>数据来源: ${caseData.source} | 更新: ${caseData.lastUpdated}</small>
                </div>
            </div>
        </div>
    `;
}

// 创建案例筛选器
function createCaseFilter() {
    const casesSection = document.querySelector('.cases-section');
    if (!casesSection) return;
    
    const filterHTML = `
        <div class="case-filters">
            <div class="filter-group">
                <label for="category-filter"><i class="fas fa-filter"></i> 按类别筛选:</label>
                <select id="category-filter" class="filter-select">
                    <option value="all">全部类别</option>
                    <option value="职业教育">职业教育</option>
                    <option value="基础教育">基础教育</option>
                    <option value="课程改革">课程改革</option>
                    <option value="教育政策">教育政策</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="tag-filter"><i class="fas fa-tags"></i> 按标签筛选:</label>
                <div class="tag-filters">
                    <button class="tag-filter active" data-tag="all">全部</button>
                    <button class="tag-filter" data-tag="职业教育">职业教育</button>
                    <button class="tag-filter" data-tag="项目式学习">项目式学习</button>
                    <button class="tag-filter" data-tag="跨学科">跨学科</button>
                    <button class="tag-filter" data-tag="国际案例">国际案例</button>
                </div>
            </div>
            <div class="filter-stats">
                <span id="case-count">0</span> 个案例
            </div>
        </div>
    `;
    
    const sectionHeader = casesSection.querySelector('.section-header');
    sectionHeader.insertAdjacentHTML('afterend', filterHTML);
    
    // 绑定筛选事件
    initCaseFilters();
}

// 初始化案例筛选
function initCaseFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const tagFilters = document.querySelectorAll('.tag-filter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterCases);
    }
    
    tagFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            tagFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            filterCases();
        });
    });
}

// 筛选案例
function filterCases() {
    const selectedCategory = document.getElementById('category-filter')?.value || 'all';
    const selectedTag = document.querySelector('.tag-filter.active')?.dataset.tag || 'all';
    const caseCards = document.querySelectorAll('.case-card');
    
    let visibleCount = 0;
    
    caseCards.forEach(card => {
        const cardCategory = card.dataset.category;
        const cardTags = card.dataset.tags.split(',');
        
        const categoryMatch = selectedCategory === 'all' || cardCategory === selectedCategory;
        const tagMatch = selectedTag === 'all' || cardTags.includes(selectedTag);
        
        if (categoryMatch && tagMatch) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // 更新计数
    const caseCountEl = document.getElementById('case-count');
    if (caseCountEl) {
        caseCountEl.textContent = visibleCount;
    }
}

// 更新案例统计
function updateCaseStats() {
    const caseCount = Object.keys(educationCases).length;
    const categories = [...new Set(Object.values(educationCases).map(c => c.category))];
    
    console.log(`案例库统计: ${caseCount}个案例, ${categories.length}个类别`);
}

// 修改init()函数，在初始化时调用案例系统
function init() {
    initCharts();
    initChartSwitcher();
    initCaseStudies(); // 替换原来的 initCaseTabs()
    initDataTable();
    initSmoothScroll();
    animateProgressBars();
    animateNumbers();
    initDataExport();
    
    console.log('数据仪表盘初始化完成');
}
    // 初始化所有功能
    function init() {
        initCharts();
        initChartSwitcher();
        initCaseTabs();
        initDataTable();
        initSmoothScroll();
        animateProgressBars();
        animateNumbers();
        initDataExport();
        
        console.log('数据仪表盘初始化完成');
        console.log('可用图表:', Object.keys(charts));
    }
    
    // 页面加载完成后初始化
    window.addEventListener('load', init);
});
