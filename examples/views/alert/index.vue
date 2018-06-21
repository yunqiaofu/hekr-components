<template lang="pug">
  .hk-alert-demo
    hk-alert.hk-alert-demo-alert(
      :list="list"
    )

    hk-alert.hk-alert-demo-alert(
      :list="list2"
    )
    hk-button(@click="click") 添加消息
</template>

<script>
  export default {
    name: 'hk-alert-demo',
    data () {
      return {
        list: [
          {
            text: '2室度传感器故障'
          }
        ],
        list2: [
          {
            text: '1室内温度传感器故障',
            icon: 'hk-icons-check-checked'
          },
          {
            text: '2室度传感器故障'
          },
          {
            text: '3室度传感器故障'
          },
          {
            text: '4室度传感器故障'
          },
          {
            text: '5室度传感器故障',
            icon: 'hk-icons-check-checked'
          },
          {
            text: '6室度传感器故障',
            icon: 'hk-icons-check-checked'
          }
        ]
      }
    },
    methods: {
      click () {
        this.list.push({
          text: new Date(),
          icon: 'hk-icons-check-checked'
        })
      }
    }
  }
</script>

<style lang="stylus">
  .hk-alert-demo
    text-align center
    padding-top 50px
    height 100%
    &-alert
      margin-bottom 20px
</style>
