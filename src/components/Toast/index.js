import { createApp } from "vue"
import VueToast from "./components"


let toastInstance = null

const app = createApp(VueToast)

const defaultOptions = {
  mask: true,
  visible: true,
  icon: '',
  message: '',
  duration: 1500
}
// 创建实例对象，如果之前创建过则返回之前的对象
const createInstance = () => {
  if (!toastInstance) {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const toast = app.mount(div)
    toastInstance = toast
  }
  return toastInstance
}
const Toast = (options = {}) => {
  // 获取toast 实例
  const toast = createInstance()

  // 合并defaultOptions
  Object.assign(toast, defaultOptions, options)

  clearTimeout(toast.timerId)

  if (toast.duration > 0) {
    toast.timerId = setTimeout(() => {
      toast.hide()
    }, toast.duration)
  }
}

Toast.hide = () => {
  toastInstance.hide()
}

export default Toast