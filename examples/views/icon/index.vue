<template lang="pug">
.hk-icon-demo
  .hk-icon-demo-title 基本样式
  hk-icon(name="fa fa-home")
  hk-icon(name="fa fa-camera-retro", text="文本组合")
  hk-icon(name="fa fa-book", text="块级", block)
  hk-icon(name="fa fa-home", text="禁止", disabled)
  hk-icon(name="fa fa-home", text="激活" active)
</template>

<script>
export default {
  name: 'hk-icon-demo'
}
</script>

<style lang="stylus">
.hk-icon-demo
  text-align center
  .hk-icon
    margin 7px
  &-title
    margin 10px auto
  &-contenter
    width 200px
    margin 0 auto
    .hk-icon
      margin 7px auto
</style>
