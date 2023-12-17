<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
              placeholder="输入关键字搜索"
              clearable
              v-model="query"
              @clear="getcourseList"
          >
            <el-button
                slot="append"
                icon="el-icon-search"
                @click="search(query)"
            ></el-button>
          </el-input>
        </el-col>
        <!--排序下拉框-->
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
        <el-table-column
            prop="name"
            label="发布用户"
        ></el-table-column>
        <el-table-column
            prop="type"
            label="去处类型"
        ></el-table-column>
        <el-table-column
            prop="theme"
            label="请求主题"
        ></el-table-column>
        <el-table-column
            prop="price"
            label="最高单价"
        ></el-table-column>
        <el-table-column
            prop="endTime"
            label="结束日期"
        ></el-table-column>
        <el-table-column
            prop="endTime"
            label="结束日期"
        ></el-table-column>
        <el-table-column
            prop="createTime"
            label="创建时间"
        ></el-table-column>
        <el-table-column
            prop="updateTime"
            label="修改时间"
        ></el-table-column>
        <el-table-column
            prop="state"
            label="状态"
            align="center"
        >
          <template slot-scope="scope">
            <div style="font-size: 20px;">
              <el-icon v-if="scope.row.state === 1" name="check"></el-icon>
              <el-icon v-else-if="scope.row.state === 2" name="time"></el-icon>
              <el-icon v-else-if="scope.row.state === 3" name="close"></el-icon>
              <el-icon v-else name="warning"></el-icon>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button
                type="info"
                icon="el-icon-message"
                size="mini"
                @click="showDetails(scope.row)"
            >详情
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
    <el-dialog
        :visible.sync="dialogTableVisible"
        title="详情信息"
        width="50%"
    >
      <el-card>
        <el-descriptions :column="1">
          <el-descriptions-item label="请求描述">{{ selectedRowDetails.describe }}</el-descriptions-item>
          <el-descriptions-item label="图片介绍">
            <div style="display: flex; flex-wrap: wrap;">
              <el-image
                  v-for="(image, index) in selectedRowDetails.images"
                  :key="index"
                  :src="require('@/assets/images/' + image)"
                  style="flex: 0 0 calc(50% - 10px); margin: 5px;"
              ></el-image>
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>

    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      data: {
        list: [
          {
            name: '发布者1',
            type: '类型1',
            theme: '主题1',
            describe: '我在开发一个电子商务网站，目前遇到了一个布局问题，希望得到一些关于图片展示的帮助。',
            price: 100,
            endTime: '2023-01-01',
            createTime: '2023-01-01',
            updateTime: '2023-01-02',
            state: 1
          },
          {
            name: '发布者2',
            type: '类型1',
            theme: '主题1',
            describe: '描述1',
            price: 100,
            endTime: '2023-01-01',
            createTime: '2023-01-01',
            updateTime: '2023-01-02',
            state: 2,
            category: '',
            images: [],
          },
          {
            name: '发布者3',
            type: '类型1',
            theme: '主题1',
            describe: '描述1',
            price: 100,
            endTime: '2023-01-01',
            createTime: '2023-01-01',
            updateTime: '2023-01-02',
            state: 3
          },
          {
            name: '发布者4',
            type: '类型1',
            theme: '主题1',
            describe: '描述1',
            price: 100,
            endTime: '2023-01-01',
            createTime: '2023-01-01',
            updateTime: '2023-01-02',
            state: 3
          },
          {
            name: '发布者5',
            type: '类型1',
            theme: '主题1',
            describe: '描述1',
            price: 100,
            endTime: '2023-01-01',
            createTime: '2023-01-01',
            updateTime: '2023-01-02',
            state: 3
          },
          {
            name: '发布者6',
            type: '类型1',
            theme: '主题1',
            describe: '描述1',
            price: 100,
            endTime: '2023-01-01',
            createTime: '2023-01-01',
            updateTime: '2023-01-02',
            state: 3
          },
          {
            name: '发布者7',
            type: '类型1',
            theme: '主题1',
            describe: '描述1',
            price: 100,
            endTime: '2023-01-01',
            createTime: '2023-01-01',
            updateTime: '2023-01-02',
            state: 3
          },
          {
            name: '发布者8',
            type: '类型1',
            theme: '主题1',
            describe: '描述1',
            price: 100,
            endTime: '2023-01-01',
            createTime: '2023-01-01',
            updateTime: '2023-01-02',
            state: 3
          },
          {
            name: '发布者9',
            type: '类型1',
            theme: '主题1',
            describe: '描述1',
            price: 100,
            endTime: '2023-01-01',
            createTime: '2023-01-01',
            updateTime: '2023-01-02',
            state: 3
          },
          // 添加更多的数据项...
        ]
      },
      currentPage: 1,
      pageSize: 5,
      radio: '1',
      // 搜索值
      query: '',
      dialogTableVisible: false,
      selectedRowDetails: {
        describe: '',
        images: ['user.png', 'user-default.png'],
      },
      // 保存已经选中的角色id值
      selectRoleId: '',
      //查找类型
      options: [
        {
          value: '1',
          label: '全部',
        },
        {
          value: '2',
          label: '钓鱼',
        },
        {
          value: '3',
          label: '名称',
        },
        {
          value: '4',
          label: '老少皆宜休闲',
        },
        {
          value: '5',
          label: '农家院',
        },
        {
          value: '6',
          label: '温泉度假',
        },
        {
          value: '7',
          label: '僻静休闲',
        },
        {
          value: '8',
          label: '游乐场',
        }
      ],
      value: '1',
    }
  },
  computed: {
    // 根据当前页和每页显示的数量计算显示的数据
    displayedData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.data.list.slice(startIndex, endIndex);
    },
    // 计算总数据量
    totalItems() {
      return this.data.list.length;
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.pageSize);
    },
  },
  created() {

  },
  methods: {
    showDetails(row) {
      this.selectedRowDetails.describe = row.describe;
      this.selectedRowDetails.images = row.images || [];
      this.selectedRowDetails.images = ['user.png', 'user-default.png', 'user-default.png', 'user-default.png', 'user.png', 'user-default.png', 'user-default.png', 'user-default.png'];
      this.dialogTableVisible = true;
    },
    //获取数据

    async getcourseList() {

    },
    handleCurrentChange(newPage) {
      this.currentPage = newPage;
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.currentPage = 1; // 切换每页显示数量时，回到第一页
    },
  },
}
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