/**
 * @description  存储配置
 * @author Leon
 */
// const redis = require('redis')
const { isProd, isDev } = require('./../utils/env')
let REDIS_CONF = Object.create(null)
let MYSQL_CONF = Object.create(null)
if (isDev) {
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'Liyang6666',
    port: '3306',
    database: 'koa2_weibo_db'
  }

}

MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'Liyang6666',
  port: '3306',
  database: 'koa2_weibo_db'
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
}