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
      canvas(
        ref="ctx",
        :width="width",
        :height="height"
      )
      .hk-colorpicker-container-canvas-point(:style="getPointStyle")
    .hk-colorpicker-container-disabled(v-if="disabled")
    .hk-colorpicker-container-image(ref="image")
</template>

<script>
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
      ctx: null,
      width: 280,
      height: 280,
      pointerTop: 0,
      pointerLeft: 0,
      timer: null,
      delay: 100
    }
  },
  computed: {
    rgb () {
      const r = this.value.r >= 0 && this.value.r <= 255 ? this.value.r : 0
      const g = this.value.g >= 0 && this.value.g <= 255 ? this.value.g : 0
      const b = this.value.b >= 0 && this.value.b <= 255 ? this.value.b : 0
      return { r, g, b }
    },
    getPointStyle () {
      return {
        top: `${this.pointerTop}px`,
        left: `${this.pointerLeft}px`
      }
    }
  },
  mounted () {
    this.ctx = this.$refs.ctx.getContext('2d')
    this.width = this.$refs.canvas.offsetWidth
    this.height = this.$refs.canvas.offsetHeight
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
      this.$nextTick(() => this.setPoint())
    }
  },
  methods: {
    draw () {
      const url = window.getComputedStyle(this.$refs.image).getPropertyValue('background-image')
      const reg = /https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*/i
      this.pointerLeft = this.width / 2
      this.pointerTop = this.height / 2
      if (reg.exec(url)[0]) {
        const $img = new Image()
        $img.addEventListener('load', () => {
          this.ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, this.width, this.height)
          // 异步执行
          setTimeout(() => this.setPoint(), 100)
        })
        $img.src = reg.exec(url)[0]
      }
    },
    setPoint () {
      if (!this.autopick) return
      const { width, height } = this.$refs.canvas.getBoundingClientRect()
      const radius = (width + height) / 4

      // 位置偏差
      const offset = 4
      // 一列一列的遍历匹配颜色
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          const point = {
            x: x - width / 2,
            y: -(y - height / 2)
          }
          if (Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2)) <= radius) {
            const { data } = this.ctx.getImageData(x, y, 1, 1)
            const [r, g, b] = data
            if (r + offset > this.rgb.r &&
              r - offset < this.rgb.r &&
              g + offset > this.rgb.g &&
              g - offset < this.rgb.g &&
              b + offset > this.rgb.b &&
              b - offset < this.rgb.b
              ) {
              this.pointerLeft = x
              this.pointerTop = y
              return
            }
          }
        }
      }
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
      const x = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : e.clientX
      const y = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : e.clientY
      const { left, top, width, height } = this.$refs.canvas.getBoundingClientRect()

      // 以圆盘中心为坐标原点
      const radius = (width + height) / 4
      const point = {
        x: x - left - width / 2,
        y: -(y - top - height / 2)
      }
      if (Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2)) > radius) {
        let rad = Math.atan(point.y / point.x) // 与x轴夹角弧度值
        if (point.x < 0) { // 第二、三象限
          rad += Math.PI
        } else if (point.y < 0 && point.x > 0) { // 第四象限
          rad += Math.PI * 2
        }
        point.x = Math.cos(rad) * radius
        point.y = Math.sin(rad) * radius
      }
      this.pointerTop = -(point.y - radius)
      this.pointerLeft = point.x + radius
      // 节流一下
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        const [r, g, b] = this.ctx.getImageData(this.pointerLeft, this.pointerTop, 1, 1).data
        this.$emit('input', { r, g, b })
      }, this.delay)
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
      width $size
      height $size
      border-radius 50%
      position relative
      &-point
        width 0.7rem
        height 0.7rem
        border-radius 50%
        position absolute
        transform translate3d(-50%, -50%, 0)
        background-color rgba(255,255,255,0.7)
        box-shadow 0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4)
        cursor pointer
    &-image
      background-image url("./color.png")
      visibility hidden
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
