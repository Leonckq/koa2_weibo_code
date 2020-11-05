/**
 * @description 微博@用户关系 service
 * @author Leon
 */

const { AtRelation, Blog, User } = require('../db/model/index')
const { formatBlog, formatUser } = require('./_format')

/**
 * 创建微博 @ 用户的关系
 * @param {number} blogId 微博id
 * @param {number} userId 用户id
 */
async function createAtRelation(blogId, userId) {
  const result = await AtRelation.create({
    blogId,
    userId
  })
  return result.dataValues
}
/**
 * 获取 @ 我的微博的数量（未读）
 * @param {number} userId
 */
async function getAtRelationCount(userId) {
  const result = await AtRelation.findAndCountAll({
    where: {
      userId,
      isRead: false
    }
  })
  return result.count
}
/**
 * 获取 @ 用户的微博列表
 * @param {Object} param0
 */
async function getAtUserBlogList({ userId, pageIndex, pageSize }) {
  const result = await Blog.findAndCountAll({
    limit: pageSize,
    offSet: pageSize * pageIndex,
    include: [
      // @关系
      {
        model: AtRelation,
        attributes: ['userId', 'blogId'],
        where: { userId }
      },
      // User
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture']
      }
    ]
  })

  let blogList = result.rows.map((row) => row.dataValues)
  blogList = formatBlog(blogList)
  blogList = blogList.map((blogItem) => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })
  return {
    count: result.count,
    blogList
  }
}
/**
 * 更新 AtRelation
 * @param {Object} param0 更新内容
 * @param {Object} param1 查询条件
 */
async function updateAtRelation({ newIsRead }, { userId, isRead }) {
  // 1、拼接更新内容
  const updateData = {}
  if (newIsRead) {
    updateData.isRead = newIsRead
  }
  // 2、拼接查询条件
  const whereData = {}
  if (userId) {
    whereData.userId = userId
  }
  if (isRead) {
    whereData.isRead = isRead
  }
  // 3、执行更新
  const result = await AtRelation.update(updateData, {
    where: whereData
  })

  return result[0] > 0
}
module.exports = {
  createAtRelation,
  getAtRelationCount,
  getAtUserBlogList,
  updateAtRelation
}
