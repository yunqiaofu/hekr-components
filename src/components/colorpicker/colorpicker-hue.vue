<template lang="pug">
.hk-colorpicker-hue
  .hk-colorpicker-hue-strip(
    @click="click"
  )
  .hk-colorpicker-hue-pointer(
    :style="style",
    @touchstart.prevent="dragstart",
    @touchmove.prevent="dragging",
    @touchend.prevent="dragend",
    @mousedown="dragstart"
  )
    .hk-colorpicker-hue-pointer-circle
</template>

<script>
export default {
  name: 'hk-colorpicker-hue',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style () {
      return {
        left: `${this.value / 360 * 100}%`
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
    click (e) {
      this.update(e)
    },
    update (e) {
      if (this.disabled) {
        return
      }
      const x = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : e.clientX
      const { left } = this.$el.getBoundingClientRect()

      let h = (x - left) / this.$el.clientWidth * 360
      if (h < 0) h = 0
      if (h >= 360) h = 359
      this.$emit('input', h)
    }
  }
}
</script>

<style lang="stylus">
.hk-colorpicker-hue
  position relative
  &-strip
    height 0.4rem
    border-radius 0.1rem
    background-image linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)
    cursor pointer
  &-pointer
    position absolute
    top 50%
    padding 0.3rem
    transform translate(-50%, -50%)
    &-circle
      height 0.6rem
      width 0.6rem
      border-radius 50%
      background-color #fff
      cursor pointer
      box-shadow 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4)
</style>
