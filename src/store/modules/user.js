import { login } from '@/api'
import { setToken, getToken } from '@/utils/auth'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          if (response.code !== 200) {
            reject(response.msg)
            return
          }

          commit('SET_TOKEN', response.obj.token)
          setToken(response.obj.token)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
