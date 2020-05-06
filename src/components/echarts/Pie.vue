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
      let chartObj = echarts.init(document.getElementById('contain'))
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '城市出行',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],

            label: {
              position: 'inner'
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 335, name: '非绿色出行', selected: true},
              {value: 679, name: '绿色出行'}
            ]
          },
          {
            name: '城市出行',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
              backgroundColor: '#eee',
              borderColor: '#aaa',
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                hr: {
                  borderColor: '#aaa',
                  width: '100%',
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: '#eee',
                  backgroundColor: '#334455',
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            data: [
              {value: 335, name: '非绿色出行'},
              {value: 310, name: '绿色出行'}
            ]
          }
        ]
      };
      chartObj.setOption(option)
    }
  }
}
</script>

<style scoped>
#contain {
  width: 700px;
  height: 400px;
}
</style>
