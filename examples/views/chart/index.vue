<template lang="pug">
.hk-chart-demo
  h3 曲线图

  hk-chart(
    :type="charts1.type"
    :data="charts1.data",
    :options="charts1.options",
    :gradients="gradients"
  )

  hk-button(@click="handleClick") update

  h3 曲线图渐变数组

  hk-chart(
    type="line",
    :data="charts2.data",
    :options="charts2.options",
    :gradients="gradients2"
  )
  h3 直方图

  hk-chart(
    :type="charts2.type",
    :data="charts2.data",
    :options="charts2.options"
  )
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
const randomScalingFactor = () => {
  return Math.round(Math.random() * 1000)
}
export default {
  name: 'hk-chart-demo',
  data () {
    return {
      charts1: {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'My First dataset',
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }, {
            label: 'My Second dataset',
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }]
        },
        options: {
          responsive: true,
          legend: {
            // display: false
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
                drawBorder: false
              }
            }],
            yAxes: [{
              gridLines: {
                display: false,
                drawBorder: false
              },
              position: 'right'
            }]
          }
        }
      },
      gradients: [
        {
          pos: 1,
          color: 'rgba(0,100,255,0.5)'
        },
        {
          pos: 0.6,
          color: 'rgba(0,100,255,0.4)'
        },
        {
          pos: 0.4,
          color: 'rgba(0,100,255,0.3)'
        },
        {
          pos: 0,
          color: 'rgba(0,100,255,0.1)'
        }
      ],
      charts2: {
        type: 'bar',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Dataset 1',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }, {
            label: 'Dataset 2',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 1,
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ]
          }]
        },
        options: {
          responsive: true,
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart'
          }
        }
      },
      gradients2: ['rgba(255,0,0,0)', 'rgba(255,0,0,0.3)']
    }
  },
  methods: {
    handleClick () {
      const data = cloneDeep(this.charts1.data)
      data.datasets.forEach(dataset => {
        dataset.data = dataset.data.map(() => randomScalingFactor())
      })
      this.charts1.type = Math.random() > 0.5 ? 'bar' : 'line'
      this.charts1.data = data
    }
  }
}
</script>

<style lang="stylus">
.hk-chart-demo
  width 100%
  margin-top 20%
</style>
