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
        v-model="min"
        :format="minFormat"
        :unit="$i('timepicker.min')"
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
        return { hour: time.getHours(), min: time.getMinutes() }
      }
    },
    hourFormat: {
      type: Function,
      default: val => val < 10 ? `0${val}` : val
    },
    minFormat: {
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
    min: {
      get () {
        return this.value.min
      },
      set (val) {
        this.input('min', val)
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
    display flex
    flex-direction columns
    &-item
      min-width 50%
      flex 1
</style>


