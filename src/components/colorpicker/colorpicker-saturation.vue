<template lang="pug">
.hk-colorpicker-saturation(
  :style="style",
  @touchstart.prevent="dragstart",
  @touchmove.prevent="dragging",
  @touchend.prevent="dragend",
  @mousedown="dragstart"
)
  .hk-colorpicker-saturation-white
  .hk-colorpicker-saturation-black
  .hk-colorpicker-saturation-pointer(
    :style="getPointStyle"
  )
</template>

<script>
export default {
  name: 'hk-colorpicker-saturation',
  props: {
    value: {
      type: Object,
      default: () => ({ h: 0, s: 0, v: 0 })
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      is: false
    }
  },
  computed: {
    style () {
      return { 'background-color': `hsl(${this.value.h}, 100%, 50%)` }
    },
    getPointStyle () {
      return {
        top: `${-this.value.v * 100 + 100}%`,
        left: `${this.value.s * 100}%`
      }
    }
  },
  mounted () {
    document.addEventListener('mousemove', this.dragging)
    document.addEventListener('mouseup', this.dragend)
  },
  destroyed () {
    document.removeEventListener('mousemove', this.dragging)
    document.removeEventListener('mouseup', this.dragend)
  },
  methods: {
    dragstart (e) {
      this.is = true
      this.update(e)
    },
    dragging (e) {
      if (this.is) {
        this.update(e)
      }
    },
    dragend (e) {
      if (this.is) {
        this.update(e)
      }
      this.is = false
    },
    update (e) {
      if (this.disabled) {
        return
      }
      const x = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : e.clientX
      const y = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : e.clientY
      const { left, top } = this.$el.getBoundingClientRect()
      let h = this.value.h
      let s = (x - left) / this.$el.clientWidth
      let v = 1 - (y - top) / this.$el.clientHeight

      this.$emit('input', { h, s, v })
    }
  }
}
</script>

<style lang="stylus">
.hk-colorpicker-saturation
  position relative
  padding-bottom 50%
  overflow hidden
  &-white,
  &-black
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    cursor pointer
  &-white
    background-image linear-gradient(to right, #fff, rgba(255,255,255,0))
  &-black
    background-image linear-gradient(to top, #000, rgba(0,0,0,0))
  &-pointer
    position absolute
    width 0.7rem
    height 0.7rem
    border-radius 50%
    transform translate(-50%, -50%)
    background-color rgba(255,255,255,0.7)
    box-shadow 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4)
    cursor pointer
</style>
