<template lang="pug">
.hk-pop
  .hk-pop-mask(
    v-if="value && showMask",
    @click="hide"
  )
  transition(
    name="hk-pop-fade-up"
  )
    .hk-pop-container(v-if="value")
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
    showMask: {
      type: Boolean,
      default: true
    },
    maskClickDisabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hide () {
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
    top 0
    right 0
    bottom 0
    left 0
    z-index $zindex-base
  &-container
    background-color $color-white
    position fixed
    right 0
    bottom 0
    left 0
    width 100%
    box-shadow 0 0 0.05rem #ccc
    z-index $zindex-higher
  &-fade-up-enter-active
    transform translateY(100%)
    opacity 0
  &-fade-up-enter-active
    transition all 0.3s ease-in-out
  &-fade-up-leave-active
    transition all 0.2s ease-in 0.1s
  &-fade-up-enter-to
    transform translateY(0)
    opacity 1
  &-fade-up-leave-to
    transform translateY(50%)
    opacity 0
</style>
