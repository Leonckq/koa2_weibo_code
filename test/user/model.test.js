/**
 * @description user model test
 * @author Leon
 */

const { User } = require('./../../src/db/model/index')

test('User 模型的各个属性', () => {
  const user = User.build({
    userName: 'zhangsan',
    password: '123',
    nickName: '张三',
    picture: '/xxx.png',
    city: '南京'
  })
  //验证各个属性
  expect(user.userName).toBe('zhangsan')
  expect(user.password).toBe('123')
  expect(user.nickName).toBe('张三')
  expect(user.picture).toBe('/xxx.png')
  expect(user.city).toBe('南京')
  expect(user.gender).toBe(3)
})