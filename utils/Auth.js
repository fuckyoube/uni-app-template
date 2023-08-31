/**
 * 认证类
 */
class Auth {
  static getProvider() {
    return new Promise((resolve, reject) => {
      uni.getProvider({
        service: 'oauth',
        success(res) {
          resolve(res.provider)
        },
        fail() {
          resolve(false)
        }
      })
    })
  }
  static async getCode() {
    const provider = await this.getProvider()
    return new Promise((resolve, reject) => {
      uni.login({
        provider: provider, // 服务供应商
        success(res) {
          return resolve(res.code)
        },
        fail(e) {
          return reject(null)
        }
      })
    })
  }
  static async login() {
    return new Promise(async(resolve, reject) => {
      try {
        await Auth._uniCheckSession()
        resolve()
      } catch (error) {
        reject()
      }
    })
  }

  static _uniCheckSession() {
    return new Promise((resolve, reject) => {
      uni.checkSession({
        success: () => {
          console.log('[Auth]', 'session key 未过期')
          resolve()
        },
        fail: () => {
          console.log('[Auth]', 'session key 已过期')
          reject()
        }
      })
    })
  }
}

export default Auth
