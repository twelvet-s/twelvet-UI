/**
 * 一般修改此配置即可
 * 需要更多的配置请修改../vue.config.js
 */

// 服务名称
const serviceName = {
  system: '/system'
}

// 服务地址
const serviceUrl = {
  // 系统服务
  system: {
    login: '/oauth2/twelvet',
    userInfo: '/getInfo',
  }
}

// 拼接服务地址
for(var url in serviceUrl){
  for(var temp in serviceUrl[url]){
    serviceUrl[url][temp] = serviceName[url] + serviceUrl[url][temp]
  }
}

module.exports = {
  // 项目端口
  port: '8888',
  // 项目标题
  title: 'TwelveT',
  // 项目部署目录
  root: '/',
  // 项目API
  api: 'http://localhost:9527',
  // 服务地址
  service: serviceUrl
}