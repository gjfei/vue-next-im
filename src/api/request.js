import axios from 'axios'
import Toast from '@/components/Toast'
import store from '@/store'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  withCredentials: true
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.Authorization = 'Bearer ' + store.getters.token
    }
    return config
  }
)
service.interceptors.response.use(
  res => {
    if (res.data.code === 200) {
      return res.data
    } else {
      Toast({
        icon: 'error',
        message: res.data.msg
      })
    }
  },
  err => {
    Toast({
      icon: 'error',
      message: err.msg
    })
    console.log(err)
    return Promise.reject(res)
  }
)

export default service