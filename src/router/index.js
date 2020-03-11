import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


export default new Router({
  // 去掉url中的#
  mode: 'history',
  routes: [{
      path: '/login',
      component: () => import('@/views/login'),
      hidden: true
    },
    {
      path: '/404',
      component: () => import('@/views/error/404'),
      hidden: true
    },
    {
      path: '/401',
      component: () => import('@/views/error/401'),
      hidden: true
    },
    {
      path: '*',
      component: () => import('@/views/error/404'),
    }
  ]
})