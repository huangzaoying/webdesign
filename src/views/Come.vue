<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="输入主题搜索"
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
        <el-table-column prop="responseId" label="响应标识"></el-table-column>
        <el-table-column prop="requestId" label="请求标识"></el-table-column>
        <el-table-column
          prop="responderId"
          label="响应用户标识"
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
              <!-- <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="updateRespond(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteRespond(scope.row)"
              ></el-button> -->
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
      :visible.sync="editDialogVisible"
      title="修改响应信息"
      width="40%"
    >
      <el-form
        :model="editRespondData"
        :rules="formRules"
        ref="editRespondDataForm"
      >
        <el-form-item label="响应描述" prop="requestDescription">
          <el-input v-model="editRespondData.responseDescription"></el-input>
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
        <el-form-item>
          <el-button type="primary" @click="submitEditForm">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
  
  <script>
import { mapState } from "vuex";
import { getAllResponse, updateResponse, deleteResponse } from "@/api";
export default {
  data() {
    return {
      responseId : null,
      uploadedFiles: [],
      editDialogVisible: false,
      editRespondData: {
        responseDescription: "",
        images: null,
      },
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
    ...mapState({
      come: (state) => state.come,
    }),
  },
  created() {
    this.getAllResponse();
    // console.log(this.come.requests)
    // this.list = [...this.come.requests];
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      this.uploadedFiles.push(file);
      axios
        .post("/api/requests/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("上传成功，返回信息：", response);
          let base64Image = btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          this.requestData.destinationImage =
            "data:image/jpeg;base64," + base64Image;
          // this.requestData.destinationImage = response.data;
        })
        .catch((error) => {
          console.error("上传失败，错误信息：", error);
        });
      console.log("已选择的文件:", file);
      console.log("已选择的文件名:", file.name);
    },
    getAllResponse() {
      getAllResponse(this.$store.state.user.userId).then((res) => {
        if (res.status === 200) {
          this.list = res.data;
          this.$store.dispatch("addRespond", res.data);
        }
      });
    },
    submitEditForm() {
      this.$refs.editRespondDataForm.validate((valid) => {
        if (valid) {
          console.log(this.responseId, this.editRespondData);
          updateResponse(this.responseId, this.editRespondData).then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success(res.data);
              this.editDialogVisible = false;
              this.getMyResponse();
            }
          });
          this.editDialogVisible = false;
        }
      });
    },
    showDialog() {
      this.dialogVisible = true;
    },
    showDetails(row) {
      this.selectedRowDetails.describe = row.responseDescription;
      this.selectedRowDetails.images = row.images || [];
      this.dialogTableVisible = true;
    },
    // TODO:实现修改功能
    updateRespond(row) {
      this.responseId = row.responseId;
      this.editRespondData.responseDescription = row.responseDescription;
      this.editRespondData.requestId = row.requestId;
      this.editRespondData.responderId = row.responderId;
      this.editRespondData.status = 0;
      this.editDialogVisible = true;
    },
    // TODO:实现删除功能
    deleteRespond(row) {
      console.log("删除的",row);
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteResponse(row.responseId)
            .then((res) => {
              console.log(res);
              if (res.status === 200) {
                this.$message.success(res.data);
                this.getMyResponse();
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

.button-container {
  display: flex;
  gap: 10px; /* 调整按钮之间的间距 */
}
</style>