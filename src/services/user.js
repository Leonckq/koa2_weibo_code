/**
 * @description user service
 * @author Leon
 */
const { User } = require('./../db/model/index')
const { formatUser } = require('./_format')
/**
 * 
 * @param {String} userName 
 * @param {String} password 
 */
async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  password && Object.assign(whereOpt, { password })
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })

  // 格式化

  return result ? formatUser(forresult.dataValues) : result
}

module.exports = {
  getUserInfo
}