import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:8080'

function request (url, config) {
  url = BASE_URL + url
  // 创建ajax实例
  let instance = axios.create({
    method: '', // 请求方法
    params: {}, // URL参数
    baseURL: url, // url地址
    headers: {// 跨域请求头
      'Access-Control-Request-Headers': '*',
      'Conent-Type': 'UTF-8'
    },
    withCredentials: false, // 是否携带cookies
    timeout: 10000 // 超时
  })
  let pending = [] // 声明一个数组用于存储每个请求的取消函数和axios标识
  let CancelToken = axios.CancelToken
  let removePending = (config) => {
    for (let p in pending) {
      if (pending[p].u === config.url + '&' + config.method) { // 当前请求在数组中存在时执行函数体
        pending[p].f() // 执行取消操作
        pending.splice(p, 1)
      }
    }
  }

  // http请求拦截器
  axios.interceptors.request.use(config => {
    // 在一个axios发送前执行一下取消操作
    removePending(config)
    // 判断是否有jwt，有的话就在header上携带
    let jwtToken = window.localStorage.getItem('jwtToken')
    if (jwtToken) {
      config.headers.authorization = jwtToken
      config.cancelToken = new CancelToken((c) => {
        // 这里的axios标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push({ u: config.url + JSON.stringify(config.data) + '&' + config.method, f: c })
      })
    }
    return Promise.resolve(config)
  }, error => {
    return Promise.reject(error)
  })
  // http响应拦截器
  axios.interceptors.response.use(data => {
    removePending(data.config) // 在一个axios响应后再执行一下取消操作，把已经完成的请求从pending中移除
    return Promise.resolve(data)
  })
  // 发送网络请求
  return instance(config)
}

export default {
  request
}
