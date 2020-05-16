import Cookies from 'js-cookie'

const token = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken'
}


/**
 * 获得accessToken
 */
export function getAccessToken() {
  return Cookies.get(token.accessToken)
}

/**
 * 获得RefreshToken
 */
export function getRefreshToken() {
  return Cookies.get(token.refreshToken)
}

/**
 * 设置token
 * @param {String} access
 * @param {String} refresh 
 */
export function setToken(access, refresh) {
  Cookies.set(token.accessToken, access)
  Cookies.set(token.refreshToken, refresh)
}

/**
 * 移除token
 */
export function removeToken() {
  Cookies.remove(token.accessToken)
  Cookies.remove(token.refreshToken)
}
