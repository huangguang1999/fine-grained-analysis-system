<template>
  <div>
    <transition name="button-move">
      <div class="leftT" v-if="!collapse" >
        <el-button type="primary" @click="moving" v-if="!collapse" circle>
          <i class="el-icon-d-arrow-right"></i>
        </el-button>
      </div>
      <div class="leftTM" v-else >
        <el-button type="primary" @click="moving" v-if="collapse" circle>
          <i class="el-icon-d-arrow-left"></i>
        </el-button>
      </div>
    </transition>
    <transition name="slide-fade">
      <div class="content" v-if="show">
        <el-card :body-style="{ padding: '5px' }">
          <h2>群体移动距离统计</h2>
          <ScatterChart :ScatterData="ScatterData"></ScatterChart>
          <h2>群体移动距离排行榜</h2>
          <RinkingList :tableData="tableData" :tableColumn="tableColumn"></RinkingList>
        </el-card>
      </div>
    </transition>
  </div>
</template>

<script>
import ScatterChart from '../echarts/ScatterChart'
import RinkingList from '../tools/RankingList'
export default {
  components: {
    ScatterChart,
    RinkingList
  },
  data () {
    return {
      show: true,
      collapse: false,
      ScatterData: [
        [10.0, 8.04],
        [8.0, 6.95],
        [13.0, 7.58],
        [9.0, 8.81],
        [11.0, 8.33],
        [14.0, 9.96],
        [6.0, 7.24],
        [4.0, 4.26],
        [12.0, 10.84],
        [7.0, 4.82],
        [5.0, 5.68]
      ],
      tableData: [{
        hour: '0',
        count: '12',
        distance: '0.231213'
      }, {
        hour: '0',
        count: '11',
        distance: '0.214221'
      }, {
        hour: '1',
        count: '8',
        distance: '0.123121'
      }, {
        hour: '1',
        count: '4',
        distance: '0.123421'
      }, {
        hour: '2',
        count: '12',
        distance: '0.231213'
      }, {
        hour: '1',
        count: '11',
        distance: '0.214221'
      }, {
        hour: '2',
        count: '8',
        distance: '0.123121'
      }, {
        hour: '2',
        count: '4',
        distance: '0.312112'
      }, {
        hour: '1',
        count: '4',
        distance: '0.123421'
      }, {
        hour: '2',
        count: '12',
        distance: '0.231213'
      }, {
        hour: '1',
        count: '11',
        distance: '0.214221'
      }, {
        hour: '2',
        count: '8',
        distance: '0.123121'
      }, {
        hour: '2',
        count: '4',
        distance: '0.312112'
      }],
      tableColumn: [
        {
          prop: 'hour',
          label: '时刻',
          width: '100'
        }, {
          prop: 'count',
          label: '人数',
          width: '100'
        }, {
          prop: 'distance',
          label: '移动距离(km)'
        }
      ]
    }
  },
  methods: {
    moving () {
      this.show = !this.show
      this.collapse = !this.collapse
    }
  }
}
</script>

<style scoped>
  .content {
    display: flex;
    position: absolute;
    width: 400px;
    height: 100%;
    top: 0px;
    right: 0px;
    z-index: 10;
    opacity: 0.9;
  }
  .leftT {
    position: absolute;
    top: 50%;
    right: 410px;
    z-index: 10;
    transition: all 0.3s linear;
  }
  .leftTM {
    position: absolute;
    top: 50%;
    right: 10px;
    z-index: 10;
    transition: all 0.3s linear;
  }
  .slide-fade-enter-active,.slide-fade-leave-active {
    transition: all .5s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(400px);
  }
</style>
