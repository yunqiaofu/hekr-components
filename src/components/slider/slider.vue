<template lang="pug">
.hk-slider(:class="getClass")
  //- header
  .hk-slider-header
    .hk-slider-header-title {{ title }}
    .hk-slider-header-value {{ `${value}${unit}` }}

  //- 滑动条
  .hk-slider-bar(
    ref="bar",
    @click="select"
  )
    .hk-slider-bar-strip(:style="getStripStyle")
    .hk-slider-bar-handle(
      :style="getHandleStyle",
      @touchstart.prevent="dragstart",
      @touchmove.prevent="dragging",
      @touchend.prevent="dragend",
      @mousedown.stop="dragstart"
    )
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
    }
  },
  data () {
    return {
      ox: 0,
      oValue: this.value,
      isDraging: false
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
      const value = Math.round(this.value / this.step) * this.step
      let ratio = (value - this.min) / (this.max - this.min)
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
    getX (e) {
      if (e.type.indexOf('mouse') !== -1) {
        return e.clientX
      } else {
        return e.touches[0].clientX
      }
    },
    select (e) {
      if (this.disabled) {
        return
      }
      const { x } = this.$refs.bar.getBoundingClientRect()
      let value = (e.pageX - x) / this.$refs.bar.clientWidth * (this.max - this.min)
      // 按步长求值
      value = Math.round(value / this.step) * this.step
      if (value < this.min) {
        value = this.min
      }
      if (value > this.max) {
        value = this.max
      }
      this.$emit('input', value)
      this.$emit('select', value)
    },
    dragstart (e) {
      if (this.disabled) {
        return
      }
      this.isDraging = true
      this.ox = this.getX(e)
      this.oValue = this.value
      this.$emit('dragstart', this.value)
    },
    dragging (e) {
      if (this.disabled || !this.isDraging) {
        return
      }
      const x = this.getX(e) - this.ox
      // 计算当前值
      let value = x / this.$refs.bar.clientWidth * (this.max - this.min) + this.oValue
      // 按步长求值
      value = Math.round(value / this.step) * this.step
      if (value < this.min) {
        value = this.min
      }
      if (value > this.max) {
        value = this.max
      }
      this.$emit('input', value)
      this.$emit('dragging', value)
    },
    dragend () {
      if (this.disabled || !this.isDraging) {
        return
      }
      this.isDraging = false
      // 计算当前值
      this.oValue = this.value
      this.$emit('input', this.value)
      this.$emit('dragend', this.value)
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
      background-color $color-primary
      height $height
      border-radius ($height / 2)
    &-handle
      width $handle-size
      height $handle-size
      position absolute
      margin-left -($handle-size / 2)
      top -0.7rem
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

