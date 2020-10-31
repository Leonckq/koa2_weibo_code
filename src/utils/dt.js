/**
 * @description 时间相关的工具函数
 * @author Leon
 */
const moment = require('moment')

/**
 * 格式化时间
 * @param {string} str 时间字符串
 */
function timeFoment(str) {
  return moment(str).format('MM.DD HH:mm')
}

module.exports = {
  timeFoment
}