/**
 * @description user API 路由
 * @author Leon
 */
const router = require('koa-router')()
const { isExist, register, login, deleteCurUser } = require('./../../controller/user')
const userValidate = require('./../../validator/user')
const { genValidator } = require('./../../middlewares/validate')
const user = require('../../services/user')
const { loginCheck } = require('./../../middlewares/loginChecks') 
const { isTest } = require('../../utils/env')

router.prefix('/api/user')
// 注册
// router.post('/register', genValidator(userValidate), async (ctx, next) => {
//   const { userName, password, gender } = ctx.request.body 
//   // 调用controller 返回
//   const body = await register({userName, password, gender})
//   console.log('body------------->', body)
//   ctx.body = body
// })

router.post('/register', genValidator(userValidate), async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body
  ctx.body = await register({
    userName,
    password,
    gender
  })
})

// isExit
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// login
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  // controller
  ctx.body = await login(ctx, userName, password)
})

// delete
router.post('/delte',loginCheck, async (ctx, next) => {
  if (isTest) {
    const { userName } = ctx.session.userName
    ctx.body = await deleteCurUser(userName)
  }
})

module.exports = router