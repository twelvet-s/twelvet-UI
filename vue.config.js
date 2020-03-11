'use strict'

// 导入配置信息
const twelvet = require('./src/settings.js')

/**
 * 官方vue.config.js 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
 */
module.exports = {
  /**
   * 部署生产环境和开发环境下的URL。
   * 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上
   * 例如 https://www.twelvet.cn/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.twelvet.cn/admin/，则设置 baseUrl 为 /admin/。
   */
  publicPath: process.env.NODE_ENV === "production" ? twelvet.root : twelvet.root,
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    // 设置项目地址
    host: '0.0.0.0',
    // 设置项目端口
    port: process.env.port || process.env.npm_config_port || twelvet.port,
    // 反向代理
    proxy: {
      // 本地请求地址
      '/api': {
        // 代理地址
        target: twelvet.api,
        ws: true,
        // 如果接口跨域，需要进行这个参数配置
        changeOrigin: true,
        // 重写代理请求地址/，不然会/api/**
        pathRewrite: {
          '^/api': '/'
        }
      },
    },
    disableHostCheck: true
  },
  configureWebpack: {
    // 标题
    name: twelvet.title || 'TwelveT',
  },
}