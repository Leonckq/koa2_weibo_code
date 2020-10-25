/**
 * @description user controller
 * @author Leon
 */

const { getUserInfo, createUser } = require('./../services/user')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo } = require('./../model/ErrorInfo')
const user = require('./../services/user')
const { doCrypto } = require('./../utils/cryp')
/**
 * 用户名是否存在
 * @param {string} userName 
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName)
  // 业务逻辑处理
  // 统一返回格式
  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }

  
}
/**
 * 
 * @param {string} userName 
 * @param {string} password 
 * @param {number} gender 1男 2女 3保密
 */
async function register ({userName, password, gender}) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名已存在
    return ErrorModel(registerUserNameExistInfo)
  }

  // 注册service
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender
    })
    return new SuccessModel()
  } catch (error) {
    console.error(error.message, error.stack)
    return new ErrorModel(registerFailInfo)
  }

}

module.exports = {
  isExist,
  register
}