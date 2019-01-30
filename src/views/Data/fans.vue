<template>
    <div class="fillcontain">  <!--App.vue中引入了 @import '~style/common'; fillcontain：width 100% height 100%-->
        <head-top></head-top>
        <div class="table_container">
            <!--highlight-current-row  高亮当前行 .filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"-->
            <el-table
                :data="tableData"
                highlight-current-row 
                style="width: 100%">
                <el-table-column
                label="id"
                prop="id">
                </el-table-column>
                <el-table-column
                label="昵称"
                prop="nickname">
                </el-table-column>
                <el-table-column
                label="省份"
                prop="province">
                </el-table-column>
                <el-table-column
                label="城市"
                prop="city">
                </el-table-column>
                <el-table-column
                label="关注时间"
                prop="subscribe_time">
                </el-table-column>
                <el-table-column
                label="头像"
                prop="headimgurl">
                    <template   slot-scope="scope">            
                        <img :src="scope.row.headimgurl"  min-width="70" height="70" />
                    </template> 
                </el-table-column>
                <el-table-column
                align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                   
                    size="mini"
                    placeholder="输入关键字搜索"/>
                </template>
                <!-- <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template> -->
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[2, 20, 50, 100]"
                    :page-size="2"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count">
                </el-pagination>
            </div>
            <!--el-dialog单独在外-->
            <el-dialog title="粉丝编辑" :visible.sync="dialogVisible" :before-close="handleClose">

            </el-dialog>
        </div>
    </div>
</template>

<script>
import headTop from "@/components/headTop"
import {getFansList} from '@/api/getData'
export default {
    components: {
       headTop 
    },
    data() {
      return {
        tableData: [{
                    id:null,
                    nickname:null,
                    province:null,
                    city:null,
                    subscribe_time:null,
                    headimgurl:null
                }],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                dialogVisible:false  //弹出框不显示
            }
    },
    mounted () {
        this.initFans();  //用在mounted中也可以
    },
    methods: {
      initFans(){
          getFansList({
              offset:this.offset,
              limit:this.limit
          },res => {
              const fansResult = res.data.data
               this.count = parseInt(fansResult.count)
            //   if (result.status == true) {   不做判断了 
              this.tableData = [];
              fansResult.data.forEach(item => {
                    const tableData = {};
                    tableData.id = item.id;
                    tableData.nickname = item.nickname;
                    tableData.province = item.province;
                    tableData.city = item.city;
                    tableData.subscribe_time = item.subscribe_time;
                    tableData.headimgurl = item.headimgurl;
                    this.tableData.push(tableData);
              });
          },error =>{
              this.$message.error('获取粉丝失败')
          });
      },
      handleSizeChange(val) {//每页显示多少条数据
          this.limit = val    //设置每页大小
          this.initFans()     //请求数据
      },
      handleCurrentChange(val) { //当前页
        this.currentPage = val;
        this.offset = (val - 1)*this.limit;
        this.initFans()
      },
      handleEdit(index, row) { //粉丝列表编辑
        //应该是有一个弹框
        this.dialogVisible = true; //显示弹出框
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
}
</script>

<style lang="less" scoped>
    .table_container{
        padding-left: 20px;
    }
</style>


