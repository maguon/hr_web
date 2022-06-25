export const LOGIN_USER_ID ='user-id';
export const LOGIN_USER_TYPE ='user-type';
export const LOGIN_USER_STATUS='user-status';
export const AUTH_TOKEN ='auth-token';

/**
 * 日期控件 国际化用
 */
export const DATE_PICKER_OPTION = {
    autoClose: true,
    // showClearBtn: true,
    format: 'yyyy-mm-dd',
    i18n: {
        cancel: '取消',
        clear: '清除',
        done: '确认',
        previousMonth: '‹',
        nextMonth: '›',
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    },
};

/**
 * 单选下拉菜单样式
 */
export const REACT_SELECT_SEARCH_STYLE = {
    // 整体容器
    // container: styles => ({ ...styles,  border:'1px solid #ff0000'}),
    // 控制器
    control: (styles, {isFocused}) => ({
        ...styles,
        height: 'calc(40px)',
        borderRadius: '0',
        boxShadow: '0',
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        background: '#ffffff',
        margin: "0 0 20px 0",
        borderColor: isFocused ? '#3C3CC4' : '#ACACAC',
        ':hover': {
            borderColor: "#3C3CC4"
        }
    }),
    // 下拉菜单和输入框距离
    menu: styles => ({ ...styles, marginTop:'1px',zIndex: 10}),
    // 指示器（删除/下拉）分隔符(竖线)
    indicatorSeparator: styles => ({...styles, display: 'none'}),
    // 检索输入框
    input: styles => ({...styles, margin: '0', paddingTop: '0',paddingBottom: '0',height: 'calc(3rem)'}),
    // 选中内容显示区域
    valueContainer: styles => ({
        ...styles,
        paddingLeft: '0',
        height: 'calc(3rem + 1px)'
    })
};


//pdf订单
export const ORDER_PDF = {
    title: '大连鸿菘实业有限公司结算清单',
    companyName: '大连鸿菘实业有限公司',
    bank: '中国银行股份有限公司大连保税区支行',
    bankSer: "316873254265",
    contactName: '1485656256@163.com',
    website: "www.baidu.com",
    address: "大连市保税区瑞港路6号",
    mobile: '13342290165',
    email: "0411-66771175"
};


// 统计用：日期范围
export const DATE_RANGE = [
    {value: 30, label: "近30天"},
    {value: 10, label: "近10天"}
];

// 性别
export const GENDER = [
    {value: 0, label: "女"},
    {value: 1, label: "男"}
];
// 单位性质
export const COMPANY_TYPE = [
    {value: 0, label: "女"},
    {value: 1, label: "男"}
];
// 职称层级
export const POS_TYPE = [
    {value: 0, label: "女"},
    {value: 1, label: "男"}
];

// 可用/停用 标记
export const USE_FLAG = [
    {value: 0, label: "停用"},
    {value: 1, label: "可用"}
];

// 标准类型
export const STANDARD_TYPE = [
    {value: 0, label: "非标准"},
    {value: 1, label: "标准"}
];

// 定价方式
export const PRICE_TYPE = [
    {value: 1, label: "固定售价"},
    {value: 2, label: "按采购价比率"},
    {value: 3, label: "按采购价加价"}
];

// 系统类型(1-进销存管理系统 )
export const APP_TYPE = [
    {value: 1, label: "进销存管理系统"},
];

// 系统类型(1-安卓 2-苹果)
export const DEVICE_TYPE = [
    {value: 1, label: "安卓"},
    {value: 2, label: "苹果"}
];

// 强制更新(0-非强制更新 1-强制更新)
export const FORCE_UPDATE = [
    {value: 0, label: "否"},
    {value: 1, label: "是"}
];

//供应商类型
export const SUPPLIER_TYPE = [
    {value: 1, label: "对内供应商"},
    {value: 2, label: "对外供应商"}
];

//结算类型
export const SETTLE_TYPE = [
    {value: 1, label: "月结"},
    {value: 2, label: "非月结"}
];
//运费支付
export const TRANSFER_COST_TYPE = [
    {value: 1, label: "对方支付"},
    {value: 2, label: "我方支付"}
];
//仓储状态
export const  STORAGE_STATUS= [
    {value: 1, label: "未入库"},
    {value: 7, label: "已入库"}
];
//支付状态
export const PAYMENT_STATUS = [
    {value: 1, label: "未支付"},
    {value: 7, label: "已支付"}
];

//采购状态
export const PURCHASE_STATUS = [
    {value: 1, label: "未处理"},
    {value: 3, label: "处理中"},
    {value: 7, label: "已完成"}
];
//是否需要出库
export const STORAGE_TYPE= [
    {value: 0, label: "不需要"},
    {value: 1, label: "需要"}
];

// 盘点状态
export const STORAGE_CHECK_STATUS = [
    {value: 0, label: "未开始"},
    {value: 1, label: "正常"},
    {value: 2, label: "异常"}
];

// 盘点完成状态
export const STORAGE_RET_STATUS = [
    {value: 1, label: "未完成"},
    {value: 2, label: "完成"}
];

// 退货状态
export const REFUND_STATUS = [
    {value: 1, label: "未完成"},
    {value: 7, label: "已完成"}
];

// 退货退款状态
export const REFUND_PAYMENT_STATUS = [
    {value: 1, label: "未完成"},
    {value: 7, label: "已完成"}
];

// 退仓状态
export const REFUND_STORAGE_FLAG = [
    {value: 1, label: "未退仓"},
    {value: 2, label: "已退仓"}
];

export const ORDER_REFUND_STORAGE_STATUS = [
    {value: 1, label: "未退仓"},
    {value: 3, label: "已退仓"}
];

// 出库/入库
export const STORAGE_OP_TYPE= [
    {value: 1, label: "入库"},
    {value: 2, label: "出库"}
];

// 是否全新
export const OLD_FLAG= [
    {value: 0, label: "是"},
    {value: 1, label: "否"}
];

// 入库 类型
export const STORAGE_OP_IMPORT_TYPE= [
    {value: 11, label: "采购入库"},
    {value: 12, label: "移库入库"},
    {value: 13, label: "盘盈入库"},
    {value: 14, label: "退单入库"},
    {value: 15, label: "内部退料入库"},
];

// 出库 类型
export const STORAGE_OP_EXPORT_TYPE= [
    {value: 21, label: "采购退货出库"},
    {value: 22, label: "移库出库"},
    {value: 23, label: "盘亏出库"},
    {value: 24, label: "订单出库"},
    {value: 25, label: "内部领料出库"},
];

export const STORAGE_OP_SUB_TYPE= [
    {value: 11, label: "采购入库"},
    {value: 12, label: "移库入库"},
    {value: 13, label: "盘盈入库"},
    {value: 14, label: "退单入库"},
    {value: 15, label: "内部退料入库"},
    {value: 21, label: "采购退货出库"},
    {value: 22, label: "移库出库"},
    {value: 23, label: "盘亏出库"},
    {value: 24, label: "订单出库"},
    {value: 25, label: "内部领料出库"}
];
//服务类型
export const SERVICE_TYPE= [
    {value: 1, label: "保养"},
    {value: 2, label: "维修"},
    {value: 3, label: "电焊"},
    {value: 4, label: "电器"}
];
//服务项目类型
export const SERVICE_PART_TYPE= [
    {value: 1, label: "车身部分"},
    {value: 2, label: "电焊部分"},
    {value: 3, label: "液压部分"},
    {value: 4, label: "电器部分"},
    {value: 5, label: "气路部分"},
    {value: 6, label: "发动机部分"},
    {value: 7, label: "底盘部分"},
    {value: 8, label: "轮胎部分"},
    {value: 9, label: "其他部分"}
];
//服务价格类型
export const SERVICE_PRICE_TYPE= [
    {value: 1, label: "固定售价"},
    {value: 2, label: "单价数量"}
];
//销售提成类型
export const SALE_PERF_TYPE= [
    {value: 1, label: "无提成"},
    {value: 2, label: "固定提成"},
    {value: 3, label: "营业额提成"},
   /* {value: 4, label: "毛利提成"}*/
];
//客户来源
export const SOURCE_TYPE= [
    {value: 1, label: "内部"},
    {value: 2, label: "外部"}
];
//客户类型
export const CLIENT_TYPE= [
    {value: 1, label: "普通客户"},
    {value: 2, label: "大客户"}
];
//发票类型
export const INVOICE_TYPE=[
    {value: 1, label: "企业"},
    {value: 2, label: "个人"}
];

export const ORDER_TYPE = [
    {value: 1, label: "内部"},
    {value: 2, label: "外部"}
];

export const SERVICE_ITEM_STATUS = [
    {value: 1, label: "未处理"},
    {value: 3, label: "处理中，以派工"},
    {value: 5, label: "施工完，未验收"},
    {value: 7, label: "验收完成"},
];

export const ORDER_REFUND_STATUS = [
    {value: 1, label: "未完成"},
    {value: 7, label: "已完成"}
];

export const PROD_ITEM_STATUS = [
    {value: 1, label: "未出库"},
    {value: 3, label: "已出库"}
];

export const ORDER_STATUS = [
    {value: 1, label: "未处理"},
    {value: 3, label: "处理中"},
    {value: 5, label: "已结算"},
    {value: 7, label: "处理完成"},
    {value: 0, label: "取消"},
];

export const ORDER_PAYMENT_STATUS = [
    {value: 1, label: "未付款"},
    {value: 5, label: "付款中"},
    {value: 7, label: "付款完成"}
];
//订单支付状态
export const  ORDER_PAY_TYPE = [
    {value: 0, label: "未支付"},
    {value: 1, label: "已支付"}
];
//付款类型(1.支付 2.退款)
export const PAY_TYPE = [
    {value: 1, label: "收款"},
    {value: 2, label: "退款"}
];
//支付方式(1.挂账 2.现金)
export const PAYMENT_TYPE = [
    {value: 1, label: "挂账"},
    {value: 2, label: "现金"}
];

//unique
export const PROD_UNIQUE_STATUS =[
    {value: 0, label: "未验收"},
    {value: 1, label: "验收"}
]

// 是否需要验证 唯一识别码
export const UNIQUE_FLAG =[
    {value: 0, label: "不需要"},
    {value: 1, label: "需要"}
];

// 用于权限设定（包含所有机能设定）
export const ALL_PAGE_LIST = [
    {
        "link": "/main_panel",
        "label": "主控面板",
        "icon": "mdi-store",
        "children": [],
        "usable": false
    }, 
    {
        "link": "/student_info",
        "label": "考生信息",
        "icon": "mdi-chevron-right",
        "children": [],
        "usable": false
    }, 
    {
        "link": "/employee_info",
        "label": "在职信息",
        "icon": "mdi-chevron-right",
        "children": [],
        "usable": false
    },  
    {
        "link": "/upload",
        "label": "数据导入",
        "icon": "mdi-chevron-right",
        "children": [],
        "usable": false
    }, 
    {
        "label": "统计",
        "icon": "mdi-chart-line",
        "children": [
            {
                "link": "/student_stat",
                "name": "学生统计",
                "icon": "mdi-chevron-right",
                "usable": false
            },
            {
                "link": "/employee_stat",
                "name": "在职统计",
                "icon": "mdi-chevron-right",
                "usable": false
            }

        ]
    },
    {
        "label": "系统设置",
        "icon": "mdi-server",
        "children": [
            {
                "link": "/admin_user_setting",
                "name": "用户管理",
                "icon": "mdi-chevron-right",
                "usable": false
            },
            {
                "link": "/app_setting",
                "name": "App系统",
                "icon": "mdi-chevron-right",
                "usable": false
            },
            {
                "link": "/authority_setting",
                "name": "权限设置",
                "icon": "mdi-chevron-right",
                "usable": false
            },

        ]
    }
];

// 全部权限（包含所有机能设定）
export const ALL_PAGE_JSON = {
    "/": {
        "usable": true
    },
    "/main_panel": {
        "usable": true
    },
    "/student_info": {
        "usable": true
    },
    "/employee_info": {
        "usable": true
    },
    "/student_stat": {
        "usable": true
    },
    "/employee_stat": {
        "usable": true
    },
    "/admin_user_setting": {
        "usable": true
    },
    "/upload": {
        "usable": true
    },
    "/app_setting": {
        "usable": true
    },
    "/user_perf_level": {
        "usable": true
    },
    "/authority_setting": {
        "usable": true
    }
};