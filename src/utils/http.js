import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getAccessToken } from '@/utils/auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // 设置默请求url
  baseURL: '/api',
  // 超时
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(
  // 配置请求头
  config => {
    if (getAccessToken()) {
      // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['Authorization'] = 'Bearer ' + getAccessToken() 
    }
    return config
  },
  //  打印错误
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(res => {
  // 状态码
    const code = res.data.code
    // 没有带上token或者token错误
    if (code === 401) {
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
     else if (code !== 200 || code === 400 || code === 403) {
      // 报告错误信息
      Notification.error({
        title: res.data.msg
      })
      return Promise.reject('error')
    } else {
      // 返回请求数据
      return res.data
    }
  },
  error => {
    // 打印错误
    console.log('err' + error)
    // elment-ui信息提醒
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
