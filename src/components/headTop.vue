<template>
    <div class="header_container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) of $route.meta" :key="index">{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>    
        <div>
            <el-dropdown @command="handleCommand">
                <img :src="baseImgPath + adminInfo.avatar" class="avator">
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="home">首页</el-dropdown-item>
                    <el-dropdown-item command="singout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import cookies from "vue-cookie"
import { singout } from '@/api/getData'
import {baseImgPath} from '@/config/env'
import {mapState} from 'vuex'
export default {
    // name:"HomeAside"
    data () {
        return {
            baseImgPath,      
        }
    },
    computed: {
        ...mapState(['adminInfo']),
    },
    methods: {
        handleCommand(command) {
            if (command == 'home') {
                this.$router.push('/manage');
            }else if(command == 'singout') {
                //获取cookie中的userInfo
                 let userInfo = JSON.parse(cookies.get('userInfo'))
                 singout({
                     //没有传参数  uid,token在header中传递的
                 },res => {
                      let result = res.data
                      //清空cookie
                      if (result.status == true) {
                          this.$message.success(result.msg)
                          cookies.delete('userInfo')
                          this.$router.push({
                            path: '/'
                        })
                      } else {
                          this.$router.push({
                            path: '/'
                        })
                        //   this.$message.error(result.msg)  不给提示
                      }
                 },error => {
                     //登出 token过期或怎么
                     this.$router.push({
                            path: '/'
                      })
                 })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    @import '~style/mixin';
    .header_container{
		background-color: #EFF2F7;
		height: 60px;
		display: flex;     //这个让头像靠右
		justify-content: space-between; //在弹性盒对象的 <div> 元素中的各项周围留有空白
		align-items: center;  //居中对齐弹性盒的各项 <div> 元素
		padding-left: 20px;
    }
    
    .avator{
        height: 30px;
        width: 30px;
		border-radius: 50%;
        margin-right: 37px;
        vertical-align:middle;  //使幺儿图片水平居中
	}
</style>


