<template lang="pug">
  .hk-week-demo
    .hk-week-demo-block 基本样式
    hk-week(
      @weekChange="change"
    )
    .hk-week-demo-block 自定义头和初始化选中状态
    hk-week(
      @weekChange="change",
      :weeksList="weeksList",
      :header="'星期选择'"
    )
</template>

<script>
  export default {
    name: 'hk-week-demo',
    data () {
      return {
        weeksList: [
          {
            name: '周日',
            value: true
          },
          {
            name: '周一',
            value: true
          },
          {
            name: '周二',
            value: false
          },
          {
            name: '周三',
            value: false
          },
          {
            name: '周四',
            value: false
          },
          {
            name: '周五',
            value: false
          },
          {
            name: '周六',
            value: false
          }
        ]
      }
    },
    methods: {
      change (weeks) {
        console.log(weeks)
      }
    }
  }
</script>

<style lang="stylus">
  .hk-week-demo
    margin-top 60px
    text-align center
    &-block
      margin 20px 0
</style>


