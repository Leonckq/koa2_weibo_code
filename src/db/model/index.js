/**
 * @description 数据模型 入口文件
 * @author Leon
 */

const User = require('./User')
const Blog = require('./Blog')

Blog.belongsTo(User, {
  freignKey: 'userId'
})

module.exports = {
  User,
  Blog
}
