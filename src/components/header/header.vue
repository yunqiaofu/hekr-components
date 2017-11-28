<template lang="pug">
.hk-header

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
      type: String
    },
    leftText: {
      type: String
    },
    rightIcon: {
      type: String
    },
    rightText: {
      type: String
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
$height = 4.5rem
$height-2 = 3rem

.hk-header
  position relative
  height $height
  line-height $height * 0.8
  padding 0.3rem 0
  background-color $color-white
  border-bottom 0.1rem solid darken($color-white, 10%)
  &-title
    height $height
    line-height $height * 0.9
    margin 0 8.8rem
    text-align center
    font-size $font-size-2
    color #000
    font-weight 500
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  &-left
  &-right
    height $height-2
    line-height $height-2 * 0.9
    position absolute
    top 0.8rem
    display block
    font-size $font-size-4
    color $color-black
    white-space nowrap
  &-left
    left 1.2rem
    text-align left
    &-icon
      float left
      line-height $height-2 * 0.7
      font-size $font-size-1
      margin-right 0.6rem
    &-text
      float right
      height $height-2
      line-height $height-2 * 1.1

  &-right
    right 1.2rem
    text-align right
    &-icon
      float right
      height $height-2
      line-height $height-2 * 0.7
      font-size $font-size-1
      margin-left 0.6rem
    &-text
      float left
      height $height-2
      line-height $height-2 * 1.1

</style>
