import '../css/reset.css'

// 加载了所有图表和组件的 ECharts 包，因此体积会比较大
// var echarts = require('echarts');

// 引入的时候也只需要引入这些模块，可以有效的将打包后的体积从 400 多 KB 减小到 170 多 KB。

// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入饼图。
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
});

// 饼图
echarts.init(document.getElementById('pie'), 'dark').setOption({
    series: {
        type: 'pie',
        data: [{
                name: 'A',
                value: 1212
            },
            {
                name: 'B',
                value: 2323
            },
            {
                name: 'C',
                value: 1919
            }
        ]
    }
});


// 个性化图表的样式
// https://echarts.baidu.com/tutorial.html#%E4%B8%AA%E6%80%A7%E5%8C%96%E5%9B%BE%E8%A1%A8%E7%9A%84%E6%A0%B7%E5%BC%8F
echarts.init(document.getElementById('pie-style')).setOption({
    series: [{
        name: '访问来源',
        type: 'pie',
        radius: '55%', // 大小
        roseType: 'angle', // ECharts 中的饼图也支持通过设置 roseType 显示成南丁格尔图
        itemStyle: {
            // 阴影的大小
            shadowBlur: 200,
            // 阴影水平方向上的偏移
            shadowOffsetX: 0,
            // 阴影垂直方向上的偏移
            shadowOffsetY: 0,
            // 阴影颜色
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            // itemStyle的emphasis是鼠标 hover 时候的高亮样式
            emphasis: {
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        },
        data: [{
                value: 235,
                name: '视频广告'
            },
            {
                value: 274,
                name: '联盟广告'
            },
            {
                value: 310,
                name: '邮件营销'
            },
            {
                value: 335,
                name: '直接访问'
            },
            {
                value: 400,
                name: '搜索引擎'
            }
        ]
    }]
});