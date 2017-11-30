<template lang="pug">
  .hk-week-demo
    hk-time-box
      hk-time-item
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


