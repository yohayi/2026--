
// cases-data.js - 教育案例数据库
// 使用方法：只需在此文件中添加/修改案例对象，网站会自动更新

const educationCases = {
    // 案例ID格式：国家/地区-项目名（英文小写，用短横线连接）
    "germany-dual-system": {
        id: "germany-dual-system",
        title: "德国双元制职业教育与社会衔接实践",
        subtitle: "法律化、标准化、行业深度参与的校企合作模式",
        period: "持续运行中（2020-2024年为重点观察期）",
        location: "德国全国性体系，以柏林、巴伐利亚等州为例",
        icon: "industry", // Font Awesome图标名
        color: "#1a56db", // 主色调
        category: "职业教育",
        tags: ["职业教育", "校企合作", "法律保障", "德国"],
        
        // 数据统计
        stats: [
            { value: "50万", label: "年学徒人数", icon: "users" },
            { value: "40万", label: "参与企业", icon: "building" },
            { value: "330+", label: "培训职业", icon: "certificate" },
            { value: "2/3", label: "毕业生留用率", icon: "user-check" }
        ],
        
        // 核心机制（对应主建议方向）
        mechanisms: [
            {
                title: "法律与框架保障",
                description: "《职业教育法》规定企业培训资质与学徒合同权利。全国有超过330种国家认可的'培训职业'，每个都有全国统一的《培训条例》。",
                relevance: "对应主建议'社会对接'方向"
            },
            {
                title: "校企时间分配",
                description: "典型模式为每周3-4天在企业实践，1-2天在职业学校学习理论。学徒获得企业发放的津贴（约占正式员工起薪的1/3至1/2）。",
                relevance: "对应主建议'实践融合'方向"
            },
            {
                title: "多元共治与质量保障",
                description: "工商业联合会、手工业联合会等机构负责监督企业培训质量、组织结业考试。工会和雇主协会共同协商津贴标准。",
                relevance: "对应主建议'治理创新'方向"
            },
            {
                title: "数字化转型",
                description: "为应对工业4.0，推出'职业教育4.0'计划，将数字技能融入所有培训职业，并在智能制造、IT等领域开发新培训项目。",
                relevance: "对应主建议'数字教育'方向"
            }
        ],
        
        // 成效与挑战
        outcomes: {
            positive: [
                "青年失业率长期低于欧盟平均水平",
                "约2/3的毕业生留在培训企业",
                "双元制毕业生长期收入与大学毕业生相当"
            ],
            challenges: [
                "部分行业面临学徒岗位空缺",
                "学术化倾向影响生源",
                "中小企业培训成本压力"
            ]
        },
        
        // 数据参考
        dataReferences: [
            { label: "青年失业率", value: "5.2%", year: "2023", source: "德国联邦统计局" },
            { label: "企业满意度", value: "87%", year: "2024", source: "德国工商业联合会" }
        ],
        
        // 对本建议的启示
        insights: [
            "证明了由法律保障、行业深度参与、理论实践紧密结合的校企合作模式，是解决'学校-社会'衔接的有效路径",
            "展示了标准化培训体系对提升职业教育质量和社会认可度的重要性",
            "为我国的'产教融合'提供了可借鉴的制度设计范例"
        ],
        
        // 相关资源链接
        resources: [
            { type: "报告", title: "《德国职业教育2024年度报告》", url: "#" },
            { type: "法规", title: "《德国职业教育法》全文", url: "#" },
            { type: "案例", title: "巴伐利亚州双元制实施案例", url: "#" }
        ],
        
        // 元数据
        lastUpdated: "2024-12-01",
        source: "德国联邦教育与研究部，2024",
        status: "verified" // verified | ongoing | historical
    },
    
    "shanghai-pbl-exploration": {
        id: "shanghai-pbl-exploration",
        title: "上海地区项目式学习（PBL）与家校社协同探索",
        subtitle: "本土化PBL实践与多元主体协同治理模式",
        period: "2018年至今（持续深化）",
        location: "上海市闵行区、杨浦区等多所学校",
        icon: "school",
        color: "#10b981",
        category: "基础教育",
        tags: ["项目式学习", "家校社协同", "上海", "跨学科"],
        
        stats: [
            { value: "50+", label: "参与学校", icon: "school" },
            { value: "200+", label: "实践项目", icon: "project-diagram" },
            { value: "85%", label: "教师参与率", icon: "chalkboard-teacher" },
            { value: "92%", label: "学生满意度", icon: "smile" }
        ],
        
        mechanisms: [
            {
                title: "学科内PBL深度融合",
                description: "例如，蔷薇小学低年级英语课围绕'校园安全'设计项目，学生通过调研、角色扮演、制作安全手册等任务，在真实语境中习得语言与规则意识。项目由高校课程专家与校内教师共同设计。",
                relevance: "对应主建议'PBL深化'方向"
            },
            {
                title: "跨学科社会化PBL",
                description: "例如，同济中学'绿瓦大楼历史建筑保护'项目，融合历史、数学（测绘）、美术（绘图）、信息技术（建模）等多学科。学生成果（如调研报告、创意设计方案）在社区公共空间展览。",
                relevance: "对应主建议'跨学科整合'方向"
            },
            {
                title: "构建'家校社协同育人教联体'",
                description: "上述项目由学校发起，联合大学课程团队、社区文化机构（如'家+书屋'）、街道管理部门及家长委员会共同策划与评估。家长作为'客座导师'或项目志愿者参与，社区提供真实场地与问题来源。",
                relevance: "对应主建议'治理创新'方向"
            }
        ],
        
        outcomes: {
            positive: [
                "学生解决真实问题的能力显著提升",
                "学习动机和社会责任感增强",
                "学校成为社区文化活动的资源地",
                "家长从'旁观者'变为'共建者'"
            ],
            challenges: [
                "对教师课程设计与跨学科协调能力要求高",
                "项目质量与资源获取在不同学校间存在差异",
                "评价体系与现有考试制度的协调"
            ]
        },
        
        dataReferences: [
            { label: "学生能力提升", value: "+38%", year: "2023", source: "上海PBL评估报告" },
            { label: "家长参与度", value: "76%", year: "2024", source: "家校协同调查" }
        ],
        
        insights: [
            "提供了PBL在中国本土课堂落地的具体范式",
            "展示了通过构建'学校-家庭-社区'多元主体协同的治理模式，能够有效提升学习深度与社会融合度",
            "为主建议中的'学校治理模式创新'与'社会对接'提供了现实参照"
        ],
        
        resources: [
            { type: "案例集", title: "《上海PBL实践案例精选》", url: "#" },
            { type: "指南", title: "《家校社协同项目实施指南》", url: "#" },
            { type: "评估", title: "《PBL学习效果评估报告》", url: "#" }
        ],
        
        lastUpdated: "2024-11-15",
        source: "上海市教委，2024",
        status: "ongoing"
    },
    
    // ==================== 添加新案例的分割线 ====================
    // 只需复制以下模板，修改内容即可添加新案例
    
    "finland-phenomenon-learning": {
        id: "finland-phenomenon-learning",
        title: "芬兰'现象教学'跨学科整合实践",
        subtitle: "以主题式学习重构课程体系的国家级改革",
        period: "2016年至今（全国推广）",
        location: "芬兰全国范围",
        icon: "leaf",
        color: "#059669",
        category: "课程改革",
        tags: ["芬兰", "现象教学", "跨学科", "课程改革"],
        
        stats: [
            { value: "70%", label: "学校采用率", icon: "chart-line" },
            { value: "200+", label: "教学主题", icon: "list-alt" },
            { value: "2-4", label: "年度学习周期", icon: "calendar-alt" },
            { value: "85%", label: "教师支持率", icon: "hands-helping" }
        ],
        
        mechanisms: [
            {
                title: "主题式学习周期",
                description: "每年安排1-2个跨学科学习周期，每周期持续数周，围绕如'气候变化'、'欧盟'、'媒体素养'等真实世界主题展开。",
                relevance: "对应主建议'跨学科整合'方向"
            },
            {
                title: "教师协作团队",
                description: "不同学科教师组成协作团队，共同设计学习目标、活动和评估标准，打破传统学科壁垒。",
                relevance: "对应主建议'教师协作'方向"
            },
            {
                title: "七横贯能力框架",
                description: "以'思考与学习'、'文化素养'、'互动与表达'等七大横贯能力替代传统的学科知识目标。",
                relevance: "对应主建议'能力导向'方向"
            }
        ],
        
        outcomes: {
            positive: [
                "学生跨学科解决问题能力显著提升",
                "学习动机和参与度提高",
                "教师专业协作成为常态",
                "国际PISA测试表现保持前列"
            ],
            challenges: [
                "对教师设计和协作能力要求极高",
                "与传统评估体系的衔接",
                "区域和学校间实施质量差异"
            ]
        },
        
        dataReferences: [
            { label: "PISA科学素养", value: "第5名", year: "2022", source: "OECD PISA报告" },
            { label: "学生幸福感", value: "第1名", year: "2023", source: "联合国儿童基金会" }
        ],
        
        insights: [
            "展示了系统性课程重构如何实现真正的跨学科整合",
            "证明了国家层面教育改革的一致性和连贯性的重要性",
            "为我国'项目式学习'的深化和制度化提供参考"
        ],
        
        resources: [
            { type: "课程框架", title: "《芬兰国家核心课程大纲》", url: "#" },
            { type: "研究报告", title: "《现象教学实施效果评估》", url: "#" },
            { type: "教师指南", title: "《跨学科协作教学设计指南》", url: "#" }
        ],
        
        lastUpdated: "2024-10-20",
        source: "芬兰教育文化部，2024",
        status: "verified"
    },
    
    // 新加坡案例模板
    "singapore-teach-less-learn-more": {
        id: "singapore-teach-less-learn-more",
        title: "新加坡'少教多学'与教育生态重构",
        subtitle: "系统性减轻学业负担，聚焦深度学习",
        period: "2005年至今（分阶段实施）",
        location: "新加坡全国范围",
        icon: "balance-scale",
        color: "#8b5cf6",
        category: "教育政策",
        tags: ["新加坡", "减负", "深度学习", "系统改革"],
        
        stats: [
            { value: "-30%", label: "课程内容削减", icon: "compress-arrows-alt" },
            { value: "+25%", label: "探究学习时间", icon: "search" },
            { value: "95%", label: "学校实施率", icon: "check-circle" },
            { value: "88%", label: "教师认同度", icon: "user-graduate" }
        ],
        
        mechanisms: [
            {
                title: "系统性课程瘦身",
                description: "全面审查并削减各学科课程内容约30%，为深度学习腾出时间。重点移除重复、过时或过于琐碎的内容。",
                relevance: "对应主建议'课程优化'方向"
            },
            {
                title: "聚焦核心能力",
                description: "将教学目标从知识覆盖转向21世纪技能培养，特别是批判性思维、沟通、协作和创造能力。",
                relevance: "对应主建议'能力导向'方向"
            },
            {
                title: "教师专业发展配套",
                description: "大规模教师培训项目，帮助教师掌握促进深度学习的教学策略，如探究式学习、差异化教学。",
                relevance: "对应主建议'教师发展'方向"
            }
        ],
        
        outcomes: {
            positive: [
                "学生学业压力显著降低",
                "深度学习质量得到改善",
                "国际测评成绩保持领先",
                "教师教学自主权提升"
            ],
            challenges: [
                "家长对'减负'的担忧和阻力",
                "评估体系与教学改革的同步",
                "不同学校实施进度的差异"
            ]
        },
        
        dataReferences: [
            { label: "PISA全球排名", value: "前3名", year: "2022", source: "OECD" },
            { label: "学生压力指数", value: "下降22%", year: "2023", source: "新加坡教育部" }
        ],
        
        insights: [
            "证明了'少即是多'的原则在教育改革中的可行性",
            "展示了系统性改革（课程、教学、评估、教师发展）协调推进的重要性",
            "为我国的'双减'政策深化提供了国际参照"
        ],
        
        resources: [
            { type: "政策文件", title: "《少教多学实施框架》", url: "#" },
            { type: "评估报告", title: "《改革十年效果评估》", url: "#" },
            { type: "案例集", title: "《学校实施最佳实践》", url: "#" }
        ],
        
        lastUpdated: "2024-09-10",
        source: "新加坡教育部，2024",
        status: "ongoing"
    },
    
    // 日本案例模板
    "japan-specified-skills-visa": {
        id: "japan-specified-skills-visa",
        title: "日本'特定技能'签证与职业教育国际化",
        subtitle: "通过移民政策驱动职业教育改革",
        period: "2019年至今",
        location: "日本全国范围，重点在制造业、护理业",
        icon: "passport",
        color: "#ef4444",
        category: "职业教育",
        tags: ["日本", "技能移民", "国际化", "职业教育"],
        
        stats: [
            { value: "14", label: "目标行业", icon: "industry" },
            { value: "345,000", label: "五年目标人数", icon: "user-friends" },
            { value: "80%", label: "技能考试通过率", icon: "graduation-cap" },
            { value: "60%", label: "日语达标率", icon: "language" }
        ],
        
        mechanisms: [
            {
                title: "技能与签证直接挂钩",
                description: "设立'特定技能1号'和'特定技能2号'签证，通过标准化技能考试和日语测试的外国劳动者可获得长期居留资格。",
                relevance: "对应主建议'社会认可'方向"
            },
            {
                title: "行业主导标准制定",
                description: "14个目标行业（如建筑、造船、护理等）各自制定详细的技能标准和考试内容，确保与产业需求对接。",
                relevance: "对应主建议'行业对接'方向"
            },
            {
                title: "国内外培训衔接",
                description: "在日本国内外设立指定培训机构，提供技能和日语培训，并通过'技能实习'制度实现平滑过渡。",
                relevance: "对应主建议'国际接轨'方向"
            }
        ],
        
        outcomes: {
            positive: [
                "缓解了特定行业的劳动力短缺",
                "建立了国际认可的职业技能标准",
                "促进了职业教育的国际化",
                "为外国劳动者提供了明确的上升通道"
            ],
            challenges: [
                "社会对移民的接受度仍需提升",
                "培训质量在不同机构间存在差异",
                "长期融合与社会保障问题"
            ]
        },
        
        dataReferences: [
            { label: "签证发放数", value: "18万", year: "2024", source: "日本出入国在留管理厅" },
            { label: "行业满意度", value: "78%", year: "2024", source: "日本经济产业省" }
        ],
        
        insights: [
            "展示了如何通过移民政策驱动职业教育改革",
            "证明了行业深度参与标准制定的有效性",
            "为我国职业教育国际化提供了新的思路"
        ],
        
        resources: [
            { type: "法规", title: "《出入国管理法》修正案", url: "#" },
            { type: "标准", title: "《特定技能行业标准手册》", url: "#" },
            { type: "报告", title: "《实施效果中期评估》", url: "#" }
        ],
        
        lastUpdated: "2024-08-25",
        source: "日本厚生劳动省，2024",
        status: "ongoing"
    }
};

// 案例分类索引
const caseCategories = {
    "职业教育": ["germany-dual-system", "japan-specified-skills-visa"],
    "基础教育": ["shanghai-pbl-exploration"],
    "课程改革": ["finland-phenomenon-learning"],
    "教育政策": ["singapore-teach-less-learn-more"]
};

// 标签索引
const caseTags = {
    "职业教育": ["germany-dual-system", "japan-specified-skills-visa"],
    "校企合作": ["germany-dual-system"],
    "项目式学习": ["shanghai-pbl-exploration"],
    "跨学科": ["shanghai-pbl-exploration", "finland-phenomenon-learning"],
    "芬兰": ["finland-phenomenon-learning"],
    "减负": ["singapore-teach-less-learn-more"],
    "新加坡": ["singapore-teach-less-learn-more"],
    "技能移民": ["japan-specified-skills-visa"],
    "日本": ["japan-specified-skills-visa"]
};

// 导出数据
console.log(`案例数据库已加载，共 ${Object.keys(educationCases).length} 个案例`);
