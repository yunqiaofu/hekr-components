<template lang="pug">
.hk-modal(:style="getColorStyle")
  .hk-modal-item(v-for="(item, index) in items", :key="item.name", @click="handleClick(item)")
    hk-icon(
      :name = "item.icon",
      :text = "item.label",
      :active = "item.active",
      :disabled = "item.disabled",
      :fontColor = "color.fontColor",
      :activeColor = "color.activeColor",
      block
    )
</template>

<script>
export default {
  name: 'hk-modal',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      default: 'dark'
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
        'background-color': this.color.bgColor
      }
    },
    color () {
      if (this.theme === 'dark') {
        return {
          bgColor: 'rgba(255, 255, 255, .1)',
          fontColor: 'rgba(255, 255, 255, .5)',
          activeColor: '#fff'
        }
      } else {
        return {
          bgColor: 'rgba(0, 0, 0, .1)',
          fontColor: 'rgba(0, 0, 0, .25)',
          activeColor: 'rgba(0, 0, 0, .5)'
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

.hk-modal
  display flex
  justify-content space-around
  position absolute
  bottom 0
  left 0
  right 0
  padding .5rem 1rem
  &-item
    text-align center
</style>
