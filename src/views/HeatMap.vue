<template>
  <div style="width:100%;height:105%;overflow:hidden">
    <el-card body-style="padding:0;" class="map-card">
      <div class="map-content">
        <div class="map-content-date">
          <Datetime></Datetime>
        </div>
        <div class="map-content-title">实时热力图</div>
        <div class="map-content-check">
          <el-checkbox v-model="checked">每五分钟自动刷新</el-checkbox>
            <div class="map-content-switch">
              <el-tooltip effect="dark" content="3D地图">
                <router-link to="/3DHeatMap">
                  <img src="./img/earth.png"/>
                </router-link>
              </el-tooltip>
            </div>
        </div>
      </div>
    </el-card>
    <div id="container"></div>
<!--    <el-card body-style="padding:0;" style="height:30%;position:absolute;top:5px;left:5px;">-->
<!--      <RadarChart :items="items"></RadarChart>-->
<!--    </el-card>-->
  </div>
</template>

<script>
import request from '../axios'
import Datetime from '../components/common/Datetime'
export default {
  components: {
    Datetime
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
      map: {},
      value1: true,
      value2: true
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
          'lat': 41.75 + Math.random() * 0.15,
          'count': 1000 * Math.random()
        })
      }
      for (let i = 0; i < 500; i++) {
        this.heatmapData.push({
          'lng': 123.5 + Math.random() * 0.5,
          'lat': 41.75 - Math.random() * 0.15,
          'count': 1000 * Math.random()
        })
      }
      for (let i = 0; i < 500; i++) {
        this.heatmapData.push({
          'lng': 123.5 + Math.random() * 0.5,
          'lat': 41.75 + Math.random() * 0.15,
          'count': 1000 * Math.random()
        })
      }
      for (let i = 0; i < 500; i++) {
        this.heatmapData.push({
          'lng': 123.5 - Math.random() * 0.5,
          'lat': 41.75 - Math.random() * 0.15,
          'count': 1000 * Math.random()
        })
      }
      // eslint-disable-next-line no-undef
      this.map = new AMap.Map('container', {
        resizeEnable: true,
        center: [123.5, 41.73],
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
          opacity: [0, 0.8],
        })
        that.heatmap.setDataSet({
          data: that.heatmapData,
          max: 100
        })
      })
    },
    // 实时渲染热力图
    renderMap () {
      //
    },
    loopingData () {
      this.timer = setInterval(() => {
        this.heatmapData.splice(0, 5)
        this.updateData()
        this.heatmapData.push({
          'lng': 123.8 - Math.random() * 0.5,
          'lat': 41.68 + Math.random() * 0.15,
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

<style scoped lang="less">
  #container {
    width: 100%;
    height: 1000px;
  }

  .map-card {
    margin-bottom:2px;

    .map-content {
      display:flex;

      .map-content-date {
        width:40%;
      }

      .map-content-title {
        width:20%;
        color:#000000;
        font-size:30px;
        display:flex;
        justify-content:center;
        align-items:center
      }

      .map-content-check {
        width:40%;
        display:flex;
        align-items:center;

        .map-content-switch {
          width: 200px;
          margin-left: 50px;

          img {
            animation: earthRotate 5s linear infinite;
            -webkit-animation:earthRotate 5s linear infinite;
            animation-play-state:running;
            -webkit-animation-play-state:running;
          }

          img:hover {
            animation-play-state:paused;
            -webkit-animation-play-state:paused;
          }

          @keyframes earthRotate {
            0% {
              transform:rotate(0deg)
            }
            100% {
              transform:rotate(360deg)
            }
          }

          @-webkit-keyframes earthRotate
          {
            0% {
              transform:rotate(0deg);
            }
            100% {
              transform:rotate(360deg);
            }
          }
        }
      }

    }

  }
</style>
