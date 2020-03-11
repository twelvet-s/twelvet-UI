import {
  constantRoutes
} from '@/router'

const permission = {
  state: {
    routes: [],
    addRoutes: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  },
  actions: {

  }
}


export const loadView = (view) => { // 路由懒加载
  return () => import(`@/views/${view}`)
}

export default permission