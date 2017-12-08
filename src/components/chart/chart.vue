<template lang="pug">
.hk-chart
  canvas(ref="canvas")
</template>

<script>
import Chart from 'chart.js'
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
    }
  },
  computed: {
    config () {
      return {
        type: this.type,
        data: this.data,
        options: this.options
      }
    }
  },
  mounted () {
    this.draw()
  },
  watch: {
    config: {
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
      if (typeof Chart === 'undefined' && typeof window.Chart === 'undefined') {
        throw new Error('Chart is not defined, To install it, you can run: npm install --save chart.js')
      }
      this.ctx = this.$refs.canvas.getContext('2d')
      this.chart = new (Chart || window.Chart)(this.ctx, this.config)
    }
  }
}
</script>

<style lang="stylus">
.hk-chart
  position relative
</style>
