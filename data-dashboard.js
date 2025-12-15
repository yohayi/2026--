// data-dashboard.js - 数据报告页面专用脚本

document.addEventListener('DOMContentLoaded', function() {
    console.log('数据报告页面已加载');
    
    // 1. 初始化图表数据
    const chartData = {
        // 毕业生去向趋势数据
        graduateTrend: {
            labels: ['2019', '2020', '2021', '2022', '2023'],
            datasets: [
                {
                    label: '本科院校',
                    data: [65.2, 66.8, 68.3, 69.5, 70.2],
                    borderColor: '#1a56db',
                    backgroundColor: 'rgba(26, 86, 219, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '职业院校',
                    data: [22.3, 23.5, 24.8, 26.1, 27.5],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '直接就业',
                    data: [8.5, 6.2, 4.3, 2.8, 1.5],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '其他选择',
                    data: [4.0, 3.5, 2.6, 1.6, 0.8],
                    borderColor: '#6b7280',
                    backgroundColor: 'rgba(107, 114, 128, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        
        // 学生心理健康数据
        mentalHealth: {
            labels: ['小学低年级', '小学高年级', '初中', '高中'],
            datasets: [
                {
                    label: '正常水平',
                    data: [88.2, 82.5, 76.3, 68.9],
                    backgroundColor: '#1a56db',
                    borderColor: '#0e4aa3',
                    borderWidth: 1
                },
                {
                    label: '轻度压力',
                    data: [8.3, 12.1, 15.2, 18.5],
                    backgroundColor: '#f59e0b',
                    borderColor: '#d97706',
                    borderWidth: 1
                },
                {
                    label: '中度压力',
                    data: [2.5, 4.2, 6.8, 9.3],
                    backgroundColor: '#ef4444',
                    borderColor: '#dc2626',
                    borderWidth: 1
                },
                {
                    label: '重度压力',
                    data: [1.0, 1.2, 1.7, 3.3],
                    backgroundColor: '#7c3aed',
                    borderColor: '#6d28d9',
                    borderWidth: 1
                }
            ]
        },
        
        // 教育经费投入
        educationInvestment: {
            labels: ['东部地区', '中部地区', '西部地区', '东北地区'],
            datasets: [
                {
                    label: '生均经费（万元）',
                    data: [2.8, 1.9, 2.1, 1.7],
                    backgroundColor: [
                        'rgba(26, 86, 219, 0.8)',
                        'rgba(59, 130, 246, 0.8)',
                        'rgba(96, 165, 250, 0.8)',
                        'rgba(147, 197, 253, 0.8)'
                    ],
                    borderColor: [
                        'rgb(26, 86, 219)',
                        'rgb(59, 130, 246)',
                        'rgb(96, 165, 250)',
                        'rgb(147, 197, 253)'
                    ],
                    borderWidth: 1
                }
            ]
        },
        
        // 职业教育就业率
        vocationalEmployment: {
            labels: ['2018', '2019', '2020', '2021', '2022'],
            datasets: [
                {
                    label: '初次就业率',
                    data: [91.2, 92.5, 90.8, 93.1, 94.3],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '专业对口率',
                    data: [75.3, 77.6, 78.9, 81.2, 83.5],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    tension: 0.4,
                    fill: true
                }
            ]
        }
    };

    // 2. 初始化图表
    let graduateChart, mentalHealthChart, investmentChart, vocationalChart;

    // 等待页面完全加载后初始化图表
    window.addEventListener('load', function() {
        initializeCharts();
        initializeAnimations();
        setupEventListeners();
    });

    // 初始化图表函数
    function initializeCharts() {
        // 获取Canvas上下文
        const graduateCtx = document.getElementById('graduateTrendChart')?.getContext('2d');
        const mentalCtx = document.getElementById('mentalHealthChart')?.getContext('2d');
        const investmentCtx = document.getElementById('investmentChart')?.getContext('2d');
        const vocationalCtx = document.getElementById('vocationalChart')?.getContext('2d');

        // 检查Canvas元素是否存在
        if (!graduateCtx) {
            console.warn('毕业生去向图表Canvas元素未找到');
            return;
        }

        // 毕业生去向趋势图
        graduateChart = new Chart(graduateCtx, {
            type: 'line',
            data: chartData.graduateTrend,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            padding: 20,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 0,
                        max: 100,
                        title: {
                            display: true,
                            text: '占比 (%)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
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
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });

        // 学生心理健康图
        if (mentalCtx) {
            mentalHealthChart = new Chart(mentalCtx, {
                type: 'bar',
                data: chartData.mentalHealth,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                padding: 20
                            }
                        }
                    },
                    scales: {
                        x: {
                            stacked: true,
                            title: {
                                display: true,
                                text: '学段'
                            }
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true,
                            max: 100,
                            title: {
                                display: true,
                                text: '学生占比 (%)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    },
                    animation: {
                        duration: 1500
                    }
                }
            });
        }

        // 教育经费投入图
        if (investmentCtx) {
            investmentChart = new Chart(investmentCtx, {
                type: 'bar',
                data: chartData.educationInvestment,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `生均经费: ${context.parsed.y} 万元`;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '生均经费 (万元)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: '地区'
                            }
                        }
                    },
                    animation: {
                        duration: 1500
                    }
                }
            });
        }

        // 职业教育就业率图
        if (vocationalCtx) {
            vocationalChart = new Chart(vocationalCtx, {
                type: 'line',
                data: chartData.vocationalEmployment,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                padding: 20
                            }
                        }
                    },
                    scales: {
                        y: {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            title: {
                                display: true,
                                text: '就业率 (%)'
                            },
                            min: 70,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: '年份'
                            }
                        }
                    },
                    animation: {
                        duration: 1500
                    }
                }
            });
        }
    }

    // 3. 初始化动画效果
    function initializeAnimations() {
        // 数字动画效果
        const statNumbers = document.querySelectorAll('.stat-number');
        
        if (statNumbers.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const originalText = element.textContent;
                        const valueMatch = originalText.match(/([\d,]+)/);
                        
                        if (valueMatch) {
                            const finalValue = parseFloat(valueMatch[1].replace(/,/g, ''));
                            const unit = originalText.replace(valueMatch[1], '').trim();
                            const duration = 1500;
                            const startTime = Date.now();
                            
                            element.textContent = '0' + (unit ? ' ' + unit : '');
                            
                            function updateNumber() {
                                const elapsed = Date.now() - startTime;
                                const progress = Math.min(elapsed / duration, 1);
                                const currentValue = Math.floor(finalValue * progress);
                                
                                element.textContent = currentValue.toLocaleString() + (unit ? ' ' + unit : '');
                                
                                if (progress < 1) {
                                    requestAnimationFrame(updateNumber);
                                } else {
                                    element.textContent = finalValue.toLocaleString() + (unit ? ' ' + unit : '');
                                }
                            }
                            
                            updateNumber();
                            observer.unobserve(element);
                        }
                    }
                });
            }, { threshold: 0.1 });
            
            statNumbers.forEach(number => {
                observer.observe(number);
            });
        }
    }

    // 4. 事件监听器设置
    function setupEventListeners() {
        // 图表时间范围切换
        const timeRangeBtns = document.querySelectorAll('.chart-control-btn');
        timeRangeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                timeRangeBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // 这里可以添加更新图表数据的逻辑
                console.log('切换到时间范围:', this.textContent);
            });
        });

        // 表格展开/折叠
        const tableToggleBtns = document.querySelectorAll('.table-toggle-btn');
        tableToggleBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tableWrapper = this.closest('.data-table-container').querySelector('.data-table-wrapper');
                const icon = this.querySelector('i');
                
                if (tableWrapper.style.display === 'none' || tableWrapper.classList.contains('collapsed')) {
                    tableWrapper.style.display = 'block';
                    tableWrapper.classList.remove('collapsed');
                    icon.className = 'fas fa-chevron-up';
                    this.querySelector('span').textContent = '收起表格';
                } else {
                    tableWrapper.style.display = 'none';
                    tableWrapper.classList.add('collapsed');
                    icon.className = 'fas fa-chevron-down';
                    this.querySelector('span').textContent = '展开表格';
                }
            });
        });

        // 数据卡片悬停效果
        const statCards = document.querySelectorAll('.stat-card');
        statCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // 窗口调整大小时的图表重绘
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (graduateChart) graduateChart.resize();
                if (mentalHealthChart) mentalHealthChart.resize();
                if (investmentChart) investmentChart.resize();
                if (vocationalChart) vocationalChart.resize();
            }, 250);
        });

        // 下载按钮点击事件
        const downloadBtn = document.querySelector('.download-btn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                // 模拟下载过程
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 生成报告中...';
                this.style.opacity = '0.8';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.opacity = '1';
                    
                    // 显示下载成功提示
                    showNotification('数据报告正在生成中，请稍候查看...', 'info');
                }, 1500);
            });
        }
    }

    // 5. 辅助函数
    function showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
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
        
        // 添加关键帧动画
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
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
        
        document.body.appendChild(notification);
        
        // 关闭按钮事件
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // 自动关闭
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 3000);
    }

    console.log('数据报告页面脚本初始化完成');
});
