<template lang="pug">
canvas.hk-chart
</template>

<script>
import Chart from 'chart.js'

const types = ['line', 'bar', 'radar', 'polarArea', 'pie', 'doughnut', 'bubble']

export default {
  name: 'hk-chart',

  data () {
    return {
      chart: null,
      width: 200,
      height: 200
    }
  },

  props: {
    type: {
      type: String,
      validator (value) {
        return ~types.indexOf(value)
      },
      default: 'line'
    },

    labels: {
      type: Array,
      default: () => []
    },

    data: {
      type: Array,
      default: () => []
    },

    config: {
      type: Object,
      required: true,
      default: () => ({})
    },

    options: {
      type: Object,
      default: () => ({})
    },

    gradients: Array
  },

  watch: {
    data: {
      handler () {
        this.reset()
      },
      deep: true
    },

    type () {
      this.reset()
    },

    options: {
      handler () {
        this.reset()
      },
      deep: true
    }
  },

  methods: {
    create () {
      const canvas = this.$el.getContext('2d')

      if (this.gradients) {
        this.gradients.forEach((colors, index) => {
          const gradient = canvas.createLinearGradient(
            this.width / 2,
            0,
            this.width / 2,
            this.height
          )

          colors.forEach((color, index) => {
            gradient.addColorStop(index, color)
          })

          this.config.datasets[index].backgroundColor = gradient
        })
      }

      const config = { ...this.config }

      config.datasets = config.datasets
        .map((dataset, index) => {
          dataset.data = this.data[index]

          return dataset
        })

      config.labels = this.labels

      return new Chart(canvas, {
        type: this.type,
        data: config,
        options: this.options
      })
    },

    reset () {
      // this.chart.clear()
      // this.chart.destroy()
      this.chart = this.create()
    }
  },

  mounted () {
    this.chart = this.create()
  }
}
</script>

<style lang="stylus">
canvas.hk-chart
  width 100%
  max-width 600px
</style>
