<template lang="pug">
.hk-slider(:class="getClass")
  //- header
  .hk-slider-header
    .hk-slider-header-title {{ title }}
    .hk-slider-header-value {{ fiexd(value) }}{{ unit }}

  //- 滑动条
  .hk-slider-bar(
    ref="bar",
    @click="select"
  )
    .hk-slider-bar-strip(:style="getStripStyle")
    .hk-slider-bar-circles(v-if="circle")
      .hk-slider-bar-circles-item(
        v-for="(item, index) in getCircles"
        :key="index"
        :style="getCircleStyle(index)"
      )
        slot(
          name="circle"
          :index="index"
          :item="item"
        )
          .hk-slider-bar-circles-item-ball(:class="getBallClass(index)")
    .hk-slider-bar-handle(
      :style="getHandleStyle",
      @touchstart.prevent="dragstart",
      @touchmove.prevent="dragging",
      @touchend.prevent="dragend",
      @mousedown.stop="dragstart"
    )
      slot(name="handle")
        .hk-slider-bar-handle-circle
          .hk-slider-bar-handle-circle-loading(v-if="loading")
  //- footer
  .hk-slider-footer
    .hk-slider-footer-min {{ minText || `${min}${unit}` }}
    .hk-slider-footer-max {{ maxText || `${max}${unit}` }}
</template>

<script>
export default {
  name: 'hk-slider',
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    },
    minText: {
      type: String,
      default: ''
    },
    maxText: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    unit: {
      type: String,
      default: ''
    },
    circle: {
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
    getClass () {
      return {
        'hk-slider-disabled': this.disabled
      }
    },
    getRatio () {
      // 按步长求值
      let ratio = (this.value - this.min) / (this.max - this.min)
      if (!this.is) {
        const value = Math.round(this.value / this.step) * this.step
        ratio = (value - this.min) / (this.max - this.min)
      }
      if (ratio < 0) {
        ratio = 0
      }
      if (ratio > 1) {
        ratio = 1
      }
      return ratio
    },
    getStripStyle () {
      return {
        width: `${this.getRatio * 100}%`
      }
    },
    getHandleStyle () {
      return {
        left: `${this.getRatio * 100}%`
      }
    },
    getCircles () {
      return Math.floor((this.max - this.min) / this.step) + 1
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
    getCircleStyle (index) {
      return {
        left: `${index / (this.getCircles - 1) * 100}%`
      }
    },
    getBallClass (index) {
      const isActive = this.value - this.min >= index * this.step
      return {
        'hk-slider-bar-circles-item-ball-active': isActive
      }
    },
    select (e) {
      if (this.disabled) return
      this.$emit('select', this.update(e, true))
    },
    dragstart (e) {
      if (this.disabled) return
      this.is = true
      this.$emit('dragstart', this.update(e, false))
    },
    dragging (e) {
      if (this.disabled) return
      if (this.is) {
        this.$emit('dragging', this.update(e, false))
      }
    },
    dragend (e) {
      if (this.is && !this.disabled) {
        this.$emit('dragend', this.update(e, true))
      }
      this.is = false
    },
    update (e, dragend) {
      const x = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : e.clientX
      const { left } = this.$refs.bar.getBoundingClientRect()
      let value = (x - left) / this.$refs.bar.clientWidth * (this.max - this.min) + this.min
      // 按步长求值
      if (dragend) value = this.fiexd(value)
      if (value < this.min) value = this.min
      if (value > this.max) value = this.max
      this.$emit('input', value)
      return value
    },
    fiexd (value) {
      value = Math.round(value / this.step) * this.step
      const step = this.step.toString().split('.')
      if (step[1]) {
        value = Number(value.toFixed(step[1].length))
      }
      return value
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"
$height = 0.2rem
$handle-size = 1.6rem
.hk-slider
  &&-disabled
    .hk-slider-bar
      cursor not-allowed
      &-strip
        background-color lighten($color-primary, 50%)
      &-handle-circle
        background-color lighten($color-primary, 50%)
        cursor not-allowed

  &-header
    margin-bottom 1.5rem
    &:before
    &:after
      content ""
      display table
      clear both
      float none
    &-title
      float left
      width 50%
      text-align left
    &-value
      float right
      width 50%
      text-align right

  &-bar
    position relative
    height $height
    background-color darken($color-white, 15%)
    border-radius ($height / 2)
    &-strip
      height $height
      background-color $color-primary
      border-radius ($height / 2)
    &-handle
      width $handle-size
      height $handle-size
      position absolute
      top 50%
      transform translate3d(-50%, -50%, 0)
      z-index 10
      &-circle
        width $handle-size * 0.5
        height $handle-size * 0.5
        background-color $color-primary
        border-radius 50%
        position absolute
        top 0.4rem
        left 0.4rem
        cursor pointer
        &-loading
          width $handle-size * (10 / 32)
          height $handle-size * (10 / 32)
          margin 0.15rem
          background-image url("./loading.gif")
          background-size cover
          background-position center
          background-repeat no-repeat
    &-circles
      &-item
        position absolute
        top 50%
        transform translate(-50%, -50%)
        &-ball
          width 0.8rem
          height 0.8rem
          background-color darken($color-white, 18%)
          border-radius 50%
          cursor pointer
          &-active
            background-color $color-primary

  &-footer
    margin-top 0.25rem
    &:before
    &:after
      content ""
      display table
      clear both
      float none
    &-min
      float left
      width 50%
      text-align left
    &-max
      float right
      width 50%
      text-align right

</style>

