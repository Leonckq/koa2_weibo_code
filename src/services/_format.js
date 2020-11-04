/**
 * @description 数据格式化
 * @author Leon
 */

const { timeFoment } = require('../utils/dt')
const { DEFAULT_PICTURE, PEG_FOR_AT_WHO } = require('./../conf/constant')
/**
 * 用户默认头像
 * @param {Object} obj 用户头像
 */

function _formatUserPicture(obj) {
  if (obj.picture == void 0) {
    obj.picture = DEFAULT_PICTURE
  }
  return obj
}

/**
 * 格式化微博内容
 * @param {Object} obj 微博数据对象
 */
function _formatContent(obj) {
  obj.contentFormat = obj.content
  obj.contentFormat = obj.contentFormat.replace(PEG_FOR_AT_WHO, (matchStr, nickName, userName) => {
    return `<a href="/profile/${userName}">@${nickName}</a>`
  })
  return obj
}

/**
 * 格式化用户信息
 * @param {Array|Object} list 用户列表或者单个用户对象
 */
function formatUser(list) {
  if (list instanceof Array) {
    return list.map(_formatUserPicture)
  }
  // 单个对象
  return _formatUserPicture(list)
}

/**
 * 格式化数据时间
 * @param {Object} obj
 */
function _formatDBTime(obj) {
  obj.createdAtFormat = timeFoment(obj.createdAt)
  obj.updatedAtFormat = timeFoment(obj.updatedAt)
  return obj
}

/**
 * 格式化博客信息
 * @param {Array|Object} list 博客列表或者单个用户对象
 */
function formatBlog(list) {
  if (list == void 0) {
    return list
  }

  if (list instanceof Array) {
    return list.map(_formatDBTime).map(_formatContent)
  }
  let result = list
  result = _formatDBTime(result)
  result = _formatContent(result)
  return result
}

module.exports = {
  formatUser,
  formatBlog
}
