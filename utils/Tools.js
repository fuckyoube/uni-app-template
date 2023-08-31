class Tools {
  /**
   * 获取当前请求发出的设备类型
   */
  static getRequestType() {
    let type = 'other'
    // #ifdef MP-WEIXIN
    type = 'weixin'
    // #endif
    // #ifdef MP-QQ
    type = 'qq'
    // #endif
    return type
  }

  /**
   * 比较版本号
   * @param {string} v1 第一个版本，类似于1.2.3
   * @param {*} v2 第二个版本，类似于1.2.3
   */
  static compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i])
      const num2 = parseInt(v2[i])
      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }
    return 0
  }

  /**
   * 获取存储信息
   * @param {string} key 需要获取缓存的key
   *
   * @returns {string} value 缓存值
   */
  static getStorage(key) {
    return new Promise((resolve, reject) => {
      if (!key) {
        reject('未传入需要读取的Key')
        return
      }
      uni.getStorage({
        key: key,
        success: res => {
          resolve(res.data)
        },
        fail: e => {
          reject(e)
        }
      })
    })
  }

  /**
   * 设置存储
   * @param {string} key 需要设置缓存的key
   * @param {string} value 缓存值
   */
  static setStorage(key, value) {
    return new Promise((resolve, reject) => {
      if (!key) {
        reject('未传入需要设置的Key')
        return
      }
      if (!value) {
        reject('未传入Key对应的值')
        return
      }
      uni.setStorage({
        key: key,
        data: value,
        success: res => {
          resolve(res)
        },
        fail: e => {
          reject()
        }
      })
    })
  }

  /**
   * 删除存储
   * @param {string} key 需要删除的缓存key
   */
  static removeStorage(key) {
    return new Promise((resolve, reject) => {
      if (!key) {
        reject('未传入需要移除的Key')
        return
      }
      uni.removeStorage({
        key: key,
        success: res => {
          resolve(res)
        },
        fail: e => {
          reject(e)
        }
      })
    })
  }

  /**
   * uni.getSetting Promise封装
   */
  static getSetting() {
    return new Promise((resolve, reject) => {
      uni.getSetting({
        success(res) {
          resolve(res)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }

  /**
   * uni.getSystemInfo Promise封装
   */
  static getSystemInfo() {
    return new Promise((resolve, reject) => {
      uni.getSystemInfo({
        success: res => {
          resolve(res)
        },
        fail: e => {
          reject(e)
        }
      })
    })
  }

  static isObjectEquals(x, y) {
    const f1 = x instanceof Object
    const f2 = y instanceof Object
    if (!f1 || !f2) {
      return x === y
    }
    if (Object.keys(x).length !== Object.keys(y).length) {
      return false
    }
    for (const p in x) {
      const a = x[p] instanceof Object
      const b = y[p] instanceof Object
      if (a && b) {
        Tools.isObjectEquals(x[p], y[p])
      } else if (x[p] != y[p]) {
        return false
      }
    }
    return true
  }
  /* 函数节流 */
  static throttle(fn, interval) {
    let timer // 维护一个 timer
    const delay = interval || 500 // 设置间隔时间，如果interval不传，则默认500ms
    return function() {
      const _this = this
      const args = arguments
      if (timer) {
        return
      }
      timer = setTimeout(function() {
        fn.apply(_this, args)
        timer = null
        // 在interval后执行完fn之后清空timer，此时timer为假，throttle触发可以进入计时器
      }, delay)
    }
  }

  /* 函数防抖 */
  static debounce(fn, interval) {
    let timer // 维护一个 timer
    const delay = interval || 1000 // 间隔时间，如果interval不传，则默认1000ms
    return function() {
      const that = this
      const args = arguments // 保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(function() {
        fn.apply(that, args) // 用apply指向调用debounce的对象，相当于this.fn(args);
      }, delay)
    }
  }
}

export default Tools
