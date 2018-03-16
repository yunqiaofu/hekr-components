<template lang="pug">
.hk-chart
  canvas(ref="canvas")
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
.hk-chart
  position relative
</style>
