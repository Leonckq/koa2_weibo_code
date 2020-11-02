/**
 * @description 用户关系 controller
 * @author Leon
 */

const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUsersByFollower, addFollwer } = require('../services/user-relation')

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

/**
 *
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function follow(myUserId, curUserId) {
  try {
    await addFollwer(myUserId, curUserId)
    return SuccessModel()
  } catch (err) {
    return new ErrorModel(addF)
  }
}

module.exports = {
  getFans
}
