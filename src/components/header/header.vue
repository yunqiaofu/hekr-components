<template lang="pug">
.hk-header(:class="getClass")

  //- 左边
  .hk-header-left(@click="clickLeft")
    slot(name="left")
      .hk-header-left-icon
        slot(name="left-icon")
          i(
            :class="leftIcon",
            aria-hidden="true"
          )
      .hk-header-left-text
        slot(name="left-text") {{ leftText }}

  //- 标题
  h1.hk-header-title
    slot {{ title }}

  //- 右边
  .hk-header-right(@click="clickRight")
    slot(name="right")
      .hk-header-right-text
        slot(name="right-text") {{ rightText }}
      .hk-header-right-icon
        slot(name="right-icon")
          i(
            :class="rightIcon",
            aria-hidden="true"
          )
</template>

<script>
export default {
  name: 'hk-header',
  props: {
    title: {
      type: String,
      default: ''
    },
    leftIcon: {
      type: String,
      default: 'hk-icons-angle-left'
    },
    leftText: {
      type: String
    },
    rightIcon: {
      type: String
    },
    rightText: {
      type: String
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getClass () {
      return {
        'hk-header-border': this.border
      }
    }
  },
  methods: {
    clickLeft () {
      this.$emit('click-left')
    },
    clickRight () {
      this.$emit('click-right')
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"
$height = 2.25rem
$height-2 = 1.5rem

.hk-header
  position fixed
  top 0
  right 0
  left 0
  z-index $zindex-lower
  height $height
  line-height $height * 0.8
  padding 0.15rem 0
  color $color-black

  &-border
    border-bottom 0.05rem solid darken($color-white, 10%)
  &-title
    height $height
    line-height $height * 0.9
    margin 0 4.4rem
    text-align center
    font-size 0.9rem
    font-weight 500
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  &-left
  &-right
    height $height-2
    line-height $height-2 * 0.9
    position absolute
    top 0.4rem
    display block
    font-size $font-size-4
    white-space nowrap
  &-left
    left 0.6rem
    text-align left
    &-icon
      float left
      line-height $height-2 * 0.9
      font-size 1.05rem
      margin-right 0.3rem

    &-text
      float right
      height $height-2
      line-height $height-2

  &-right
    right 0.6rem
    text-align right
    &-icon
      float right
      height $height-2
      line-height $height-2 * 0.9
      font-size 1.05rem
      margin-left 0.3rem
    &-text
      float left
      height $height-2
      line-height $height-2

</style>
