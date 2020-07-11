<template>
  <div class="container">
    <div class="title">登录</div>
    <div class="form-item">
      <icon icon-name='user' />
      <input
        type="text"
        v-model="formData.username"
      >
    </div>
    <div class="form-item">
      <icon icon-name='lock' />
      <input
        type="password"
        v-model="formData.password"
      >
    </div>
    <button
      class="btn"
      @click="handleLogin"
    >登录</button>
    <div
      class="tips"
      @click="$router.push({path:'/register'})"
    >
      注册
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'

export default {
  name: 'Login',
  setup(props, ctx) {

    const loginVm = getCurrentInstance().ctx

    const formData = reactive({
      username: '',
      password: ''
    })

    const handleLogin = () => {
      const { username, password } = formData
      if (username && password) {

        loginVm.$store.dispatch('user/login', formData).then(res => {
          loginVm.$router.push({ path: '/' })
        })
      }
    }
    return {
      formData,
      handleLogin
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 400px;
  margin-top: 250px;
  color: #f7f7f7;
  .title {
    text-align: center;
    font-size: 26px;
    margin-bottom: 40px;
  }
  .form-item {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    line-height: 50px;
    padding: 0 20px 0 10px;
    box-sizing: border-box;
    font-size: 18px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    .iconfont {
      font-size: 30px;
    }
    input {
      flex: 1;
      height: 50px;
      background-color: transparent;
      background: transparent;
      border: 0;
      appearance: none;
      border-radius: 0;
      caret-color: #f7f7f7;
      outline: none;
      color: #f7f7f7;
    }
  }
  .btn {
    text-align: center;
    width: 100%;
    border-radius: 10px;
    height: 50px;
    outline: none;
    cursor: pointer;
    border: 0;
  }
  .tips {
    padding: 10px 0px;
    cursor: pointer;
  }
}
</style>
<style>
</style>