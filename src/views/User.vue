<template>
  <div class="manage">
    <!-- <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- <div class="manage-header">
      <el-button @click="handleAdd" type="primary"> + 新增 </el-button>
       form搜索区域 -->
      <!-- <el-form :inline="true" :model="userForm">
        <el-form-item>
          <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div> --> 
    <div class="common-tabel">
      <el-table stripe height="90%" :data="userList" style="width: 100%">
        
        <el-table-column prop="userId" label="用户ID"> </el-table-column>
        <el-table-column prop="userName" label="用户名"> </el-table-column>
        <el-table-column prop="realName" label="姓名"> </el-table-column>
        <el-table-column prop="idType" label="证件类型"> </el-table-column>
        <el-table-column prop="idNumber" label="证件号"> </el-table-column>
        <el-table-column prop="phoneNumber" label="电话号码"> </el-table-column>
        <el-table-column prop="userLevel" label="用户级别"> </el-table-column>
        <el-table-column prop="registerCity" label="地址">
          <!-- <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template> -->
        </el-table-column>
        <el-table-column prop="registerTime" label="注册时间"> </el-table-column>
        <el-table-column prop="modifyTime" label="修改时间"> </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getAllUser } from "../api";
import axios from "axios";
export default {
  data() {
    return {
      dialogVisible: false,
      userList: [],
      modalType: 0, // 0表示新增的弹窗， 1表示编辑
      total: 0, //当前的总条数
      pageData: {
        page: 1,
        limit: 10,
      },
      userForm: {
        name: "",
      },
    };
  },
  methods: {
    
    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      // 注意需要对当前行数据进行深拷贝，否则会出错
      this.form = JSON.parse(JSON.stringify(row));
    },

    // 获取列表的数据
    getList() {
      getAllUser().then(({ data }) => {
        console.log(typeof data);
        this.userList = [...data];
        this.total = this.userList.length || 0;
      });
    },
    // 选择页码的回调函数
    handlePage(val) {
      this.pageData.page = val;
      this.getList(this.pageData);
    },
    // 列表的查询
    onSubmit() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .common-tabel {
    position: relative;
    height: calc(100% - 62px);
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>