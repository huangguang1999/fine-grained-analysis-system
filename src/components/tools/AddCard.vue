<template>
  <div class="content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <h2>{{title}}</h2>
      </div>
      <div v-for="o in item" :key="o" class="text item">
        {{'▷ ' + o.message }}
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    item: {},
    title: ''
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;

  .text {
    font-size: 16px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
}
</style>
