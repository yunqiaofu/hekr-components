<template lang="pug">
.hk-colorpicker
  .hk-colorpicker-container
    .hk-colorpicker-container-canvas(
      ref="canvas",
      @touchstart.prevent="dragstart",
      @touchmove.prevent="dragging",
      @touchend.prevent="dragend",
      @mousedown="dragstart"
    )
      .hk-colorpicker-container-canvas-point(:style="getPointStyle")
    .hk-colorpicker-container-disabled(v-if="disabled")
</template>

<script>
import { rgbToHsv, hsvToRgb } from './color'

export default {
  name: 'hk-colorpicker',
  props: {
    value: {
      type: Object,
      default: () => ({ r: 255, g: 255, b: 255 })
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autopick: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      is: false,
      x: 0,
      y: 0,
      timer: null
    }
  },
  computed: {
    rgb () {
      const r = this.value.r >= 0 && this.value.r <= 255 ? this.value.r : 0
      const g = this.value.g >= 0 && this.value.g <= 255 ? this.value.g : 0
      const b = this.value.b >= 0 && this.value.b <= 255 ? this.value.b : 0
      return { r, g, b }
    },
    hsv () {
      return rgbToHsv(this.rgb)
    },
    getPointStyle () {
      return {
        top: `${this.y}px`,
        left: `${this.x}px`
      }
    }
  },
  mounted () {
    document.addEventListener('mousemove', this.dragging)
    document.addEventListener('mouseup', this.dragend)
    this.draw()
  },
  destroyed () {
    document.removeEventListener('mousemove', this.dragging)
    document.removeEventListener('mouseup', this.dragend)
  },
  watch: {
    rgb () {
      this.draw()
    }
  },
  methods: {
    draw () {
      const { width, height } = this.$refs.canvas.getBoundingClientRect()
      const { h, s } = this.hsv
      // 角度
      const rad = h * Math.PI * 2
      // 圆形半径
      const r = (width + height) / 4
      this.x = r + Math.cos(rad) * r * s
      this.y = r - Math.sin(rad) * r * s
    },
    dragstart (e) {
      if (this.disabled) {
        return
      }
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
      let x = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : e.clientX
      let y = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : e.clientY
      const { left, top, width, height } = this.$refs.canvas.getBoundingClientRect()

      // 以圆盘中心为坐标原点
      const r = (width + height) / 4

      x = x - left - width / 2
      y = -(y - top - height / 2)

      // 点在圆外时
      if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) > r) {
        let rad = Math.atan(y / x) // 与x轴夹角弧度值
        if (x < 0) { // 第二、三象限
          rad += Math.PI
        } else if (y < 0 && x > 0) { // 第四象限
          rad += Math.PI * 2
        }
        x = Math.cos(rad) * r
        y = Math.sin(rad) * r
      }

      let { h, s, v } = this.hsv
      const r1 = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
      s = r1 / r
      let rad = Math.acos(x / r1)

      // 角度大于180时处理一下
      if (y < 0) rad = 2 * Math.PI - rad
      h = rad / (Math.PI * 2)

      this.x = r + x
      this.y = r - y

      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('input', hsvToRgb({ h, s, v }))
      }, 100)
    }
  }
}
</script>

<style lang="stylus">
$size = 10rem
$padding = 0.45rem

.hk-colorpicker
  text-align center
  &-container
    width $size + $padding * 2
    height $size + $padding * 2
    padding $padding
    margin 0 auto
    border-radius 50%
    overflow hidden
    position relative
    &-canvas
      background-image url("./color.png")
      background-size cover
      background-position center
      background-repeat no-repeat
      border-radius 50%
      position absolute
      top $padding
      right $padding
      bottom $padding
      left $padding
      &-point
        width 0.7rem
        height 0.7rem
        border-radius 50%
        position absolute
        transform translate3d(-50%, -50%, 0)
        background-color rgba(255,255,255,0.7)
        box-shadow 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4)
        cursor pointer

    &-disabled
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      z-index 10
      background-color rgba(255,255,255,0.7)
      cursor not-allowed
      opacity 0.7

</style>
