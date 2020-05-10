<template>
  <div ref="imageWrapper">
    <!--悬浮部分-->
    <Drawer :drawer="drawer" @changeDrawer="changeDrawer" :imgUrl=imgUrl />
    <div class="ranking-left">
      <h2>出行站点使用量排名</h2>
      <RankingList :tableData="tableData" :tableColumn="tableColumn"></RankingList>
    </div>
    <div class="ranking-right">
      <h2>区域间交通流量预测</h2>
      <RankingList :tableData="tableDataG" :tableColumn="tableColumnG" height="400"></RankingList>
    </div>
    <div class="pie">
      <Pie></Pie>
    </div>
    <div class="message">
      <div class="mes-item">
        <h1>绿色出行</h1>
        <span>62%</span>
      </div>
      <div class="mes-item">
        <h1>非绿色出行</h1>
        <span>38%</span>
      </div>
      <div class="mes-item">
        <h1>日累计减排</h1>
        <span>54231吨</span>
      </div>
    </div>
    <!--主体部分-->
    <el-card body-style="padding:0;">
      <div class="mode-header">
        <div class="mode-datetime">
          <Datetime></Datetime>
        </div>
        <div class="mode-header-title">
          <h1>沈阳交通量预测</h1>
        </div>
        <div class="mode-right">
          <router-link to="/Tinymce"><el-button type="info">用户反馈</el-button></router-link>
          <el-button type="success" @click="outPdf">分析报告</el-button>
        </div>
      </div>
    </el-card>
    <!--地图部分-->
    <div id="container"></div>
  </div>
</template>

<script>
import Datetime from '../components/common/Datetime'
import RankingList from '../components/tools/RankingList'
import Pie from '../components/echarts/Pie'
import Drawer from '../components/tools/Drawer'
import html2canvas from 'html2canvas'
export default {
  components: {
    Datetime,
    RankingList,
    Pie,
    Drawer
  },
  data () {
    return {
      map: {},
      tableData: [
        {
          station: '和平区',
          space: '61.97'
        }, {
          station: '沈河区',
          space: '41.37'
        }, {
          station: '皇姑区',
          space: '41.57'
        }, {
          station: '大东区',
          space: '37.86'
        }, {
          station: '铁西区',
          space: '73.54'
        }, {
          station: '浑南区',
          space: '12.54'
        }, {
          station: '于洪区',
          space: '75.32'
        }, {
          station: '沈北新区',
          space: '63.47'
        }, {
          station: '苏家屯区',
          space: '92.32'
        }, {
          station: '辽中区',
          space: '72.23'
        }
      ],
      tableColumn: [
        {
          prop: 'station',
          label: '站名',
          width: '100'
        }, {
          prop: 'space',
          label: '平均交通量',
          width: '100'
        }
      ],
      tableDataG: [
        {
          city: '和平区',
          gomode: '35.5%',
          space: '64.97'
        }, {
          city: '沈河区',
          gomode: '46.3%',
          space: '86.23'
        }, {
          city: '皇姑区',
          gomode: '32.7%',
          space: '26.34'
        }, {
          city: '大东区',
          gomode: '63.8%',
          space: '73.34'
        }, {
          city: '铁西区',
          gomode: '74.4%',
          space: '64.23'
        }, {
          city: '浑南区',
          gomode: '85.2%',
          space: '64.76'
        }, {
          city: '于洪区',
          gomode: '85.5%',
          space: '25.63'
        }, {
          city: '沈北新区',
          gomode: '74.2%',
          space: '73.35'
        }, {
          city: '苏家屯区',
          gomode: '37.3%',
          space: '73.43'
        }, {
          city: '辽中区',
          gomode: '63.5%',
          space: '33.43'
        }
      ],
      tableColumnG: [
        {
          prop: 'city',
          label: '辖市区',
          width: '100'
        }, {
          prop: 'gomode',
          label: '公交使用率',
          width: '100'
        }, {
          prop: 'space',
          label: '均速(km/h)',
          width: '100'
        }
      ],
      drawer: false,
      imgUrl: ''
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      // eslint-disable-next-line no-undef
      this.map = new AMap.Map('container', {
        resizeEnable: true,
        center: [123.4, 41.8],
        zoom: 11,
        mapStyle: 'amap://styles/dark'
      })
    },
    // 导出pdf
    outPdf () {
      this.drawer = true
      let that = this
      html2canvas(this.$refs.imageWrapper).then(canvas => {
        let dataURL = canvas.toDataURL("image/png")
        that.imgUrl = dataURL
        // if (that.imgUrl !== "") {
        //   that.dialogTableVisible = true;
        // }
        console.log(that.imgUrl)
      })
    },
    changeDrawer (value) {
      this.drawer = value
    }
  }
}
</script>

<style lang="less" scoped >
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
    z-index: 10;
    text-align: center;
    opacity: 0.8;
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

  .pie {
    position: absolute;
    bottom: 300px;
    width: 700px;
    height: 400px;
    z-index: 999;
  }

  .message {
    width: 400px;
    height: 100px;
    position: absolute;
    left: 36%;
    top: 10%;
    display: flex;
    z-index: 10;
  }

  .mes-item {
    display: flex;
    flex-direction: column;
    text-align: center;
    flex: 1;
    color: #ffffff;
  }

  span {
    font-size: 30px;
    color: #19CAAD;
  }

</style>
