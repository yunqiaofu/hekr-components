<template lang="pug">
  .hk-time-demo
    .hk-time-demo-block(
      @click.stop="show=!show"
    ) 默认样式{{date.h}}:{{date.m}}:{{date.s}}
    hk-pop(
      v-model="show"
    )
      hk-timepicker(
        v-model="date",
        :type="'hh:mm:ss'",
        :title="'倒计时时间'"
      )
    .hk-time-demo-block(
      @click.stop="show2=!show2"
    ) 自定义{{t}}{{h}}时{{m}}分

    hk-pop(
      v-model="show2"
    )
      .hk-time-demo-box
        hk-time-item(
          :listData="time",
          v-model="t"
        )
        hk-time-item(
          v-model="h",
          :listData="hour",
          :type="'cycle'"
        )
          span.hk-time-demo-unit(
          slot="unit"
          ) 时
        hk-time-item(
          :listData="min",
          :type="'cycle'",
          v-model="m"
        )
          span.hk-time-demo-unit(
            slot="unit"
          ) 分

</template>

<script>
  export default {
    name: 'hk-week-demo',
    data () {
      return {
        h: 0,
        m: 0,
        s: 0,
        M: 12,
        d: 2,
        t: '上午',
        show: false,
        show2: false,
        date: {h: 2, m: 3, s: 2},
        time: ['上午', '下午']
      }
    },
    computed: {
      month () {
        let month = []
        for (let i = 1; i <= 12; i++) {
          month.push(i)
        }
        return month
      },
      day () {
        let day = []
        for (let i = 1; i <= 31; i++) {
          day.push(i)
        }
        return day
      },
      hour () {
        let hour = []
        for (let i = 0; i < 12; i++) {
          hour.push(i)
        }
        return hour
      },
      min () {
        let min = []
        for (let i = 0; i < 60; i++) {
          min.push(i)
        }
        return min
      }
    },
    methods: {
    }
  }
</script>

<style lang="stylus">
  .hk-time-demo
    margin-top 60px
    text-align center
    font-size 17px
    height 100vh
    background-color #efefef
    &-block
      margin 20px 0
    &-unit
      margin-left 2.5rem
    &-box
      display flex
</style>


