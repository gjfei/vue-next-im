const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const globalConfig = require('../config')


const models = {}
// 连接数据库
mongoose.connect(globalConfig.MONGODB_URL,{
  useCreateIndex:true,
  useNewUrlParser: true,
  useUnifiedTopology:true
})

// 读取这个文件下的除了index的文件
fs.readdirSync(__dirname)
  .filter((file)=>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))
    // 创建集合
    const modeSchema = new mongoose.Schema(model)
    const modelName = file.replace(/\.js$/i, '') 
    models[modelName] = mongoose.model(modelName,modeSchema)
  })

module.exports = models