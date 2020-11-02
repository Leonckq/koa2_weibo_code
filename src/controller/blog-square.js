/**
 * @description 广场页 controller
 * @author Leon
 */
const { getSquareCacheList } = require('../cache/blog')
const { SuccessModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('./../conf/constant')

/**
 * 获取广场的微博列表
 * @param {number} pageIndex 页码
 */
async function getSquareBlogList(pageIndex = 0) {
  // service
  const result = await getSquareCacheList(pageIndex, PAGE_SIZE)
  const blogList = result.blogList
  return new SuccessModel({
    isEmpty: blogList.length === 0,
    blogList,
    pageSize: PAGE_SIZE,
    pageIndex,
    count: result.count
  })
}
module.exports = {
  getSquareBlogList
}