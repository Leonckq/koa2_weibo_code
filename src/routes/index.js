const { loginRedirect, loginCheck } = require('../middlewares/loginChecks')

const router = require('koa-router')()

router.get('/', loginRedirect, async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', loginCheck, async (ctx, next) => {
  let session = ctx.session
  console.log('session', session)
  if (session.viewNum == null) {
    session.viewNum = 0
  }
  session.viewNum++
  // throw Error()
  ctx.body = {
    title: 'koa2 json'
    // viewNum: session.viewNum
  }
})

module.exports = router
