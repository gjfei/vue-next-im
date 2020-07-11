<template>
  <div class="container">
    <div class="title">注册</div>
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
    <div class="form-item avatar">
      <span>上传头像</span>
      <upload @success='uploadSuccess' />
    </div>
    <button
      class="btn"
      @click="handleReg"
    >注册</button>
    <div
      class="tips"
      @click="$router.push({path:'/login'})"
    >
      登录
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { register } from '@/api'
import Upload from '@/components/Upload'
import { userValidator } from '@/utils/validator'

export default {
  name: 'Login',
  components: { Upload },
  setup() {

    const formData = reactive({
      username: '',
      password: '',
      avatarUrl: '',
      avatarId: ''
    })

    const handleReg = () => {
      const { username, password, avatarId, avatarUrl } = formData

      const valid = userValidator(formData)
      if (valid === true) {
        register(formData).then(res => {
          console.log(res)
        })
      } else {
        console.log(valid)
      }

    }
    const uploadSuccess = (val) => {
      formData.avatarUrl = val.url
      formData.avatarId = val.id
    }
    return {
      formData,
      handleReg,
      uploadSuccess
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 400px;
  margin-top: 150px;
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
    &.avatar {
      align-items: flex-start;
      ::v-deep .upload-wrap {
        margin-left: 20px;
      }
    }
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
      &:-webkit-autofill {
        -webkit-text-fill-color: #f7f7f7 !important;
        transition: background-color 5000s ease-in-out 0s;
      }
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