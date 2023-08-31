import Vue from 'vue'
import Tools from './Tools'
import store from '../store'

class WechatViewPort {
  static async getViewPort() {
    const systemInfo = await Tools.getSystemInfo()
    const viewport = {
      StatusBar: systemInfo.statusBarHeight,
      safeAreaBottom: 0,
      windowHeight: systemInfo.windowHeight
    }
    if (systemInfo.screenHeight / systemInfo.screenWidth >= 1.8 && systemInfo.platform == 'ios') {
      viewport.safeAreaBottom = 34
    }
    // #ifndef MP
    if (systemInfo.platform == 'android') {
      viewport.CustomBar = systemInfo.statusBarHeight + 50
    } else {
      viewport.CustomBar = systemInfo.statusBarHeight + 45
    }
    // #endif

    // #ifdef MP-WEIXIN
    try {
      let custom = {}
      custom = wx.getMenuButtonBoundingClientRect()
      viewport.Custom = custom
      viewport.CustomBar = custom.bottom + custom.top - systemInfo.statusBarHeight
    } catch (e) {
      console.error('[获取微信胶囊信息出错]', e)
    }
    // #endif

    // #ifdef MP-QQ
    try {
      let custom = {}
      custom = wx.getMenuButtonBoundingClientRect()
      viewport.Custom = custom
      viewport.CustomBar = custom.bottom + custom.top - systemInfo.statusBarHeight
    } catch (e) {
      console.error('[获取QQ胶囊信息出错]', e)
    }
    // #endif

    // #ifdef MP-ALIPAY
    viewport.CustomBar = systemInfo.statusBarHeight + systemInfo.titleBarHeight
    // #endif

    // #ifdef MP-WEIXIN || MP-QQ
    if (
      !viewport.Custom ||
      typeof viewport.Custom !== 'object' ||
      Object.keys(viewport.Custom).length == 0 ||
      !viewport.Custom.top ||
      !viewport.Custom.bottom
    ) {
      const getDefault = this._getDefaultMenuButtonBoundingClientRect(systemInfo)
      viewport.Custom = getDefault.Custom
      viewport.CustomBar = getDefault.CustomBar
    }
    // #endif

    store.commit('SET_VIEWPORT', {
      viewport: viewport
    })
    Vue.prototype.viewport = viewport
    return viewport
  }

  static _getDefaultMenuButtonBoundingClientRect(systemInfo) {
    const res = {}
    res.Custom = {
      height: 32,
      left: uni.upx2px(730) - 87,
      right: uni.upx2px(730),
      width: 87
    }
    if (systemInfo.platform == 'ios') {
      if (systemInfo.screenHeight / systemInfo.screenWidth >= 1.8 && systemInfo.platform == 'ios') {
        res.Custom.top = 50
        res.Custom.bottom = 82
      } else {
        res.Custom.top = 26
        res.Custom.bottom = 58
      }
    } else {
      if (systemInfo.screenHeight / systemInfo.screenWidth >= 1.8) {
        res.Custom.top = 38
        res.Custom.bottom = 70
      } else {
        res.Custom.top = 28
        res.Custom.bottom = 60
      }
    }
    res.CustomBar = res.Custom.bottom + res.Custom.top - systemInfo.statusBarHeight
    return res
  }
}

export default WechatViewPort
