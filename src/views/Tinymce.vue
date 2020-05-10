<template>
  <div class="components-container">
    <h1>
      请输入您的反馈意见:
    </h1>
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <div class="upload-button">
      <el-button type="primary" @click="openSuccess">确定</el-button>
    </div>
    <div class="editor-content" v-html="content" />
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'TinymceDemo',
  components: { Tinymce },
  data () {
    return {
      content:
      `<h2>←此处输入</h2>`
    }
  },
  methods: {
    openSuccess () {
      this.$message({
        message: '提交反馈成功',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped lang="less">
  .components-container {
    padding: 20px;

    .upload-button {
      margin: 20px 0;
      float: right;
    }

    .editor-content{
      margin-top: 100px;
    }
  }

</style>

