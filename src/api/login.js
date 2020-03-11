import http from '@/utils/http'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return http({
    url: '/login',
    method: 'post',
    params: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return http({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return http({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return http({
    url: '/captchaImage',
    method: 'get'
  })
}