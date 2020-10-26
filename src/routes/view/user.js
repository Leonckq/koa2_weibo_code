/**
 * @description user view 路由配置
 * @author Leon
 */
const router = require('koa-router')()

/**
 * 获取登录信息
 * @param {Object}} ctx 
 */
function getLoginInfo(ctx) {
  const userInfo = ctx.session.userInfo
  return {
    isLogin: !!userInfo ? true : false,
    userName: !!userInfo ? userInfo.userName : ''
  }
}

router.get('/login', async (ctx, next) => {

  await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
  await ctx.render('register', getLoginInfo(ctx))
})

module.exports = router