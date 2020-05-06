<template>
  <div>
    <div id="con"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted () {
    this.initChart()
  },
  methods: {
    initChart () {
      let chartObj = echarts.init(document.getElementById('con'))
      let option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '使用情况', '均速'],
            ['和平区', 43.3, 85.8],
            ['沈河区', 83.1, 73.4],
            ['皇姑区', 86.4, 65.2],
            ['大东区', 72.4, 53.9],
            ['铁西区', 53.3, 65.8],
            ['浑南区', 83.1, 93.4],
            ['于洪区', 56.4, 45.2],
            ['沈北新区', 32.4, 73.9],
            ['苏家屯区', 82.4, 85.2],
            ['辽中区', 54.4, 43.9]
          ]
        },
        xAxis: {type: 'category'},
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {type: 'bar'},
          {type: 'bar'}
        ]
      }
      chartObj.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
#con {
  width: 700px;
  height: 400px;
}
</style>
