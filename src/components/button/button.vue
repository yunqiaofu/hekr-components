<template lang="pug">
button.hk-button(
  :class="getClass",
  :disabled="disabled",
  @touchend.prevent="click($event)",
  @click="click($event)"
)
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
    disabled: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getClass () {
      return {
        'hk-button-disabled': this.disabled,
        'hk-button-block': this.block,
        'hk-button-default': this.type === 'default',
        'hk-button-primary': this.type === 'primary',
        'hk-button-warning': this.type === 'warning',
        'hk-button-info': this.type === 'info'
      }
    }
  },
  methods: {
    click (e) {
      console.log(e)
      if (!this.disabled) {
        this.$emit('click', e)
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
    &:hover
    &:active
      background-color darken(lookup('$color-' + name), 8%)
      border-color darken(lookup('$color-' + name), 8%)

.hk-button
  display inline-block
  padding 6px 12px
  background-color $color-white
  font-size $font-size-3
  border-radius $border-radius
  border 1px solid transparent
  cursor pointer
  &-disabled
    opacity 0.65
    cursor not-allowed
  &-block
    display block
    width 100%

  &-default
    color $color-black
    border-color $color-gray
    &:hover
    &:active
      background-color darken($color-white, 8%)
      border-color darken($color-gray, 8%)

  type(primary)
  type(warning)
  type(info)
</style>
