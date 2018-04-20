<template lang="pug">
.hk-chart
  canvas(ref="canvas")
  .hk-chart-loading(v-if="loading")
    .hk-chart-loading-spinner
      .hk-chart-loading-spinner-dot
        .hk-chart-loading-spinner-dot-1
        .hk-chart-loading-spinner-dot-2
        .hk-chart-loading-spinner-dot-3
        .hk-chart-loading-spinner-dot-4
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
const types = ['line', 'bar', 'radar', 'polarArea', 'pie', 'doughnut', 'bubble']
export default {
  name: 'hk-chart',
  props: {
    type: {
      type: String,
      default: 'line',
      validator (value) {
        return types.indexOf(value) !== -1
      }
    },
    data: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    },
    gradients: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    this.draw()
  },
  watch: {
    type () {
      this.chart.destroy()
      this.draw()
    },
    data: {
      deep: true,
      handler () {
        this.chart.destroy()
        this.draw()
      }
    },
    options: {
      deep: true,
      handler () {
        this.chart.destroy()
        this.draw()
      }
    },
    gradients: {
      deep: true,
      handler () {
        this.chart.destroy()
        this.draw()
      }
    }
  },

  methods: {
    draw () {
      // 为了兼容浏览器引用的时候能够在NPM中打包chart.js
      if (typeof window.Chart === 'undefined') {
        throw new Error('window.Chart is not defined, To install it, you can run: npm install --save chart.js')
      }
      this.ctx = this.$refs.canvas.getContext('2d')
      const config = cloneDeep({
        type: this.type,
        data: this.data,
        options: this.options
      })
      if (this.gradients.length) {
        const $gradients = this.ctx.createLinearGradient(0, 0, 0, this.ctx.canvas.height)
        config.data.datasets = config.data.datasets.map((item, index) => {
          const colors = this.gradients
          colors.forEach((it, i) => {
            if (typeof it === 'string') {
              it = {
                pos: i / colors.length,
                color: it
              }
            }
            $gradients.addColorStop(it.pos, it.color)
          })
          return {
            ...item,
            backgroundColor: $gradients
          }
        })
      }
      this.chart = new window.Chart(this.ctx, config)
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"

$spinner-size=1rem

.hk-chart
  position relative
  &-loading
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    background-color rgba(255,255,255,0.88)
    z-index $zindex-lower
    &-spinner
      width $spinner-size
      height $spinner-size
      position absolute
      top 50%
      left 50%
      transform translate3d(-50%, -50%, 0)
      &-dot
        width $spinner-size
        height $spinner-size
        position relative
        animation hk-chart-spinner 1.1s infinite linear
        &-1,
        &-2,
        &-3,
        &-4
          width 0.3rem
          height 0.3rem
          border-radius 50%
          position absolute
          background-color #06f
        &-1
          top 0.05rem
          left 0.05rem
        &-2
          top 0.05rem
          right 0.05rem
          opacity 0.8
        &-3
          bottom 0.05rem
          right 0.05rem
          opacity 0.6
        &-4
          left 0.05rem
          bottom 0.05rem
          opacity 0.4

@keyframes hk-chart-spinner
  0%
  	transform translate3d(-50%, -50%, 0) rotate(0deg)
  100%
  	transform translate3d(-50%, -50%, 0) rotate(360deg)
</style>
