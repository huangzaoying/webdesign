<template>
  <div class="login-page">
    <el-form
        ref="form"
        label-width="70px"
        :inline="true"
        class="login-container"
        :model="form"
        :rules="rules"
    >
      <h3 class="login_title">好去处管理系统</h3>
      <el-form-item label="用户" prop="username">
        <el-input v-model="form.username" prefix-icon="iconfont icon-user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
            type="password"
            v-model="form.password"
            prefix-icon="iconfont icon-3702mima"
        ></el-input>
      </el-form-item>
      <el-form-item class="button-group">
        <el-button @click="submit" type="primary"> 登录 </el-button>
        <el-button type="info" @click="handleRegister"> 注册 </el-button>
      </el-form-item>
    </el-form>
    <div class="el-login-footer">
      <span v-text="currentTime"></span>
    </div>
  </div>

</template>
<script>
import Mock from "mockjs";
import Cookie from "js-cookie";
import {getMenu, register} from "../api";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data() {
    return {
      currentTime: new Date().toLocaleString(),
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [{required: true, trigger: "blur", message: "请输入您的账号"},
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },],
        password: [{required: true, trigger: "blur", message: "请输入您的密码"},
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },],
      },
    };
  },
  methods: {
    // 登录
    submit() {
      // // token信息
      // const token = Mock.Random.guid()
      // 校验通过
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({data}) => {
            if (data.code === 200) {
              // token信息存入cookie用于不同页面间的通信
              Cookie.set("token", data.data.token);
              // 获取菜单的数据，存入store中
              this.$store.commit("setMenu", data.data.menu);
              this.$store.commit("addMenu", this.$router);
              // 跳转到首页
              this.$message.success('登录成功!')
              this.$router.push("/home");
            } else {
              this.$message.error(data.data.message);
            }
          });
        }
      });
    },
    handleRegister() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          register(this.form).then(({data}) => {
            if (data.code === 200) {
              this.$message.success('注册成功')
            } else {
              this.$message.success('注册成功')
            }
          });
        }
      });
    }
  },
  created() {
    setInterval(() => {
      this.currentTime = new Date().toLocaleString()
    }, 1000)
  },
};
</script>
<style lang="less" scoped>
.login_title {
  font-family: "Courier New", monospace;
  color: #333;
  font-size: 24px;
}
.login-page {
  height: 100vh;
  background-image: url('~@/assets/images/login-background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px #cac6c6;
  box-sizing: border-box;

  .login_title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }

  .el-input {
    width: 198px;
  }
  .button-group {
    display: flex;
    justify-content: center;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial,serif;
  font-size: 15px;
  letter-spacing: 1px;
}
</style>