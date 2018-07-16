<template lang="pug">
.hk-tabbar(:style="getColorStyle")
  .hk-tabbar-item(
    v-for="(item, index) in items",
    :key="index",
    :style="getItemStyle",
    v-show="!item.hide",
    @click="click(item, index)"
  )
    hk-icon(
      :name = "item.icon",
      :text = "item.label",
      :active = "item.active",
      :disabled = "item.disabled",
      :fontColor = "item.fontColor || color.fontColor",
      :activeColor = "item.activeColor || color.activeColor",
      block
    )
</template>

<script>
export default {
  name: 'hk-tabbar',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      default: 'dark'
    },
    bgColor: {
      type: String
    },
    fontColor: {
      type: String
    },
    activeColor: {
      type: String
    }
  },
  computed: {
    getColorStyle () {
      return {
        'background-color': this.color.bgColor
      }
    },
    getItemStyle () {
      const width = 1 / (this.items.length || 1) * 100
      return {
        width: `${width.toFixed(2)}%`
      }
    },
    color () {
      if (this.theme === 'dark') {
        return {
          bgColor: this.bgColor || 'rgba(255, 255, 255, .1)',
          fontColor: this.fontColor || 'rgba(255, 255, 255, .5)',
          activeColor: this.activeColor || '#fff'
        }
      } else {
        return {
          bgColor: this.bgColor || 'rgba(0, 0, 0, .1)',
          fontColor: this.fontColor || 'rgba(0, 0, 0, .25)',
          activeColor: this.activeColor || 'rgba(0, 0, 0, .5)'
        }
      }
    }
  },
  methods: {
    click (val, index) {
      if (!val.disabled) {
        this.$emit('change', val, index)
      }
    }
  }
}
</script>

<style lang="stylus">
$height = 3.8rem
.hk-tabbar
  width 100%
  height $height
  position fixed
  right 0
  bottom 0
  left 0
  padding 0 0.5rem
  overflow hidden
  &:before,
  &:after
    content ""
    display table
    float none
    clear both
  &-item
    height $height
    float left
    text-align center
    display flex
    align-items center
  .hk-icon
    margin auto
    overflow hidden
  .hk-icon-text
    width 100%
    display block
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
</style>
