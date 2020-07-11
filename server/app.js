const fs = require('fs')
const path = require('path')
const express = require('express')
const app = express()
const globalConfig = require('./config')
const { verifyToken } = require('./utils/jwt')

// 注意注册顺序
app.use(express.json())
// 静态资源
app.use(`/${globalConfig.STATIC_PATH}/`, express.static(globalConfig.STATIC_PATH))

// token校验
verifyToken(app)

// 校验失败处理
app.use(function (err, req, res, next) {
  console.log(err)
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


// 路由模块
// 导入模块
fs.readdirSync(path.join(__dirname, 'modules')).forEach(file => {
  require(path.join(__dirname, 'modules', file))(app)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(globalConfig.PORT, () => console.log(`${globalConfig.HOST}${globalConfig.PORT}`))