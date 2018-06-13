<template lang="pug">
.hk-colorpicker-demo
  hk-colorpicker(
    v-model="color"
  )
  hk-colorpicker(
    v-model="color",
    autopick
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
        r: 90,
        g: 36,
        b: 25
      }
    }
  }
}
</script>

<style lang="stylus">
.hk-colorpicker-demo
  text-align center
</style>
