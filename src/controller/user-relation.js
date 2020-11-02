/**
 * @description 用户关系 controller
 * @author Leon
 */

const { SuccessModel } = require('../model/ResModel')
const { getUsersByFollower } = require('../services/user-relation')

/**
 * 根据 userid 获取粉丝列表
 * @param {number} userId 用户 id
 */
async function getFans(userId) {
  // service
  const { count, userList } = await getUsersByFollower(userId)
  return new SuccessModel({
    count,
    fansList: userList
  })
}

module.exports = {
  getFans
}
