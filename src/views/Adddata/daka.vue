<template>
    <div class="daka">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="第几天" prop="daynum">
                <el-input autocomplete="off" style="width:70px" v-model.number="ruleForm.daynum"></el-input>
            </el-form-item>
            <el-form-item label="是否添加素材" prop="delivery">
                <el-switch v-model="ruleForm.delivery" active-color="#13ce66" @change='changeStatus()'></el-switch>
            </el-form-item>
            <el-form-item label="素材ID" prop="sucaiid" v-show="ruleForm.isShow">
                <el-input autocomplete="off" v-model="ruleForm.sucaiid"></el-input>
            </el-form-item>
            <el-form-item label="回复内容" prop="content">
                <el-input type="textarea" v-model="ruleForm.content" :rows="5"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { dakaSet } from '@/api/getData'
import { isExistsDakaDay } from '@/api/getData'
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          isShow:false
        },
        rules: {
          daynum: [
              { required: true, message: '请填写打卡天数', trigger: 'blur' },
              { type: 'number', message: '打卡天数必须大于0'}
          ],  
          content: [
            { required: true, message: '请填写打卡内容', trigger: 'blur' }
          ],
        //   sucaiid: [
        //      { required: true, message: '请填写素材id', trigger: 'blur' },
        //       { type: 'number', message: '素材id必须大于0'} 
        //   ]
        }
      };
    },
    methods: {
      changeStatus()
      {
          if (this.ruleForm.isShow == false) {
              this.ruleForm.isShow = true
          } else if (this.ruleForm.isShow == true) {
              this.ruleForm.isShow = false
          }
      },  
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //查看填写的天数对不对
            isExistsDakaDay({
               daynum:this.ruleForm.daynum, 
            },res => {
              let result = res.data
              if (result.code == '000') {
                //可以提交内容
                    dakaSet({
                        daynum:this.ruleForm.daynum,
                        sucaiid:this.ruleForm.sucaiid,
                        content:this.ruleForm.content
                    },res => {
                    let resu = res.data
                    if (resu.code == '000') {
                        this.$message.success(resu.msg)
                    } else if(resu.code == '001') {
                        this.$message.error(resu.msg)
                        return false;
                    }
                    }, error => {
                        this.$message.error(resu.msg)
                    })
              } else if(result.code != '000') {
                this.$message.error(result.msg)
                return false;
              }
            }, error => {
              this.$message.error(result.msg)
            })
          } else {
            this.$message.error('验证不通过');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
      }
    }
  }
</script>

<style lang="less" scoped>
    .daka{
       margin:0px auto;
        padding-top: 10%;
        width: 30%; 
    }
</style>

