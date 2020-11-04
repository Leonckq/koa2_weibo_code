/**
 * @description user API 路由
 * @author Leon
 */
const router = require('koa-router')()
const {
  isExist,
  register,
  login,
  deleteCurUser,
  changeInfo,
  logout,
  changePassword
} = require('./../../controller/user')
const userValidate = require('./../../validator/user')
const { genValidator } = require('./../../middlewares/validate')
const user = require('../../services/user')
const { loginCheck } = require('./../../middlewares/loginChecks')
const { isTest } = require('../../utils/env')
const { getFollowers } = require('../../controller/user-relation')

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
router.post('/delete', loginCheck, async (ctx, next) => {
  if (isTest) {
    // 测试环境下，测试账号登录可删除自己
    const { userName } = ctx.session.userInfo
    ctx.body = await deleteCurUser(userName)
  }
})
// 修改个人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { nickName, picture, city } = ctx.request.body
  ctx.body = await changeInfo(ctx, { nickName, picture, city })
})

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  const { userName } = ctx.session.userInfo
  ctx.body = await changePassword(userName, password, newPassword)
})

router.post('/logout', loginCheck, async (ctx, next) => {
  ctx.body = await logout(ctx)
})
// 获取 at 列表， 即关注人列表
router.get('/getAtList', loginCheck, async (ctx, next) => {
  const { id: userId } = ctx.session.userInfo
  const result = await getFollowers(userId)
  const { followersList } = result.data
  const list = followersList.map((user) => {
    return `${user.nickName} - ${user.userName}`
  })
  ctx.body = list
})
module.exports = router
