<template lang="pug">
  .hk-notify-demo
    hk-order(
      :list="list"
    )
</template>

<script>
  export default {
    name: 'hk-order-demo',
    data () {
      return {
        list: [
          {
            id: 1,
            time: '7:00',
            day: '周一 周二 周三',
            name: '未命名',
            checked: true
          },
          {
            id: 2,
            time: '8:00',
            day: '周一 周二 周三',
            name: '未命名',
            checked: false
          },
          {
            id: 3,
            time: '10:00',
            day: '周二 周三',
            name: '未命名',
            checked: true
          }
        ]
      }
    },
    methods: {
    }
  }
</script>

<style lang="stylus">
  .hk-notify-demo
    text-align center
</style>

