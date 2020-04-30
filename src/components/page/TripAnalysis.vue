<template>
  <div>
    <Drawing />
<!--    <el-card body-style="{padding:0}" class="radarStyle">-->
<!--      <RadarChart :items="items"></RadarChart>-->
<!--    </el-card>-->
    <el-card>
      <div id="container"></div>
    </el-card>
  </div>
</template>

<script>
import Drawing from '../tools/Drawing'
import RadarChart from '../echarts/RadarChart'
export default {
  components: {
    Drawing,
    RadarChart
  },
  data: function () {
    return {
      map: {},
      infoWindow: {},
      content: [],
      items: [
        {name: '体育', value: 95, max: '100'},
        {name: '数学', value: 55, max: '100'},
        {name: '化学', value: 75, max: '100'},
        {name: '劳动', value: 85, max: '100'},
        {name: '烹饪', value: 85, max: '100'}
      ],
      path0: [
        [116.451181, 40.000792],
        [116.459181, 39.973792],
        [116.509181, 39.953792],
        [116.589181, 39.974792],
        [116.581181, 40.019792],
        [116.511181, 40.039792]
      ],
      path1: [
        [116.451181, 39.700792],
        [116.49181, 39.673792],
        [116.59181, 39.653792],
        [116.59181, 39.674792],
        [116.58181, 39.719792],
        [116.531181, 39.739792]
      ],
      path2: [
        [116.0351181, 39.700792],
        [116.0359181, 39.673792],
        [116.1409181, 39.653792],
        [116.189181, 39.674792],
        [116.181181, 39.719792],
        [116.111181, 39.739792]
      ],
      markerList: [],
      dotsData: [
        [116.481181, 39.989792],
        [116.511181, 39.689792],
        [116.129181, 39.683792]
      ]
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      this.map = new AMap.Map('container', {
        resizeEnable: true,
        center: [116.481181, 39.989792],
        zoom: 11,
        mapStyle: 'amap://styles/grey'
      })
      this.addMarker()
      this.addPolygon()
    },
    // 添加marker标记
    addMarker () {
      var that = this
      for (let i = 0; i < this.dotsData.length; i++) {
        // eslint-disable-next-line no-undef
        this.markerList.push(new AMap.Marker({
          position: this.dotsData[i]// 位置
        }))
      }
      this.map.add(this.markerList)
    },
    // 增加多边形
    addPolygon () {
      var that = this
      let array = []
      for (let i = 0; i < 3; i++) {
        let polygon = new AMap.Polygon({
          path: that['path' + i],
          strokeColor: "#FF33FF",
          strokeWeight: 6,
          strokeOpacity: 0.2,
          fillOpacity: 0.4,
          fillColor: '#1791fc',
          zIndex: 50,
        })
        array.push(polygon)
      }
      for (let item of array) {
        this.map.add(item)
      }
    }
  }
}
</script>

<style scoped>
  #container {
    width: 100%;
    height: 600px;
  }

  .radarStyle {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
</style>
