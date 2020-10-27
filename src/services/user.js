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
// async function getUserInfo(userName, password) {
//   // 查询条件
//   const whereOpt = {
//     userName
//   }
//   password && Object.assign(whereOpt, { password })
//   // 查询
//   const result = await User.findOne({
//     attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
//     where: whereOpt
//   })

//   // 格式化

//   return result ? formatUser(result.dataValues) : result
// }

async function getUserInfo(userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    Object.assign(whereOpt, { password })
  }

  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
    where: whereOpt
  })
  if (result == null) {
    // 未找到
    return result
  }

  // 格式化
  const formatRes = formatUser(result.dataValues)

  return formatRes
}

/**
 *  注册用户
 * @param {string} userName
 * @param {string} password
 * @param {number} gender
 */
// async function createUser({userName, password, gender, nickName = ''}) {
//   const result = await User.create({
//     userName,
//     password,
//     gender,
//     nickName: nickName ? nickName : userName
//   })
//   return result.dataValues
// }

async function createUser({ userName, password, gender = 3, nickName }) {
  const result = await User.create({
    userName,
    password,
    nickName: nickName ? nickName : userName,
    gender
  })
  const data = result.dataValues

  // 自己关注自己（为了方便首页获取数据）
  // addFollower(data.id, data.id)

  return data
}

/**
 * 删除用户
 * @param {string} userName
 */
async function deleteUser(userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  return result > 0
}
/**
 *
 * @param {Object} param0 要修改的内容 newPassword, newNickName, newPicture, newCity
 * @param {Object} param1 查询条件 password, nickName
 */
async function updateUser({ newPassword, newNickName, newPicture, newCity }, { password, userName }) {
  // 拼接修改内容
  const updateData = {}
  newPassword && Object.assign(updateData, { password: newPassword })
  newNickName && Object.assign(updateData, { nickName: newNickName })
  newPicture && Object.assign(updateData, { picture: newPicture })
  newCity && Object.assign(updateData, { city: newCity })

  // 拼接查询条件
  const whereOpt = { userName }
  password && Object.assign(whereOpt, { password })
  const result = await User.update(updateData, {
    where: whereOpt
  })

  return result[0] > 0 // 修改的行数
}

module.exports = {
  getUserInfo,
  createUser,
  deleteUser,
  updateUser
}
