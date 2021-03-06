import { login, logout, getInfo } from '@/api/login'
import { getAccessToken, getRefreshToken, setToken, removeToken } from '@/utils/auth'

const user = {
  // 全局共享数据
  state: {
    accessToken: getAccessToken(),
    getRefreshToken: getRefreshToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  // 改变数据方法
  mutations: {
    SET_TOKEN: (state, accessToken) => {
      state.accessToken = accessToken
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  // 方法
  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      return new Promise((resolve, reject) => {
        // 调用方法，执行登录
        login(username, password).then(res => {
          // 设置token 以及刷新令牌
          setToken(res.access_token, res.refresh_token)
          commit('SET_TOKEN', res.access_token, res.refresh_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息（自动注入commit，state）
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(res => {
          const user = res.user
          // 验证返回的roles是否是一个非空数组
          if (res.roles && res.roles.length > 0) { 
            commit('SET_ROLES', res.roles)
            commit('SET_PERMISSIONS', res.permissions)
          } else {
            // 回调mutations改变state
            commit('SET_ROLES', ['ROLE_DEFAULT'])
          }
          commit('SET_NAME', user.username)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
