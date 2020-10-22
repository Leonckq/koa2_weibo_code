/**
 * @description 
 * @author Leon
 */

const server = require('./server')
test('json 接口返回数据正确', async () => {
  const res = await server.get('/json')
  // const res1 = await server.post('/login').send({
  //   userName: 'zhangsan',
  //   password: '123'
  // })
  expect(res.body).toEqual({
    title: 'koa2 json'
  })
})