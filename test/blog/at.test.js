/**
 * @description 微博 @ 关系 test
 * @author Leon
 */

const server = require('./../server')
const { L_COOKIE, Q_COOKIE, L_USER_NAME, Q_USER_NAME } = require('../testUserInfo')
let BLOG_ID
test('leon 创建一条微博, @ 李四，应该成功', async () => {
  const content = `单元测试微博 @qing - ${Q_USER_NAME}`
  const res = await server.post('/api/blog/create').send({ content }).set('cookie', L_COOKIE)
  BLOG_ID = res.body.data.id
})

test('获取qing的@列表，应该有刚刚创建的微博', async () => {
  const res = await server.get('/api/atMe/loadMore/0').set('cookie', Q_COOKIE)
  expect(res.body.errno).toBe(0)
  const data = res.body.data
  const blogList = data.blogList
  const isHaveCurBlog = blogList.some((blog) => blog.id === BLOG_ID)
  expect(isHaveCurBlog).toBe(true)
})
