/**
 * @description 微博 service
 * @author Leon
 */

const { Blog, User } = require('../db/model/index')
const { formatUser, formatBlog } = require('./_format')
/**
 * 创建微博所需数据
 * @param {string} userId
 * @param {string} content
 * @param {string} image
 */
async function createBlog({ userId, content, image }) {
  const res = await Blog.create({
    userId,
    content,
    image
  })
  return res.dataValues
}

/**
 *
 * @param {string} userName 用户名
 * @param {number} pageIndex 当前页
 * @param {number} pageSize 一页多少条
 */
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10 }) {
  // 拼接查询条件
  const userWhereOpts = {}
  if (userName) {
    userWhereOpts.userName = userName
  }

  // 执行查询
  const result = await Blog.findAndCountAll({
    limit: pageSize, // 每页多少条
    offset: pageSize * pageIndex, // 跳过多少条
    order: [['id', 'desc']],
    include: [
      {
        model: User,
        attributes: ['userName', 'nickName', 'picture'],
        where: userWhereOpts
      }
    ]
  })

  // result.count 总数， 跟分页无关
  // result.rows 查询结果， 数组

  //获取dataValues
  let blogList = result.rows.map((row) => row.dataValues)
  blogList = blogList.map((blogItem) => {
    blogItem.user = formatUser(blogItem.user.dataValues)
    return blogItem
  })
  blogList = formatBlog(blogList)
  return {
    count: result.count,
    blogList
  }
}

module.exports = {
  createBlog,
  getBlogListByUser
}
