<template lang="pug">
div
  hk-time-item(
  :listData="hour",
  :type="'cycle'",
  v-model="h",
  @onChange="change"
  )
    span.hk-time-picker-unit(
      slot="unit"
    ) 时
  //- hk-time-item(
  //-   :listData="min",
  //-   :type="'cycle'",
  //-   v-model="m",
  //-   @onChange="change"
  //- )
  //-   span.hk-time-picker-unit(
  //-   slot="unit"
  //-   ) 分

</template>

<script>
  export default {
    name: 'hk-time-picker',
    props: {
      type: {
        type: String,
        default: 'default'
      },
      show: {
        type: Boolean,
        default: false
      },
      value: {
        type: Object,
        default: {
          h: '00',
          m: '00'
        }
      }
    },
    data () {
      return {
        h: this.value.h,
        m: this.value.m,
        s: 0
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
        n = n.toString()
        while (n.length < l) {
          n = '0' + n
        }
        return n
      },
      change () {
        this.$emit('input', {h: this.h, m: this.m})
        this.$emit('onChange', {h: this.h, m: this.m})
      }
    }
  }
</script>

<style lang="stylus">
  .hk
    &-time-picker-unit
      margin-left 2.5rem
</style>


