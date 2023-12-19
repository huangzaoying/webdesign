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
        <el-button @click="login" type="primary"> 登录</el-button>
        <el-button type="info" @click="dialogVisible = true"> 注册</el-button>
      </el-form-item>
    </el-form>
    <div class="el-login-footer">
      <span v-text="currentTime"></span>
    </div>
    <el-dialog title="注册" :visible.sync="dialogVisible" width="40%">
      <el-form :model="userInfo" label-width="80px" :rules="registerRules">
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input type="password" v-model="userInfo.passWord"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="cardType">
          <el-select v-model="userInfo.cardType" placeholder="选择证件类型">
            <el-option label="身份证" value="0"></el-option>
            <el-option label="其他" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="cardId">
          <el-input v-model="userInfo.cardId"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input v-model="userInfo.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="注册城市" prop="registerCity">
          <el-cascader
              placeholder="请选择地区"
              :options="options"
              v-model="selectedLocation"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="简介" prop="bio">
          <el-input v-model="userInfo.bio"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="register">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
// eslint-disable-next-line no-unused-vars
import Mock from "mockjs";
import Cookie from "js-cookie";
import userMenu from "@/assets/user.json";
import {login, register,getMenu} from "@/api";
import provincesData from '@/assets/city.json';
import info from "@/assets/info.json"
import go from "@/assets/go.json"
export default {
  data() {
    return {
      dialogVisible: false,
      userInfo: {
        userName: "",
        passWord: "",
        name: "",
        cardType: "", // 0 身份证 1 其他
        cardId: "",
        phoneNumber: "",
        registerCity: "",
        bio: "暂时没有更多了",
      },
      selectedLocation: [],
      options: provincesData,
      currentTime: new Date().toLocaleString(),
      form: {
        username: "admin1",
        password: "admin1",
      },
      rules: {
        username: [{required: true, trigger: "blur", message: "请输入账号"},
          {min: 3,max: 10, message: '长度在 3 到 10 个字符',trigger: 'blur',},],
        password: [{required: true, trigger: "blur", message: "请输入密码"},
          {min: 6,max: 15,message: '密码不少于6位',trigger: 'blur',}],
      },
      registerRules: {
        userName: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        passWord: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
        ],
        cardType: [
          {required: true, message: '请选择证件类型', trigger: 'change'},
        ],
        cardId: [
          {required: true, message: '请输入证件号码', trigger: 'blur'},
        ],
        phoneNumber: [
          {required: true, message: '请输入手机号码', trigger: 'blur'},
          {pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur'}
        ],
        registerCity: [
          {required: true, message: '请选择注册城市', trigger: 'change'},
        ],
      },
    };
  },
  watch: {
    selectedLocation: function (newVal) {
      this.userInfo.registerCity = newVal.join('-');
    }
  },
  methods: {
    // 登录
    login() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          getMenu(this.form).then(({data}) => {
          // login(this.form).then(({data}) => {
            if (data.code === 200) {
              Cookie.set("token", data.data.token); // token信息存入cookie用于不同页面间的通信              
              this.$store.commit("setMenu", userMenu);// 获取菜单的数据，存入store中
              // this.$store.commit("setUser", data.data.user);// 获取用户信息，存入store中
              this.$store.commit("addMenu", this.$router);
              this.$message.success('登录成功!');
              this.$router.push("/home");
            } else {
              this.$message.error(data.data.message);
            }
          });
        }
      });
    },
    register() {
      this.$refs.userInfo.validate((valid) => {
        if (valid) {
          register(this.userInfo).then((data) => {
            console.log(data)
            if (data.code === 200) {
              this.$message.success(data.data.message)
            } else {
              this.$message.success(data.data.message)
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
  destroyed() {
    this.$store.commit("setUser", info) // 后面删掉
    console.log(go)
    this.$store.commit("addRequest",go)
  }
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
  font-family: Arial, serif;
  font-size: 15px;
  letter-spacing: 1px;
}
</style>