import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store'
// 重定向白名单
const whiteList = ['/login', '/register']

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to,from,next)=>{
  if(store.getters.token){
    next()
  }else {
    if(whiteList.indexOf(to.path) !== -1){
      next()
    }else {
      next('/login')
    }
  }
})
export default router
