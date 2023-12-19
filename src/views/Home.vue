<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user-default.png" alt="" />
          <div class="userinfo">
            <p class="name">{{ userinfo.name }}</p>
            <p class="access">{{ userinfo.registerCity }}</p>
          </div>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-descriptions title="用户信息" :column = "1">
            <el-descriptions-item label="用户名" >{{ userinfo.userName }}</el-descriptions-item>
            <el-descriptions-item label="用户类型" >{{ userinfo.userType == 1 ? "普通用户" : "管理员" }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{userinfo.phoneNumber }}</el-descriptions-item>
            <el-descriptions-item label="用户级别">{{ userinfo.level == 1? "普通" : "VIP"}}</el-descriptions-item>
            <el-descriptions-item label="简介"> {{ userinfo.bio }}</el-descriptions-item>
            <el-descriptions-item label="注册时间">{{ userinfo.registerTime }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      
    </el-col>
  </el-row>
</template>
<script>
import { getData } from "@/api";
import { mapState } from 'vuex';
import * as echarts from "echarts";
import provincesData from '@/assets/city.json';


export default {
  data() {
    return {
      userinfo: {},
      selectedLocation: [],
      options: provincesData
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.user,
    }),
  },
  methods:{
    
  },
  created() {
    this.userinfo = {...this.user};
  },
}
</script>
<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  img {
    margin-right: 40px;
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .userinfo {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access {
      color: #999999;
    }
  }
}
.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}
.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>