<template>
  <div class="content">
    <el-drawer
      class="drawer-content"
      :visible.sync="drawer_"
      :direction="direction"
      :before-close="handleClose"
      size='100%'>
      <img class="img-content" :src=imgUrl />
      <span>补充信息：</span><el-input type="textarea" v-model="desc"></el-input>
      <el-button type="primary">生成PDF</el-button>
      // todo......................
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    drawer: false,
    imgUrl: '',
    desc: ''
  },
  data () {
    return {
      direction: 'btt'
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
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

<style scoped>
  .content {

  }
  .drawer-content {
    width: 80%;
    margin: auto;
  }

  .img-content {
    width: 80%;
    height: 400px ;
  }
</style>
