<template>
        
        <div class="question">
        
        <el-form ref="form" :model="form" label-width="180px" :rules="rules">
        <el-form-item label="问题名称:" ref="item" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="选项一:" prop="answer1">
            <el-radio v-model="radio" label="1">
                <el-input v-model="form.answer1"></el-input>
            </el-radio>
        </el-form-item>
        <el-form-item label="选项二:" prop="answer2">
            <el-radio v-model="radio" label="2">
                <el-input v-model="form.answer2"></el-input>
            </el-radio>
        </el-form-item>
        <el-form-item label="选项三:">
            <el-radio v-model="radio" label="3">
                <el-input v-model="form.answer3"></el-input>
            </el-radio>
        </el-form-item>
        <el-form-item label="选项四:">
            <el-radio v-model="radio" label="4">
                <el-input v-model="form.answer4"></el-input>
            </el-radio>
        </el-form-item>    
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>
    </div>
    
</template>

<script>
import { questions } from '@/api/getData';
import headTop from "@/components/headTop"
  export default {
    components: {
        headTop
    },  
    data() {
      return {
        form: {
          name: '',
          answer1:'',
          answer2:'',
          answer3:'',
          answer4:'',
        },
        rules:{
            name: [
                { required: true, message: '请输入问题名称', trigger: 'blur' },
                { min:1,max: 50, message: '长度在 50个字符内', trigger: 'blur' }
            ],
            answer1: [
                { required: true, message: '请输入选项一', trigger: 'blur' },
                { min: 1, message: '长度最小1个字符', trigger: 'blur' }
            ],
            answer2: [
                { required: true, message: '请输入选项二', trigger: 'blur' },
                { min: 1, message: '长度在 长度最小1个字符', trigger: 'blur' }
            ],
        },
        radio: '1'
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
                if (valid) {
                    questions({
                        name:this.form.name,
                        answer1:this.form.answer1,
                        answer2:this.form.answer2,
                        answer3:this.form.answer3,
                        answer4:this.form.answer4,
                    },res=>{
                        let result = res.data
                        console.log(result)
                    },error=>{

                    })
                }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
    .question{
        margin:0px auto;
        padding-top: 10%;
        width: 30%;
    }
</style>
