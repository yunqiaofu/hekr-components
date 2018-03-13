<template lang="pug">
.hk-loading
  .hk-loading-mask(v-if="value")
  transition(name="scale")
    .hk-loading-container(v-if="value")
      slot
        img.hk-loading-container-loading(:src="icon")
</template>

<script>
import loading from './loading.gif'
export default {
  name: 'hk-loading',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: loading
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"

.hk-loading
  &-mask
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    z-index $zindex-higher
    background-color rgba(0,0,0,0.3)
  &-container
    position fixed
    top 50%
    left 50%
    z-index $zindex-higher
    padding 0.7rem
    transform translate3d(-50%, -50%, 0) scale3d(1,1,1)
    border-radius 0.2rem
    background-color #222
    &-loading
      display block
      width 1rem
      height 1rem

  .scale-enter-active
  .scale-leave-active
    transition all 0.2s ease-in-out
  .scale-enter
  .scale-leave-to
    opacity 0
    transform translate3d(-50%, -50%, 0) scale3d(0.3,0.3,0.3)

</style>
