/**
 * 公共处理器
 */
const SUFFIXS = {
    0: 'B',
    1: 'KB',
    2: 'MB',
    3: 'GB',
    4: 'TB'
}

import moment from 'moment'
// 字节转换
export const TRANSITION_BIT = (bit, index = 0) => {
    // 转换系数
    const coefficient = 1024
    let result = bit
    let suffix = null
        // 除完后还可以被系数除时，递归
    if (bit / coefficient > coefficient) {
        result = TRANSITION_BIT(bit / coefficient, index + 1)
        return result
    } else if (bit < coefficient) {
        // 如果不能再被除了则开始计算后缀
        suffix = SUFFIXS[index]
    } else {
        // 只能除最后一次的时候，判断是否还可以递进一个单位
        if (SUFFIXS[index + 1]) {
            // 如果大于则再除一次
            if (bit > coefficient) {
                result = bit / coefficient
            }
            suffix = SUFFIXS[index + 1]
        } else {
            // 到达最大值了不再除系数，直接计算单位
            suffix = SUFFIXS[index]
        }
    }
    // 取2位小数，拼接单位
    return result.toFixed(2) + ' ' + suffix
}

// 转换时间为可读格式
export const TIMEFORMAT = (time, format = 'YYYY-MM-DD HH:mm:ss') =>
    moment(time).format(format)