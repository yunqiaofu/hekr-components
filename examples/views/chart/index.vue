<template lang="pug">
.hk-chart-demo
  h3 曲线图

  hk-chart(
    :type="charts1.type"
    :data="charts1.data",
    :options="charts1.options"
  )

  hk-button(@click="handleClick") update

  h3 折线图

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
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            data: [
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor(),
              randomScalingFactor()
            ],
            fill: false
          }, {
            label: 'My Second dataset',
            fill: false,
            backgroundColor: 'rgba(255, 99, 255, 0.5)',
            borderColor: 'rgb(255, 99, 255)',
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
          title: {
            display: true,
            text: 'Chart.js Line Chart'
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value'
              }
            }]
          }
        }
      },
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
      }
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
