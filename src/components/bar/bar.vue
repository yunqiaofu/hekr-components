<template lang="pug">
.hk-bar(:style="getColorStyle")
  .hk-bar-item(
    v-for="(item, index) in items",
    :key="index",
    @click="handleClick(item)"
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
  name: 'hk-bar',
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
    handleClick (val) {
      if (!val.disabled) {
        this.$emit('change', val)
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"
.hk-bar
  display flex
  justify-content space-around
  position fixed
  bottom 0
  left 0
  right 0
  padding .5rem 1rem
  &-item
    text-align center
</style>
