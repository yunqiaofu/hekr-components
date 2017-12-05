<template lang="pug">
  hk-pop(
    :show="show"
  )
    .hk-time-box
      .hk-time-box-title {{title}}
      .hk-time-box-body
        slot
</template>
<script>
  export default{
    name: 'hk-time-box',
    props: {
      title: {
        type: String,
        default: '倒计时时间'
      },
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
<style lang="stylus">
  .hk-time-box
    background-color #fff
    &-title
      height 2rem
      line-height 2rem
      font-size 0.9rem
      margin-left 1rem
      color #383838
      text-align left
      letter-spacing -0.43px
    &-body
      display flex
      justify-content space-around
</style>
