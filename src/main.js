// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import axios from 'axios'
import htmlToPdf from './utils/htmlToPdf'
Vue.prototype.$ajax = axios
Vue.prototype.$echarts = echarts
Vue.use(htmlToPdf)
Vue.use(ElementUI)
Vue.config.productionTip = false

// 使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}` || 'vue-analysis-system'
  const role = localStorage.getItem('ms_username')
  // 判断里面可以根据role跳转不同路由，相当于不同角色有不同的身份
  if (!role && to.path !== '/login') {
    next('/login')
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
