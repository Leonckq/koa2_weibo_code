/**
 * @description 首页API 路由
 * @author Leon
 */
const router = require('koa-router')()
const { create } = require('../../controller/blog-home')
const { loginCheck } = require('../../middlewares/loginChecks')
const { genValidator } = require('../../middlewares/validate')
const blogValidate = require('../../validator/blog')

router.prefix('/api/blog')
router.post('/create', loginCheck, genValidator(blogValidate) ,async (ctx, next) => {
  const { content, image } = ctx.request.body
  const { id: userId } = ctx.session.userInfo
  ctx.body = await create({ userId, content, image })
})

module.exports = router