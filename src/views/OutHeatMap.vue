<template>
  <div style="width:100%;">
    <el-card body-style="padding:10px;" style="margin-bottom:2px;">
      <div style="display:flex;height:40px;align-items:center;justify-content: center" class="header">
        <div style="margin-right:10px">
          <span class="demonstration">省份</span>
          <el-select v-model="pvalue" size="medium">
            <el-option
              v-for="item in poptions"
              :key="item.pvalue"
              :label="item.label"
              :value="item.pvalue">
            </el-option>
          </el-select>
        </div>
        <div style="margin-right:10px">
          <span class="demonstration">城市</span>
          <el-select v-model="cvalue" size="medium">
            <el-option
              v-for="item in coptions"
              :key="item.cvalue"
              :label="item.label"
              :value="item.cvalue">
            </el-option>
          </el-select>
        </div>
        <div style="margin-right:10px">
          <div class="block">
            <span class="demonstration">日期</span>
            <el-date-picker
              v-model="tvalue"
              type="date"
              placeholder="选择日期"
              size="medium">
            </el-date-picker>
          </div>
        </div>
        <div style="margin-right:10px">
          <span class="demonstration">粒度</span>
          <el-select v-model="lvalue" size="medium">
            <el-option
              v-for="item in loptions"
              :key="item.lvalue"
              :label="item.label"
              :value="item.lvalue">
            </el-option>
          </el-select>
        </div>
        <div style="margin-right:10px">
          <el-button type="primary" @click="renderMap">查看</el-button>
        </div>
      </div>
    </el-card>
    <div id="container"></div>
    <el-card body-style="padding:10px;" class="content-footer" >
      <div class="time-content">
        <div class="time-block">
          <el-slider
            v-model="valueSlider"
            :step="step"
            :max="max"
            :format-tooltip="formatTooltip"
          >
          </el-slider>
        </div>
        <div class="time-text">
          <div class="timeItem1" style="margin-left: -10px">00:00</div>
          <div class="timeItem2">01:00</div>
          <div class="timeItem1">02:00</div>
          <div class="timeItem2">03:00</div>
          <div class="timeItem1">04:00</div>
          <div class="timeItem2">05:00</div>
          <div class="timeItem1">06:00</div>
          <div class="timeItem2">07:00</div>
          <div class="timeItem1">08:00</div>
          <div class="timeItem2">09:00</div>
          <div class="timeItem1">10:00</div>
          <div class="timeItem2">11:00</div>
          <div class="timeItem1">12:00</div>
          <div class="timeItem2">13:00</div>
          <div class="timeItem1">14:00</div>
          <div class="timeItem2">15:00</div>
          <div class="timeItem1">16:00</div>
          <div class="timeItem2">17:00</div>
          <div class="timeItem1">18:00</div>
          <div class="timeItem2">19:00</div>
          <div class="timeItem1">20:00</div>
          <div class="timeItem2">21:00</div>
          <div class="timeItem1">22:00</div>
          <div class="timeItem2">23:00</div>
          <div class="timeItem1" style="margin-right: -10px">24:00</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from '../api'
export default {
  components: {
    request
  },
  data () {
    return {
      timer: null,
      map: {},
      heatmapData: [
        {
          'lng': 123.3956909,
          'lat': 41.79013824,
          'count': 50
        },
        {
          'lng': 123.527092,
          'lat': 41.82112885,
          'count': 51
        },
        {
          'lng': 123.3730774,
          'lat': 41.82954025,
          'count': 52
        }
      ],
      valueSlider: 0,
      poptions: [{
        pvalue: '辽宁省',
        label: '辽宁省'
      }],
      pvalue: '辽宁省',
      coptions: [{
        pvalue: '沈阳市',
        label: '沈阳市'
      }],
      cvalue: '沈阳市',
      tvalue: '2018-10-03',
      loptions: [
        {
          lvalue: '60',
          label: '60分钟'
        },
        {
          lvalue: '30',
          label: '30分钟'
        },
        {
          lvalue: '10',
          label: '10分钟'
        },
        {
          lvalue: '5',
          label: '5分钟'
        }
      ],
      lvalue: '60',
      mapData: [],
      max: 24,
      step: 1
    }
  },
  mounted () {
    this.initMap()
    // this.loopingData()
  },
  watch: {
    valueSlider () {
      this.timeRenderMap()
    }
  },
  methods: {
    initMap () {
      // eslint-disable-next-line no-undef
      this.map = new AMap.Map('container', {
        resizeEnable: true,
        center: [123.5, 41.75],
        zoom: 10
      })
      this.updateMap()
    },
    updateMap () {
      for (let i = 0; i < 50; i++) {
        this.heatmapData.push({
          'lng': 123.3730774 - Math.random() * 1,
          'lat': 41.82954025 + Math.random() * 0.5,
          'count': 200 * Math.random()
        })
      }
      for (let i = 0; i < 50; i++) {
        this.heatmapData.push({
          'lng': 123.3730774 + Math.random() * 1,
          'lat': 41.82954025 + Math.random() * 0.5,
          'count': 150 * Math.random()
        })
      }
      for (let i = 0; i < 50; i++) {
        this.heatmapData.push({
          'lng': 123.3730774 - Math.random() * 1,
          'lat': 41.82954025 - Math.random() * 0.5,
          'count': 220 * Math.random()
        })
      }
      for (let i = 0; i < 50; i++) {
        this.heatmapData.push({
          'lng': 123.3730774 + Math.random() * 1,
          'lat': 41.82954025 - Math.random() * 0.5,
          'count': 180 * Math.random()
        })
      }
      var that = this
      var heatmap
      this.map.plugin(['AMap.Heatmap'], function () {
        // eslint-disable-next-line no-undef
        heatmap = new AMap.Heatmap(that.map, {
          radius: 25, // 给定半径
          opacity: [0, 0.8]
        })
        heatmap.setDataSet({
          data: that.heatmapData,
          max: 100
        })
      })
    },
    // 根据时间轴的值渲染热力图
    timeRenderMap () {
      // console.log(this.mapData)
    },
    // 循环时间线
    loopingData () {
      if (this.max === 24) {
        this.timer = setInterval(() => {
          if (this.valueSlider === 24) {
            this.valueSlider = 0
            this.updateMap()
          } else {
            this.valueSlider += 1
            this.updateMap()
          }
        }, 2000)
      } else {
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          if (this.valueSlider === 144) {
            this.valueSlider = 0
            this.updateMap()
          } else {
            this.valueSlider += 3
            this.updateMap()
          }
        }, 2000)
      }

      // // 只调用一次的销毁钩子
      // this.$once('hook:beforeDestroy', () => {
      //   clearInterval(this.timer)
      // })
    },
    renderMap () {
      this.heatmapData.length = 0
      this.initMap()
      switch (this.lvalue) {
        case "60":
          this.max = 24
          this.step = 1
              break
        case "30":
          this.max = 144
          this.step = 3
              break
        case "10":
          this.max = 144
          this.step = 1
              break
        case "5":
          this.max = 1440
          this.step = 5
              break
      }
      // request({
      //   methods: 'get',
      //   url: '/getOutDotsData/20181003/60'
      // }).then(res => {
      //   console.log(res)
      //   this.mapData = res
      //   console.log(this.mapData)
      // })
    },
    // 根据时间粒度返回时间轴tooltip的信息
    formatTooltip (value) {
      let max = this.max
      let step = this.step
      if (max === 24) {
        return (value < 10 ? '0' : '') + value + ':00'
      } else if (max === 144 && step === 3) {
        let m = Math.floor(value / 6)
        let s = value % 6
        return (m < 10 ? '0' : '') + `${m}:${s}0`
      } else if (max === 144 && step === 1) {
        let m = Math.floor(value / 6)
        let s = value % 6
        return (m < 10 ? '0' : '') + `${m}:${s}0`
      } else if (max === 1440) {
        let m = Math.floor(value / 60)
        let s = value % 60
        return (m < 10 ? '0' : '') + `${m}:` + (s < 10 ? '0' : '') + `${s}`
      }
    }
  }
}
</script>

<style scoped>
  #container {
    width: 100%;
    height: 1000px;
  }

  .header {
    font-size: 15px;
    color: #19CAAD;
  }

  .timeItem1 {
    padding-right: 19.5px
  }

  .timeItem2 {
    color: #19CAAD;
    padding-right: 19.5px
  }

  .content-footer {
    width: 100%;
    position: fixed;
    bottom: 0px;
  }

  .time-content {
    width: 1400px;
    margin: 0 auto;
  }

  .time-block {
    width: 1350px;
  }

  .time-text {
    width: 1300px;
    display: flex;
    font-weight: bold;
    font-size: 14px;
  }
</style>
