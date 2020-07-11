const { User } = require('./models')
const { verifyToken } = require('../utils/jwt')
const checkLogin = async (req, res, next) => {
  // 取出token校验
  const raw = String(req.headers.authorization).split(' ').pop()
  const { id } = verifyToken(raw)
  req.user = await User.findById(id)

  next()
}
module.exports = {
  checkLogin
}