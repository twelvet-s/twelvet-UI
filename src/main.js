import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// permission controller
import './permission'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import Cookies from 'js-cookie'

Vue.config.productionTip = false

// set element-ui default size
Vue.use(Element, {
  size: Cookies.get('size') || 'medium'
})

new Vue({
  el: '#app',
  router,
  store,
  // 渲染
  render: h => h(App)
})