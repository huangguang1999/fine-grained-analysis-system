<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}" ref="imageWrapper">
            <div class="content">
                <transition name="move" mode="out-in">
                    <router-view></router-view>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
import bus from './bus'
export default {
  data () {
    return {
      collapse: false
    }
  },
  components: {
    vHead,
    vSidebar
  },
  methods: {
  },
  created () {
    bus.$on('collapse-content', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style scoped>
    .content-box {
        position: absolute;
        left: 150px;
        right: 0;
        top: 70px;
        bottom: 0;
        padding-bottom: 30px;
        -webkit-transition: left .3s ease-in-out;
        transition: left .3s ease-in-out;
        background: #f0f0f0;
        overflow: hidden;
    }
    .content {
        width: auto;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
    .content-collapse {
        left: 65px;
    }
</style>
