<template lang="pug">
  .hk-alert-demo
    hk-alert.hk-alert-demo-alert(
      :text="'室内温度传感器故障'"
    )

    hk-alert.hk-alert-demo-alert(
      :text="'室内温度传感器故障室内温度传感器故障室内温度传感器故障室内温度传感器故障室内温度传感器故障室内温度传感器故障'",
      :icon="'hk-icons-check-checked'"
    )
</template>

<script>
  export default {
    name: 'hk-alert-demo',
    data () {
      return {
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
