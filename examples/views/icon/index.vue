<template lang="pug">
.hk-icon-demo
  .hk-icon-demo-title 基本样式
  hk-icon(name="fa fa-home")
  hk-icon(name="fa fa-camera-retro", text="文本组合")
  hk-icon(name="fa fa-book", text="块级", block)
  hk-icon(name="fa fa-home", text="禁止", disabled)
  hk-icon(name="fa fa-home", text="激活" active)
  h2 内置图标
  hk-icon(
    name="hk-icons-angel-right",
    text="hk-icons-angel-right",
    block
  )
  hk-icon(
    name="hk-icons-angel-left",
    text="hk-icons-angel-left",
    block
  )
  hk-icon(
    name="hk-icons-delete",
    text="hk-icons-delete",
    block
  )
  hk-icon(
    name="hk-icons-circle",
    text="hk-icons-circle",
    block
  )
  hk-icon(
    name="hk-icons-week-checked",
    text="hk-icons-week-checked",
    block
  )
  hk-icon(
    name="hk-icons-check-checked",
    text="hk-icons-check-checked",
    block
  )
  hk-icon(
    name="hk-icons-delete-simple",
    text="hk-icons-delete-simple",
    block
  )
  hk-icon(
    name="hk-icons-delete-device",
    text="hk-icons-delete-device",
    block
  )
  hk-icon(
    name="hk-icons-waring",
    text="hk-icons-waring",
    block
  )
  hk-icon(
    name="hk-icons-offline",
    text="hk-icons-offline",
    block
  )
  hk-icon(
    name="hk-icons-reduce",
    text="hk-icons-reduce",
    block
  )
  hk-icon(
    name="hk-icons-increase",
    text="hk-icons-increase",
    block
  )
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
