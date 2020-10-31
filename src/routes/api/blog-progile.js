/**
 * @description 个人主页API 路由
 * @author Leon
 */
const router = require('koa-router')()
const { getBlogListStr } = require('../../utils/blog')
const { getProfileBlogList } = require('./../../controller/blog-profile')
const { loginCheck } = require('./../../middlewares/loginChecks')
router.prefix('/api/profile')

router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
  let { userName, pageIndex } = ctx.params
  pageIndex = parseInt(pageIndex)
  const result = await getProfileBlogList(userName, pageIndex)
  result.data.blogListTpl = getBlogListStr(result.data.blogList)
  ctx.body = result
})

module.exports = router