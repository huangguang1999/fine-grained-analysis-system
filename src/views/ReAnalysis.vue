<template>
  <div>
    <div class="ranking-left">
      <h2>驻留时间片段排名</h2>
      <RankingList :tableData="tableData" :tableColumn="tableColumn"></RankingList>
    </div>
    <div class="ranking-right">
      <h2>驻留空间排名</h2>
      <RankingList :tableData="tableDataG" :tableColumn="tableColumnG" height="400"></RankingList>
    </div>
    <el-card body-style="padding:0;">
      <div class="mode-header">
        <div class="mode-datetime">
          <Datetime></Datetime>
        </div>
        <div class="mode-header-title">
          <h1>沈阳驻留分析</h1>
        </div>
        <div class="mode-right">
          <router-link to="/Tinymce"><el-button type="info">用户反馈</el-button></router-link>
          <el-button type="success" @click="outPdf">分析报告</el-button>
        </div>
      </div>
    </el-card>
    <div id="container"></div>
  </div>
</template>

<script>
import Datetime from '../components/common/Datetime'
import RankingList from '../components/tools/RankingList'
export default {
  components: {
    Datetime,
    RankingList
  },
  data () {
    return {
      map: {},
      tableData: [
        {
          time: '09',
          rindex: '80.5%'
        },
        {
          time: '03',
          rindex: '30.5%'
        },
        {
          time: '04',
          rindex: '51.5%'
        },
        {
          time: '15',
          rindex: '40.0%'
        },
        {
          time: '01',
          rindex: '85.3%'
        },
        {
          time: '08',
          rindex: '73.4%'
        },
        {
          time: '19',
          rindex: '67.3%'
        },
        {
          time: '21',
          rindex: '45.3%'
        },
        {
          time: '03',
          rindex: '12.0%'
        },
        {
          time: '07',
          rindex: '34.8%'
        }
      ],
      tableColumn: [
        {
          prop: 'time',
          label: '时间段',
          width: '100'
        }, {
          prop: 'rindex',
          label: '驻留指数'
        }
      ],
      tableDataG: [
        {
          city: '和平区',
          rindex: '80.5%'
        },
        {
          city: '沈河区',
          rindex: '30.5%'
        },
        {
          city: '皇姑区',
          rindex: '51.5%'
        },
        {
          city: '大东区',
          rindex: '40.0%'
        },
        {
          city: '铁西区',
          rindex: '85.3%'
        },
        {
          city: '浑南区',
          rindex: '73.4%'
        },
        {
          city: '于洪区',
          rindex: '67.3%'
        },
        {
          city: '沈北新区',
          rindex: '45.3%'
        },
        {
          city: '苏家屯区',
          rindex: '12.0%'
        },
        {
          city: '辽中区',
          rindex: '34.8%'
        }

      ],
      tableColumnG: [
        {
          prop: 'city',
          label: '辖市区',
          width: '100'
        }, {
          prop: 'rindex',
          label: '驻留指数'
        }
      ],
      centerData: [],
      timer: null,
      circleMarker: {}
    }
  },
  mounted () {
    this.initMap()
    // this.loopingData()
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    initMap () {
      // 添加模拟数据
      for (let i = 0; i < 200; i++) {
        this.centerData.push({
          center: [124.5 - Math.random() * 2, 41.52954025 + Math.random() * 0.5]
        })
      }
      // eslint-disable-next-line no-undef
      this.map = new AMap.Map('container', {
        resizeEnable: true,
        center: [123.5, 41.75],
        zoom: 11,
        mapStyle: 'amap://styles/grey'
      })
      this.addDot()
    },
    addDot () {
      for (var i = 0; i < this.centerData.length; i += 1) {
        let center = this.centerData[i].center
        this.circleMarker = new AMap.CircleMarker({
          center: center,
          radius: 10,//3D视图下，CircleMarker半径不要超过64px
          strokeColor: 'white',
          strokeWeight: 2,
          strokeOpacity: 0.5,
          fillColor: 'rgba(0,0,255,1)',
          fillOpacity: 0.5,
          zIndex: 10,
          bubble: true,
          cursor: 'pointer',
          clickable: true
        })
        this.circleMarker.setMap(this.map)
      }
    },
    loopingData () {
      var that = this
      this.timer = setInterval(() => {
        // eslint-disable-next-line no-undef
        that.circleMarker = new AMap.CircleMarker({
          center: [124.5 - Math.random() * 2, 41.52954025 + Math.random() * 0.5],
          radius: 10, //3D视图下，CircleMarker半径不要超过64px
          strokeColor: 'white',
          strokeWeight: 2,
          strokeOpacity: 0.5,
          fillColor: 'rgba(255,0,0,1)',
          fillOpacity: 0.5,
          zIndex: 10,
          bubble: true,
          cursor: 'pointer',
          clickable: true
        })
        that.circleMarker.setMap(that.map)
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
  #container {
    width: 100%;
    height: 1000px;
  }

  .mode-header {
    display: flex;
    width: 100%;
    margin-bottom:2px;

    .mode-datetime {
      width: 180px;
      margin: auto 0;
    }

    .mode-header-title {
      width: 400px;
      margin: 0 auto;
      text-align: center;
    }

    .mode-right {
      margin: auto 10px auto 0;
    }
  }

  .ranking-left {
    position: absolute;
    bottom: 0px;
    left: 0px;
    background-color: #dddddd;
    z-index: 999;
    text-align: center;
    opacity: 0.8;
    border: 2px solid #dddddd
  }

  .ranking-right {
    position: absolute;
    bottom: 0px;
    right: 0px;
    background-color: #dddddd;
    z-index: 10;
    text-align: center;
    opacity: 0.8;
  }

  span {
    font-size: 30px;
    color: #19CAAD;
  }

</style>
