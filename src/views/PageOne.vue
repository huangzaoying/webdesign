<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="输入主题搜索"
            clearable
            v-model="query"
            @clear="getMyResquest"
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
            @clear="getMyResquest"
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
            <div style="font-size: 20px" @click="checkResponse(scope.row)">
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
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button
              type="info"
              icon="el-icon-message"
              circle
              @click="showDetails(scope.row)"
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
    <el-dialog
      title="响应信息"
      :visible="dialogVisible"
      @close="closeResponseDialog"
    >
      <el-row>
        <el-col
          :span="24"
          v-for="(response, index) in paginatedResponseList"
          :key="index"
        >
          <el-card>
            <el-form :model="response" label-width="100px">
              <el-form :model="response" label-width="100px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="用户名">
                      <el-input v-model="response.userName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户级别">
                      <el-input
                        v-model="response.userLevel"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="用户类型">
                      <el-input v-model="response.userType" disabled></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户姓名">
                      <el-input v-model="response.realName" disabled></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="手机号码">
                      <el-input
                        v-model="response.phoneNumber"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="注册城市">
                      <el-input
                        v-model="response.registerCity"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="20">
                    <el-form-item label="用户简介">
                      <el-input
                        v-model="response.userIntro"
                        type="textarea"
                        disabled
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                  <el-col :span="4">
                    <el-button
                      type="success"
                      icon="el-icon-check"
                      circle
                      @click="acceptResponse(response)"
                    ></el-button>
                  </el-col>
                  <el-col :span="4">
                    <el-button
                      type="danger"
                      icon="el-icon-close"
                      circle
                      @click="rejectResponse(response)"
                    ></el-button>
                  </el-col>
                </el-row>
              </el-form>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <el-pagination
        :current-page="currentpage"
        :page-size="perPage"
        :total="responseList.length"
        @current-change="handlePageChange"
      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  addRequest,
  getRequest,
  deleteRequest,
  getRequestByType,
  getRequestByName,
  getUser,
  getRequestsResponder,
  getRequestsResponse,
  updateRequest,
  updateResponse,
} from "@/api";
export default {
  data() {
    return {
      dialogVisible: false, // 控制对话框的显示状态
      userData: {}, // 保存用户信息的对象
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
      responseList: [],
      perPage: 1, // 每页显示的数量
      currentpage: 1, // 当前页数
      responderList: [],
    };
  },
  watch: {
    go(newValue) {
      this.list = [...newValue.requests];
    },
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
      go: (state) => state.go,
    }),
    paginatedResponseList() {
      const startIndex = (this.currentpage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.responseList.slice(startIndex, endIndex);
    },
  },
  created() {
    this.getMyResquest();
    // this.list = [...this.go.requests];
  },

  methods: {
    getUsername(userId) {
      getUser(userId)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data[0].realName);
            return res.data[0].realName;
          }
        })
        .catch((error) => {});
    },
    showResponseDialog(requestId) {
      getRequestsResponder(requestId)
        .then((res) => {
          if (res.status === 200) {
            this.responderList = res.data;
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
      getRequestsResponse(requestId)
        .then((res) => {
          if (res.status === 200) {
            this.responseList = res.data;
            this.responseList = this.responseList.map((response) => {
              const user = this.responderList.find(
                (responder) => response.responderId === responder.userId
              );
              return { ...user, ...response };
            });
            console.log(this.responseList);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
      this.dialogVisible = true;
    },
    closeResponseDialog() {
      // 关闭对话框时执行的操作
      this.dialogVisible = false;
    },
    acceptResponse(response) {
      this.$confirm("确认接受响应吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log("接受响应", response);
        let sendData1 = {
          userId: response.userId,
          requestId: response.requestId,
          status: "DONE",
        };
        let sendData2 = {
          requestId: response.requestId,
          responderId: response.responderId,
          status: 1,
        };
        console.log(sendData1, response.requestId);
        console.log(sendData2, response.responserId);
        updateRequest(response.requestId, sendData1)
          .then((res) => {
            if (res.status === 200) {
              this.$message.success(res.statusText);
            }
          })
          .catch((error) => {
            this.$message.error(error);
          });
        updateResponse(response.responseId, sendData2)
          .then((res) => {
            if (res.status === 200) {
              this.$message.success(res.statusText);
            }
          })
          .catch((error) => {
            this.$message.error(error);
          });

        this.responseList.forEach((item) => {
          if (item !== response) {
            this.rejectResponse(item);
          }
        });
        this.responseList = [];
        this.getMyResquest();
      });
    },
    rejectResponse(response) {
      // let requestId = response.requestId;
      let responseId = response.responserId;
      // let sendData1 = {
      //   userId: response.userId,
      //   requestId: response.requestId,
      //   status: "CANCEL",
      // };
      let sendData2 = {
        requestId: response.requestId,
        responderId: response.responderId,
        status: 2,
      };
      // updateRequest(requestId, sendData1)
      //   .then((res) => {
      //     if (res.status === 200) {
      //       this.$message.success(res.statusText);
      //     }
      //   })
      //   .catch((error) => {
      //     this.$message.error(error);
      //   });
      updateResponse(responseId, sendData2)
        .then((res) => {
          if (res.status === 200) {
            this.$message.success(res.statusText);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    checkResponse(row) {
      this.showResponseDialog(row.requestId);
    },
    handlePageChange(newPage) {
      this.currentpage = newPage;
    },
    searchByName(value) {
      getRequestByName(value)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.list = res.data;
            this.$message.success(res.statusText);
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
          console.log(123123, res);
          if (res.status === 200) {
            this.list = res.data;
            this.$message.success(res.statusText);
            this.$store.dispatch("addRequest", res.data);
          } else {
            this.$message.error(res.statusText);
          }
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    showDetails(row) {
      this.selectedRowDetails.describe = row.requestDescription;
      this.selectedRowDetails.images = row.destinationImage || [];
      this.dialogTableVisible = true;
    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1;
    },
    search(query) {
      if (query) {
        this.list = this.list.filter((item) => {
          return item.requestTheme.indexOf(query) > -1;
        });
      } else {
        this.list = [...this.go.requests];
      }
    },
    getMyResquest() {
      getRequest(this.$store.state.user.userId)
        .then((res) => {
          if (res.status === 200) {
            this.list = res.data;
            // this.$message.success("获取成功");
            this.$store.dispatch("addRequest", res.data);
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