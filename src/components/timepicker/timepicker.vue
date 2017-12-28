<template lang="pug">
  .hk-timepicker
    .hk-timepicker-title(
      v-if="needTitle"
    ) {{title}}
    .hk-timepicker-box
      hk-time-item.hk-timepicker-box-item(
        :style="setWidth"
        v-if="type.indexOf('hh')!==-1",
        :listData="hour",
        :type="'cycle'",
        v-model="h",
        @onChange="change"
      )
        span.hk-timepicker-unit(
          slot="unit"
        ) {{lang.timepicker.hour}}
      hk-time-item.hk-timepicker-box-item(
        v-if="type.indexOf('mm')!==-1",
        :style="setWidth"
        :listData="min",
        :type="'cycle'",
        v-model="m",
        @onChange="change"
      )
        span.hk-timepicker-unit(
          slot="unit"
        ) {{lang.timepicker.min}}
      hk-time-item.hk-timepicker-box-item(
        v-if="type.indexOf('ss')!==-1",
        :style="setWidth"
        :listData="min",
        :type="'cycle'",
        v-model="s",
        @onChange="change"
      )
        span.hk-timepicker-unit(
          slot="unit"
        ) {{lang.timepicker.sec}}
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
        default () {
          console.log(this.lang.timepicker.title)
          return this.lang.timepicker.title
        }
      },
      needTitle: {
        type: Boolean,
        default: true
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
      setWidth () {
        let count = 0
        if (this.type.indexOf('h') !== 0) {
          count++
        }
        if (this.type.indexOf('m') !== 0) {
          count++
        }
        if (this.type.indexOf('s') !== 0) {
          count++
        }
        return {
          width: count ? 100 / count + '%' : '100%'
        }
      },
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
      background-color #fff
      height 8rem
      &-item
        float left
    &-timepicker-title
      height 2rem
      line-height 2rem
      font-size 0.9rem
      margin-left 1rem
      color #383838
      text-align left
    &-timepicker-unit
      margin-left 2.5rem
</style>


