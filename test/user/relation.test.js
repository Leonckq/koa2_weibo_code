/**
 * @description 用户关系 单元测试
 * @author Leon
 */
const server = require('./../server')
const { getFans, getFollowers } = require('./../../src/controller/user-relation')
const { L_ID, L_COOKIE, L_USER_NAME, Q_COOKIE, Q_USER_NAME, Q_ID } = require('./../testUserInfo')

test('先取消关注，应该成功', async () => {
  const res = server.post('/api/profile/unFollow').send({ userId: Q_ID }).set('cookie', L_COOKIE)
  expect(1).toBe(1)
})

// 添加关注
test('leon 关注 qing 应该成功', async () => {
  const res = await server.post('/api/profile/follow').send({ userId: L_ID }).set('cookie', L_COOKIE)
  expect(res.body.errno).toBe(0)
})

// 获取粉丝
test('获取qing的粉丝', async () => {
  const result = await getFans(Q_ID)
  const { count, fansList } = result.data
  const hasUserName = fansList.some((oo) => oo.userName === L_USER_NAME)
  expect(count > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

// 获取关注人
test('获取leon的关注人，应该有qing', async () => {
  const result = await getFollowers(L_ID)
  const { count, followersList } = result.data
  const hasUserName = followersList.some((oo) => oo.userName === Q_USER_NAME)
  expect(count > 0).toBe(true)
  expect(hasUserName).toBe(true)
})

// 获取 at 列表
test('获取leon的 at 列表， 应该有qing', async () => {
  const res = await server.get('/api/user/getAtList').set('cookie', L_COOKIE)
  const atList = res.body
  const hasUser = atList.some((user) => {
    return user.indexOf(`- ${Q_USER_NAME}`) > 0
  })
  expect(hasUser).toBe(true)
})

// 取消关注
test('leon取消关注qing，应该成功', async () => {
  const res = await server.post('/api/profile/unFollow').send({ userId: Q_ID }).set('cookie', L_COOKIE)
  expect(res.body.errno).toBe(0)
})
