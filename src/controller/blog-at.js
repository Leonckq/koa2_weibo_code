/**
 * @description 微博 @关系 controller
 * @author Leon
 */

const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getAtRelationCount, getAtUserBlogList, updateAtRelation } = require('../services/at-Relation')

/**
 * 获取@ 我的微博数量
 * @param {number} userId
 */
async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({
    count
  })
}

/**
 * 获取 @ 用户的微博列表
 * @param {number} userId
 * @param {number} pageIndex
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
  const result = await getAtUserBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
  const { count, blogList } = result

  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}
/**
 * 标记已读
 * @param {number} userId
 */
async function markAsRead(userId) {
  try {
    await updateAtRelation({ newIsRead: true }, { userId, isRead: false })
  } catch (ex) {
    console.error(ex)
  }

  // 不需要返回SuccessModal
}

module.exports = {
  getAtMeCount,
  getAtMeBlogList,
  markAsRead
}
