<template>
  <div>
    <label
      class="upload-wrap"
      :style="{width:width+'px',height:height+'px'}"
    >
      <img
        v-if="isExternal||imgUrl"
        :src="imgUrl||placeholder"
        alt=""
        class="img-preview"
      >
      <icon
        v-else
        :icon-name='placeholder'
      />
      <input
        type="file"
        name="file"
        @change="onChange"
        accept="image/*"
      />
    </label>
    <image-cropper
      @complete='cropComplete'
      v-if="visible"
      :source-img-url='imgUrl'
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { upload } from '@/api'
import ImageCropper from '@/components/ImageCropper'
export default {
  name: 'Upload',
  components: {
    ImageCropper
  },
  props: {
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

    const visible = ref(false)

    const imgUrl = ref('')
    // 判断占位符是链接还是svgicon
    const isExternal = computed(() => {
      const isHttp = /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i.test(props.placeholder)
      const isBase64 = /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i.test(props.placeholder)
      return isHttp || isBase64
    })

    // 选取图片
    const onChange = event => {
      const { files } = event.target
      const fr = new FileReader()
      if (files.length > 0) {
        fr.readAsDataURL(files[0])
        fr.onload = () => {
          imgUrl.value = fr.result
          visible.value = true
        }
      }
    }

    const uploadImg = (param) => {
      upload(param).then(res => {
        imgUrl.value = res.obj.url
        emit('success', res.obj)
      })
    }

    // 裁剪完成
    const cropComplete = img => {
      imgUrl.value = img
      visible.value = false
      const param = {
        type: 'avatar',
        base64: img
      }
      uploadImg(param)
    }
    return {
      visible,
      imgUrl,
      isExternal,
      onChange,
      cropComplete
    }
  }
}
</script>

<style scoped lang="scss">
.upload-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  .img-preview {
    width: 100%;
    height: 100%;
    display: block;
  }
  .icon-image {
    font-size: 48px;
  }
  input {
    display: none;
  }
}
</style>