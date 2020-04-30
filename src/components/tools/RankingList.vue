<template>
  <div class="list-content">
    <el-table
      :data="tableData"
      :height="height"
      size="medium"
      class="list-table"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        v-for="(col, index) in tableColumn"
        :key="index"
        :prop="col.prop"
        :label="col.label"
        :width="col.width">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      required: true
    },
    tableColumn: {
      type: Array,
      required: true
    },
    height: {
      type: String,
      required: false,
      default: function () {
        return '300'
      }
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    this.initTable()
  },
  methods: {
    initTable () {
      // setInterval(() => {
      //   this.tableData.push({
      //     hour: '2',
      //     count: '4',
      //     distance: '0.312112'
      //   })
      //   this.tableData = this.quicklySort(this.tableData)
      // }, 5000)
      // setTimeout(() => {
      //   this.tableData = this.quicklySort(this.tableData)
      // }, 2000)
    },
    quicklySort (arr) {
      if (arr.length < 2) {
        return arr
      }
      let index = Math.floor(arr.length / 2)
      let indexArr = arr.splice(index, 1)[0]
      let left = []
      let right = []
      arr.forEach((item) => {
        if (item.distance < indexArr.distance) {
          left.push(item)
        } else {
          right.push(item)
        }
      })
      return this.quicklySort(left).concat(indexArr, this.quicklySort(right))
    }
  }
}
</script>

<style scoped>
  .list-content {
    width: 100%;
  }
  /*滚动条样式*/
  ::-webkit-scrollbar {
    width: 4px;
    /*height: 4px;*/
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);
  }
</style>
