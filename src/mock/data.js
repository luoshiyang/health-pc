/**
 * 此数据是图表展示的数据
 * 横坐标：array内的time字段，以图表展示第一天的0时起，1代表1个小时，
 * 一天24小时，25代表第二天第一个小时，故横坐标最大值为24*7=168，
 * 每种图形的横坐标都是以此为标准，
 * 纵坐标：根据图表和配置的不同去实时计算点的位置
 */
export const chartData = [
    {
        type: "text",
        time: 3,
        text: "入\n院\n于\n00\n时\n30\n分",
        color: "blue",
        position:36,
        cellMin: 29,
        cellSplit: 0.2
    }, // 入院时间
    {
        type: "text",
        time: 4,
        text: "出\n院\n于\n00\n时\n40\n分",
        color: "blue",
        position:36,
        cellMin: 29,
        cellSplit: 0.2
    }, // 入院时间
    {
        type: "line",
        color: "navy",
        cellMin: 20,
        cellSplit: 5,
        shape: "empty-circle",
        array: [
            {
                time: 3,
                value: 120
            },
            {
                time: 8,
                value: 130
            }
        ]
    },
    {
        type: "line",
        color: "orange",
        cellMin: 20,
        cellSplit: 5,
        shape: "x",
        array: [
            {
                time: 3,
                value: 100,
                tips: "肛温111"
            },
            {
                time: 8,
                value: 90,
                tips: "肛温111"
            }
        ]
    },
    // 折线图类型
    {
        type: "line",
        color: "blue", // 画线的颜色
        cellMin: 29, // 坐标系Y轴最小值，同configData内的cellMin
        cellSplit: 0.2, // 坐标系Y轴每格的值，同configData内的cellSplit
        array: [
            {
                time: 3, //横坐标，入院三小时
                value: 39.5, // 纵坐标的值，实际坐标系位置需要与cellMin与cellSplit一起计算
                tips: "体温39.5" // 鼠标移动到点上时显示的文字信息
            },
            {
                time: 8,
                value: 41,
                Break: 'true' //折现在此中断一下
            },
            {
                time: 10,
                value: 40
            },
            {
                time: 15,
                value: 38
            },
            {
                time: 21,
                value: 37.8
            },
            {
                time: 26,
                value: 37.8,
                tips: "脉搏130",
                extraArr:[{
                    extra: 39.5,
                    extraTips: "脉搏110",
                    extraColor: "red",
                }],
                others: [
                    {
                        time: 28,
                        value: 42,
                        tips: "脉搏120",
                        color: "red"
                    },
                    {
                        time: 25,
                        value: 41,
                        tips: "脉搏120"
                    }
                ]
            },
            // 同一个格子内，数据变化
            {
                time: 28,
                value: 39
            },
            {
                time: 33,
                value: 39.5,
                extraArr:[{
                    extra: 40,
                    extraTips: "突然发热",
                    extraColor: "black",
                },{
                    extra: 37.5,
                    extraTips: "突然降温",
                    extraColor: "red",
                }]
            },
            {
                time: 39,
                value: 37.5
            },
            {
                time: 45,
                value: 38
            },
            {
                time: 51,
                value: 37.5
            },
            {
                time: 57,
                value: 37.5
            }
        ]
    },
    // 折现区域图
    {
        type: "area",
        color: "red", // 画线的颜色
        bgColor: "rgba(255,0,0,0.7)",
        cellMin: 0, // 坐标系Y轴最小值，同configData内的cellMin
        cellSplit: 5, // 坐标系Y轴每格的值，同configData内的cellSplit
        array: [
            {
                time: 3,
                v1: 42,
                v2: 20,
                v1Tips: "脉搏xxx",
                v2Tips: "心跳YYY"
            },
            {
                time: 9,
                v1: 50,
                v2: 30,
                Break: 'true'
            },
            {
                time: 15,
                v1: 70,
                v2: 50
            },
            {
                time: 21,
                v1: 55,
                v2: 44
            },
            {
                time: 27,
                v1: 60,
                v2: 40
            }
        ]
    },
    // 标签类型
    {
        type: "tag",
        color: "#000",
        text: "R", // 展示的文字
        cellMin: 0, // 坐标系Y轴最小值，同configData内的cellMin
        cellSplit: 5, // 坐标系Y轴每格的值，同configData内的cellSplit
        y: 150, // 标签所有的y坐标都是一样的
        array: [
            {
                time: 3,
                tips: "这里是hover下的信息提示",
                y: 40
            },
            {
                time: 9,
                y: 130
            },
            {
                time: 15,
                y: 110
            },
            {
                time: 21
            },
            {
                time: 27
            }
        ]
    },
    {
        type: "tag",
        color: "red",
        text: "H", // 展示的文字
        cellMin: 0, // 坐标系Y轴最小值，同configData内的cellMin
        cellSplit: 5, // 坐标系Y轴每格的值，同configData内的cellSplit
        y: 150, // 标签所有的y坐标都是一样的
        array: [
            {
                time: 3,
                tips: "这里是hover下的信息提示",
                y: 20
            }
        ]
    },
    // {
    //     type: "baseline", //新增类型，用户绘一根直线
    //     color: "red",
    //     cellMin: 0, // 坐标系Y轴最小值，同configData内的cellMin
    //     cellSplit: 0.2, // 坐标系Y轴每格的值，同configData内的cellSplit
    //     y: 1// 标签所有的y坐标都是一样的
    // },
    {
        type: "baseline", //新增类型，用户绘一根直线
        color: "red",
        cellMin: 29, // 坐标系Y轴最小值，同configData内的cellMin
        cellSplit: 0.2, // 坐标系Y轴每格的值，同configData内的cellSplit
        y: 39.5// 标签所有的y坐标都是一样的
    },
    {
        type: "baseline", //新增类型，用户绘一根直线
        color: "#000",
        cellMin: 29, // 坐标系Y轴最小值，同configData内的cellMin
        cellSplit: 0.2, // 坐标系Y轴每格的值，同configData内的cellSplit
        y: 39 // 标签所有的y坐标都是一样的
    },
    {
        type: "baseline", //新增类型，用户绘一根直线
        color: "#000",
        cellMin: 29, // 坐标系Y轴最小值，同configData内的cellMin
        cellSplit: 0.2, // 坐标系Y轴每格的值，同configData内的cellSplit
        y: 38 // 标签所有的y坐标都是一样的
    },
    {
        type: "baseline", //新增类型，用户绘一根直线
        color: "#000",
        cellMin: 29, // 坐标系Y轴最小值，同configData内的cellMin
        cellSplit: 0.2, // 坐标系Y轴每格的值，同configData内的cellSplit
        y: 37 // 标签所有的y坐标都是一样的
    },
    {
        type: "baseline", //新增类型，用户绘一根直线
        color: "#000",
        cellMin: 29, // 坐标系Y轴最小值，同configData内的cellMin
        cellSplit: 0.2, // 坐标系Y轴每格的值，同configData内的cellSplit
        y: 36 // 标签所有的y坐标都是一样的
    },
    {
        type: "baseline", //新增类型，用户绘一根直线
        color: "#000",
        cellMin: 29, // 坐标系Y轴最小值，同configData内的cellMin
        cellSplit: 0.2, // 坐标系Y轴每格的值，同configData内的cellSplit
        y: 35 // 标签所有的y坐标都是一样的
    },
];

// export const chartData = [
//     {
//         "time": 22,
//         "text": "入\n院\n于\n23\n时\n4\n分",
//         "position": 42,
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "type": "text",
//         "color": "red",
//         "shape": null
//     },
//     {
//         "time": 22,
//         "text": "转\n科\n急诊科→内一科",
//         "position": 42,
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "type": "text",
//         "color": "red",
//         "shape": null
//     },
//     {
//         "time": 23,
//         "text": "外\n出\n",
//         "position": 35,
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "type": "text",
//         "color": "red",
//         "shape": null
//     },
//     {
//         "time": 25,
//         "text": "外\n出\n",
//         "position": 35,
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "type": "text",
//         "color": "red",
//         "shape": null
//     },
//     {
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "y": 30,
//         "type": "baseline",
//         "color": "#000",
//         "shape": null
//     },
//     {
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "y": 31,
//         "type": "baseline",
//         "color": "#000",
//         "shape": null
//     },
//     {
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "y": 32,
//         "type": "baseline",
//         "color": "#000",
//         "shape": null
//     },
//     {
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "y": 33,
//         "type": "baseline",
//         "color": "#000",
//         "shape": null
//     },
//     {
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "y": 34,
//         "type": "baseline",
//         "color": "#000",
//         "shape": null
//     },
//     {
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "y": 35,
//         "type": "baseline",
//         "color": "#000",
//         "shape": null
//     },
//     {
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "y": 36,
//         "type": "baseline",
//         "color": "#000",
//         "shape": null
//     },
//     {
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "y": 37,
//         "type": "baseline",
//         "color": "#000",
//         "shape": null
//     },
//     {
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "y": 38,
//         "type": "baseline",
//         "color": "#000",
//         "shape": null
//     },
//     {
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "y": 39,
//         "type": "baseline",
//         "color": "red",
//         "shape": null
//     },
//     {
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "y": 40,
//         "type": "baseline",
//         "color": "#000",
//         "shape": null
//     },
//     {
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "y": 41,
//         "type": "baseline",
//         "color": "#000",
//         "shape": null
//     },
//     {
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "y": 42,
//         "type": "baseline",
//         "color": "#000",
//         "shape": null
//     },
//     {
//         "cellMin": 29,
//         "cellSplit": 0.2,
//         "array": [],
//         "type": "line",
//         "color": "blue",
//         "shape": "x-circle"
//     },
//     {
//         "cellMin": -10,
//         "cellSplit": 2,
//         "array": [],
//         "type": "line",
//         "color": "black",
//         "shape": "empty-circle"
//     },
//     {
//         "cellMin": 0,
//         "cellSplit": 1,
//         "array": [],
//         "type": "line",
//         "color": "red",
//         "shape": "empty-circle"
//     },
//     {
//         "bgColor": "rgba(255,0,0,0.7)",
//         "cellMin": 30,
//         "cellSplit": 2,
//         "array": [],
//         "type": "area",
//         "color": "red",
//         "shape": null
//     },
//     {
//         "text": null,
//         "y": "30",
//         "cellMin": -10,
//         "cellSplit": 2,
//         "array": [],
//         "type": "tag",
//         "color": "black",
//         "shape": null
//     },
//     {
//         "text": null,
//         "y": null,
//         "cellMin": 30,
//         "cellSplit": 2,
//         "array": [],
//         "type": "tag",
//         "color": "black",
//         "shape": null
//     }
// ];

// 表格数据
export const tableData = {
    // name: "黄光裕", //姓名
    // sex: "男", // 性别
    // age: "56", // 年龄
    // department: "呼吸科", //科室
    // bed: "12", // 床号
    // hospitalized: "12", // 住院号
    // // 日期
    // date: [
    //     "18年10月14日",
    //     "18年10月15日",
    //     "18年10月16日",
    //     "18年10月17日",
    //     "18年10月18日",
    //     "18年10月19日",
    //     "18年10月20日"
    // ],
    // // 患病日数
    // daysAfterSick: [1, 2, 3, 4, 5, 6, 7],
    // // 术后日数
    // daysAfterOperation: [0, 0, 0, 1, 2, 3, 4],
    // // 小便量
    // peeVolume: [100, 100, 100, 100, 100, 100, 100],
    // // 大便次数
    // shitTimes: [2, 2, 2, 2, 2, 2, 2],
    // // 输入量
    // inputVolume: [100, 100, 100, 100, 100, 100, 100],
    // // 饮入量
    // drinkVolume: [100, 100, 100, 100, 100, 100, 100],
    // // 排出量
    // excretionVolume: [100, 100, 100, 100, 100, 100, 100],
    // // 血压
    // // bloodPressure: [100, 100, 100, 100, 100, 100, 100],
    // // 身高/体重
    // height: [1, 1, 1, 1, 1, 1, 1],
    // weight: [1, 1, 1, 1, 1, 1, 1],
    // //皮试结果
    // skinTestRst:['正常', '正常', '正常', '正常', '正常', '正常', '正常'],
    // // 新的血压
    // bloodPressure: [
    //     ["80/80", "80/80"],
    //     ["80/80", "80/80"],
    //     ["80/80", "80/80"],
    //     ["80/80", "80/80"],
    //     ["80/80", "80/80"],
    //     ["80/80", "80/80"],
    //     ["80/80", "80/80"]
    // ],
    // // 疼痛
    // pain: [
    //     [1, 2, 3, 4, 5, 6],
    //     [1, 2, 3, 4, 5, 6],
    //     [1, 2, 3, 4, 5, 6],
    //     [1, 2, 3, 4, 5, 6],
    //     [1, 2, 3, 4, 5, 6],
    //     [1, 2, 3, 4, 5, 6],
    //     [1, 2, 3, 4, 5, 6]
    // ],
    // // 呼吸
    // breath: [
    //     [1, 2, 3, 4, 5, 6],
    //     [1, 2, 3, 4, 5, 6],
    //     [1, 2, 3, 4, 5, 6],
    //     [1, 2, 3, 4, 5, 6],
    //     [1, 2, 3, 4, 5, 6],
    //     [1, 2, 3, 4, 5, 6],
    //     [1, 2, 3, 4, 5, 6]
    // ]
    name: "饶志红",
    sex: "女",
    age: "30岁",
    department: "妇科",
    bed: "9床",
    pageNumber: 2,
    hospitalized: "190062800 ",
    date: ["2019-05-15","2019-05-16","2019-05-17","2019-05-18","2019-05-19","2019-05-20","2019-05-21"],
    daysAfterSick: ["15","16","17","18","19","20","21"],
    daysAfterOperation: [0, 0, 0, 1, 2, 3, 4],
    StatisticsSummary: [
        [{
                Name: "输入液量(mlllll)",
                Data: ["1","1","1","1","1","1","1"]
            },
            {
                Name: "摄入量(ml)",
                Data: ["1","1","1","1","1","1","1"]
            },
            {
                Name: "小便量(ml)",
                Data: ["","200.0","","","","",""]
            },
            {
                Name: "出量(ml)",
                Data: ["1","1","1","1","1","1","1"]
            }
        ]
    ],
    shitTimes: [2, 2, 2, 2, 2, 2, 2],
    height: [1, 1, 1, 1, 1, 1, 1],
    weight: [1, 1, 1, 1, 1, 1, 1],
    bloodPressure: [
        ["80/80", "80/80"],
        ["80/80", "80/80"],
        ["80/80", "80/80"],
        ["80/80", "80/80"],
        ["80/80", "80/80"],
        ["80/80", "80/80"],
        ["80/80", "80/80"]
    ],
    pain: [
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6],
        [1, 2, 3, 4, 5, 6]
    ],
    skinTestRst: [
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ]
};

export const configData = {
    // N等分，只支持4或者6
    daySplit: 6,
    // 图例
    legend: [
        // {
        //     name: "疼痛",
        //     color: "#000"
        // },
        {
            name: "体温",
            color: "blue"
        },
        {
            name: "脉搏",
            color: "red"
        },
        {
            name: "呼吸",
            color: "#2f1c77"
        }
    ],
    // 竖坐标配置
    yAxisData: [
        {
            name: "脉搏",
            displayMax: 150, // 显示的最大值
            displayMin: 40, // 显示的最小值
            displaySplit: 10, // 显示值递增的间隔
            cellMin: 20, // 坐标轴最小值
            cellSplit: 5 // 坐标轴每格代表的值
        },
        {
            name: "呼吸",
            displayMax: 55, // 显示的最大值
            displayMin: 15, // 显示的最小值
            displaySplit: 5, // 显示值递增的间隔
            cellMin: 7, // 坐标轴最小值
            cellSplit: 2 // 坐标轴每格代表的值
        },
        {
            name: "体温",
            displayMax: 42, // 显示的最大值
            displayMin: 35, // 显示的最小值
            displaySplit: 1, // 显示值递增的间隔
            cellMin: 29, // 坐标轴最小值
            cellSplit: 0.2 // 坐标轴每格代表的值
        }
        //测试体温刻度是否与统计图栅格吻合(dev分支修改)
        // {
        //     name: "体温摄氏",
        //     displayMax: 8, // 显示的最大值
        //     displayMin: 0, // 显示的最小值
        //     displaySplit: 1, // 显示值递增的间隔
        //     cellMin: 0, // 坐标轴最小值
        //     cellSplit: 0.2 // 坐标轴每格代表的值
        // }
        // {
        //     name: "疼痛",
        //     displayMax: 10, // 显示的最大值
        //     displayMin: 1, // 显示的最小值
        //     displaySplit: 9, // 显示值递增的间隔
        //     cellMin: -7, // 坐标轴最小值
        //     cellSplit: 2 // 坐标轴每格代表的值
        // }
    ]
};
