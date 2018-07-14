<template lang="pug">
.hk-time-demo
  hk-button(@click="showPop") 显示POP
  hk-timepicker(
    v-model="time"
  )
  hk-pop(v-model="show")
    hk-timepicker(v-model="time")
</template>

<script>
export default {
  name: 'hk-week-demo',
  data () {
    return {
      show: false,
      time: { hour: 2, minute: 3 }
    }
  },
  methods: {
    showPop () {
      this.show = true
    }
  }
}
</script>

<style lang="stylus">
.hk-time-demo
  margin-top 60px
  text-align center
  font-size 17px
</style>


