/**
 * @description 微博 service
 * @author Leon
 */

const { Blog } = require('../db/model/index')

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

module.exports = {
  createBlog
}