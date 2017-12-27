<template lang="pug">
.hk-alert
  .hk-alert-container
    slot
      .hk-alert-icon
        i(:class="icon")
      .hk-alert-text {{ text }}
</template>

<script>
export default {
  name: 'hk-alert',
  props: {
    text: {
      type: String
    },
    icon: {
      type: String,
      default: 'hk-icons-waring'
    }
  }
}
</script>

<style lang="stylus">
.hk-alert
  padding 0 0.2rem
  background-color rgba(0, 0, 0, 0.5)
  &-container
    font-size 0.6rem
    color #fff
    text-align left
  &-icon
    width 2rem
    height 2rem
    line-height 2rem
    text-align center
    font-size 1rem
  &-text
    height 2rem
    line-height 2rem
    margin-top -2rem
    margin-left 2rem
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
</style>
