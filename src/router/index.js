import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/page/Login'
import Map from '../components/page/Map'
import TDMap from '../components/page/3DMap'
import Home from '../components/common/Home'
import DotMarker from '../components/page/DotMarker'
import HeatMap from '../components/page/HeatMap'
import TDHeatMap from '../components/page/3DHeatMap'
import OutHeatMap from '../components/page/OutHeatMap'
import TripAnalysis from '../components/page/TripAnalysis'
import TripMode from '../components/page/TripMode'
import ReAnalysis from '../components/page/ReAnalysis'
import F04 from '../components/page/404'
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
          path: '/map',
          component: Map,
          meta: { title: '轨迹地图' }
        },
        {
          path: '/3dmap',
          component: TDMap,
          meta: { title: '3D地图' }
        },
        {
          path: '/dotMarker',
          component: DotMarker,
          meta: { title: '动态地图' }
        },
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
