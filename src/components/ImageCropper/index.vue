<template>
  <div class="vue-image-cropper">
    <div class="cropper-wrap">
      <div class="cropper-left">
        <div
          class="cropper-box"
          @mouseenter='handelMouseEnter'
          @mouseleave='handelMouseLeave'
        >
          <div
            class="cropper-box-canvas"
            :style="sourceImgBgStyle"
          >
            <img
              :src="imgAttr.url"
              class="cropper-img"
              alt=""
            >
          </div>
          <div
            class="cropper-mask"
            @mousedown="imgStartMove"
          ></div>
          <div
            class="cropper-crop-box"
            :style="cropBoxStyle"
            @mousedown="cropBoxStartMove"
          >
            <div class="cropper-view-box">
              <img
                :src="imgAttr.url"
                :style="sourceImgStyle"
                class="cropper-img"
                alt=""
              >
            </div>
          </div>
        </div>
      </div>
      <div class="cropper-right">
        <div class="title">预览</div>
        <div
          class="preview-box"
          :style="{width:cropAttr.width+'px',height:cropAttr.height+'px'}"
        >
          <img
            :src="imgAttr.url"
            :style="sourceImgStyle"
            class="preview-img"
          >
        </div>

        <button
          class="btn"
          @click="createImg"
        >保存</button>
      </div>
      <icon icon-name='close' />
    </div>
    <canvas
      ref="canvasRef"
      v-show="false"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue'
export default {
  name: 'ImageCropper',
  props: {
    sourceImgUrl: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'image'
    },
    width: {
      type: Number,
      default: 200
    },
    // 剪裁图片的高
    height: {
      type: Number,
      default: 200
    },
  },
  setup(props, { emit }) {
    const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1

    onMounted(() => {
      initCrop()
    })
    // 剪裁容器宽高
    const sourceImgContainer = reactive({
      width: 300,
      height: 300
    })
    // 原图属性
    const imgAttr = reactive({
      url: props.sourceImgUrl,
      degree: 0, // 旋转度数
      x: 0,
      y: 0,
      scale: 1,
      width: 0,
      height: 0,
      initWidth: 0,
      initHeight: 0,
      naturalWidth: 0, // 原宽
      naturalHeight: 0,
      sourceImg: null
    })

    const cropAttr = reactive({
      width: props.width,
      height: props.height,
      x: (sourceImgContainer.width - props.width) / 2,
      y: (sourceImgContainer.height - props.height) / 2
    })

    // canvasRef
    const canvasRef = ref(null)

    // 图片背景样式
    const sourceImgBgStyle = computed(() => {
      const { width, height, x, y, scale } = imgAttr
      return {
        width: width + 'px',
        height: height + 'px',
        top: y + 'px',
        left: x + 'px'
      }
    })

    // 图片剪裁样式
    const sourceImgStyle = computed(() => {
      const { width, height, x, y } = imgAttr
      return {
        width: width + 'px',
        height: height + 'px',
        top: y - cropAttr.y + 'px',
        left: x - cropAttr.x + 'px'
      }
    })

    // 剪裁框样式
    const cropBoxStyle = computed(() => {
      const { width, height, x, y } = cropAttr
      return {
        width: width + 'px',
        height: height + 'px',
        top: y + 'px',
        left: x + 'px'
      }
    })

    // 初始化剪裁框
    const initCrop = () => {

      const img = new Image()
      img.src = imgAttr.url

      img.onload = () => {

        const nWidth = img.naturalWidth
        const nHeight = img.naturalHeight
        const sic = sourceImgContainer

        const nRatio = nWidth / nHeight
        const cropRatio = props.width / props.height

        // 根据宽高跳转图片的初始位置以及大小
        if (nRatio > cropRatio) {
          imgAttr.height = props.height
          imgAttr.width = imgAttr.height * (nWidth / nHeight)
        } else {
          imgAttr.width = props.width
          imgAttr.height = imgAttr.width / (nWidth / nHeight)
        }

        // 设置位置
        imgAttr.x = imgAttr.width === sourceImgContainer.width ? 0 : (sourceImgContainer.width - imgAttr.width) / 2
        imgAttr.y = imgAttr.height === sourceImgContainer.height ? 0 : (sourceImgContainer.height - imgAttr.height) / 2

        // 保存原始高宽
        imgAttr.naturalWidth = nWidth
        imgAttr.naturalHeight = nHeight

        // 保存初始化时候的宽高
        imgAttr.initWidth = imgAttr.width
        imgAttr.initHeight = imgAttr.height

        // 保存原图
        imgAttr.sourceImg = img
      }
    }

    // 鼠标移入剪裁框
    const handelMouseEnter = (e) => {
      if (isFirefox) {
        document.addEventListener('DOMMouseScroll', handelZoom)
      } else {
        document.addEventListener('mousewheel', handelZoom)
      }
    }
    // 鼠标移出剪裁框
    const handelMouseLeave = (e) => {
      if (isFirefox) {
        document.removeEventListener('DOMMouseScroll', handelZoom)
      } else {
        document.removeEventListener('mousewheel', handelZoom)
      }
    }

    // 鼠标滚轴缩放事件
    // 上滑动为放大，下滑动为缩小
    const handelZoom = (e) => {
      // 判断放大还是缩小
      const isEnlarge = isFirefox ? (e.detail > 0 ? false : true) : (e.wheelDelta > 0 ? true : false)

      if (isEnlarge) {
        imgAttr.scale = imgAttr.scale + 0.03
      } else {
        imgAttr.scale = (imgAttr.scale - 0.03) <= 1 ? 1 : (imgAttr.scale - 0.03)
      }

      imgAttr.width = imgAttr.initWidth * imgAttr.scale
      imgAttr.height = imgAttr.initHeight * imgAttr.scale
      imgAttr.x = (sourceImgContainer.width - imgAttr.width) / 2
      imgAttr.y = (sourceImgContainer.height - imgAttr.height) / 2
    }

    // 移动图片
    const imgStartMove = (startEvent) => {

      startEvent.preventDefault()
      startEvent.stopPropagation()

      // 保存按下时候的图片位置信息
      const oX = imgAttr.x
      const oY = imgAttr.y

      document.onmousemove = (moveEvent) => {
        imgAttr.x = oX - (startEvent.clientX - moveEvent.clientX)
        imgAttr.y = oY - (startEvent.clientY - moveEvent.clientY)
      }
      // 取消监听
      document.onmouseup = (e) => {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }

    // 移动剪裁框

    const cropBoxStartMove = (startEvent) => {

      startEvent.preventDefault()
      startEvent.stopPropagation()
      // 保存按下时候的剪裁框位置信息
      const oX = cropAttr.x
      const oY = cropAttr.y
      document.onmousemove = (moveEvent) => {
        const x = oX - (startEvent.clientX - moveEvent.clientX)
        const y = oY - (startEvent.clientY - moveEvent.clientY)
        cropAttr.x = x <= 0 ? 0 : x > (sourceImgContainer.width - cropAttr.width) ? (sourceImgContainer.width - cropAttr.width) : x
        cropAttr.y = y <= 0 ? 0 : y > (sourceImgContainer.height - cropAttr.height) ? (sourceImgContainer.height - cropAttr.height) : y
      }
      // 取消监听
      document.onmouseup = (e) => {
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }

    // 生成图片
    const createImg = () => {

      const canvas = canvasRef.value.getContext('2d')
      canvas.clearRect(0, 0, props.width, props.height)
      // // 绘制到画布
      canvas.drawImage(
        imgAttr.sourceImg,
        imgAttr.x - cropAttr.x,
        imgAttr.y - cropAttr.y,
        imgAttr.width,
        imgAttr.height
      )
      emit('complete', canvasRef.value.toDataURL())
    }

    return {
      imgAttr,
      cropAttr,
      canvasRef,
      cropBoxStyle,
      sourceImgStyle,
      sourceImgBgStyle,
      handelMouseEnter,
      handelMouseLeave,
      handelZoom,
      imgStartMove,
      cropBoxStartMove,
      createImg
    }
  }
}
</script>

<style scoped lang="scss">
.vue-image-cropper {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;

  .cropper-wrap {
    width: 640px;
    height: 360px;
    background-color: #fff;
    position: relative;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    .cropper-left {
      position: relative;
    }
    .cropper-box {
      position: relative;
      display: block;
      width: 300px;
      height: 300px;
      background-color: #e5e5e0;
      overflow: hidden;
      cursor: move;
      .cropper-img {
        position: relative;
        text-align: left;
        user-select: none;
        transform: none;
        max-width: none;
        max-height: none;
        text-size-adjust: 100%;
        width: 100%;
        height: 100%;
        display: block;
      }
      .cropper-mask {
        background-color: rgba(0, 0, 0, 0.3);
        position: absolute;
        height: 100%;
        width: 100%;
      }
      .cropper-crop-box,
      .cropper-box-canvas {
        position: absolute;
      }
      .cropper-view-box {
        display: block;
        overflow: hidden;
        width: 100%;
        height: 100%;
        outline: 1px solid #39f;
        outline-color: rgba(51, 153, 255, 0.75);
        user-select: none;
      }
    }
    .cropper-right {
      padding-left: 20px;
      font-size: 14px;
      color: #333;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .preview-box {
        overflow: hidden;
        position: relative;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        .preview-img {
          position: absolute;
        }
      }
      .btn {
        text-align: center;
        width: 80px;
        border-radius: 10px;
        height: 40px;
        outline: none;
        cursor: pointer;
        border: 0;
      }
    }
  }
  .icon-close {
    font-size: 30px;
    position: absolute;
    top: -30px;
    right: -30px;
    color: #fff;
  }
}
</style>