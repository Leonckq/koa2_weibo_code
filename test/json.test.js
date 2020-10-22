/**
 * @description 
 * @author Leon
 */

const server = require('./server')
test('json 接口返回数据正确', async () => {
  const res = await server.get('/json')
  expect(res.body).toEqual({
    title: 'koa2 json'
  })
})