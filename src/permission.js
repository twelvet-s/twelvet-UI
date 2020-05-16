import router from './router'
import store from './store'

import {
    getAccessToken
} from '@/utils/auth'

// 无需登录页面
const whiteList = ['/login', '/auth-redirect']

router.beforeEach((to, from, next) => {
    // 判断有没有token
    if (getAccessToken()) {

        if (to.path === '/login') {
            next({
                path: '/'
            })

        } else {
            // 存在token直接放行，后续处理token伪造
            next()

        }
    } else {
        // 没有token
        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            // 否则全部重定向到登录页
            next(`/login?redirect=${to.path}`)
        }
    }
})