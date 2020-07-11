// 注册模块
const { generateToken } = require('../utils/jwt')
const { User } = require('../models')
const { body, validationResult } = require('express-validator')
// 校验中间件
const checkList = [
  body('username').notEmpty().withMessage('请填写用户名'),
  body('password').notEmpty().withMessage('请输入密码').isLength({ min: 6 }).withMessage('请输入长度大于6的密码'),
  body('avatarId').notEmpty().withMessage('请选择头像'),
]

module.exports = (app) => {
  app.post('/register', checkList, async (req, res) => {
    const resBody = {
      msg: '注册成功',
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

        const userInfo = await User.create({
          username: req.body.username,
          password: req.body.password,
          avatarId: req.body.avatarId
        })
        // 生成token
        const token = generateToken(userInfo.id)

        resBody.obj = {
          userInfo: {
            username: userInfo.username,
            password: userInfo.password,
            avatarId: userInfo.avatarId,
            avatarUrl: req.body.avatarUrl
          },
          token
        }

      } catch (err) {
        console.log(err)
        resBody.msg = '账号已被使用'
        resBody.code = 422
      }

    }
    res.send(resBody)
  })
}