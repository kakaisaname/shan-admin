<script src="../api/getData.js"></script>
<template>
  <div class="home fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>鑫洋后台管理系统</p>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="ruleForm">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email" class="content"  placeholder="请输入邮箱">
                <i slot="prefix" class="el-icon-message"></i>
              </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="ruleForm.password" class="content"  placeholder="请输入密码">
                <i slot="prefix" class="el-icon-goods"></i>
              </el-input>
            </el-form-item>
              <el-form-item  prop="verifycode" label="验证码">
        <!-- 注意：prop与input绑定的值一定要一致，否则验证规则中的value会报undefined，因为value即为绑定的input输入值 -->
                <el-input v-model="ruleForm.verifycode" placeholder="请输入验证码" class="identifyinput"></el-input>
              </el-form-item>
              <el-form-item>
                <div class="identifybox">
                  <div @click="refreshCode">
                    <s-identify :identifyCode="identifyCode"></s-identify>
                  </div>
                  <el-button @click="refreshCode" type='text' >看不清，换一张</el-button>
                </div>
              </el-form-item>
            <el-form-item>
                 <el-button type="primary" @click="submitForm('ruleForm')" class="submit_btn">登录</el-button>
                 <!-- <el-button @click="resetForm('ruleForm')">重置</el-button>    -->
            </el-form-item>
      </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import SIdentify from '@/components/identify/identify.vue'
import { login } from '@/api/getData'
import cookies from "vue-cookie";

export default {
  name: "home",
  components: {
    SIdentify
  },
  data () {
    return {
      identifyCode: '',
      identifyCodes: '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      ruleForm:{
        email:'',
        password:'',
        verifycode:''
      },
      rules:{
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
        ],
        password:[   //-------------------可以对密码的难易度，长度等做限制，后期增加
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min:6,max:30,message:'长度在6到30个字符内',trigger: 'blur'}
        ],
        // verifycode: [
        //   { required: true, trigger: 'blur', validator: this.validateVerifycode }
        // ]
      },
      showLogin: false,
    }
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            //后台调服务器接口验证
            login({
              email:this.ruleForm.email,
              password:this.ruleForm.password
            }, res => {
              let result = res.data
              if (result.status == true) {
                this.$message.success(result.msg)
                //将登录成功返回的uid token等信息存入cookie 
                //JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串
                cookies.set('userInfo',JSON.stringify(result.data))
                //跳转到首页面 ---------------------------------------
                this.$router.push({
                  path:'/manage'   //跳转到首页去
                })
              } else if(result.status == false) {
                this.$message.error(result.msg)
                return false;
              }
            }, error => {
              // console.log(error)
              // console.log(error)
              // this.$message.error(error)
            });
          } else {
            // console.log('error submit!!');
            // this.$message.error('输入有误,请重新输入');  这个是可以的
            this.$notify.error({
              title:'错误',
              message:'请输入正确的邮箱地址，密码或验证码',
              offset:100
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      refreshCode() {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
      },
      // 生成四位随机验证码
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
          ]
        }
        // console.log(this.identifyCode)
      },
      // 生成随机数
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      validateVerifycode (rule, value, callback) {
          if (value === '') {
          callback(new Error('请输入验证码'))
        } else if (value != this.identifyCode.toLowerCase()) {  //this.identifyCode
          // console.log('validateVerifycode:', value)
          callback(new Error('验证码不正确!'))
          this.refreshCode()
        } else {
          callback()
        }
      }
  },
  mounted() {
    // 验证码初始化
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
    this.showLogin = true
  },
};
</script>

<style lang="less" scoped>
    @import '~style/mixin';
    // .home{
    //   position: fixed;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    //   bottom: 0;
    //   text-align: center;
    // }
    .home{
      background-color: #324057
    }
    .manage_tip{
      position: absolute;
      width: 100%;
      top: -100px;
      left: 0;
      p{
        font-size: 34px;
        color: #fff;
      }
	  }
    .ruleForm{
      padding-top: 10%;
        // position: absolute;
        // height 400px
        // top 40%;
    } 
    .content{
      border-radius: 10px;
    }      
    .identifybox{ //让验证码和看不清，换一张在一行 并且分辨在两边
        display: flex;
        justify-content: space-between;   
    }                
    
    form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	  }
	  .form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0); //旋转 div 元素
	  	opacity: 0;
    }
    .form_contianer{
      .wh(320px,310px);  //宽高
      .ctp(320px,310px); //定位上下左右居中
      padding: 25px;
      border-radius: 5px;
      text-align: center;
      background-color: #fff; //白色
      .submit_btn{
        width: 100%;
        font-size: 16px;
      }
    }
  
</style>

