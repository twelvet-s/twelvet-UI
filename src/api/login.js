import http from '@/utils/http'

/**
 * 登录方法
 * @param {String} username 
 * @param {String} password 
 * @param {int} code 
 * @param {String} uuid 
 */
export function login(username, password) {
  const data = {
    username,
    password
  }
  return http({
    url: '/login',
    method: 'post',
    params: data
  })
}

/**
 * 获取用户详细信息
 */
export function getInfo() {
  return http({
    url: '/getInfo',
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