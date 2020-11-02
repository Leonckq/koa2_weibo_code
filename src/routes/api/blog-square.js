/**
 * @description 广场页 API
 * @author Leon
 */
const router = require('koa-router')()
const { getSquareBlogList } = require('../../controller/blog-square')
const { loginCheck } = require('../../middlewares/loginChecks')
const { getBlogListStr } = require('../../utils/blog')
router.prefix('/api/square')

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
  let { pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  //controller
  const result = await getSquareBlogList(pageIndex)// 渲染模板
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})
module.exports = router