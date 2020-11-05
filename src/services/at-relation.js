/**
 * @description 微博@用户关系 service
 * @author Leon
 */

const { AtRelation } = require('../db/model/index')

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
module.exports = {
  createAtRelation,
  getAtRelationCount
}