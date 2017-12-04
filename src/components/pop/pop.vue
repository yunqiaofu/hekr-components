<template lang="pug">
  .hk-pop(
  :class="{'hidden':!show}"
  )
    slot
</template>

<script>
  export default {
    name: 'hk-pop',
    props: {
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../stylus/variables.styl"
  .hk-pop.hidden
    bottom -100%
  .hk-pop
    background-color $color-white
    width 100%
    position fixed
    bottom 0
    transition .5s
</style>
