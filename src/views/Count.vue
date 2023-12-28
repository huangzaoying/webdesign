<template>
  <div class="count">
    <el-button
      type="primary"
      circle
      @click="dialogVisible = true"
      icon="el-icon-search"
    ></el-button>
    <el-row>
      <!-- 左侧列：表格 -->
      <el-col :span="10">
        <!-- 表格内容 -->
        <el-table :data="tableData">
          <el-table-column prop="startMonth" label="起始年月"></el-table-column>
          <el-table-column prop="endMonth" label="终止年月"></el-table-column>
          <el-table-column prop="region" label="地域"></el-table-column>
          <el-table-column
            prop="requestType"
            label="请求类型"
          ></el-table-column>
          <el-table-column prop="fee" label="中介费"></el-table-column>
          <el-table-column
            prop="numberOfTransactions"
            label="交易笔数"
          ></el-table-column>
        </el-table>
      </el-col>

      <!-- 右侧列：ECharts图表 -->
      <el-col :span="14">
        <div ref="chart" style="width: 600px; height: 400px"></div>
      </el-col>
    </el-row>
    <el-dialog title="查询条件" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form">
        <el-form-item label="起始年月">
          <el-date-picker
            v-model="form.startMonth"
            type="month"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="终止年月">
          <el-date-picker v-model="form.endMonth" type="month"></el-date-picker>
        </el-form-item>
        <el-form-item label="地域">
          <el-input v-model="form.region"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">查询</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
  
  <script>
import * as echarts from "echarts";

export default {
  data() {
    return {
      chart: null,
      form: {
        startMonth: "",
        endMonth: "",
        region: "",
      },

      tableData: [
        {
          startMonth: "2023-01",
          endMonth: "2023-02",
          region: "地域A",
          requestType: "类型1",
          fee: 10000,
          numberOfTransactions: 5,
        },
        // 其他数据项...
      ],
      dialogVisible: false,
    };
  },
  methods: {
    fetchData() {
      // 执行数据查询
      this.dialogVisible = false; // 查询后关闭对话框
    },
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);

    let option = {
      title: {
        text: "成交单数和中介费金额",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["成交单数", "中介费金额"],
      },
      xAxis: {
        type: "category",
        data: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "成交单数",
          type: "line",
          data: [120, 200, 150, 80, 70, 110, 130, 200, 150, 80, 70, 110],
        },
        {
          name: "中介费金额",
          type: "line",
          data: [220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290],
        },
      ],
    };

    this.chart.setOption(option);
  },
};
</script>