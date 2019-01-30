<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="sucai">
            <el-row>
            <el-col :span="8" :offset="8">
                <div id="upload">
                    <label class="el-form-item__label" style="width: 80px;">上传图片</label>
                    <!--elementui的上传图片的upload组件-->
                    <el-upload
                    class="upload-demo"
                    :before-upload="beforeupload"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    style="margin-left:80px;"
                    accept="image/jpeg,image/png">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip" style="color:red">只能上传jpg/png文件，且不超过1M</div>
                    </el-upload>
                    
                    <!--elementui的form组件-->
                    <el-form ref="form" :model="form" label-width="80px">
                        <!-- <el-form-item label="活动名称">
                            <el-input v-model="form.name" name="names" style="width:360px;"></el-input>
                        </el-form-item> -->
                        <el-form-item style="padding-top:1%">
                            <el-button type="primary" @click="onSubmit">立即创建</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            
            <!--展示选中图片的区域-->
            <el-col :span="4" >
                <div style="width:100%;overflow: hidden;margin-left:150px;">
                    <img :src="src" alt="" style="width:100%;"/>
                </div>
            </el-col>
        </el-row>
        </div>
    </div>
</template>

<script>
import headTop from "@/components/headTop"
import axios from "axios"
    export default {
        components: {
            headTop 
        },
        data() {
            return {
                form: {//form里面的参数
                  name: ''
               },
               param:"",//表单要提交的参数
               src:"" //展示图片的地址
            };
        },
        methods: {
            beforeRemove(file, fileList) {
                //return this.$confirm(`确定移除 ${ file.name }？`);
            },
            //阻止upload的自己上传，进行再操作  这里判断上传图片的类型和大小   *****
            beforeupload(file) {
                var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)				
				const extension = testmsg === 'jpg'
				const extension2 = testmsg === 'png'
				const isLt1M = file.size / 1024 / 1024 < 1
				if(!extension && !extension2) {
					this.$message({
						message: '上传文件只能是 xls、xlsx格式!',
						type: 'warning'
					});
				}
				if(!isLt1M) {
					this.$message({
						message: '上传文件大小不能超过 1MB!',
						type: 'warning'
					});
                }
                
                //大小和类型限制后  ** 创建临时的路径来展示图片
                var windowURL = window.URL || window.webkitURL;
                
                this.src=windowURL.createObjectURL(file);
                //重新写一个表单上传的方法
                this.param = new FormData();
                this.param.append('file', file, file.name);
                return false;
            },
            //覆盖默认的上传行为
            httprequest() {

            },
            onSubmit(){//表单提交的事件
                var names = this.form.name;
                //下面append的东西就会到form表单数据的fields中；
                this.param.append('message', names);
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                };
                //然后通过下面的方式把内容通过axios来传到后台
                //下面的this.$reqs 是在主js中通过Vue.prototype.$reqs = axios 来把axios赋给它;
                axios.post("http://118.24.61.194/materialUpload", this.param, config).then(function(result) {
                                // console.log(result)
                                alert(result.data.msg)
                                // const res = result.data
                                // if (res.code == '000') {
                                //     this.$message.success(res.msg);
                                // } else if (res.code != '000') {
                                //     this.$message.error(res.msg);            
                                // }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .sucai{
        padding-top: 10%;
    }
</style>
