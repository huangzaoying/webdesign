import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { userName, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (userName === 'admin' && password === 'admin') {
      return {
        code: 200,
        data: {
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (userName === 'xiaoxiao' && password === 'xiaoxiao') {
      return {
        code: 200,
        data: {
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}