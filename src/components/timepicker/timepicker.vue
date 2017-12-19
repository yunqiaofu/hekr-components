<template lang="pug">
  .hk-timepicker
    .hk-timepicker-title(
      v-if="needTitle"
    ) {{title}}
    .hk-timepicker-box
      hk-time-item(
        v-if="type.indexOf('hh')!==-1",
        :listData="hour",
        :type="'cycle'",
        v-model="h",
        @onChange="change"
      )
        span.hk-timepicker-unit(
          slot="unit"
        ) 时
      hk-time-item(
        v-if="type.indexOf('mm')!==-1",
        :listData="min",
        :type="'cycle'",
        v-model="m",
        @onChange="change"
      )
        span.hk-timepicker-unit(
          slot="unit"
        ) 分
      hk-time-item(
        v-if="type.indexOf('ss')!==-1",
        :listData="min",
        :type="'cycle'",
        v-model="s",
        @onChange="change"
      )
        span.hk-timepicker-unit(
          slot="unit"
        ) 秒
</template>

<script>
  export default {
    name: 'hk-timepicker',
    props: {
      type: {
        type: String,
        default: 'hh:mm'
      },
      show: {
        type: Boolean,
        default: false
      },
      value: {
        type: Object,
        default: {
          h: '00',
          m: '00',
          s: '00'
        }
      },
      title: {
        type: String,
        default: '倒计时时间'
      },
      needTitle: {
        type: Boolean,
        default: true
      }
    },
    watch () {
      value (n, o) {
        console.log(n, o)
        this.h = this.format(n.h, 2)
        this.m = this.format(n.m, 2)
        this.s = this.format(n.s, 2)
      }
    },
    data () {
      return {
        h: this.format(this.value.h, 2),
        m: this.format(this.value.m, 2),
        s: this.format(this.value.s, 2)
      }
    },
    computed: {
      hour () {
        let hour = []
        for (let i = 0; i < 24; i++) {
          hour.push(this.format(i, 2))
        }
        return hour
      },
      min () {
        let min = []
        for (let i = 0; i < 60; i++) {
          min.push(this.format(i, 2))
        }
        return min
      }
    },
    methods: {
      format (n, l) {
        if (n) {
          n = n.toString()
          while (n.length < l) {
            n = '0' + n
          }
        }
        return n
      },
      change () {
        let ob = {}
        if (this.type.indexOf('hh') !== -1) {
          ob.h = this.h
        }
        if (this.type.indexOf('mm') !== -1) {
          ob.m = this.m
        }
        if (this.type.indexOf('ss') !== -1) {
          ob.s = this.s
        }
        this.$emit('input', ob)
        this.$emit('onChange', ob)
      }
    }
  }
</script>

<style lang="stylus">
  .hk
    &-timepicker-box
      display flex
      background-color #fff
    &-timepicker-title
      height 2rem
      line-height 2rem
      font-size 0.9rem
      margin-left 1rem
      color #383838
      text-align left
      letter-spacing -0.43px
    &-timepicker-unit
      margin-left 2.5rem
</style>


