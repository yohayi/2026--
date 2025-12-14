// tables-data.js - 数据转换表数据库
// 包含线性转换表、对比表、时间线等可视化数据

const dataTables = {
    // 线性转换表：教育投入与产出关系
    "education-input-output": {
        id: "education-input-output",
        title: "教育投入与学业成果线性关系表",
        subtitle: "基于全国23省市5,200份样本的回归分析",
        type: "linear-regression",
        color: "#1a56db",
        icon: "chart-line",
        
        // 表头
        headers: ["教育投入指数", "学业成果指数", "相关系数", "样本量"],
        
        // 表格数据
        rows: [
            { input: 60.0, output: 58.2, correlation: 0.42, samples: 520 },
            { input: 65.0, output: 62.8, correlation: 0.45, samples: 680 },
            { input: 70.0, output: 67.3, correlation: 0.51, samples: 850 },
            { input: 75.0, output: 71.9, correlation: 0.58, samples: 920 },
            { input: 80.0, output: 76.5, correlation: 0.64, samples: 780 },
            { input: 85.0, output: 81.2, correlation: 0.72, samples: 650 },
            { input: 90.0, output: 85.8, correlation: 0.79, samples: 480 },
            { input: 92.0, output: 88.1, correlation: 0.82, samples: 312 }
        ],
        
        // 统计信息
        statistics: {
            rSquared: 0.79,
            significance: "< 0.001",
            slope: 0.85,
            intercept: 6.2
        },
        
        // 图表数据（用于绘制散点图和回归线）
        chartData: {
            labels: ["60", "65", "70", "75", "80", "85", "90", "92"],
            datasets: [
                {
                    label: '实际数据点',
                    data: [58.2, 62.8, 67.3, 71.9, 76.5, 81.2, 85.8, 88.1],
                    backgroundColor: '#1a56db',
                    borderColor: '#1a56db',
                    type: 'scatter'
                },
                {
                    label: '回归线',
                    data: [57.2, 61.4, 65.7, 69.9, 74.2, 78.4, 82.7, 84.4],
                    borderColor: '#ef4444',
                    backgroundColor: 'transparent',
                    type: 'line',
                    fill: false,
                    tension: 0.1
                }
            ]
        },
        
        // 解读说明
        insights: [
            "教育投入与学业成果呈现显著正相关（r=0.89）",
            "投入指数每增加10点，学业成果指数平均提升8.5点",
            "存在边际递减效应：高投入区域（>85）的增益逐渐放缓",
            "建议优化资源配置，关注投入产出效率"
        ],
        
        lastUpdated: "2024-12-10",
        source: "国家教育统计年鉴2024，课题组分析"
    },
    
    // 时间线对比表：教育改革进程
    "education-reform-timeline": {
        id: "education-reform-timeline",
        title: "国内外教育改革进程对比表",
        subtitle: "2010-2024年关键政策与实施节点",
        type: "timeline-comparison",
        color: "#10b981",
        icon: "history",
        
        // 时间线数据
        timeline: [
            {
                year: 2010,
                events: [
                    { country: "中国", event: "《国家中长期教育改革和发展规划纲要（2010-2020年）》发布", impact: "high" },
                    { country: "芬兰", event: "启动现象教学（Phenomenon-based Learning）试点", impact: "medium" }
                ]
            },
            {
                year: 2015,
                events: [
                    { country: "中国", event: "新高考改革试点（上海、浙江）", impact: "high" },
                    { country: "新加坡", event: "全面实施'少教多学'（Teach Less, Learn More）", impact: "high" },
                    { country: "德国", event: "职业教育数字化战略启动", impact: "medium" }
                ]
            },
            {
                year: 2018,
                events: [
                    { country: "中国", event: "《教育信息化2.0行动计划》发布", impact: "high" },
                    { country: "日本", event: "'特定技能'签证制度立法", impact: "high" },
                    { country: "上海", event: "PBL项目式学习区域推广", impact: "medium" }
                ]
            },
            {
                year: 2020,
                events: [
                    { country: "全球", event: "疫情推动在线教育普及", impact: "high" },
                    { country: "中国", event: "'双减'政策发布", impact: "high" },
                    { country: "芬兰", event: "新国家核心课程全国实施", impact: "high" }
                ]
            },
            {
                year: 2024,
                events: [
                    { country: "中国", event: "教育强国建设规划纲要", impact: "high" },
                    { country: "德国", event: "双元制4.0数字化升级", impact: "medium" },
                    { country: "日本", event: "技能移民政策扩大实施", impact: "high" }
                ]
            }
        ],
        
        // 国家颜色映射
        countryColors: {
            "中国": "#ef4444",
            "芬兰": "#059669",
            "新加坡": "#8b5cf6",
            "德国": "#1a56db",
            "日本": "#6b7280",
            "上海": "#10b981",
            "全球": "#f59e0b"
        },
        
        insights: [
            "中国教育改革呈现'政策试点-评估优化-全国推广'的渐进模式",
            "国际趋势：从知识传授转向能力培养，从标准化转向个性化",
            "数字化转型成为各国共同关注点",
            "职业教育与产业结合日益紧密"
        ],
        
        lastUpdated: "2024-12-14",
        source: "各国教育部公开资料，课题组整理"
    },
    
    // 矩阵对比表：教育指标国际比较
    "international-comparison-matrix": {
        id: "international-comparison-matrix",
        title: "教育发展指标国际比较矩阵",
        subtitle: "2024年关键指标对比分析",
        type: "comparison-matrix",
        color: "#f59e0b",
        icon: "globe-americas",
        
        // 矩阵数据
        matrix: [
            {
                indicator: "PISA阅读素养",
                countries: {
                    "中国（北京-上海-江苏-浙江）": 555,
                    "新加坡": 549,
                    "芬兰": 520,
                    "德国": 498,
                    "日本": 504,
                    "OECD平均": 487
                }
            },
            {
                indicator: "PISA数学素养",
                countries: {
                    "中国（北京-上海-江苏-浙江）": 591,
                    "新加坡": 569,
                    "芬兰": 507,
                    "德国": 500,
                    "日本": 527,
                    "OECD平均": 489
                }
            },
            {
                indicator: "PISA科学素养",
                countries: {
                    "中国（北京-上海-江苏-浙江）": 590,
                    "新加坡": 551,
                    "芬兰": 522,
                    "德国": 503,
                    "日本": 529,
                    "OECD平均": 489
                }
            },
            {
                indicator: "学生幸福感指数",
                countries: {
                    "中国": 67.2,
                    "新加坡": 76.8,
                    "芬兰": 85.3,
                    "德国": 72.1,
                    "日本": 69.5,
                    "OECD平均": 71.8
                }
            },
            {
                indicator: "教师平均年薪（USD）",
                countries: {
                    "中国": "42,000",
                    "新加坡": "65,000",
                    "芬兰": "58,000",
                    "德国": "62,000",
                    "日本": "53,000",
                    "OECD平均": "51,000"
                }
            },
            {
                indicator: "教育支出占GDP比例",
                countries: {
                    "中国": 4.0,
                    "新加坡": 3.9,
                    "芬兰": 6.8,
                    "德国": 5.1,
                    "日本": 3.9,
                    "OECD平均": 4.9
                }
            }
        ],
        
        // 解读说明
        insights: [
            "中国在学术成绩上表现突出，但学生幸福感有待提升",
            "芬兰在教育投入和学生幸福感方面表现均衡",
            "新加坡在有限资源下实现高效产出",
            "德国和日本在职业教育和技能培训方面特色鲜明"
        ],
        
        lastUpdated: "2024-12-12",
        source: "OECD PISA 2022，世界银行，UNESCO"
    }
};

// 表格类型索引
const tableTypes = {
    "linear-regression": ["education-input-output"],
    "timeline-comparison": ["education-reform-timeline"],
    "comparison-matrix": ["international-comparison-matrix"]
};

console.log(`数据表格数据库已加载，共 ${Object.keys(dataTables).length} 个表格`);
