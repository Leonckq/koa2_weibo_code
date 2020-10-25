/**
 * @description 
 * @author Leon
 */

const server = require('./server')
// test('json 接口返回数据正确', async () => {
//   const res = await server.get('/json')
//   // const res1 = await server.post('/login').send({
//   //   userName: 'zhangsan',
//   //   password: '123'
//   // })
//   expect(res.body).toEqual({
//     title: 'koa2 json'
//   })
// })

function sum(a, b) {
  return a + b
}

test('10 + 20 = 20', () => {
  const res = sum(10, 20)
  expect(res).toBe(30)
})