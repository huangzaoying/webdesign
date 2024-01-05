<template>
  <div>
    <img :src="this.requestData.destinationImage" />
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-button type="primary" @click="dialogVisible = true"
            >发布</el-button
          >
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
            <div class="button-container">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="updaterequest(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleterequest(scope.row)"
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
      width="40%"
    >
      <el-form :model="requestData" :rules="formRules" ref="requestDataForm">
        <el-form-item label="去处类型" prop="destinationType">
          <el-input v-model="requestData.destinationType"></el-input>
        </el-form-item>

        <!-- 请求主题名称 -->
        <el-form-item label="请求主题名称" prop="requestTheme">
          <el-input v-model="requestData.requestTheme"></el-input>
        </el-form-item>

        <!-- 请求描述 -->
        <el-form-item label="请求描述" prop="requestDescription">
          <el-input v-model="requestData.requestDescription"></el-input>
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

        <el-form-item label="最高单价" prop="highestPrice">
          <el-input v-model="requestData.highestPrice"></el-input>
        </el-form-item>

        <el-form-item label="请求结束日期" prop="requestEndDate">
          <el-date-picker
            v-model="requestData.requestEndDate"
            align="right"
            type="datetime"
            placeholder="请求结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" class="align-right"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      :visible.sync="editDialogVisible"
      title="修改请求信息"
      width="40%"
    >
      <el-form
        :model="editRequestData"
        :rules="formRules"
        ref="editRequestDataForm"
      >
        <el-form-item label="去处类型" prop="destinationType">
          <el-input v-model="editRequestData.destinationType"></el-input>
        </el-form-item>

        <el-form-item label="请求主题名称" prop="requestTheme">
          <el-input v-model="editRequestData.requestTheme"></el-input>
        </el-form-item>

        <el-form-item label="请求描述" prop="requestDescription">
          <el-input v-model="editRequestData.requestDescription"></el-input>
        </el-form-item>

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

        <!-- 最高单价 -->
        <el-form-item label="最高单价" prop="highestPrice">
          <el-input v-model="editRequestData.highestPrice"></el-input>
        </el-form-item>

        <!-- 请求结束日期 -->
        <el-form-item label="请求结束日期" prop="requestEndDate">
          <el-date-picker
            v-model="editRequestData.requestEndDate"
            align="right"
            type="datetime"
            placeholder="请求结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitEditForm">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { mapState } from "vuex";
import { addRequest, getRequest, updateRequest, deleteRequest } from "@/api";
export default {
  data() {
    return {
      uploadedFiles: [],
      uploadedImageNames: [],
      uploadedImage: null,
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
          value: "全部",
          label: "全部",
        },
        {
          value: "钓鱼",
          label: "钓鱼",
        },
        {
          value: "名称",
          label: "名称",
        },
        {
          value: "老少皆宜休闲",
          label: "老少皆宜休闲",
        },
        {
          value: "农家院",
          label: "农家院",
        },
        {
          value: "温泉度假",
          label: "温泉度假",
        },
        {
          value: "僻静休闲",
          label: "僻静休闲",
        },
        {
          value: "游乐场",
          label: "游乐场",
        },
        {
          value: "TypeA",
          label: "TypeA",
        },
      ],
      value: "全部",
      dialogVisible: false,
      requestData: {
        userId: 123,
        destinationType: "僻静休闲",
        requestTheme: "旅游",
        requestDescription: "Like this place",
        destinationImage: "",
        highestPrice: 123,
        requestEndDate: null,
      },
      formRules: {
        destinationType: [
          { required: true, message: "去处类型是必填项", trigger: "blur" },
        ],
        requestTheme: [
          { required: true, message: "请求主题名称是必填项", trigger: "blur" },
        ],
        requestDescription: [
          { required: true, message: "请求描述是必填项", trigger: "blur" },
        ],
        highestPrice: [
          { required: true, message: "最高单价是必填项", trigger: "blur" },
        ],
        requestEndDate: [
          {
            required: true,
            message: "请求结束日期是必填项",
            trigger: "change",
          },
        ],
      },
      editDialogVisible: false,
      editRequestData: {
        destinationType: "TypeB",
        requestTheme: "Theme Fish",
        requestDescription: "Description Example",
        destinationImage: "",
        highestPrice: 120.5,
        requestEndDate: null,
      },
    };
  },
  computed: {
    displayedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.list.slice(startIndex, endIndex);
    },
    totalItems() {
      return this.list.length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
    ...mapState({
      go: (state) => state.go,
    }),
  },
  created() {
    this.getMyResquest();
  },
  watch: {
    go(newValue) {
      this.list = [...newValue.requests];
    },
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      // const formData = new FormData();
      // formData.append("file", file);
      this.uploadedFiles.push(file);
      this.uploadedImageNames.push(file.name); // 将文件名添加到数组中
      // axios
      //   .post("/api/requests/upload", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   })
      //   .then((response) => {
      //     console.log("上传成功，返回信息：", response);
      //     let base64Image = btoa(
      //       new Uint8Array(response.data).reduce(
      //         (data, byte) => data + String.fromCharCode(byte),
      //         ""
      //       )
      //     );
      //     this.requestData.destinationImage = 'data:image/jpeg;base64,' + base64Image;
      //     // this.requestData.destinationImage = response.data;
      //   })
      //   .catch((error) => {
      //     console.error("上传失败，错误信息：", error);
      //   });
      console.log("已选择的文件:", file);
      console.log("已选择的文件名:", file.name);
    },
    getMyResquest() {
      getRequest(this.$store.state.user.userId)
        .then((res) => {
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
      if (row.destinationImage === "") {
        this.selectedRowDetails.images = ["user-default.png"]; 
      } else {
        this.selectedRowDetails.images = row.destinationImage.split(",");
      }
      this.dialogTableVisible = true;
    },
    submitEditForm() {
      console.log(this.editRequestData);
      if (this.editRequestData.status === "DONE") {
        this.$message.error("已完成的请求不可修改");
        return;
      }
      this.$refs.editRequestDataForm.validate((valid) => {
        if (valid) {
          const id = this.editRequestData.requestId;
          this.editRequestData.requestEndDate = moment(
            this.editRequestData.requestEndDate
          ).format("YYYY-MM-DD HH:mm:ss");
          delete this.editRequestData.requestId;
          delete this.editRequestData.status;
          this.editRequestData.destinationImage =
            this.uploadedImageNames.join(",");
          this.uploadedFiles = [];
          this.uploadedImageNames = [];
          updateRequest(id, this.editRequestData)
            .then((data) => {
              if (data.status === 200) {
                this.getMyResquest();
                this.$refs.editRequestDataForm.resetFields();
                this.dialogVisible = false;
                this.$message.success(data.data);
              }
            })
            .catch((error) => {
              this.$message.error(error);
            });
        }
      });
    },
    // TODO: 实现修改功能
    updaterequest(row) {
      this.editRequestData.requestId = row.requestId;
      this.editRequestData.userId = this.$store.state.user.userId;
      this.editRequestData.destinationType = row.destinationType;
      this.editRequestData.requestTheme = row.requestTheme;
      this.editRequestData.requestDescription = row.requestDescription;
      this.editRequestData.highestPrice = row.highestPrice;
      this.editRequestData.requestEndDate = row.requestEndDate;
      this.editRequestData.status = row.status;
      this.editDialogVisible = true;
    },
    // TODO: 实现删除功能
    deleterequest(row) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteRequest(row.requestId)
            .then((data) => {
              if (data.status === 200) {
                this.$store.dispatch("deleteRequest", row.requestId);
                this.$message.success(data.data);
                this.getMyResquest();
              }
            })
            .catch((error) => {
              this.$message.error(error);
            });
        })
        .catch(() => {
          // 在这里处理用户点击取消按钮后的逻辑
        });
    },
    // TODO: 实现增加功能
    submitForm() {
      console.log(this.requestData);
      this.$refs.requestDataForm.validate((valid) => {
        if (valid) {
          this.requestData.userId = this.$store.state.user.userId;
          console.log(this.requestData.requestEndDate);
          if (moment(this.requestData.requestEndDate).isValid()) {
            this.requestData.requestEndDate = moment(
              this.requestData.requestEndDate
            ).format("YYYY-MM-DD HH:mm:ss");
          } else {
            console.log("Invalid date");
          }
          this.requestData.destinationImage = this.uploadedImageNames.join(",");
          this.uploadedFiles = [];
          this.uploadedImageNames = [];
          console.log("上传的文件名:", this.requestData.destinationImage);
          console.log("更改后的requestData:", this.requestData);
          addRequest(this.requestData)
            .then((data) => {
              if (data.status === 200) {
                this.$message.success(data.data);
                this.getMyResquest();
              }
            })
            .catch((error) => {
              this.$message.error(error);
            });
          console.log("Form submitted successfully:", this.requestData);
          this.$refs.requestDataForm.resetFields();
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
      this.currentPage = 1;
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
.align-right {
  margin-left: auto;
}
.button-container {
  display: flex;
  gap: 10px; /* 调整按钮之间的间距 */
}
</style>