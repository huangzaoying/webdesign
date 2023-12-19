<template>
  <el-card class="box-card">
    <el-row :gutter="20">
      <el-col>
        <el-button
          type="primary"
          class="edit-button"
          icon="el-icon-edit"
          @click="dialogVisible = true"
        ></el-button>
      </el-col>
    </el-row>
    <el-form :model="userInfo" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名">
            <el-input v-model="userInfo.userName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="登录密码">
            <el-input
              v-model="userInfo.passWord"
              disabled
              type="password"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户类型">
            <el-input v-model="userInfo.userType" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户姓名">
            <el-input v-model="userInfo.name" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="证件类型">
            <el-input v-model="userInfo.idType" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件号码">
            <el-input v-model="userInfo.idNumber" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手机号码">
            <el-input v-model="userInfo.phoneNumber" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户级别">
            <el-input v-model="userInfo.userLevel" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="注册城市">
            <el-input v-model="userInfo.city" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="用户简介">
            <el-input
              v-model="userInfo.bio"
              type="textarea"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="注册时间">
            <el-input v-model="userInfo.registerTime" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="修改时间">
            <el-input v-model="userInfo.updateTime" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="修改信息" :visible.sync="dialogVisible" width="50%">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="联系电话" prop="phoneNumber">
          <el-input v-model="form.phoneNumber"></el-input>
        </el-form-item>
        <el-form-item label="用户简介" prop="bio">
          <el-input v-model="form.bio" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认登录密码" prop="repassword">
          <el-input v-model="form.repassword" type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('userInfo')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import form from "element-ui/packages/form";
import { mapState } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false,
      userInfo: {},
      form: {
        phoneNumber: "",
        bio: "",
        password: "",
        repassword: "",
      },
      rules: {
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^1[34578]\d{9}$/,
            message: "手机号码格式不正确",
            trigger: "blur",
          },
        ],
        bio: [{ required: true, message: "请输入个人简介", trigger: "blur" }],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  // TODO: 从后端获取用户信息，修改信息功能待完善
  methods: {
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.password !== this.form.repassword) {
            this.$message({
              type: "error",
              message: "密码不一致",
            });
            return false;
          }
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.dialogVisible = false;
          this.userInfo.phoneNumber = this.form.phoneNumber;
          this.userInfo.bio = this.form.bio;
          this.userInfo.password = this.form.password;
          this.$store.commit("setPhoneNumber", this.form.phoneNumber);
          this.$store.commit("setBio", this.form.bio);
          this.$store.commit("setPassword", this.form.password);
        } else {
          this.$message({
            type: "error",
            message: "修改失败",
          });
          return false;
        }
      });
    },
  },
  created() {
    this.userInfo = { ...this.user };
  },
};
</script>

<style scoped lang="less">
.edit-button {
  float: right;
}
</style>