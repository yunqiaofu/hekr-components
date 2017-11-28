<template lang="pug">
button.hk-button(
  :class="getClass",
  @touchend.prevent="click",
  @click="click($event)"
)
  .hk-button-loading(v-if="loading")
    .hk-button-loading-bar
  slot
</template>

<script>
export default {
  name: 'hk-button',
  props: {
    type: {
      type: String,
      default: 'default'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getClass () {
      return {
        'hk-button-disabled': this.disabled,
        'hk-button-active': this.active,
        'hk-button-block': this.block,
        'hk-button-default': this.type === 'default',
        'hk-button-primary': this.type === 'primary',
        'hk-button-warning': this.type === 'warning',
        'hk-button-info': this.type === 'info'
      }
    }
  },
  methods: {
    click () {
      if (!this.disabled) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"

type(name)
  &-{name}
    color $color-white
    background-color lookup('$color-' + name)
    border-color lookup('$color-' + name)
    &^[-1]-active
    &:active:not(^[-1]-disabled)
      background-color darken(lookup('$color-' + name), 20%)
      border-color darken(lookup('$color-' + name), 20%)

.hk-button
  display inline-block
  padding 1rem 1.2rem
  background-color $color-white
  font-size $font-size-3
  border-radius $border-radius
  border 0.1rem solid transparent
  cursor pointer
  position relative
  // 暂时注释掉阴影效果，目前不需要
  // &-active
  // &:active:not(&-disabled)
  //   box-shadow inset 0 3px 5px rgba(0, 0, 0, 0.125)

  &-disabled
    opacity 0.65
    cursor not-allowed
  &-block
    display block
    width 100%
  &-loading
    position absolute
    bottom 0
    left 0
    right 0
    height 0.1rem
    overflow hidden
    background-color alpha($color-black, 70%)
    &-bar
      height 0.1rem
      background-color $color-white
      animation button-loading 0.6s ease-in-out infinite

  &-default
    color $color-black
    border-color $color-gray
    ^[-1]-active
    &:active:not(^[-1]-disabled)
      background-color darken($color-white, 20%)
      border-color darken($color-gray, 20%)

  type(primary)
  type(warning)
  type(info)

@keyframes button-loading
  from
    width 0
    transform translate3d(-150%, 0, 0)
  to
    width 100%
    transform translate3d(250%, 0, 0)

</style>
