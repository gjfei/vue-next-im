
// 登录注册验用户信息校验
export const userValidator = (options = {}) => {
  const user = {
    username: '请输入用户名',
    password: '请输入密码',
    avatarUrl: '请选择头像'
  }

  if (typeof options === 'object') {
    for (let key in options) {
      if (user[key] && !options[key]) {
        return user[key]
      }
    }

    return true
  }
}






