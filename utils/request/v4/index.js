import { AuthException } from '@/utils/request/exception'
import RequestInterceptors from './interceptors/request'
import ResponseInterceptors from './interceptors/response'
import Tools from '@/utils/Tools'
import axios from 'axios'
import config from '@/config'
const instance = axios.create({
  baseURL: config.api.systemURL,
  timeout: 8000
})

RequestInterceptors(instance)
ResponseInterceptors(instance)
let tryCount = 1
async function request(options) {
  try {
    return await instance(options)
  } catch (error) {
    let retrySuccess = false
    let res
    let errMsg = error.msg
    if (error instanceof AuthException) {
      if (tryCount > 0) {
        try {
          await Tools.removeStorage('sessionId')
          tryCount--
          retrySuccess = true
        } catch (err) {
          tryCount--
          errMsg = err.msg
        }
      }
    }
    if (retrySuccess) {
      return res
    }
    throw errMsg
  }
}
export default request
