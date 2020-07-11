import request from './request'

export const login = param => {
  return request.post('login', param)
}

export const register = param => {
  return request.post('register', param)
}

export const upload = param => {
  return request.post('fileUpload', param)
}

export const getUserInfo = () => {
  return request.get('getUserInfo')
}