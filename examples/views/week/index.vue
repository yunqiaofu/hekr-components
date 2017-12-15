<template lang="pug">
  .hk-week-demo
    .hk-week-demo-block 基本用法
    hk-week(
      v-model="weeksList1"
    )
    .hk-week-demo-block 自定义头和初始化选中状态
    hk-week(
      v-model="weeksList2",
      :title="'星期选择'"
    )
    .hk-week-demo-block 设置不可选日期
    hk-week(
      v-model="week3",
      :disabled="disabled",
      title="星期选择",
      icon="hk-icons-check-checked"
    )
</template>

<script>
  export default {
    name: 'hk-week-demo',
    data () {
      return {
        weeksList1: [],
        weeksList2: [0, 2],
        disabled: [1, 3],
        week3: [1, 5]
      }
    },
    methods: {
      change1 (weeks) {
        console.log(this.weeksList1 = [2, 5])
      },
      change2 (weeks) {
        console.log(weeks, this.weeksList2)
      }
    }
  }
</script>

<style lang="stylus">
  .hk-week-demo
    text-align center
    font-size 17px
    &-block
      margin 20px 0
</style>


