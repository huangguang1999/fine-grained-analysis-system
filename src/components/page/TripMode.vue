<template>
  <div ref="imageWrapper">
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
    <el-card body-style="padding:0;"  class="mode-header">
      <div style="display:flex;justify-content: center;align-items: center">
        <div><h1>沈阳交通量预测</h1></div>
      </div>
      <div class="mode-right">
        <el-button type="info">用户反馈</el-button>
        <el-button type="success" @click="outPdf">分析报告</el-button>
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
import Pie from '../echarts/Pie'
import Drawer from "../tools/Drawer";
import html2canvas from "html2canvas"
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
          station: '新乡市',
          situaction: '80.5%',
          space: '31.97'
        }, {
          station: '新乡市',
          situaction: '80.5%',
          space: '31.97'
        }, {
          station: '新乡市',
          situaction: '80.5%',
          space: '31.97'
        }, {
          station: '新乡市',
          situaction: '80.5%',
          space: '31.97'
        }, {
          station: '新乡市',
          situaction: '80.5%',
          space: '31.97'
        }, {
          station: '新乡市',
          situaction: '80.5%',
          space: '31.97'
        }, {
          station: '新乡市',
          situaction: '80.5%',
          space: '31.97'
        }, {
          station: '新乡市',
          situaction: '80.5%',
          space: '31.97'
        }, {
          station: '新乡市',
          situaction: '80.5%',
          space: '31.97'
        }, {
          station: '新乡市',
          situaction: '80.5%',
          space: '31.97'
        }, {
          station: '新乡市',
          situaction: '80.5%',
          space: '31.97'
        }, {
          station: '新乡市',
          situaction: '80.5%',
          space: '31.97'
        }, {
          station: '新乡市',
          situaction: '80.5%',
          space: '31.97'
        }, {
          station: '新乡市',
          situaction: '80.5%',
          space: '31.97'
        }
      ],
      tableColumn: [
        {
          prop: 'station',
          label: '站名',
          width: '100'
        }, {
          prop: 'situaction',
          label: '使用情况',
          width: '100'
        }, {
          prop: 'space',
          label: '均速(km/h)',
          width: '100'
        }
      ],
      tableDataG: [
        {
          city: '新乡市',
          gomode: '80.5%',
          space: '31.97'
        }, {
          city: '新乡市',
          gomode: '80.5%',
          space: '31.97'
        }, {
          city: '新乡市',
          gomode: '80.5%',
          space: '31.97'
        }, {
          city: '新乡市',
          gomode: '80.5%',
          space: '31.97'
        }, {
          city: '新乡市',
          gomode: '80.5%',
          space: '31.97'
        }, {
          city: '新乡市',
          gomode: '80.5%',
          space: '31.97'
        }, {
          city: '新乡市',
          gomode: '80.5%',
          space: '31.97'
        }, {
          city: '新乡市',
          gomode: '80.5%',
          space: '31.97'
        }, {
          city: '新乡市',
          gomode: '80.5%',
          space: '31.97'
        }, {
          city: '新乡市',
          gomode: '80.5%',
          space: '31.97'
        }, {
          city: '新乡市',
          gomode: '80.5%',
          space: '31.97'
        }, {
          city: '新乡市',
          gomode: '80.5%',
          space: '31.97'
        }, {
          city: '新乡市',
          gomode: '80.5%',
          space: '31.97'
        }
      ],
      tableColumnG: [
        {
          prop: 'city',
          label: '辖市区',
          width: '100'
        }, {
          prop: 'gomode',
          label: '出行方式占比',
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
      var that = this
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
        let dataURL = canvas.toDataURL("image/png");
        that.imgUrl = dataURL;
        // if (that.imgUrl !== "") {
        //   that.dialogTableVisible = true;
        // }
        console.log(that.imgUrl)
      });
    },
    changeDrawer (value) {
      this.drawer = value
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
    height: 40px;
    background-color: #ffffff;
    left: 43%;
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
    bottom: 20px;
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
    bottom: 150px;
    left: 60px;
    width: 400px;
    height: 400px;
    z-index: 999;
  }

  .message {
    width: 400px;
    height: 100px;
    position: absolute;
    left: 36%;
    top: 25%;
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
