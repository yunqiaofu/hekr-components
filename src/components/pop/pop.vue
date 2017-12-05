<template lang="pug">
.hk-pop(v-if="value")
  .hk-pop-mask(@click="hide")
  .hk-pop-container
    slot
</template>

<script>
export default {
  name: 'hk-pop',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hide () {
      this.$emit('input', false)
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
    box-shadow 0 0 0.05rem #ccc
    z-index $zindex-higher
    animation fade-up 0.1s

@keyframes fade-up
  from
    opacity 0
    transform translateY(100%)
  to
    opacity 1
    transform translateY(0)
</style>
