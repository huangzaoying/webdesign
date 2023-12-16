<template>
    <div>
      <h2>修改用户信息</h2>
      <el-form ref="form" :model="user" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="user.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="用户简介">
          <el-input v-model="user.bio"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          username: '',
          email: '',
          phone: '',
          bio: '',
          password: ''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 提交表单
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created() {
      // 获取用户信息
    }
  };
  </script>
  