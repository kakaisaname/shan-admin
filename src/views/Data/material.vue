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
                label="media_id"
                prop="media_id">
                </el-table-column>
                <el-table-column
                label="素材"
                prop="url" min-width="30%">
                    <template   slot-scope="scope">            
                        <img :src="scope.row.url"  min-width="170" height="70" />
                    </template> 
                </el-table-column>
                <el-table-column
                align="right">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="count">
                </el-pagination>
            </div>
            <!--el-dialog单独在外-->
        </div>
    </div>
</template>

<script>
import headTop from "@/components/headTop"
import {getMaterialList} from '@/api/getData'
import {baseImgPath} from '@/config/env'
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
                limit: 10,
                count: 0,
                currentPage: 1,
                dialogVisible:false,  //弹出框不显示
                baseImgPath
            }
    },
    mounted () {
        this.initFans();  //用在mounted中也可以
    },
    methods: {
      initFans(){
          getMaterialList({
              offset:this.offset,
              limit:this.limit
          },res => {
              const materialResult = res.data.data
               this.count = parseInt(materialResult.count)
            //   if (result.status == true) {   不做判断了 
              this.tableData = [];
              materialResult.data.forEach(item => {
                    const tableData = {};
                    tableData.id = item.id;
                    tableData.media_id = item.media_id;
                    tableData.url = baseImgPath+item.url;
                    this.tableData.push(tableData);
              });
          },error =>{
              this.$message.error('获取素材失败')
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
      handleDelete(index, row) {  //删除该图片素材
         
      }
    },
}
</script>

<style lang="less" scoped>
    .table_container{
        padding-left: 20px;
    }
</style>


