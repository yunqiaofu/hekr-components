<template lang="pug">
  .hk-alert-demo
    hk-alert.hk-alert-demo-alert(
      :list="list"
    )
</template>

<script>
  export default {
    name: 'hk-alert-demo',
    data () {
      return {
        list: [
          {
            text: '室内温度传感器故障',
            icon: 'hk-icons-check-checked'
          },
          {
            text: '室度传感器故障',
            icon: 'hk-icons-check-checked'
          },
          {
            text: '警告室度传感器故障警告室度传感器故障警告室度传感器故障'
          },
          {
            text: '警告2'
          }
        ]
      }
    },
    methods: {
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
