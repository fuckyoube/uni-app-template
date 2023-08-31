import { BigNumber } from 'bignumber.js'

/**
 * 加法
 */
export function numberAdd(a, b) {
  a = BigNumber(a)
  b = BigNumber(b)
  return a.plus(b).toNumber()
}
/**
 * 多数加法
 */
export function multiAdd(...params) {
  let data = BigNumber(0)
  for (let index = 0; index < params.length; index++) {
    const element = BigNumber(params[index])
    data = data.plus(element)
  }
  return data.toNumber()
}

/**
 * 减法
 */
export function numberMinus(a, b) {
  a = BigNumber(a)
  b = BigNumber(b)
  return a.minus(b).toNumber()
}

/**
 * 乘法
 */
export function numberMutiply(a, b) {
  a = BigNumber(a)
  b = BigNumber(b)
  return a.multipliedBy(b).toNumber()
}

/**
 * 除法
 */
export function numberDevide(a, b) {
  if (a > 0) {
    a = BigNumber(a)
    b = BigNumber(b)
    return a.dividedBy(b).toNumber()
  } else {
    return 0
  }
}

/**
 * 输入框限制输入 只允许输入数字
 * value 数值 必填
 * max 最大值 选填
 * min 最小值 选填
 * length 小数点保留位数 选填
 * isBlur 失去焦点触发
 */

export function limitInputNumber(value, max = null, min = null, length = null, isBlur = false, isMoney = false) {
  if (!value && value !== 0) {
    return min >= 0 ? min : null
  }
  // 是否需要保留小数
  value = value.toString()
  if (!length) {
    if (max < 0 || min < 0) {
      value = value.replace(/[^\-\d]+/g, '')
    } else {
      value = value.replace(/[^0-9]/ig, '')
    }
  } else {
    // 保留数字和小数点
    if (max < 0 || min < 0) {
      value = value.replace(/[^\-\d^\.]+/g, '')
    } else {
      value = value.replace(/[^\d^\.]+/g, '')
    }
    if (value.indexOf('.') > 0) {
      value = value.slice(0, value.indexOf('.') + (length + 1))
    } else if (value.indexOf('.') === 0 && value.length === 1) {
      value = 0 + value
    } else if (value.indexOf('.') === value.length - 1 && value.length != 0 && isBlur) {
      value = value.substring(0, value.length - 1)
    }
  } if (max) {
    max = Number(max)
    const tempValue = Number(value)
    if (tempValue > max) {
      value = max
    }
  }
  if (min) {
    min = Number(min)
    const tempValue = Number(value)
    if (tempValue < min) {
      value = min
    }
  }
  if (isMoney) {
    for (var i = 0; i < value.length; i++) {
      if (value[i] === '.') {
        break
      }
      if (value[i] == 0 && value[i + 1] !== '.' && i == 0) {
        value = value.slice(i + 1, value.length - 1)
        i--
      }
    }
  }
  if (isBlur) {
    return Number(value)
  } else {
    return value
  }
}