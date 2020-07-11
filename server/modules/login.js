// 登录模块
const { generateToken } = require('../utils/jwt')
const globalConfig = require('../config')

const { User } = require('../models')
const { Avatar } = require('../models')
const { body, validationResult } = require('express-validator')
// 校验中间件
const checkList = [
  body('username').notEmpty().withMessage('请填写用户名'),
  body('password').notEmpty().withMessage('请输入密码').isLength({ min: 6 }).withMessage('请输入长度大于6的密码')
]

module.exports = (app) => {
  app.post('/login', checkList, async (req, res) => {
    const resBody = {
      msg: '登录成功',
      code: 200,
      obj: null
    }
    const resCheck = validationResult(req)
    // 校验参数
    if (!resCheck.isEmpty()) {

      resBody.msg = resCheck.array()[0].msg
      resBody.code = 422

    } else {

      try {

        const userInfo = await User.findOne({ username: req.body.username })

        if (userInfo) {
          // 验证账户密码
          if (userInfo.password === req.body.password) {

            const token = generateToken(userInfo.id)
            const avatarInfo = await Avatar.findById(userInfo.avatarId)
            const avatarUrl = `${globalConfig.HOST}${globalConfig.PORT}/${avatarInfo.avatar_url}`

            resBody.obj = {
              userInfo: {
                username: userInfo.username,
                password: userInfo.password,
                avatarId: userInfo.avatarId,
                avatarUrl
              },
              token
            }

          } else {
            resBody.msg = '账号或者密码错误'
            resBody.code = 400
          }
        } else {
          resBody.msg = '账号不存在'
          resBody.code = 500
        }

      } catch (err) {
        resBody.msg = err
        resBody.code = 500
      }
    }
    res.send(resBody)
  })
}