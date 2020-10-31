const Koa = require('koa')
const app = new Koa()
const path = require('path')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')
const session = require('koa-generic-session')
const { REDIS_CONF } = require('./conf/db')
const { isProd } = require('./utils/env')

const { SESSION_SECRET_KEY } = require('./conf/secretKeys')

// 路由
const profileAPIRouter = require('./routes/api/blog-progile')
const errorViewRouter = require('./routes/view/error')
const userViewRouter = require('./routes/view/user')
const userAPIRouter = require('./routes/api/user')
const utilsAPIRouter = require('./routes/api/utils')
const blogViewRouter = require('./routes/view/blog')
const homeAPIRouter = require('./routes/api/blog-home')

// error handler
const onerrorConf = Object.create(null)
if (isProd) {
  onerrorConf.redirect = '/error'
}
onerror(app, onerrorConf)

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text']
  })
)
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(
  views(__dirname + '/views', {
    extension: 'ejs'
  })
)

// session 配置
app.keys = [SESSION_SECRET_KEY]
app.use(
  session({
    key: 'weibo.sid', //cookie name 默认是koa.sid
    prefix: 'weibo:sess:', // redis key的前缀， 默认是`koa:sess:`
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000
    },
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  })
)

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(index.routes(), index.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(homeAPIRouter.routes(), homeAPIRouter.allowedMethods())
app.use(profileAPIRouter.routes(), profileAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()) // 404

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
