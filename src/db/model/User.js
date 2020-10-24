/**
 * @description 用户数据模型
 * @author Leon
 */
// const { USE } = require('sequelize/types/lib/index-hints')
const seq = require('../seq')
const { STRING, DECIMAL } = require('./../types')
const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNulll: false,
    unique: true,
    comment: '用户名唯一'
  },
  password: {
    type: STRING,
    allowNulll: false,
    comment: '密码'
  },
  nickName: {
    type: STRING,
    allowNulll: false,
    comment: '昵称'
  },
  gender: {
    type: DECIMAL,
    allowNulll: false,
    defaultValue: 3,
    comment: '性别(1男, 2女, 3保密)'
  },
  picture: {
    type: STRING,
    comment: '头像-图片地址'
  },
  city: {
    type: STRING,
    comment: '城市'
  }
})

module.exports = User