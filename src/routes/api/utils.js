/**
 * utils api 路由
 * @author Leon
 */

const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const { saveFile } = require('../../controller/utils')
const { loginCheck } = require('../../middlewares/loginChecks')

router.prefix('/api/utils')

router.post('/upload', koaForm(), loginCheck, async (ctx, next) => {
  const file = ctx.req.files['file']
  const { size, path, name, type } = file
  ctx.body = await saveFile({
    size,
    name,
    type,
    filePath: path
  })
})

module.exports = router