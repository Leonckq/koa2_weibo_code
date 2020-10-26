/**
 * @description login 测试
 * @author Leon
 */
const server = require('./../server')

// 用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
  userName,
  password,
  nickName: userName,
  gender: 1
}

let COOKIE = ''
test('注册', async () => {
  const res = await server
  .post('/api/user/login')
  .send(testUser)
  expect(res.body.errno).toBe(0)
})

// 重复注册
test('重复注册', async () => {
  const res = await server
    .post('/api/user/register')
    .send(testUser)
  expect(res.body.errno).not.toBe(0)
})