<template>
  <div :id="elId" class="container"> </div>
</template>

<script>
// 引入基本模板
import echarts from 'echarts'
// 引入uuid文件
import uuidv1 from 'uuid/v1'
export default {
  props: {
    items: {
      type: Array,
      default () {
        return [{name: '生物', value: 95, max: '100'}, {name: '数学', value: 55, max: '100'}, {name: '语文', value: 86, max: '100'}, {name: '物理', value: 54, max: '100'}, {name: '美术', value: 59, max: '100'}]
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
    let values = []
    this.items.forEach(el => {
      values.push(el.value)
    })
    const option = {
      tooltip: {},
      radar: {
        indicator: this.items,
        center: ['50%', '51%']
      },
      series: [{
        type: 'radar',
        itemStyle: {normal: {areaStyle: {type: 'default'}}},
        data: [
          {
            value: values,
            name: '各项得分',
            itemStyle: {normal: {color: '#f0ad4e'}}
          }
        ]
      }]
    }
    const chartObj = echarts.init(document.getElementById(this.elId))
    chartObj.setOption(option)
  }
}
</script>
<style scoped>
  .container{width: 200px;height: 200px;}
</style>
