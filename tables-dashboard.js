// tables-dashboard.js - 数据表格控制脚本

document.addEventListener('DOMContentLoaded', function() {
    console.log('表格系统初始化...');
    
    // 检查数据是否加载
    if (typeof dataTables === 'undefined') {
        console.error('❌ dataTables 未定义！请检查 tables-data.js 是否已加载');
        showError('表格数据未加载，请刷新页面或检查控制台错误');
        return;
    }
    
    console.log(`✅ 检测到 ${Object.keys(dataTables).length} 个数据表格`);
    
    // 初始化表格系统
    initTablesSystem();
    
    // 初始化表格切换功能
    initTableTabs();
    
    // 初始化图表渲染（如果表格有图表数据）
    initTableCharts();
});

// 显示错误信息
function showError(message) {
    const tablesContainer = document.querySelector('.tables-section, #tables-container');
    if (tablesContainer) {
        tablesContainer.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h3>数据加载失败</h3>
                <p>${message}</p>
                <button onclick="location.reload()" class="retry-btn">
                    <i class="fas fa-redo"></i> 重新加载
                </button>
            </div>
        `;
    }
}

// 初始化表格系统
function initTablesSystem() {
    // 查找表格容器
    const tablesContainer = document.getElementById('tables-container');
    const tablesSection = document.querySelector('.tables-section');
    
    const container = tablesContainer || tablesSection;
    if (!container) {
        console.warn('未找到表格容器，将创建默认容器');
        createDefaultTableContainer();
        return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 添加表格筛选器
    addTableFilters(container);
    
    // 渲染所有表格
    renderAllTables(container);
}

// 创建默认表格容器
function createDefaultTableContainer() {
    const mainContent = document.querySelector('.dashboard-content, main');
    if (!mainContent) {
        console.error('找不到主要内容区域');
        return;
    }
    
    const tablesSection = document.createElement('section');
    tablesSection.className = 'tables-section';
    tablesSection.id = 'tables-section';
    tablesSection.innerHTML = `
        <div class="tables-header">
            <h3><i class="fas fa-table"></i> 数据转换与分析表</h3>
            <p>线性关系、时间线对比、国际矩阵等多维数据展示</p>
        </div>
        <div class="table-filters" id="table-filters"></div>
        <div class="table-tabs" id="table-tabs"></div>
        <div id="tables-container" class="tables-container"></div>
    `;
    
    mainContent.appendChild(tablesSection);
    
    // 重新初始化
    setTimeout(() => {
        initTablesSystem();
        initTableTabs();
    }, 100);
}

// 添加表格筛选器
function addTableFilters(container) {
    const filters = document.createElement('div');
    filters.className = 'table-filters';
    filters.id = 'table-filters';
    
    // 添加类型筛选
    filters.innerHTML = `
        <div class="filter-group">
            <label for="table-type-filter">
                <i class="fas fa-filter"></i> 表格类型：
            </label>
            <select id="table-type-filter" class="table-filter-select">
                <option value="all">全部类型</option>
                <option value="linear-regression">线性回归表</option>
                <option value="timeline-comparison">时间线对比表</option>
                <option value="comparison-matrix">矩阵对比表</option>
            </select>
        </div>
        
        <div class="filter-group">
            <div class="view-toggle">
                <button class="view-btn active" data-view="table">
                    <i class="fas fa-table"></i> 表格视图
                </button>
                <button class="view-btn" data-view="chart">
                    <i class="fas fa-chart-bar"></i> 图表视图
                </button>
                <button class="view-btn" data-view="both">
                    <i class="fas fa-columns"></i> 双栏视图
                </button>
            </div>
        </div>
        
        <div class="filter-stats">
            <span id="table-count">${Object.keys(dataTables).length}</span> 个表格
        </div>
    `;
    
    // 插入到容器开头
    if (container.querySelector('.tables-header')) {
        container.querySelector('.tables-header').after(filters);
    } else {
        container.prepend(filters);
    }
    
    // 绑定筛选事件
    initTableFilters();
}

// 初始化表格筛选
function initTableFilters() {
    // 类型筛选
    const typeFilter = document.getElementById('table-type-filter');
    if (typeFilter) {
        typeFilter.addEventListener('change', filterTables);
    }
    
    // 视图切换
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            changeTableView(this.dataset.view);
        });
    });
}

// 筛选表格
function filterTables() {
    const selectedType = document.getElementById('table-type-filter').value;
    const tableCards = document.querySelectorAll('.table-card');
    
    let visibleCount = 0;
    
    tableCards.forEach(card => {
        const cardType = card.dataset.type;
        
        if (selectedType === 'all' || cardType === selectedType) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // 更新计数
    const countElement = document.getElementById('table-count');
    if (countElement) {
        countElement.textContent = visibleCount;
    }
}

// 改变表格视图
function changeTableView(viewType) {
    const tablesContainer = document.getElementById('tables-container');
    if (!tablesContainer) return;
    
    // 保存当前滚动位置
    const scrollPos = window.scrollY;
    
    // 重新渲染表格（应用新视图）
    renderAllTables(tablesContainer, viewType);
    
    // 恢复滚动位置
    window.scrollTo(0, scrollPos);
}

// 渲染所有表格
function renderAllTables(container, viewType = 'table') {
    const tablesContainer = container.querySelector('#tables-container') || container;
    
    // 创建表格卡片容器
    if (!tablesContainer.querySelector('.table-cards-grid')) {
        const cardsGrid = document.createElement('div');
        cardsGrid.className = 'table-cards-grid';
        tablesContainer.appendChild(cardsGrid);
    }
    
    const cardsGrid = tablesContainer.querySelector('.table-cards-grid');
    cardsGrid.innerHTML = '';
    
    // 渲染每个表格
    Object.values(dataTables).forEach(tableData => {
        const tableCard = createTableCard(tableData, viewType);
        cardsGrid.appendChild(tableCard);
    });
}

// 创建表格卡片
function createTableCard(tableData, viewType = 'table') {
    const card = document.createElement('div');
    card.className = 'table-card';
    card.id = `table-${tableData.id}`;
    card.dataset.type = tableData.type;
    
    // 根据视图类型决定内容
    let contentHTML = '';
    
    if (viewType === 'chart' && tableData.chartData) {
        // 图表视图
        contentHTML = createChartViewHTML(tableData);
    } else if (viewType === 'both') {
        // 双栏视图
        contentHTML = createDualViewHTML(tableData);
    } else {
        // 表格视图（默认）
        contentHTML = createTableViewHTML(tableData);
    }
    
    card.innerHTML = `
        <div class="table-card-header" style="border-left-color: ${tableData.color}">
            <div class="table-card-icon">
                <i class="fas fa-${tableData.icon}" style="color: ${tableData.color}"></i>
            </div>
            <div class="table-card-title">
                <h4>${tableData.title}</h4>
                <p class="table-subtitle">${tableData.subtitle}</p>
                <div class="table-meta">
                    <span class="table-type" style="background: ${tableData.color}20; color: ${tableData.color}">
                        ${getTableTypeLabel(tableData.type)}
                    </span>
                    <span class="table-updated">
                        <i class="fas fa-calendar-alt"></i> ${tableData.lastUpdated}
                    </span>
                </div>
            </div>
        </div>
        
        <div class="table-card-content">
            ${contentHTML}
        </div>
        
        <div class="table-card-footer">
            <div class="table-insights">
                <h5><i class="fas fa-lightbulb"></i> 主要结论</h5>
                <ul>
                    ${tableData.insights.map(insight => `<li>${insight}</li>`).join('')}
                </ul>
            </div>
            <div class="table-source">
                <small>数据来源：${tableData.source}</small>
            </div>
        </div>
    `;
    
    return card;
}

// 创建表格视图HTML
function createTableViewHTML(tableData) {
    switch (tableData.type) {
        case 'linear-regression':
            return createLinearRegressionTableHTML(tableData);
        case 'timeline-comparison':
            return createTimelineTableHTML(tableData);
        case 'comparison-matrix':
            return createMatrixTableHTML(tableData);
        default:
            return '<p>表格类型不支持</p>';
    }
}

// 创建线性回归表HTML
function createLinearRegressionTableHTML(tableData) {
    return `
        <div class="table-responsive">
            <table class="data-table">
                <thead>
                    <tr>
                        ${tableData.headers.map(header => `<th>${header}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${tableData.rows.map(row => `
                        <tr>
                            <td>${row.input.toFixed(1)}</td>
                            <td>${row.output.toFixed(1)}</td>
                            <td>${row.correlation.toFixed(2)}</td>
                            <td>${row.samples}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="table-stats">
            <h5>回归统计</h5>
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-label">决定系数 (R²)</div>
                    <div class="stat-value">${tableData.statistics.rSquared.toFixed(2)}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">显著性 (p值)</div>
                    <div class="stat-value">${tableData.statistics.significance}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">斜率</div>
                    <div class="stat-value">${tableData.statistics.slope.toFixed(2)}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">截距</div>
                    <div class="stat-value">${tableData.statistics.intercept.toFixed(1)}</div>
                </div>
            </div>
        </div>
    `;
}

// 创建时间线表HTML
function createTimelineTableHTML(tableData) {
    let timelineHTML = '';
    
    tableData.timeline.forEach(item => {
        timelineHTML += `
            <div class="timeline-item">
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-events">
                    ${item.events.map(event => `
                        <div class="timeline-event" style="border-left-color: ${tableData.countryColors[event.country] || '#6b7280'}">
                            <span class="event-country" style="color: ${tableData.countryColors[event.country] || '#6b7280'}">
                                ${event.country}
                            </span>
                            <span class="event-text">${event.event}</span>
                            <span class="event-impact impact-${event.impact}">
                                ${event.impact === 'high' ? '高影响' : event.impact === 'medium' ? '中影响' : '低影响'}
                            </span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    return `<div class="timeline-container">${timelineHTML}</div>`;
}

// 创建矩阵表HTML
function createMatrixTableHTML(tableData) {
    const countries = Object.keys(tableData.matrix[0].countries);
    
    return `
        <div class="table-responsive">
            <table class="comparison-matrix">
                <thead>
                    <tr>
                        <th>指标</th>
                        ${countries.map(country => `<th>${country}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${tableData.matrix.map(row => `
                        <tr>
                            <td class="matrix-indicator">${row.indicator}</td>
                            ${countries.map(country => `
                                <td class="matrix-value">
                                    ${typeof row.countries[country] === 'number' ? 
                                        row.countries[country].toFixed(1) : 
                                        row.countries[country]}
                                </td>
                            `).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="matrix-legend">
            <div class="legend-item">
                <div class="legend-color color-high"></div>
                <div class="legend-text">高于平均值</div>
            </div>
            <div class="legend-item">
                <div class="legend-color color-medium"></div>
                <div class="legend-text">接近平均值</div>
            </div>
            <div class="legend-item">
                <div class="legend-color color-low"></div>
                <div class="legend-text">低于平均值</div>
            </div>
        </div>
    `;
}

// 创建图表视图HTML
function createChartViewHTML(tableData) {
    if (!tableData.chartData) {
        return '<p class="no-chart">此表格暂无图表数据</p>';
    }
    
    return `
        <div class="chart-container">
            <canvas id="chart-${tableData.id}"></canvas>
        </div>
    `;
}

// 创建双栏视图HTML
function createDualViewHTML(tableData) {
    return `
        <div class="dual-view-container">
            <div class="dual-view-table">
                ${createTableViewHTML(tableData)}
            </div>
            <div class="dual-view-chart">
                ${tableData.chartData ? createChartViewHTML(tableData) : '<p class="no-chart">暂无图表</p>'}
            </div>
        </div>
    `;
}

// 获取表格类型标签
function getTableTypeLabel(type) {
    const labels = {
        'linear-regression': '线性回归表',
        'timeline-comparison': '时间线对比表',
        'comparison-matrix': '矩阵对比表'
    };
    return labels[type] || type;
}

// 初始化表格标签页
function initTableTabs() {
    const tabButtons = document.querySelectorAll('.table-tab-btn');
    const tabContents = document.querySelectorAll('.table-tab-content');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新按钮状态
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 获取目标标签ID
            const tabId = this.dataset.tab;
            
            // 切换内容显示
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `${tabId}-tab`) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// 初始化表格图表
function initTableCharts() {
    Object.values(dataTables).forEach(tableData => {
        if (tableData.chartData) {
            renderTableChart(tableData);
        }
    });
}

// 渲染表格图表
function renderTableChart(tableData) {
    const canvas = document.getElementById(`chart-${tableData.id}`);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'scatter',
        data: tableData.chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '教育投入指数'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '学业成果指数'
                    }
                }
            }
        }
    });
}

// 导出功能
function initExportButtons() {
    document.querySelectorAll('.export-table-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tableId = this.dataset.table;
            exportTableAsCSV(tableId);
        });
    });
}

// 导出表格为CSV
function exportTableAsCSV(tableId) {
    const tableData = dataTables[tableId];
    if (!tableData) return;
    
    let csvContent = '';
    
    // 添加标题
    csvContent += `${tableData.title}\n`;
    csvContent += `${tableData.subtitle}\n\n`;
    
    // 根据表格类型生成CSV内容
    switch (tableData.type) {
        case 'linear-regression':
            csvContent += tableData.headers.join(',') + '\n';
            tableData.rows.forEach(row => {
                csvContent += `${row.input},${row.output},${row.correlation},${row.samples}\n`;
            });
            break;
        case 'comparison-matrix':
            // 这里需要根据实际数据结构调整
            break;
    }
    
    // 创建下载链接
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${tableData.title}.csv`;
    link.click();
}
