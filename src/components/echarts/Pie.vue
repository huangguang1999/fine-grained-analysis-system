<template>
  <div>
    <div id="contain"></div>
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
      const chartObj = echarts.init(document.getElementById('contain'))
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '城市绿色出行占比',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            color: ['green', 'red'],
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 38, name: '绿色出行'},
              {value: 62, name: '非绿色出行'}
            ]
          }
        ]
      }
      chartObj.setOption(option)
    }
  }
}
</script>

<style scoped>
#contain {
  width: 200px;
  height: 200px;
}
</style>
