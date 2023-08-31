import Vue from 'vue'
import { showLoading } from './loading'
// import Md5 from 'js-md5'
export default (axios) => {
  axios.interceptors.request.use(
    (config) => {
      if (!config.loadingHide) {
        // 有的请求隐藏loading
        showLoading(config.loadingText)
      }

      // eslint-disable-next-line no-undef
      const { appId } = getApp().globalData.paymentParams

      const clientType = appId === 3 ? 'A' : 'C'

      const appSession = uni.getStorageSync('sessionId')
      const appSource = Vue.prototype.request_type
      const appVersion = Vue.prototype.version
      if (appSource) {
        config.headers['app-source'] = appSource
      }
      if (appVersion) {
        config.headers['app-version'] = appVersion
      }
      if (appSession) {
        config.headers['appSession'] = appSession
        if (appId === 3) config.headers['Authorization'] = `Bearer ${appSession}`
      }

      config.headers['client-type'] = clientType

      // config.headers['openid'] = appSession
      return config
    },
    (error) => {
      console.log(`请求出现错误: ${error}`)
      throw error
    }
  )
}
