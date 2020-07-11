<template>
  <div class="img-wrapper">
    <img
      width='100%'
      height='100%'
      :src="src"
      @load='onLoad'
      @error='loadError'
    >
    <div
      class="placeholder"
      v-if="loading&&!error"
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div
      class="placeholder erro"
      v-else-if="error"
    >
      <icon icon-name='error' />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name:'FImage',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  setup(){
    const loading = ref(true)
    const error = ref(false)
    // 图片加载完成
    const onLoad= ()=> {
      loading = false
    },
    //图片加载失败
    const loadError = ()=> {
      error = true
    }

    return {
      loading,
      error,
      onLoad,
      loadError
    }
  }
}
</script>

<style scoped lang="scss">
@keyframes zoom {
  to {
    transform: scaleY(0.5);
  }
  from {
    transform: scaleY(1);
  }
}

.img-wrapper {
  position: relative;
}
.placeholder {
  width: 100%;
  height: 100%;
  background-color: #f7f8fa;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 80px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    width: 15px;
    height: 70px;
    background-color: #999;
    border-radius: 8px;
    margin: 0 8px;
    animation-name: zoom;
    animation-duration: 0.2s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    &:first-child {
      animation-delay: 0.2s;
    }
    &:last-child {
      animation-delay: 0.6s;
    }
  }
}
</style>