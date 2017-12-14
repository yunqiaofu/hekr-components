<template lang="pug">
.hk-swipe-item(
  :class="getClass",
  :style="getStyle"
)
  slot
</template>

<script>
export default {
  name: 'hk-swipe-item',
  data () {
    return {
      active: false,
      offset: 0,
      show: false,
      animate: false,
      speed: 300
    }
  },
  computed: {
    getClass () {
      return {
        'hk-swipe-item-active': this.active
      }
    },
    getStyle () {
      const style = {
        transform: `translate3d(${this.offset}px, 0, 0)`
      }
      if (this.show) {
        style.display = 'block'
      }
      if (this.animate) {
        style.transition = `transform ${this.speed}ms ease-in-out`
      }
      return style
    }
  },
  mounted () {
    this.$parent && this.$parent.addSwipeItem(this)
  },
  destroyed () {
    this.$parent && this.$parent.delSwipeItem(this)
  }
}
</script>

<style lang="stylus">
.hk-swipe-item
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  width 100%
  height 100%
  display none
  &-active
    transform none
    display block
</style>
