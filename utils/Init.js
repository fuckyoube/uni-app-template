import WechatViewPort from './WechatViewPort'

class Init {
  static checkUpdate() {
    const updateManager = uni.getUpdateManager()
    updateManager.onCheckForUpdate((res) => {
      console.log(res, 'res')
    })
    updateManager.onUpdateReady(() => {
      updateManager.applyUpdate()
    })
    updateManager.onUpdateFailed(() => {
      uni.showToast({
        title: '自动更新失败',
        icon: 'none',
        duration: 3000
      })
    })
  }

  static async getWechatViewPort() {
    try {
      await WechatViewPort.getViewPort()
    } catch (e) {
      console.error('[getWechatViewPort]', e)
    }
  }
}

export default Init
