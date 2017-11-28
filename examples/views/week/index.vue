<template lang="pug">
  .hk-week-demo
    .hk-week-demo-block 基本用法
    hk-week(
      @weekChange="change1",
      v-model="weeksList1"
    )
    .hk-week-demo-block 自定义头和初始化选中状态
    hk-week(
      @weekChange="change2",
      v-model="weeksList2",
      :header="'星期选择'"
    )
    .hk-week-demo-block 设置不可选日期
    hk-week(
      :disabled="disabled",
      :header="'星期选择'"
    )
</template>

<script>
  export default {
    name: 'hk-week-demo',
    data () {
      return {
        weeksList1: [],
        weeksList2: [0, 2],
        disabled: [1, 3]
      }
    },
    methods: {
      change1 (weeks) {
        console.log(this.weeksList1)
      },
      change2 (weeks) {
        console.log(weeks, this.weeksList2)
      }
    }
  }
</script>

<style lang="stylus">
  .hk-week-demo
    margin-top 60px
    text-align center
    font-size 17px
    &-block
      margin 20px 0
</style>


