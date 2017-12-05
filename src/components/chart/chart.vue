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
      this.ctx = this.$refs.canvas.getContext('2d')
      this.chart = new Chart(this.ctx, this.config)
    }
  },

  mounted () {
    this.draw()
  }
}
</script>

<style lang="stylus">
.hk-chart
  position relative
</style>
