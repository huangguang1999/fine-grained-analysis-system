<template>
  <div :id="elId"  class="container"></div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
// 引入uuid文件
import uuidv1 from 'uuid/v1'
export default {
  props: {
    ScatterData: {
      type: Array,
      default () {
        return [
          [10.0, 8.04],
          [8.0, 6.95],
          [13.0, 7.58],
          [9.0, 8.81],
          [11.0, 8.33],
          [14.0, 9.96],
          [6.0, 7.24],
          [4.0, 4.26],
          [12.0, 10.84],
          [7.0, 4.82],
          [5.0, 5.68]
        ]
      }
    }
  },
  data () {
    return {
      elId: ''
    }
  },
  created () {
    this.elId = uuidv1() // 获取随机id
  },
  mounted () {
    this.drawCharts()
  },
  methods: {
    drawCharts () {
      var myChart = echarts.init(document.getElementById(this.elId))
      myChart.setOption({
        xAxis: {},
        yAxis: {},
        series: [{
          symbolSize: 20,
          data: this.ScatterData,
          type: 'scatter'
        }]
      })
    }
  }
}
</script>

<style>
  .container{width: 390px;height: 300px;}
</style>
