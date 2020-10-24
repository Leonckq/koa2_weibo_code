/**
 * @description user API 路由
 * @author Leon
 */
const router = require('koa-router')()
const { isExist } = require('./../../controller/user')
router.prefix('/api/user')

// 注册
router.post('/register', async (ctx, next) => {
 
}) 

// isExit
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

module.exports = router