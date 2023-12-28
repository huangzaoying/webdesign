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
          <el-table-column prop="month" label="成交时间"></el-table-column>
          <el-table-column prop="region" label="城市"></el-table-column>
          <el-table-column
            prop="destinationType"
            label="请求类型"
          ></el-table-column>
          <el-table-column prop="totalDeals" label="交易笔数"></el-table-column>
          <el-table-column
            prop="totalIncome"
            label="收入金额"
          ></el-table-column>
        </el-table>
      </el-col>

      <!-- 右侧列：ECharts图表 -->
      <el-col :span="14">
        <div ref="chart" style="width: 600px; height: 400px"></div>
      </el-col>
    </el-row>
    <el-dialog title="查询条件" :visible.sync="dialogVisible" width="30%">
      <el-form :model="form" ref="formRef">
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
import moment from "moment";
import { getSummery } from "@/api";
export default {
  data() {
    return {
      chart: null,
      form: {
        startMonth: "",
        endMonth: "",
        region: "",
      },
      tableData: [],
      dialogVisible: false,
    };
  },
  methods: {
    draw(){
      let xAxisData = this.tableData.map((item) => item.month); // 或者 item.month
      let totalDealsData = this.tableData.map((item) => item.totalDeals);
      let totalIncomeData = this.tableData.map((item) => item.totalIncome);
      let option = {
        title: {
          text: "总交易笔数和总收入",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["总交易笔数", "总收入"],
        },
        xAxis: {
          type: "category",
          data: xAxisData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "总交易笔数",
            type: "line", // 或者 'line'
            data: totalDealsData,
          },
          {
            name: "总收入",
            type: "line", // 或者 'line'
            data: totalIncomeData,
          },
        ],
      };
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(option);
    },

    fetchData() {
      this.form.startMonth = this.form.startMonth.getMonth() + 1;
      this.form.endMonth = this.form.endMonth.getMonth() + 1;
      getSummery(this.form).then((res) => {
        console.log(res);
        this.tableData = res.data.map((item) => {
          return item;
        });
        console.log(this.tableData);
        this.draw();
      });
      
      // 提取 X 轴和 Y 轴数据
      
      // this.$refs.formRef.resetFields(); // 重置表单
      // this.chart = echarts.init(this.$refs.chart);

      // let option = {
      //   title: {
      //     text: "成交单数和中介费金额",
      //   },
      //   tooltip: {
      //     trigger: "axis",
      //   },
      //   legend: {
      //     data: ["成交单数", "中介费金额"],
      //   },
      //   xAxis: {
      //     type: "category",
      //     data: this.tableData.map((item) => item.startMonth),
      //   },
      //   yAxis: {
      //     type: "value",
      //   },
      //   series: [
      //     {
      //       name: "成交单数",
      //       type: "line",
      //       data: this.tableData.map((item) => item.totalDeals),
      //     },
      //     {
      //       name: "中介费金额",
      //       type: "line",
      //       data: this.tableData.map((item) => item.totalIncome),
      //     },
      //   ],
      // };
      // this.chart.setOption(option);
      this.dialogVisible = false; // 查询后关闭对话框
    },
  },
  // created() {
  //   // 初始化数据
  //   this.fetchData();
  // },
  mounted() {},
};
</script>