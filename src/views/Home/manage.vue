<template>
    <div class="manage_page fillcontain">
			<!--布局  el-col :span="4" 左边栏4，总共24-->
            <el-container style="height: 100%; ">
                <el-aside width="15%">
                            <!--:default-active 默认跳转页   el-menu导航栏-->
                        <el-menu :default-active="defaultActive" style="min-height: 100%;"  router> <!--router的作用是跳转到指定的路由-->
                            <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
                            <el-submenu index="2">
                                <template slot="title"><i class="el-icon-document"></i>数据管理</template>
                                <el-menu-item index="userList">粉丝列表</el-menu-item>
                                <el-menu-item index="materialList">素材列表</el-menu-item>
                                <el-menu-item index="dakaList">打卡设置列表</el-menu-item>
                            </el-submenu>
                            <el-submenu index="3">
                                <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
                                <el-menu-item index="addQuestions">添加问题</el-menu-item>
                                <el-menu-item index="addMaterial">添加素材</el-menu-item>
                                <el-menu-item index="addDaka">添加打卡设置</el-menu-item>
                            </el-submenu>
                            <el-submenu index="4">
                                <template slot="title"><i class="el-icon-star-on"></i>图表</template>
                                <el-menu-item index="visitor">用户分布</el-menu-item>
                                <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
                            </el-submenu>
                            <el-submenu index="5">
                                <template slot="title"><i class="el-icon-edit"></i>编辑</template>
                                <!-- <el-menu-item index="uploadImg">上传图片</el-menu-item> -->
                                <el-menu-item index="vueEdit">文本编辑</el-menu-item>
                            </el-submenu>
                            <el-submenu index="6">
                                <template slot="title"><i class="el-icon-setting"></i>设置</template>
                                <el-menu-item index="adminSet">管理员设置</el-menu-item>
                                <!-- <el-menu-item index="sendMessage">发送通知</el-menu-item> -->
                            </el-submenu>
                            <el-submenu index="7">
                                <template slot="title"><i class="el-icon-warning"></i>说明</template>
                                <el-menu-item index="explain">说明</el-menu-item>
                            </el-submenu>
                        </el-menu>
                </el-aside>
                  <!--所有路径匹配到的视图组件都会被缓存-->
                        <router-view></router-view>
            </el-container>    
  	</div>
</template>

<script>
import dtime from "time-formater"
import tendency from "./tendency"
export default {
    data () {
        //  const item = {
        //     date: '2016-05-02',
        //     name: '王小虎',
        //     address: '上海市普陀区金沙江路 1518 弄'
        // };
        // return {
        //     tableData: Array(20).fill(item)
        // }
        return {  //数据初始化为 null
           
        }
    },
    components: {
      tendency  
    },
    computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', ''); //将''替换为/
			}
    },
    mounted () {
        
    },
    methods: {
        
    }
}
</script>

<style lang="less" scoped>
    @import '~style/mixin';
    .el-header {
        line-height:60px;
   }
</style>


