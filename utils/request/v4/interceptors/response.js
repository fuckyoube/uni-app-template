import { AuthException, UserException, PermissionException, SystemException } from '@/utils/request/exception'
import { hideLoading } from './loading'
import { showModal } from './showModal'
function errorHandler(res) {
  if (!res.data.code) {
    uni.showToast({
      title: `系统繁忙，请稍后再试`,
      icon: 'none'
    })
    // 判断当前页面是否在首页
    // eslint-disable-next-line no-undef
    const pages = getCurrentPages()
    const page = pages[pages.length - 1]
    if (page.route !== 'pages/exception/index') {
      uni.navigateTo({
        url: '/pages/exception/index'
      })
    }
    throw new Error('系统繁忙，请稍后再试')
  }
  switch (res.data.code) {
    case 401: {
      throw new AuthException('登录过期，请重新登录', res)
    }
    case 400: {
      uni.showToast({
        title: `发生未知错误，请稍后再`,
        icon: 'none'
      })
      throw new UserException(res.data.message || '发生未知错误，请稍后再试', res.data.code)
    }
    case 403: {
      uni.showToast({
        title: `您没有权限访问该页面`,
        icon: 'none'
      })
      throw new PermissionException(res.data.message || '您没有权限访问该页面', res.data.code)
    }
    case 413: {
      uni.showToast({
        title: `传输内容超过最大限制`,
        icon: 'none'
      })
      throw new UserException('传输内容超过最大限制', res.data.code)
    }
    case 502:
    case 404: {
      uni.showToast({
        title: `服务器开小差了，请稍后再试[${res.data.code}`,
        icon: 'none'
      })
      throw new SystemException(`服务器开小差了，请稍后再试[${res.data.code}]`, res.data.code)
    }
    case 503: {
      uni.showToast({
        title: `服务器不可访问，请稍后再试[${res.data.code}`,
        icon: 'none'
      })
      throw new SystemException(`服务器不可访问，[${res.data.code}]`, res.data.code)
    }
    default: {
      const code = res.data?.code
      const msg = res.data?.msg
      showModal(code, msg)
      throw new SystemException('发生未知错误，请稍后再试')
    }
  }
}

export default axios => {
  axios.interceptors.response.use(
    async res => {
      if (!res.config.loadingHide) {
        // 有的请求需要隐藏loading
        hideLoading()
      }

      // if (res.status >= 200 && res.status < 300) {
      if (res.data.code === 200) {
        return res.data.data
      } else {
        errorHandler(res)
      }
      // }
    },
    error => {
      if (!error.config.loadingHide) {
        // 有的请求需要隐藏loading
        hideLoading()
      }
      if (!error.response) {
        uni.showToast({
          title: `网络连接失败，请稍后再试`,
          icon: 'none'
        })
        throw new Error('网络连接失败，请稍后再试')
      }
      errorHandler(error.response)
    }
  )
}
