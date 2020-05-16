import http from '@/utils/http'

// 导入配置信息
const twelvet = require('../settings.js')

/**
 * 登录方法
 * @param {String} username 
 * @param {String} password 
 */
export function login(username, password) {
  const data = {
    username,
    password
  }
  return http({
    url: twelvet.service.system.login,
    method: 'POST',
    params: data
  })
}

/**
 * 获取用户详细信息
 */
export function getInfo() {
  return http({
    url: twelvet.service.system.info,
    method: 'get'
  })
}

/**
 * 退出方法
 */
export function logout() {
  return http({
    url: '/logout',
    method: 'post'
  })
}

/**
 * 获取验证码
 */
export function getCodeImg() {
  return http({
    url: '/captchaImage',
    method: 'get'
  })
}