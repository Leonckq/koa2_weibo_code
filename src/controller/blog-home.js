/**
 * @description 首页 controller
 * @author Leon
 */

const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog, getFollowersBlogList } = require('../services/blog')
const xss = require('xss')
const { PAGE_SIZE, PEG_FOR_AT_WHO } = require('./../conf/constant')
const { getUserInfo } = require('./../services/user')
const { createAtRelation } = require('../services/at-Relation')

/**
 * 创建微博所需数据
 * @param {string} userId
 * @param {string} content
 * @param {string} image
 */
async function create({ userId, content, image }) {
  // 分析收集content中的用户
  // content格式如 ’哈哈 @李四 - lisi 再见 @张三 - zhangsan‘
  const atUserNameList = []
  content = content.replace(
    PEG_FOR_AT_WHO,
    (matchStr, nickName, userName) => {
      atUserNameList.push(userName)
      return matchStr
    }
  )

  // 根据@用户名查询用户信息
  const atUserList = await Promise.all(
    atUserNameList.map(userName => getUserInfo(userName))
  )
  //根据用户信息，获取用户id
  const atUserIdList = atUserList.map(user => user.id)
  
  try {
    const blog = await createBlog({
      userId,
      content: xss(content),
      image
    })
    // 创建 @关系
    // blog.id
    //createAtRelation
    await Promise.all(atUserIdList.map(userId => {
      createAtRelation(blog.id, userId)
    }))

    return new SuccessModel(blog)
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(createBlogFailInfo)
  }
}
/**
 *
 * @param {number} userId
 * @param {number} pageIndex
 */
async function getHomeBlogList(userId, pageIndex = 0) {
  // service
  const result = await getFollowersBlogList({ userId, pageIndex, pageSize: PAGE_SIZE })
  const { count, blogList } = result
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count
  })
}

module.exports = {
  create,
  getHomeBlogList
}
