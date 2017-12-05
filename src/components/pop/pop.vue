<template lang="pug">
  .hk-pop
    .hk-pop-mask(
      v-show="value",
      @click="maskClick"
    )
    .hk-pop-body(
      :class="{'hk-pop-body-hidden':!value}"
    )
      slot
</template>

<script>
  export default {
    name: 'hk-pop',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      maskClickDisabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      maskClick () {
        if (!this.maskClickDisabled) {
          this.$emit('input', false)
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../stylus/variables.styl"
  .hk-pop
    &-mask
      background-color rgba(0, 0, 0, 0.5)
      position fixed
      z-index $zindex-base
      left 0
      right 0
      top 0
      bottom 0
    &-body
      background-color $color-white
      left 0
      right 0
      position fixed
      bottom 0
      transition .5s
      z-index $zindex-higher
      opacity 1
      &-hidden
        transform: translateY(100%)
        opacity 0
</style>
