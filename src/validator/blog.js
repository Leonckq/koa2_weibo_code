/**
 * @description 微博数据校验
 * @author Leon
 */
const validate = require('./validate')

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    userId: {

    },
    content: {
      type: 'string'
    },
    image: {
      type: 'string',
      maxLength: 255
    }
  }
}

function blogValidate (data = {}) {
  return validate(SCHEMA, data)
}

module.exports = blogValidate