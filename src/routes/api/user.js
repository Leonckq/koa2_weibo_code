/**
 * @description user API 路由
 * @author Leon
 */
const router = require('koa-router')()
const { isExist, register } = require('./../../controller/user')
router.prefix('/api/user')

// 注册
router.post('/register', async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  // 调用controller 返回
  ctx.body = await register({userName, password, gender})
}) 

// isExit
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router