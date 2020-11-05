/**
* @description 微博 @关系 controller
* @author Leon
 */

const { SuccessModel } = require('../model/ResModel')
const { getAtRelationCount } = require('../services/at-Relation')

/**
 * 获取@我的微博数量
 * @param {number} userId 
 */
async function getAtMeCount(userId) {
  const count = await getAtRelationCount(userId)
  return new SuccessModel({
    count
  })
}

module.exports = {
  getAtMeCount
}