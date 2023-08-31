<script>
import Init from './utils/Init'
export default {
  onLaunch: async function(options) {
    // 获取自定义状态栏视口信息
    Init.getWechatViewPort()
    // 检查更新
    Init.checkUpdate()
  },
  async onShow(options) {
  },
  onHide() {},
  globalData: {}
}
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
page {
  overflow-x: hidden;
  background-color: #f5f5f5;
}
</style>
