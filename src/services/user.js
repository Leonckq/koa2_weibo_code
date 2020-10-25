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

/**
 *  注册用户
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender 
 */
async function createUser({userName, password, gender, nickName = ''}) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName
  })
  return result.dataValues
} 

module.exports = {
  getUserInfo,
  createUser
}

