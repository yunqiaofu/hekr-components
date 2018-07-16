<template lang="pug">
.hk-timepicker
  .hk-timepicker-container
    .hk-timepicker-container-item
      hk-picker(
        v-model="hour"
        :length="24"
        :format="hourFormat"
        :unit="$i('timepicker.hour')"
      )
    .hk-timepicker-container-item
      hk-picker(
        v-model="minute"
        :format="minuteFormat"
        :unit="$i('timepicker.minute')"
      )
</template>

<script>
export default {
  name: 'hk-timepicker',
  props: {
    value: {
      type: Object,
      default: () => {
        const time = new Date()
        return { hour: time.getHours(), minute: time.getMinutes() }
      }
    },
    hourFormat: {
      type: Function,
      default: val => val < 10 ? `0${val}` : val
    },
    minuteFormat: {
      type: Function,
      default: val => val < 10 ? `0${val}` : val
    }
  },
  computed: {
    hour: {
      get () {
        return this.value.hour
      },
      set (val) {
        this.input('hour', val)
      }
    },
    minute: {
      get () {
        return this.value.minute
      },
      set (val) {
        this.input('minute', val)
      }
    }
  },
  methods: {
    input (key, val) {
      this.$emit('input', {
        ...this.value,
        [key]: val
      })
    }
  }
}
</script>

<style lang="stylus">
.hk-timepicker
  background-color #fff
  padding 0.3rem
  &-container
    &:before,
    &:after
      content ""
      display table
      float none
      clear both
    &-item
      width 50%
      float left
</style>


