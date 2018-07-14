<template lang="pug">
.hk-picker(
  @touchstart.prevent="dragstart"
  @touchmove.prevent="dragging"
  @touchend.prevent="dragend"
  @mousedown.stop="dragstart"
)
  .hk-picker-container(ref="container")
    .hk-picker-container-items(:style="getStyle")
      .hk-picker-container-items-item(
        v-for="(item, index) in length"
        :key="item"
      ) {{ format(index) }}
  .hk-picker-line
    .hk-picker-line-unit
      .hk-picker-line-unit-placeholder {{ format(value) }}
      .hk-picker-line-unit-text {{ unit }}
</template>

<script>
export default {
  name: 'hk-picker',
  props: {
    value: {
      type: Number,
      default: 0
    },
    length: {
      type: Number,
      default: 60
    },
    format: {
      type: Function,
      default: val => val
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isInit: false,
      is: false,
      y: 0,
      dy: 80
    }
  },
  computed: {
    getStyle () {
      const style = {
        transform: `translate3d(0, ${this.dy}px, 0)`
      }
      if (this.is || !this.isInit) {
        style['transition-duration'] = '0s'
      }
      return style
    }
  },
  mounted () {
    document.addEventListener('mousemove', this.dragging)
    document.addEventListener('mouseup', this.dragend)
    this.update()
  },
  destroyed () {
    document.removeEventListener('mousemove', this.dragging)
    document.removeEventListener('mouseup', this.dragend)
  },
  watch: {
    value () {
      this.update()
    }
  },
  methods: {
    getY (e) {
      return e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : e.clientY
    },
    dragstart (e) {
      if (this.disabled) return
      this.is = true
      this.y = this.getY(e) - this.dy
    },
    dragging (e) {
      if (this.disabled) return
      if (this.is) {
        this.dy = this.getY(e) - this.y
      }
    },
    dragend (e) {
      if (this.is && !this.disabled) {
        let h = this.$refs.container.offsetHeight / 5
        let min = -h * (this.length - 3)
        let max = h * 2
        let dy = this.getY(e) - this.y
        dy = Math.round(dy / h) * h
        if (dy < min) dy = min
        if (dy > max) dy = max
        this.dy = dy
        let val = Math.round(-this.dy / h) + 2
        this.$emit('input', val)
        this.$emit('change', val)
      }
      this.is = false
    },
    update () {
      let h = this.$refs.container.offsetHeight / 5
      let min = -h * (this.length - 3)
      let max = h * 2
      this.dy = -(this.value - 2) * h
      if (this.dy < min) this.dy = min
      if (this.dy > max) this.dy = max
      this.$nextTick(() => {
        this.isInit = true
      })
    }
  }
}
</script>

<style lang="stylus">
.hk-picker
  position relative
  &-container
    height 10rem
    overflow hidden
    &-items
      transition-property transform
      transition-duration 0.3s
      transition-timing-function ease-out
      backface-visibility hidden
      &-item
        height 2rem
        line-height 2rem
        font-size 0.8rem
  &-line
    width 100%
    height 2rem
    line-height 2rem
    position absolute
    top 50%
    left 0
    transform translate3d(0, -50%, 0)
    border-top 0.05rem solid #ccc
    border-bottom 0.05rem solid #ccc
    &-unit
      height 2rem
      line-height 2rem
      position absolute
      top 0
      bottom 0
      left 50%
      width 50%
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      text-align left
      &-placeholder,
      &-text
        float left
        margin 0
        padding 0
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      &-placeholder
        transform translateX(-50%)
        visibility hidden
        font-size 0.8rem
      &-text
        font-size 0.75rem
</style>
