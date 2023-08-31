import request from '@/utils/request/v4'

export function test(data, loadingHide = false) {
  return request({
    url: 'xxx',
    method: 'post',
    data: data,
    loadingHide: loadingHide
  })
}

