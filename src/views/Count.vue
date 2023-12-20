<template>
    <div ref="chart" style="width: 800px; height: 600px;"></div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  
  export default {
    data() {
      return {
        chart: null,
      };
    },
    mounted() {
      this.chart = echarts.init(this.$refs.chart);
  
      let option = {
        title: {
          text: '成交单数和中介费金额',
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['成交单数', '中介费金额'],
        },
        xAxis: {
          type: 'category',
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '成交单数',
            type: 'line',
            data: [120, 200, 150, 80, 70, 110, 130,200, 150, 80, 70, 110],
          },
          {
            name: '中介费金额',
            type: 'line',
            data: [220, 182, 191, 234, 290, 330, 310,182, 191, 234, 290],
          },
        ],
      };
  
      this.chart.setOption(option);
    },
  };
  </script>