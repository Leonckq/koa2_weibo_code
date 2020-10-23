/**
 * @description 环境变量
 * @author Leon
 */

const ENV = process.env.NODE_ENV
console.log('env', ENV)
module.exports = {
  isDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isProd: ENV === 'production',
  notProd: ENV !== 'production',
  isTest: ENV === 'test',
  notTest: ENV !== 'test'
}
