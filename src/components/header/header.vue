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
      template(v-if="rightIcon")
        .hk-header-right-text
          slot(name="right-text") {{ rightText }}
        .hk-header-right-icon(v-if="rightIcon")
          slot(name="right-icon")
            i(
              :class="rightIcon",
              aria-hidden="true"
            )
      template(v-else) {{ rightText }}
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
$height = 45px
$height-2 = 30px

.hk-header
  position relative
  height $height
  line-height $height * 0.8
  padding 3px 0
  background-color #ccc
  &-title
    height $height
    line-height $height * 0.9
    margin 0 88px
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
    top 13px
    display block
    font-size $font-size-4
    color $color-black
    white-space nowrap
  &-left
    left 12px
    &-icon
      position absolute
      width $height-2
      height $height-2
      line-height $height-2 * 0.9
      top -5px
      left 0
      text-align left
      i[aria-hidden="true"]
        font-size $font-size-1
    &-text
      padding-left 16px

  &-right
    right 12px
    &-icon
      position absolute
      width $height-2
      height $height-2
      line-height $height-2 * 0.9
      top -5px
      right 0
      text-align right
      i[aria-hidden="true"]
        font-size $font-size-1
    &-text
      padding-right 16px

</style>
