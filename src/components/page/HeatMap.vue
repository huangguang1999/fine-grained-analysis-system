<template>
  <div style="width:100%;height:105%;overflow:hidden">
    <el-card body-style="padding:0;" style="margin-bottom:2px;">
      <div style="display:flex">
        <div style="width:47%;"><Datetime></Datetime></div>
        <div style="width:6%;color:#19CAAD;font-size:20px;display:flex;justify-content:center;align-items:center">实时</div>
        <div style="width:47%;float:left;display:flex;align-items:center"><el-checkbox v-model="checked">每五分钟自动刷新</el-checkbox></div>
      </div>
    </el-card>
    <el-card>
      <div id="container"></div>
    </el-card>
<!--    <el-card body-style="padding:0;" style="height:30%;position:absolute;top:5px;left:5px;">-->
<!--      <RadarChart :items="items"></RadarChart>-->
<!--    </el-card>-->
  </div>
</template>

<script>
import RadarChart from '../echarts/RadarChart'
import request from '../../axios/index'
import Datetime from '../common/Datetime'
import ScatterChart from '../echarts/ScatterChart'
export default {
  components: {
    RadarChart,
    Datetime,
    ScatterChart
  },
  data () {
    return {
      heatmapData: [{
        'lng': 116.191031,
        'lat': 39.988585,
        'count': 700
      }, {
        'lng': 116.389275,
        'lat': 39.925818,
        'count': 600
      }, {
        'lng': 116.287444,
        'lat': 39.810742,
        'count': 1000
      }, {
        'lng': 116.191031,
        'lat': 39.988585,
        'count': 300
      }, {
        'lng': 116.359275,
        'lat': 39.925818,
        'count': 800
      }, {
        'lng': 116.287444,
        'lat': 39.710742,
        'count': 1000
      }, {
        'lng': 116.391031,
        'lat': 39.888585,
        'count': 500
      }],
      redata: [],
      items: [
        {name: '体育', value: 95, max: '100'},
        {name: '数学', value: 55, max: '100'},
        {name: '化学', value: 75, max: '100'},
        {name: '劳动', value: 85, max: '100'},
        {name: '烹饪', value: 85, max: '100'}
      ],
      checked: true,
      timer: null,
      heatmap: {},
      map: {}
    }
  },
  mounted () {
    this.initMap()
    // this.loopingData()
  },
  created () {
    // this.initWebSocket()
  },
  destroyed () {
    clearInterval(this.timer)
    this.websock.close() // 离开路由之后断开websocket连接
  },
  methods: {
    initMap () {
      for (let i = 0; i < 500; i++) {
        this.heatmapData.push({
          'lng': 123.5 - Math.random() * 0.5,
          'lat': 41.75 + Math.random() * 0.1,
          'count': 1000 * Math.random()
        })
      }
      for (let i = 0; i < 500; i++) {
        this.heatmapData.push({
          'lng': 123.5 + Math.random() * 0.5,
          'lat': 41.75 - Math.random() * 0.1,
          'count': 1000 * Math.random()
        })
      }
      for (let i = 0; i < 500; i++) {
        this.heatmapData.push({
          'lng': 123.5 + Math.random() * 0.5,
          'lat': 41.75 + Math.random() * 0.1,
          'count': 1000 * Math.random()
        })
      }
      for (let i = 0; i < 500; i++) {
        this.heatmapData.push({
          'lng': 123.5 - Math.random() * 0.5,
          'lat': 41.75 - Math.random() * 0.1,
          'count': 1000 * Math.random()
        })
      }
      // eslint-disable-next-line no-undef
      this.map = new AMap.Map('container', {
        resizeEnable: true,
        center: [123.5, 41.75],
        zoom: 12
      })
      this.updateData()
    },
    updateData () {
      var that = this
      this.map.plugin(['AMap.Heatmap'], function () {
        // eslint-disable-next-line no-undef
        that.heatmap = new AMap.Heatmap(that.map, {
          radius: 25, // 给定半径
          opacity: [0, 0.8]
        })
        that.heatmap.setDataSet({
          data: that.heatmapData,
          max: 100
        })
      })
    },
    // 实时渲染热力图
    renderMap () {
      request({
        method: 'get',
        url: '/getdata'
      })
        .then(res => {
          this.heatmapData = res
        })
    },
    loopingData () {
      this.timer = setInterval(() => {
        this.heatmapData.splice(0,5)
        this.updateData()
        this.heatmapData.push({
          'lng': 123.8 - Math.random() * 0.5,
          'lat': 41.68 + Math.random() * 0.1,
          'count': 100 * Math.random()
        })
      }, 1000)
    },
    // websocket方法
    initWebSocket () { // 初始化weosocket
      const wsuri = 'ws://118.25.91.106:8081/server'
      this.websock = new WebSocket(wsuri)
      // this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      // this.websock.onerror = this.websocketonerror
      // this.websock.onclose = this.websocketclose
    },
    websocketonopen () { // 连接建立之后执行send方法发送数据
      let actions = {'test': '12345'}
      this.websocketsend(JSON.stringify(actions))
      console.log('websocket connection success!')
    },
    websocketonerror () { // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage (e) { // 数据接收
      this.redata = JSON.parse(e.data)
    },
    websocketsend (Data) { // 数据发送
      this.websock.send(Data)
    },
    websocketclose (e) { // 关闭
      console.log('断开连接', e)
    }
  }
}
</script>

<style scoped>
#container {
  width: 100%;
  height: 550px;
}
</style>
