
/**
 * 模拟一个出入栈
 */
let loadingCount = 0 // 记录当前正在请求的数量
export function showLoading(data) {
  if (loadingCount === 0) {
    uni.showLoading({
      title: data || '加载中',
      // #ifdef MP-WEIXIN
      mask: true
      // #endif
    })
  }
  loadingCount++
}
export function hideLoading() {
  loadingCount--
  if (loadingCount === 0) {
    uni.hideLoading()
  }
}