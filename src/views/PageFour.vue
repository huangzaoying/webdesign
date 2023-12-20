<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="输入关键字搜索"
            clearable
            v-model="query"
            @clear="a = true"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search(query)"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="value"
            filterable
            :clearable="true"
            @change="sort($event)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-table :data="displayedData" stripe style="width: 100%" border>
        <el-table-column label="#">
          <template slot-scope="scope">
            {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
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
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="modifyTime" label="修改时间"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            <div style="font-size: 20px">
              <el-icon v-if="scope.row.status === 1" name="check"></el-icon>
              <el-icon v-else-if="scope.row.status === 2" name="time"></el-icon>
              <el-icon
                v-else-if="scope.row.status === 3"
                name="close"
              ></el-icon>
              <el-icon v-else name="warning"></el-icon>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px" align="center">
          <template v-slot="scope">
            <div class="button-container">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="updateRequest(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteRequest(scope.row)"
              ></el-button>
              <el-button
                type="info"
                icon="el-icon-message"
                size="mini"
                @click="showDetails(scope.row)"
              ></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 9, 13, 15]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems"
      >
      </el-pagination>
    </el-card>
    <el-dialog :visible.sync="dialogTableVisible" title="详情信息" width="50%">
      <el-card>
        <el-descriptions :column="1">
          <el-descriptions-item label="请求描述">{{
            selectedRowDetails.describe
          }}</el-descriptions-item>
          <el-descriptions-item label="图片介绍">
            <div style="display: flex; flex-wrap: wrap">
              <el-image
                v-for="(image, index) in selectedRowDetails.images"
                :key="index"
                :src="require('@/assets/images/' + image)"
                style="flex: 0 0 calc(50% - 10px); margin: 5px"
              ></el-image>
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible"
      title="发布新的请求信息"
      width="50%"
    >
      <el-form :model="requestData" :rules="formRules" ref="requestDataForm">
        <!-- 发布用户标识 -->
        <el-form-item label="发布用户标识" prop="userId">
          <el-input v-model="requestData.userId"></el-input>
        </el-form-item>

        <el-form-item label="去处类型" prop="destinationType">
          <el-input v-model="requestData.destinationType"></el-input>
        </el-form-item>

        <!-- 请求主题名称 -->
        <el-form-item label="请求主题名称" prop="theme">
          <el-input v-model="requestData.theme"></el-input>
        </el-form-item>

        <!-- 请求描述 -->
        <el-form-item label="请求描述" prop="description">
          <el-input v-model="requestData.description"></el-input>
        </el-form-item>

        <!-- 图片介绍 -->
        <el-form-item label="图片介绍">
          <!-- 这里添加上传图片组件，或其他适用于图片的组件 -->
        </el-form-item>

        <!-- 最高单价 -->
        <el-form-item label="最高单价" prop="maxPrice">
          <el-input v-model="requestData.maxPrice"></el-input>
        </el-form-item>

        <!-- 请求结束日期 -->
        <el-form-item label="请求结束日期" prop="endDate">
          <el-date-picker
            v-model="requestData.endDate"
            type="date"
          ></el-date-picker>
        </el-form-item>

        <!-- 创建时间 -->
        <el-form-item label="创建时间" prop="createTime">
          <el-date-picker
            v-model="requestData.createTime"
            type="datetime"
          ></el-date-picker>
        </el-form-item>

        <!-- 修改时间 -->
        <el-form-item label="修改时间" prop="updateTime">
          <el-date-picker
            v-model="requestData.updateTime"
            type="datetime"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="requestData.status" placeholder="请选择状态">
            <el-option label="已完成" value="completed"></el-option>
            <el-option label="待响应" value="pending"></el-option>
            <el-option label="已取消" value="canceled"></el-option>
            <el-option label="到期未达成" value="expired"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
  
  <script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 5,
      query: "",
      dialogTableVisible: false,
      selectedRowDetails: {
        describe: "",
        images: ["user.png", "user-default.png"],
      },
      options: [
        {
          value: "1",
          label: "全部",
        },
        {
          value: "2",
          label: "未接受",
        },
        {
          value: "3",
          label: "已接受",
        },
      ],
      value: "1",
      dialogVisible: false,
      requestData: {
        userId: "",
        destinationType: "",
        theme: "",
        description: "",
        // ...其他属性
      },
      formRules: {
        userId: [
          { required: true, message: "发布用户标识不能为空", trigger: "blur" },
        ],
        destinationType: [
          { required: true, message: "去处类型不能为空", trigger: "blur" },
        ],
        theme: [
          { required: true, message: "请求主题名称不能为空", trigger: "blur" },
        ],
        // ...其他规则
      },
    };
  },
  computed: {
    // 根据当前页和每页显示的数量计算显示的数据
    displayedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.list.slice(startIndex, endIndex);
    },
    // 计算总数据量
    totalItems() {
      return this.list.length;
    },
    ...mapState({
      go: (state) => state.go,
    }),
  },
  created() {
    this.list = [...this.go.requests];
  },
  methods: {
    showDialog() {
      this.dialogVisible = true;
    },
    showDetails(row) {
      this.selectedRowDetails.describe = row.describe;
      this.selectedRowDetails.images = row.images || [];
      this.dialogTableVisible = true;
    },
    // TODO:实现修改功能
    updateRequest(row) {
      console.log(row);
    },
    // TODO:实现删除功能
    deleteRequest(row) {
      console.log(row);
    },
    // TODO:实现增加功能
    submitForm() {
      // 校验表单
      this.$refs.requestDataForm.validate((valid) => {
        if (valid) {
          // 在这里执行提交逻辑，例如调用API等
          console.log("Form submitted successfully:", this.requestData);
          // 关闭对话框
          this.dialogVisible = false;
        } else {
          console.log("Form validation failed.");
        }
      });
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1; // 切换每页显示数量时，回到第一页
    },
  },
};
</script>
  
  <style lang="less" scoped>
.el-table {
  margin-top: 15px;
}

.el-card {
  .el-select {
    position: absolute;
    right: 0px;
    width: 300px;
    padding: 5px;
  }
}

.button-container {
  display: flex;
  gap: 10px; /* 调整按钮之间的间距 */
}
</style>