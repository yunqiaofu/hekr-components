<template lang="pug">
.hk-colorpicker-demo
  hk-colorpicker(
    v-model="color"
  )
  hk-colorpicker(
    v-model="color",
    disabled
  )
</template>

<script>
export default {
  name: 'hk-colorpicker-demo',
  data () {
    return {
      color: {
        r: 230,
        g: 255,
        b: 12
      }
    }
  }
}
</script>

<style lang="stylus">
.hk-colorpicker-demo
  text-align center
</style>
