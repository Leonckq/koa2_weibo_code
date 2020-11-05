/**
 * @description 首页 home test
 * @author Leon
 */
const { L_COOKIE } = require('../testUserInfo')
const server = require('./../server')

let BLOG_ID = ''

test('创建一条微博，应该成功', async () => {
  // 定义测试内容
  const content = '单元测试自动创建的微博' + Date.now()
  const image = 'xxx.png'

  const res = await server
    .post('/api/blog/create')
    .send({
      content,
      image
    })
    .set('cookie', L_COOKIE)
  expect(res.body.errno).toBe(0)
  expect(res.body.data.image).toBe(image)
  expect(res.body.data.content).toBe(content)
  BLOG_ID = res.body.data.id
})
