import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

/**
 * 获得token
 */
export function getToken() {
  return Cookies.get(TokenKey)
}

/**
 * 设置token
 * @param {String} token 
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

/**
 * 移除token
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}
