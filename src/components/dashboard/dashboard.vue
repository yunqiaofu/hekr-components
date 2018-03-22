<template lang="pug">
.hk-dashboard-wrap
  .hk-dashboard(ref="dashboard")
    .hk-dashboard-cover(
      :style="{ width: width / 30 + 'rem', height: height / 30 + 'rem'}"
    )
    .hk-dashboard-inner
      slot(
        name="inner"
      )
        .hk-dashboard-text {{title}}
        .hk-dashboard-value(
          :style="valueStyle"
        )
          span {{ value }}
          span.hk-dashboard-unit {{ unit }}

    svg.hk-dashboard-svg(
      ref="svg",
      :width="width/20 + 'rem'",
      :height="height/20 + 'rem'",
      :viewBox="`0,0,${width},${height}`",
      @touchstart.prevent="handleTouchChange",
      @touchmove.prevent="handleTouchChange",
      @touchend.prevent="handleTouchEnd",
      @mousedown.stop = "handleTouchChange"
      @mouseup.stop = "handleTouchEnd"
    )
      path(
        v-for="path in pathEls",
        :d="path.d",
        :class="path.class",
        :style="path.style"
      )
    .hk-dashboard-btn(
      v-if="type !== 'touch' && type !== 'none'",
      :style="{color: disabled ? '#a4a4a4' : '#000'}"
    )
      .hk-dashboard-reduce(
        ref="reduce"
        @touchstart.prevent="onButton"
        @touchend.prevent= "offButton"
        @mousedown.stop = "onButton"
        @mouseup.stop = "offButton"
      )
        i.hk-icons-reduce
      .hk-dashboard-increase(
        ref="increase"
        @touchstart.prevent="onButton"
        @touchend.prevent="offButton"
        @mousedown.stop = "onButton"
        @mouseup.stop = "offButton"
      )
        i.hk-icons-increase

  slot
</template>
<script>
const DASHBOARD_CLASS = 'hk-dashboard'
const DASHBOARD_POINT = DASHBOARD_CLASS + '-point'
const DASHBOARD_POINT_ACTIVE = DASHBOARD_POINT + '-active'
var setintv = null
var intervalId = []

function setAttributes (dom, attrs) {
  Object.keys(attrs)
    .forEach(attr => {
      dom.setAttribute(attr, attrs[attr])
    })
}
function createElementNS (type) {
  return document.createElementNS('http://www.w3.org/2000/svg', type)
}
export default {
  name: 'hk-dashboard',
  props: {
    value: {
      type: Number,
      required: true
    },
    // value 的范围
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    type: {
      type: String,
      default: 'none',
      validator (val) {
        return [
          'none',
          'touch',
          'button',
          'both'
        ].indexOf(val) !== -1
      }
    },
    title: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    valueStyle: {
      type: Object
    },
    // svg 的大小
    width: {
      type: Number,
      default: 260
    },
    height: {
      type: Number,
      default: 260
    },
    // 通过外circle的半径 和 内circle的半径设置刻度的长度
    maxR: {
      type: Number,
      default: 125
    },
    minR: {
      type: Number,
      default: 100
    },
    // 刻度的数量
    equalCount: {
      type: Number,
      default: 50
    },
    step: {
      type: Number,
      default: 1
    },
    beginColor: {
      type: String,
      default: 'rgba(37, 101, 225, 1)'
    },
    endColor: {
      type: String,
      default: 'rgba(65, 185, 242, 1)'
    },
    defaultColor: {
      type: String,
      default: 'rgba(135, 135, 135, 1)'
    },
    disabled: Boolean
  },
  data () {
    return {
      onClicking: false,
      changeValue: Number((this.value - this.min) / (this.max - this.min).toFixed(2)),
      centerX: null,
      centerY: null
    }
  },
  watch: {
    value (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.changeValue = Number((newValue - this.min) / (this.max - this.min).toFixed(2))
      }
    }
  },
  computed: {
    pathEls () {
      const pathEls = []
      const pathCircleMaxEl = this.getCirclePath('max', this.maxR)
      const pathCircleMinEl = this.getCirclePath('min', this.minR)

      const circumferenceMax = this.getCircleCircumference(this.maxR)
      const circumferenceMin = this.getCircleCircumference(this.minR)

      const stepMax = circumferenceMax / this.equalCount
      const stepMin = circumferenceMin / this.equalCount
      const select = Math.floor(this.changeValue * this.equalCount)
      for (let count = 0; count < this.equalCount + 1; count++) {
        const offsetMax = stepMax * count
        const { x: maxX, y: maxY } = pathCircleMaxEl.getPointAtLength(offsetMax)

        const offsetMin = stepMin * count
        const { x: minX, y: minY } = pathCircleMinEl.getPointAtLength(offsetMin)

        let pointClasses = [DASHBOARD_POINT]

        if (count === select && this.type !== 'button' && this.type !== 'none') {
          pointClasses.push(DASHBOARD_POINT_ACTIVE)
        }

        let deBeginColor = this.endColor
        let deEndColor = this.beginColor
        // 16进制转 RGB
        if (deEndColor.indexOf('rgb') === -1) {
          deEndColor = this.hexToRgb(deEndColor)
        }
        if (deBeginColor.indexOf('rgb') === -1) {
          deBeginColor = this.hexToRgb(deBeginColor)
        }

        const percent = count / this.equalCount
        const weightPercent = 1 - percent
        const beginColor = (deBeginColor.split('(')[1]).split(',')
        const endColor = (deEndColor.split('(')[1]).split(',')
        let begredCol = beginColor[0]
        let beggreCol = beginColor[1]
        let begblueCol = parseInt(beginColor[2])
        let begOpaCol = beginColor[3] && parseInt(beginColor[3])
        let endredCol = endColor[0]
        let endgreCol = endColor[1]
        let endblueCol = parseInt(endColor[2])
        let endOpaCol = endColor[3] && parseInt(endColor[3])
        let opacity = begOpaCol || endOpaCol || 1
        const red = Math.round(begredCol * percent + endredCol * weightPercent)
        const green = Math.round(beggreCol * percent + endgreCol * weightPercent)
        const blue = Math.round(begblueCol * percent + endblueCol * weightPercent)
        let strokeStl = ''
        if (count <= select) {
          strokeStl = `stroke: rgba(${red},${green},${blue},${opacity})`
        } else {
          strokeStl = `stroke: ${this.defaultColor}`
        }
        if (this.disabled) {
          strokeStl = 'stroke: #a4a4a4'
        }
        pathEls.push({
          d: `M ${minX} ${minY} L ${maxX} ${maxY}`,
          class: pointClasses,
          style: strokeStl // count <= select && (this.disabled ? 'stroke: #363636' : `stroke: rgb(${red},${green},${blue})`)
        })
      }
      return pathEls
    }
  },
  methods: {
    hexToRgb (hex) {
      var rgb = []
      hex = hex.substr(1) // 去除前缀 # 号
      if (hex.length === 3) { // 处理 "#abc" 成 "#aabbcc"
        hex = hex.replace(/(.)/g, '$1$1')
      }
      hex.replace(/../g, function (color) {
        rgb.push(parseInt(color, 0x10)) // 按16进制将字符串转换为数字
      })
      return 'rgb(' + rgb.join(',') + ')'
    },
    handleTouchChange (e) {
      if (this.type === 'button' || this.type === 'none') {
        return
      }
      if (!this.disabled) {
        this.handleChange((e.touches && e.touches[0]) || {clientX: e.clientX, clientY: e.clientY})
      }
    },
    handleChange ({ clientX, clientY }) {
      const offsetX = clientX - this.centerX
      const offsetY = this.centerY - clientY

      const offsetAngle = this.conRadiansToAngle(Math.atan(Math.abs(offsetY / offsetX)))

      let angle = 0

      if (offsetX >= 0 && offsetY >= 0) {
        angle = 225 - offsetAngle
      } else if (offsetX >= 0 && offsetY < 0) {
        angle = 225 + (offsetAngle > 45 ? 45 : offsetAngle)
      } else if (offsetX <= 0 && offsetY <= 0) {
        angle = offsetAngle > 45 ? 0 : 45 - offsetAngle
      } else {
        angle = 45 + offsetAngle
      }
      const value = Math.round(angle) / 270
      this.move(value)
    },
    handleTouchEnd () {
      if (this.type === 'button') {
        return
      }
      if (!this.disabled) {
        this.$emit('change', this.value)
      }
    },
    move (value) {
      this.$emit('input', Math.round(value * (this.max - this.min)) + this.min)
      this.changeValue = Number(value.toFixed(2))
    },
    conRadiansToAngle (radians) {
      return 180 / Math.PI * radians
    },
    getCirclePath (type) {
      const { maxR, minR } = this
      const r = type === 'max' ? maxR : minR
      const pathCircleEl = createElementNS('path')
      const { startX, startY, endX, endY } = this.getCirclePoints(type)
      const d = `M ${startX} ${startY} A ${r} ${r} 0 1 1 ${endX} ${endY}`
      setAttributes(pathCircleEl, {
        d
      })
      return pathCircleEl
    },
    getCircleCircumference (r) {
      return 2 * Math.PI * r * 3 / 4
    },
    getCirclePoints (type) {
      const { height, width, maxR, minR } = this
      const cx = width / 2
      const cy = height / 2
      const deviation = type === 'max' ? maxR / Math.sqrt(2) : minR / Math.sqrt(2)
      return {
        startX: cx - deviation,
        startY: cy + deviation,
        endX: cx + deviation,
        endY: cy + deviation
      }
    },
    reduce () {
      if (this.value <= this.min) {
        return
      }
      var value = parseInt(this.value) - this.step
      this.$emit('input', value)
    },
    increase () {
      if (this.value >= this.max) {
        return
      }
      var value = parseInt(this.value) + this.step
      this.$emit('input', value)
    },
    onButton (e) {
      if (this.disabled) {
        return
      }
      // var self = this
      if (e.target === this.$refs.reduce) {
        this.onClicking = true
        this.reduce()
        setTimeout(() => {
          if (this.onClicking) {
            setintv = setInterval(() => {
              this.reduce()
            }, 50)
            intervalId.push(setintv)
          }
        }, 500)
      }
      if (e.target === this.$refs.increase) {
        this.onClicking = true
        this.increase()
        setTimeout(() => {
          if (this.onClicking) {
            setintv = setInterval(() => {
              this.increase()
            }, 50)
            intervalId.push(setintv)
          }
        }, 500)
      }
    },
    offButton (e) {
      for (var i = 0; i < intervalId.length; i++) {
        clearInterval(intervalId[i])
      }
      this.$emit('change', this.value)
      intervalId = []
      this.onClicking = false
    }
  },

  mounted () {
    this.svgEl = this.$refs.svg
    const { left, top, width, height } = this.svgEl.getBoundingClientRect()
    this.centerX = left + width / 2
    this.centerY = top + height / 2
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"

.hk-dashboard-wrap
  position relative
  width 100%
  .hk-dashboard
    width 100%
    display flex
    flex-direction column
    justify-content center
    align-items center

    &-cover
      border 0.05rem solid rgba(0, 0, 0, 0)
      border-radius 50%
      z-index 99
      position absolute
    &-inner
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)

    &-value
      font-size 3rem
      color #f2c649
      font-family Helvetica Neue
      font-weight 300
      // -webkit-background-clip text
      // background-clip text
      // -webkit-text-fill-color transparent
      // background-image linear-gradient(330deg, #1b49db, #41b9f2), linear-gradient(#f8f5f8, #f8f5f8)
    &-unit
      font-size 0.7rem
    &-text
      font-size 0.9rem
      text-align center

    &-circle
      fill none
      stroke-width 0
      transition all .2s cubic-bezier(0.23, 1, 0.32, 1) 0ms
      transform-origin 50% 50%

    &-point
      stroke-width 2
      stroke rgb(135, 135, 135)
      transition all .2s cubic-bezier(0.23, 1, 0.32, 1) 0ms
      transform-origin 50% 50%
      stroke-dasharray 25
      stroke-dashoffset 37.5

      &-active
        stroke #2565e1
        stroke-dasharray 50
        stroke-dashoffset 0
        stroke-linecap round
        stroke-width 4

    &-svg
      &&-move
        .hk-dashboard-point
          stroke rgb(131, 114, 60)
          &-active
            stroke-dashoffset 0
    &-btn
      width 100%
      text-align center
      margin-top -2rem
    &-reduce, &-increase
      display inline-block
      width 30%
      height 2rem
      // font-size 1.6rem
      line-height 2rem
      text-align center
      i
        font-size 1.6rem
        font-weight normal

</style>
