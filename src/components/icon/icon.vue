<template lang="pug">
.hk-icon(
  :class="getClass",
  :style="getColorStyle"
)
  i.hk-icon-ico(:class="name")
  span.hk-icon-text(v-if="text") {{ text }}
</template>

<script>
export default {
  name: 'hk-icon',
  props: {
    name: {
      type: String,
      required: true
    },
    text: {
      type: String
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
    fontColor: {
      type: String,
      default: '#666'
    },
    activeColor: {
      type: String,
      default: '#000'
    }
  },
  computed: {
    getClass () {
      return {
        'hk-icon-disabled': this.disabled,
        'hk-icon-block': this.block
      }
    },
    getColorStyle () {
      return {
        'color': this.active ? this.activeColor : this.fontColor
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"
.hk-icon
  display inline-block
  padding .5rem .6rem
  cursor pointer
  &-ico
    font-size $font-size-1
    vertical-align middle
  &-text
    font-size $font-size-4
    vertical-align middle
  &-disabled
    opacity 0.65
    cursor not-allowed
  &-block
    i
      display block
      width 100%
</style>
