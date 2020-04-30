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
<!--    <div class="re-img">-->
<!--      <img src="../../assets/zhuliu.jpg" style="width: 80%" />-->
<!--    </div>-->
    <el-card body-style="padding:0;"  class="mode-header">
      <div style="display:flex;justify-content: center;align-items: center">
        <div><h1>沈阳驻留分析</h1></div>
      </div>
      <div class="mode-right">
        <el-button type="info">用户反馈</el-button>
      </div>
      <div class="mode-datetime"><Datetime></Datetime></div>
    </el-card>
    <el-card>
      <div id="container"></div>
    </el-card>
  </div>
</template>

<script>
  import Datetime from '../common/Datetime'
  import RankingList from '../tools/RankingList'
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
      this.loopingData()
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
          zoom: 10,
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
          for(let item in this.circleMarker) {
            console.log(item)
          }
        }
      },
      loopingData () {
        var that = this
        this.timer = setInterval(() => {
          that.circleMarker = new AMap.CircleMarker({
            center: [124.5 - Math.random() * 2, 41.52954025 + Math.random() * 0.5],
            radius: 10,//3D视图下，CircleMarker半径不要超过64px
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

<style scoped>
  #container {
    width: 100%;
    height: 550px;
  }

  .mode-header {
    margin-bottom:2px;
  }

  .mode-header:after {
    content: '';
    position: absolute;
    width: 200px;
    height: 20px;
    background-color: #ffffff;
    left: 43%;
    z-index: 9;
    border-radius: 2px;
  }

  .mode-datetime {
    position: absolute;
    top: 60px;
    left: 44.5%;
    z-index: 10;
  }

  .mode-right {
    position: absolute;
    right: 30px;
    top: 25px;
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

  .re-img {
    position: absolute;
    top: 70px;
    left: 0;
    z-index: 10 ;
    width: 50%;
  }
</style>
