/**
 * @description sequelize 同步数据库
 * @author Leon
 */

const seq = require('./seq')
// require('./model')

//测试连接
seq.authenticate().then(res => {
  console.log('res ok')
}).catch(err => {
  console.log('err ok')
})

seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})