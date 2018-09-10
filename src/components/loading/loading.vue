<template lang="pug">
.hk-loading
  transition(name="hk-fade-in")
    .hk-loading-mask(v-if="value")
  transition(name="scale")
    .hk-loading-container(v-if="value")
      slot
        .hk-loading-container-spinner
          .hk-loading-container-spinner-dot
            .hk-loading-container-spinner-dot-1
            .hk-loading-container-spinner-dot-2
            .hk-loading-container-spinner-dot-3
            .hk-loading-container-spinner-dot-4
          .hk-loading-container-spinner-text {{ text }}
</template>

<script>
export default {
  name: 'hk-loading',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"
$spinner-size=1rem
.hk-loading
  &-mask
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    z-index $zindex-higher
    background-color rgba(255,255,255,0.88)
  &-container
    position absolute
    top 50%
    left 50%
    z-index $zindex-higher
    transform translate3d(-50%, -50%, 0) scale3d(1,1,1)
    &-spinner
      text-align center
      &-dot
        width $spinner-size
        height $spinner-size
        position relative
        margin 0.5rem auto
        animation hkSpinner 1.1s infinite linear
        &-1,
        &-2,
        &-3,
        &-4
          width ($spinner-size / 3)
          height ($spinner-size / 3)
          border-radius 50%
          position absolute
          background-color #06f
        &-1
          top 0.05rem
          left 0.05rem
        &-2
          top 0.05rem
          right 0.05rem
          opacity 0.8
        &-3
          bottom 0.05rem
          right 0.05rem
          opacity 0.6
        &-4
          left 0.05rem
          bottom 0.05rem
          opacity 0.4
      &-text
        font-size 0.7rem
        color #555

  .scale-enter-active
  .scale-leave-active
    transition all 0.2s ease-in-out
  .scale-enter
  .scale-leave-to
    opacity 0
    transform translate3d(-50%, -50%, 0) scale3d(0.3,0.3,0.3)

@keyframes hkSpinner
  0%
  	transform translateZ(0) rotate(0deg)
  100%
  	transform translateZ(0) rotate(360deg)

</style>
