<template lang="pug">
.hk-chart-demo
  h3 曲线图

  hk-chart(
    :config="charts[0].config",
    :labels="charts[0].labels",
    :data="charts[0].data",
    :options="charts[0].options",
    :gradients="charts[0].gradients"
  )

  hk-button(@click="handleClick") update

  h3 折线图

  hk-chart(
    :type="charts[1].type",
    :config="charts[1].config",
    :labels="charts[1].labels",
    :data="charts[1].data",
    :options="charts[1].options",
    :gradients="charts[1].gradients"
  )
</template>

<script>
export default {
  name: 'hk-chart-demo',

  data () {
    return {
      charts: [
        {
          type: 'line',
          config: {
            datasets: [{
              lineTension: 0,
              pointBackgroundColor: 'rgb(0, 150, 251)', // 点的背景颜色
              borderColor: 'rgb(0, 150, 251)', // 线的颜色
              pointStyle: 'circle',  // 点的形状，默认圆形，可选
              borderWidth: 1, // 边线宽度，默认3
              hitRadius: 10 // 可点击范围，默认1
            }]
          },

          labels: ['日', '一', '二', '三', '四', '五', '六'],

          data: [
            [100, 210, 380, 400, 280, 150, 90]
          ],

          options: {
            scales: {
              xAxes: [{
                gridLines: {
                  display: false
                }
              }],
              yAxes: [{
                gridLines: {
                  display: false,
                  drawBorder: false,
                  zeroLineColor: 'rgba(255, 255, 255, 0)'
                },
                ticks: {
                  beginAtZero: true,
                  suggestedMax: 500,
                  stepSize: 100
                }
              }]
            },
            legend: {
              display: false
            }
          },

          gradients: [
            ['rgba(158, 251, 211, 0.6)', 'rgba(158, 251, 211, 0)']
          ]
        },
        {
          type: 'bar',

          config: {
            datasets: [{
              pointBackgroundColor: 'rgb(237, 109, 0)',
              borderColor: 'rgb(237, 109, 0)',
              hoverBackgroundColor: '#90e0f9'
            }]
          },

          labels: ['日', '一', '二', '三', '四', '五', '六'],

          data: [
            [100, 210, 380, 400, 280, 150, 90]
          ],

          options: {
            responsive: true,
            legend: {
              display: false
            },
            elements: {
              rectangle: {
                backgroundColor: '#06a4f0'
              }
            },
            scales: {
              xAxes: [{
                display: true,
                gridLines: {
                  display: false
                }
              }],
              yAxes: [{
                display: false,
                gridLines: {
                  display: false
                }
              }]
            },
            tooltips: {
              titleFontSize: 12,
              bodyFontSize: 12,
              mode: 'index',
              callbacks: {
                title: function (tooltipItems, data) {
                  console.log(tooltipItems)
                  return tooltipItems[0].index + 1 + '号'
                }
              }
            },
            layout: {
              padding: 10
            }
          },

          gradients: [
            ['rgba(237, 109, 0, 0.5)', 'rgba(237, 109, 0, 0.2)']
          ]
        }
      ]
    }
  },
  methods: {
    handleClick () {
      this.charts[1].data.splice(0, 1, [400, 310, 280, 300, 280, 350, 490])
    }
  }
}
</script>

<style lang="stylus">
.hk-chart-demo
  width 100%
  margin-top 20%
</style>
