// 文件上传
const fs = require('fs')
const globalConfig = require('../config')
const { Avatar } = require('../models')

module.exports = (app) => {
  app.post('/fileUpload', (req, res) => {
    let resBody = {
      msg: '上传成功',
      code: 200,
      obj: null
    }

    const base64Data = req.body.base64.replace(/^data:image\/\w+;base64,/, '')
    const fileLength = parseInt(base64Data.length - (base64Data.length / 8) * 2)

    if (fileLength < 4 * 1024 * 1024 && req.body.type === 'avatar') {

      const dataBuffer = Buffer.from(base64Data, 'base64')
      const path = `upload/${Date.now()}.png`
      fs.writeFile(path, dataBuffer, async function (err) {

        if (err) {
          
          resBody = {
            msg: '上传失败',
            code: 500,
            obj: err
          }
        } else {
          const avatarInfo = await Avatar.create({
            avatar_url: path
          })

          resBody.obj = {
            url: `${globalConfig.HOST}${globalConfig.PORT}/${avatarInfo.avatar_url}`,
            id: avatarInfo.id
          }

        }

        res.send(resBody)
      })
    } else {
      resBody.msg = '上传失败,图片最大只能上传4*1024KB'
      resBody.msg = 500

      res.send(resBody)
    }
  })
}