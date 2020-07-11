<template>
  <i class="iconfont" :class="'icon-'+iconName" />
</template>

<script>
export default {
  name:'Icon',
  props:{
    iconName: {
      type: String,
      required: true
    }
  }
}
</script>