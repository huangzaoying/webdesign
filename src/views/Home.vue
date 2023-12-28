<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/user-default.png" alt="" />
          <div class="userinfo">
            <p class="name">{{ userinfo.realName }}</p>
            <p class="access">{{ userinfo.registerCity }}</p>
          </div>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-descriptions title="用户信息" :column = "1">
            <el-descriptions-item label="用户名" >{{ userinfo.userName }}</el-descriptions-item>
            <el-descriptions-item label="用户类型" >{{ userinfo.userType }}</el-descriptions-item>
            <el-descriptions-item label="手机号">{{userinfo.phoneNumber }}</el-descriptions-item>
            <el-descriptions-item label="用户级别">{{ userinfo.userLevel }}</el-descriptions-item>
            <el-descriptions-item label="简介"> {{ userinfo.userIntro }}</el-descriptions-item>
            <el-descriptions-item label="注册时间">{{ userinfo.registerTime }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <el-table :data="displayedData" stripe style="width: 100%" border>
        <el-table-column prop="userId" label="发布用户"></el-table-column>
        <el-table-column
          prop="destinationType"
          label="去处类型"
        ></el-table-column>
        <el-table-column prop="requestTheme" label="请求主题"></el-table-column>
        <el-table-column prop="highestPrice" label="最高单价"></el-table-column>
        <el-table-column
          prop="requestEndDate"
          label="结束日期"
        ></el-table-column>
        <!-- <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="modifyTime" label="修改时间"></el-table-column> -->
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
import { getData } from "@/api";
import { mapState } from 'vuex';
import * as echarts from "echarts";
import provincesData from '@/assets/city.json';
import { getAllUser, getRequestAll} from "@/api";

export default {
  data() {
    return {
      userinfo: {},
      selectedLocation: [],
      options: provincesData,
      displayedData:[]  
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
    getRequestAll().then(res => {
      this.displayedData = res.data.slice(0, 10);
    })
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