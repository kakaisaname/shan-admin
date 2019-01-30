<template>
    <div style="width:100%">
        <el-container>
                    <el-header style="text-align: center; font-size: 12px;background-color:#eff2f7;">
                            <head-top></head-top>
                    </el-header>
                    <el-main>
                        <!-- 布局 -->
                        <section class="data_section">
                            <header class="section_title">数据统计</header>
                            <!--gutter 栅格间隔 其实就是padding-left padding-right 各多少-->
                            <el-row :gutter="20" style="margin-bottom: 10px;"> 
                                <el-col :span="4"><div class="data_list today_head"><span class="data_num head">当日数据：</span></div></el-col>
                                <el-col :span="4"><div class="data_list"><span class="data_num">{{fansCount}}</span> 新增粉丝</div></el-col>
                                <el-col :span="4"><div class="data_list"><span class="data_num">{{orderCount}}</span> 新增订单</div></el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="4"><div class="data_list all_head"><span class="data_num head">总数据：</span></div></el-col>
                                <el-col :span="4"><div class="data_list"><span class="data_num">{{allFansCount}}</span> 注册粉丝</div></el-col>
                                <el-col :span="4"><div class="data_list"><span class="data_num">{{allOrderCount}}</span> 订单</div></el-col>
                            </el-row>
		                </section>
                        <tendency></tendency>                      
                    </el-main>        
       </el-container>
    </div>
</template>

<script>
import headTop from "@/components/headTop"
import dtime from "time-formater"
import {getFansOrders,getLast7DayData} from "@/api/getData"
import tendency from "./tendency"
import echarts from "echarts/lib/echarts"
export default {
    data () {
        return {  //数据初始化为 null
            fansCount: null,
            orderCount: null,
            allFansCount: null,
            allOrderCount: null,
            sevenDay: [],
            sevenDate: [[],[]],
            today:dtime(new Date().getTime()).format('YYYY-MM-DD'),
            colors: ['#5793f3', '#675bba', '#d14a61'],
            option:{
                    color: this.colors,
                    title: {
                        text: '走势图',  //其实页面刷新走的是这个 option
                        subtext: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['新粉丝', '新增订单']
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
                        data: []
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
                            name:'新粉丝',
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
              }
        }
    },
    components: {
      tendency,    //需要tendency组件，不然显示不出图像
      headTop 
    },
    computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', ''); //将''替换为/
			}
    },
    activated() {  //刷新  *************************** 没这个函数的话
        this.getSevenData()  //需要执行这个方法 ***在这个方法里
        this.initData()
    },
    mounted () {
        this.myChart = echarts.init(document.getElementById('line1'))  //必须的，不然没数据，虽然有架子
        this.initData()
        for (let i = 6;i > -1;i--) {  //7天日期，还必须在mounted的时候写入，不能在activated（）中写入
            //前6天 和今天
            const date = dtime(new Date().getTime() - 86400000*i).format('YYYY-MM-DD')
            this.sevenDay.push(date)
        }
        this.option.xAxis.data = this.sevenDay
    },
    methods: {
        initData(){ //当天的数据
            getFansOrders({
                daytime:this.today  //其实也没必要传时间，服务器返回就是了
            },res => {
                let data = res.data
                    this.fansCount = data.data.fansNum
                    this.orderCount = data.data.orderNum
                    this.allFansCount = data.data.allFansNum
                    this.allOrderCount = data.data.allOrderNum
            },error =>{
                //不做处理
            })
        },      
        getSevenData(){ //获取最近7天的数据
            getLast7DayData({
                daytime:this.today
            },res => {
                let data = res.data.data
                //折现和柱状图 数据 **************************************************************
                this.option.series[0].data = data.fans
                this.option.series[1].data = data.orders
                this.myChart.setOption(this.option);
            },error =>{
                //不做处理
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    .section_title{
			text-align: center;
			font-size: 30px;
            margin-bottom: 10px;
    }
    .data_list{
        text-align: center;
        font-size: 14px;     //设置字体大小
        color: #666;
        border-radius: 6px;  //边角
        background: #e5e9f2;  //背景色
        .data_num{
            color: #333;
            font-size: 20px  //字体大小
        }
        .head{
            border-radius: 6px;
            font-size: 22px;   //字体稍微大点
            padding: 4px 0;
            color: #fff;
            // display: inline-block; 设置了inline-block属性的元素既拥有了block元素可以设置width和height的特性，又保持了inline元素不换行的特性
        }
    }
    .today_head{  //设置背景色  覆盖了data_list的背景色
            background: #FF9800;
    }
    .all_head{  //设置背景色
            background: #20A0FF;
    }   
     .line1{
        padding-top: 5%;
        display: flex;
        justify-content: center;
    } 
</style>


