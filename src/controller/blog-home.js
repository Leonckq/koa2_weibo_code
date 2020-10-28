/**
 * @description 首页 controller
 * @author Leon
 */

const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog } = require('../services/blog')
const xss = require('xss')

/**
 * 创建微博所需数据
 * @param {string} userId 
 * @param {string} content 
 * @param {string} image 
 */
async function create({ userId, content, image }) {
  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })
    return new SuccessModel(blog)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}

module.exports = {
  create
}