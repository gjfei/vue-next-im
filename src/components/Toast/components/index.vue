<template>
  <div
    class="toast"
    :class="!icon?'toast-text':'toast-icon'"
    v-show="visible"
  >
    <icon
      v-if="!!icon"
      :icon-name='icon'
      class="icon"
    />
    <div class="msg">{{message}}</div>
  </div>
</template>

<script>
import { watch, onUnmounted, ref } from 'vue'
import Icon from '@/components/Icon'
export default {
  name: "Toast",
  components: {
    Icon
  },
  setup(props) {

    const visible = ref(false)
    const icon = ref('')
    const mask = ref(true)
    const message = ref('')
    const duration = ref(1500)


    const hide = () => {
      visible.value = false
    }

    watch(visible, (val) => {
      if (val && mask) {
        document.body.classList.add('unclickable')
      } else {
        document.body.classList.remove('unclickable')
      }
    })
    onUnmounted(() => {
      document.body.classList.remove('unclickable')
    })

    return {
      visible,
      icon,
      mask,
      message,
      duration,
      hide
    }
  }
}
</script>

<style scoped lang="scss">
.toast {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(50, 50, 51, 0.88);
  padding: 24px;
  z-index: 9999;
  font-size: 18px;
  border-radius: 16px;
  color: #ffffff;
  min-height: 150px;
  max-width: 400px;
  font-size: 24px;
  line-height: 40px;
  &-text {
    min-height: 0;
    min-width: 200px;
  }
  &-icon {
    width: 150px;
    .icon {
      font-size: 80px;
    }
    .msg {
      margin-top: 20px;
    }
  }
}
</style>
<style lang="scss">
.unclickable {
  overflow: hidden;
  * {
    pointer-events: none;
  }
}
</style>