<template lang="pug">
.hk-dashboard
  .dashboard(ref="dashboard")
    .dashboard-cover(
      :style="{ width: width / 30 + 'rem', height: height / 30 + 'rem'}"
    )
    .dashboard-inner
      slot(
        name="inner"
      )
        .dashboard-text 设定温度
        .dashboard-value {{ value }}℃
    svg.dashboard-svg(
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
    .dashboard-btn(
      v-if="type !== 'touch' && type !== 'none'"
    )
      .dashboard-reduce(
        ref="reduce"
        @touchstart.prevent="onButton"
        @touchend.prevent= "offButton"
        @mousedown.stop = "onButton"
        @mouseup.stop = "offButton"
      ) -
      .dashboard-increase(
        ref="increase"
        @touchstart.prevent="onButton"
        @touchend.prevent="offButton"
        @mousedown.stop = "onButton"
        @mouseup.stop = "offButton"
      ) +

  slot
</template>
<script>
// import classnames from 'classnames'
const DASHBOARD_CLASS = 'dashboard'
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
      default: 'rgb(37, 101, 225)'
    },
    endColor: {
      type: String,
      default: 'rgb(65, 185, 242)'
    },
    defaultColor: {
      type: String,
      default: 'rgb(135, 135, 135'
    },
    type: {
      type: String,
      default: 'both'
    }, // touch button none
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
        // classnames(DASHBOARD_POINT, {
        //   [DASHBOARD_POINT_ACTIVE]: count === select
        // })
        if (count === select && this.type !== 'button' && this.type !== 'none') {
          pointClasses.push(DASHBOARD_POINT_ACTIVE)
        }

        const percent = count / this.equalCount
        const weightPercent = 1 - percent
        // rgb(195, 74, 113) rgb(65, 185, 242)
        // const red = Math.round(37 * percent + 65 * weightPercent)
        // const green = Math.round(101 * percent + 185 * weightPercent)
        // const blue = Math.round(225 * percent + 242 * weightPercent)
        const beginColor = (this.beginColor.split('(')[1]).split(',')
        const endColor = (this.endColor.split('(')[1]).split(',')
        let begredCol = beginColor[0]
        let beggreCol = beginColor[1]
        let begblueCol = parseInt(beginColor[2].split(')')[0])
        let endredCol = endColor[0]
        let endgreCol = endColor[1]
        let endblueCol = parseInt(endColor[2].split(')')[0])

        const red = Math.round(begredCol * percent + endredCol * weightPercent)
        const green = Math.round(beggreCol * percent + endgreCol * weightPercent)
        const blue = Math.round(begblueCol * percent + endblueCol * weightPercent)
        let strokeStl = ''
        if (count <= select) {
          if (this.disabled) {
            strokeStl = 'stroke: #363636'
            return
          }
          strokeStl = `stroke: rgb(${red},${green},${blue})`
        } else {
          strokeStl = `stroke: ${this.defaultColor}`
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
.hk-dashboard
  position relative
  width 100%
  .dashboard
    width 100%
    display flex
    flex-direction column
    justify-content center
    align-items center

    &-cover
      border 1px solid rgba(0, 0, 0, 0)
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
      -webkit-background-clip text
      background-clip text
      -webkit-text-fill-color transparent
      background-image linear-gradient(330deg, #1b49db, #41b9f2), linear-gradient(#f8f5f8, #f8f5f8)

    &-text
      font-size 0.9rem
      text-align center

    &-circle
      fill none
      stroke-width 0
      transition all .2s cubic-bezier(0.23, 1, 0.32, 1) 0ms
      transform-origin 50% 50%

    &-point
      stroke-width 3
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
        .dashboard-point
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
      font-size 1.2rem
      line-height 2rem
      text-align center

</style>
