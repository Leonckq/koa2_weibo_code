/**
 * @description json scheme 校验
 * @author Leon
 */
const Ajv = require('ajv')
const ajv = new Ajv({
  // allErrors: true// 输出所有的错误（比较慢）
})

/**
 * json schema 校验
 * @param {Object} schema json schema 校验
 * @param {Object} data 
 */
function validate(schema, data = {}) {
  const res = ajv.validate(schema, data)
  if (!res) {
    return ajv.errors[0]
  }
}

module.exports = {
  validate
}