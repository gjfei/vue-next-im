const { User } = require('../models')
const { Avatar } = require('../models')
const globalConfig = require('../config')

module.exports = (app) => {
  app.get('/getUserInfo', async (req, res) => {
    const resBody = {
      msg: '获取用户信息成功',
      code: 200,
      obj: null
    }
    try {
      // 查询个人信息
      const userInfo = await User.findById(req.user.id)
      // 查询保存的头像
      const avatarInfo = await Avatar.findById(userInfo.avatarId)
      const avatarUrl = `${globalConfig.HOST}${globalConfig.PORT}/${avatarInfo.avatar_url}`

      resBody.obj = {
        username: userInfo.username,
        password: userInfo.password,
        avatarId: userInfo.avatarId,
        avatarUrl
      }
    } catch (err) {
      resBody.msg = err
      resBody.code = 500
    }
    res.send(resBody)
  })
}