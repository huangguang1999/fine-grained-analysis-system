import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import Map from '../views/Map'
import TDMap from '../views/3DMap'
import Home from '../components/common/Home'
import DotMarker from '../views/DotMarker'
import HeatMap from '../views/HeatMap'
import TDHeatMap from '../views/3DHeatMap'
import OutHeatMap from '../views/OutHeatMap'
import TripAnalysis from '../views/TripAnalysis'
import TripMode from '../views/TripMode'
import ReAnalysis from '../views/ReAnalysis'
import Tinymce from '../views/Tinymce'
import F04 from '../views/404'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/heatMap',
          component: HeatMap,
          meta: { title: '热力图' }
        },
        {
          path: '/3DheatMap',
          component: TDHeatMap,
          meta: { title: '3D热力图' }
        },
        {
          path: '/OutHeatMap',
          component: OutHeatMap,
          meta: { title: '离线热力图' }
        },
        {
          path: '/TripAnalysis',
          component: TripAnalysis,
          meta: { title: '出行分析' }
        },
        {
          path: '/TripMode',
          component: TripMode,
          meta: { title: '出行方式分析' }
        },
        {
          path: '/ReAnalysis',
          component: ReAnalysis,
          meta: { title: '驻留分析' }
        },
        {
          path: '/Tinymce',
          component: Tinymce,
          meta: { title: '用户反馈' }
        },
        {
          path: '/404',
          component: F04,
          meta: { title: '404' }
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: { title: '登录' }
    },
    {
      path: '*',
      component: F04,
      redirect: '/404'
    }
  ]
})
