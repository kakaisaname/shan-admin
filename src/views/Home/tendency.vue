<template>
    <div class="line1">
        <div id="line1" style="width:90%;height:450px"></div>
    </div>
</template>

<script>
//引入echarts
import echarts from "echarts/lib/echarts"
import 'echarts/lib/chart/bar'    //柱形图 
import "echarts/lib/chart/line"   //折线图
import 'echarts/lib/component/title'  //标题
import 'echarts/lib/component/legend' //代表是什么
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint'; //最大值 最小值
import 'echarts/lib/component/tooltip';
 export default {
        created () {
            this.$destroy()  
        },
        mounted(){  //下面方法是必须的
            this.initData();
            // window.addEventListener("resize", this.myChart.resize);  //自动伸缩
        },
        props: {//从父组件接收这两个数据  不需要这两个数据
            // sevenDate: Array,
            // sevenDay: Array
        },
        methods: {  //initData方法是必须的
            initData(){
                this.myChart = echarts.init(document.getElementById('line1'));  //初始化myChart
                const colors = ['#5793f3', '#675bba', '#d14a61'];
                const option = {
                    color: colors,
                    title: {
                        text: '走势图',
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['册粉丝', '新增订单']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            dataView: {readOnly: false},
                            magicType: {type: ['bar', 'line']},
                            restore: {},
                        }
                    },
                    xAxis:  {
                        type: 'category',
                        boundaryGap: false,
                        data: this.sevenDay
                    },
                    yAxis: [
                        {
                          type: 'value',
                          name: '粉丝',
                          min: 0,
                          max: 50,
                          position: 'left',
                          axisLine: {
                              lineStyle: {
                                  color: '#999'
                              }
                          },
                          axisLabel: {
                              formatter: '{value}'
                          }
                        },
                        {
                          type: 'value',
                          name: '订单',
                          min: 0,
                          max: 50,
                          position: 'right',
                          axisLine: {
                              lineStyle: {
                                  color: '#999'
                              }
                          },
                          axisLabel: {
                              formatter: '{value}'
                          }
                        },
                    ],
                    series: [
                        {
                            name:'册粉丝',
                            type:'line',
                            data:[],
                            yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        },
                        {
                            name:'新增订单',
                            type:'line',
                            data:[],
                            yAxisIndex: 1,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                        }
                    ]
              };
              this.myChart.setOption(option);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '~style/mixin';
    .line1{
        padding-top: 5%;
        display: flex;
        justify-content: center;
    }
</style>

