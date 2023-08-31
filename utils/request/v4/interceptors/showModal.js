export function showModal(code, msg) {
  setTimeout(() => {
    uni.showToast({
      title: `${msg}`,
      icon: 'none'
    })
  }, 200)
}
