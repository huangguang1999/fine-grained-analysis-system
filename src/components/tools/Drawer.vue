<template>
  <div>
    <el-drawer
      class="drawer-content"
      :visible.sync="drawer_"
      :direction="direction"
      :before-close="handleClose"
      size='100%'>
      <div class="content" ref="pdfContent" id="pdfContent" >
        <div class="content-button" >
          <el-button type="danger">导出word</el-button>
          <el-button type="danger" @click="ExportSavePdf()">导出PDF</el-button>
        </div>
        <h1>1. 沈阳交通量总信息</h1>
        <div class="content-first">
          <img class="img-content" :src=imgUrl />
          <div class="content-first-add">
            <span>如需补充信息可以自行添加：</span>
            <br>
            <el-input type="textarea" v-model="desc" class="content-first-input" rows="5"></el-input>
          </div>
        </div>
        <h1>2. 沈阳区域间交通流量堆叠图</h1>
        <div class="content-second" ref="pdfContent" >
          <StackedChart></StackedChart>
          <div class="content-second-add">
            <AddCard
              :item="this.itemStacked"
              :title="this.titleStacked"
            />
          </div>
        </div>
        <h1>3. 沈阳出行站点使用量数据集</h1>
        <div class="content-second">
          <DataSetChart></DataSetChart>
          <div class="content-second-add">
            <AddCard
              :item="this.itemDateSet"
              :title="this.titleDateSet"
            />
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import StackedChart from '../echarts/StackedChart'
import DataSetChart from '../echarts/DataSetChart'
import AddCard from './AddCard'
export default {
  components: {
    StackedChart,
    AddCard,
    DataSetChart
  },
  props: {
    drawer: false,
    imgUrl: '',
    desc: ''
  },
  data () {
    return {
      direction: 'btt',
      itemStacked: [
        {
          message: '铁西区处于市区中心所以在周一到周五期间交通流量最高'
        },
        {
          message: '和平区和沈河区学校众多，所以交通流量在周五达到顶峰'
        },
        {
          message: '大东区的工厂聚集，且地处偏僻，所以交通流量极低'
        }
      ],
      titleStacked: '沈阳间区域交通量信息',
      itemDateSet: [
        {
          message: '和平区作为中转中心，人流量最大'
        },
        {
          message: '大东区使用情况最高'
        },
        {
          message: '浑南区地处偏僻，出行站点使用率极低'
        }
      ],
      titleDateSet: '沈阳出行站点信息'
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  computed: {
    drawer_: {
      get () {
        return this.drawer
      },
      set (value) {
        this.$emit('changeDrawer', value)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    width: 100%;
    height: 1800px;
    padding: 10px;
    overflow: auto;

    .content-button {
      margin-left: 80%;
      display: flex;
    }

    .content-first {
      width: 100%;
      height: 400px;
      padding: 20px;
      display: flex;

      .content-first-add {
        width: 100%;
        height: 400px;
        padding-left: 100px;
        overflow: hidden;

        span {
          font-size: 16px;
        }
      }
    }

    .content-second {
      width: 100%;
      height: 400px;
      display: flex;
      margin-bottom: 100px;

      .content-second-add {
        width: 100%;
        height: 400px;
        padding: 50px 20px 20px;
      }
    }

  }
  .drawer-content {
    width: 80%;
    margin: auto;
  }

  .img-content {
    width: 600px;
    height: 350px ;
  }

  .el-textarea {
    font-size: 16px;
    margin-top: 20px;
    color: #000000;
    font-family: "Microsoft YaHei";
  }

</style>
