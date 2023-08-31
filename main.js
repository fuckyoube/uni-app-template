import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from './store'
// 该代码不能删除，不然会报错adapter is not a function
import initAxios from '@/utils/request/adapter'
Vue.prototype.$store = store
// eslint-disable-next-line new-cap
Vue.config.productionTip = false
Vue.use(initAxios)
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif