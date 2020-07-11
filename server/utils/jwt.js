const jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
const secret = 'www.jarven.top'

const unlessPath = ['/register', '/login','/upload']
// 生成token
exports.generateToken = (id) => {
  const payload = {
    id: id
  }
  return jwt.sign(payload, secret)
}

// 校验token
exports.verifyToken = (app) => {

  // 自动校验token
  app.use(expressJwt({
    secret: secret,
    algorithms: ['HS256'],
    credentialsRequired:true,
  }).unless({
    path: unlessPath  //除了这个地址，其他的URL都需要验证
  }))

  // 校验失败处理
  app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      //  这个需要根据自己的业务逻辑来处理
      const resBody = {
        msg: 'token无效',
        code: 401,
        obj: null
      }
      if (err.message === 'jwt expired') {
        res.resBody.msg = 'token过期'
      }

      res.send(resBody)
    }
  })
}



