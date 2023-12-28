<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="输入主题搜索"
            clearable
            v-model="query"
            @clear="getRequestsBycity"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchByName(query)"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="value"
            filterable
            :clearable="true"
            @clear="getRequestsBycity"
            @change="searchByType(value)"
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
              <el-icon v-if="scope.row.status === 'DONE'" name="check"
                >完成</el-icon
              >
              <!--完成-->
              <el-icon v-else-if="scope.row.status === 'PAUSE'" name="time"
                >待响应</el-icon
              >
              <!--待响应-->
              <el-icon
                v-else-if="scope.row.status === 'CANCEL'"
                name="close"
              ></el-icon>
              <!--取消-->
              <el-icon v-else name="warning">过期</el-icon>
              <!--过期-->
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px" align="center">
          <template v-slot="scope">
            <el-button
              type="info"
              icon="el-icon-message"
              circle
              @click="showDetails(scope.row)"
            >
            </el-button>
            <el-button
              type="primary"
              icon="el-icon-position"
              circle
              @click="submit(scope.row)"
            >
            </el-button>
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
    <el-dialog :visible.sync="dialogVisible" title="发布响应">
      <el-form :model="response">
        <el-form-item label="描述">
          <el-input
            v-model="response.responseDescription"
            type="textarea"
          ></el-input>
        </el-form-item>
        <!-- 图片介绍 -->
        <el-form-item label="图片介绍">
          <input
            type="file"
            ref="fileInput"
            style="display: none"
            @change="handleFileChange"
          />
          <el-button type="primary" size="mini" @click="openFileInput"
            >选择文件</el-button
          >
          <ul>
            <li v-for="file in uploadedFiles" :key="file.name">
              {{ file.name }}
            </li>
          </ul>
        </el-form-item>
        <el-form-item>
          <span> </span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitResponse">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
  
  <script>
import moment from "moment";
import { mapState } from "vuex";
import {
  getRequest,
  getRequestsByCity,
  getRequestByType,
  getRequestByName,
  addResponse,
} from "@/api";
export default {
  data() {
    return {
      uploadedFiles: [],
      uploadedImageNames: [],
      list: [],
      response: {
        requestId: null,
        responderId: null,
        responseDescription: "",
        responseImage: null,
        status: 0, // 默认状态为 "待接受" 1 "已接受" 2 "已拒绝" 3 "取消"
      },
      currentPage: 1,
      pageSize: 5,
      query: "",
      dialogTableVisible: false,
      selectedRowDetails: {
        describe: "",
        images: ["user.png", "user-default.png"],
      },
      //查找类型
      options: [
        {
          value: "1",
          label: "全部",
        },
        {
          value: "2",
          label: "钓鱼",
        },
        {
          value: "3",
          label: "名称",
        },
        {
          value: "4",
          label: "老少皆宜休闲",
        },
        {
          value: "5",
          label: "农家院",
        },
        {
          value: "6",
          label: "温泉度假",
        },
        {
          value: "7",
          label: "僻静休闲",
        },
        {
          value: "8",
          label: "游乐场",
        },
      ],
      value: "1",
      dialogVisible: false,
    };
  },
  computed: {
    displayedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.list.slice(startIndex, endIndex); // 根据当前页和每页显示的数量计算显示的数据
    },
    totalItems() {
      return this.list.length; // 计算总数据量
    },
    ...mapState({
      go: (state) => state.go,
    }),
  },
  created() {
    this.getRequestsBycity();
    // this.getRequestsByCity();
    this.list = [...this.go.requests];
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.uploadedFiles.push(file);
      this.uploadedImageNames.push(file.name); // 将文件名添加到数组中
      console.log("已选择的文件:", file);
      console.log("已选择的文件名:", file.name);
    },
    getRequestsBycity() {
      getRequestsByCity(this.$store.state.user.registerCity)
        .then((res) => {
          if (res.status === 200) {
            this.list = res.data;
            this.$message.success("获取成功");
            this.$store.dispatch("addRequest", res.data);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    searchByName(value) {
      getRequestByName(value)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.list = res.data;
            this.$store.dispatch("addRequest", res.data);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    searchByType(value) {
      getRequestByType(value)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.list = res.data;
            this.$store.dispatch("addRequest", res.data);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },

    showDetails(row) {
      this.selectedRowDetails.describe = row.requestDescription;
      this.selectedRowDetails.images = row.images || [];
      this.dialogTableVisible = true;
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1;
    },
    submit(row) {
      this.dialogVisible = true;
      this.response.requestId = row.requestId;
    },
    submitResponse() {
      this.response.responderId = this.$store.state.user.userId;
      this.response.status = 0;
      this.response.responseImage = this.uploadedImageNames.join(",");
      console.log(this.response);
      addResponse(this.response)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$message.success("提交成功");
            this.dialogVisible = false;
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
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
</style>