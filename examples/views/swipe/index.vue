<template lang="pug">
.hk-swipe-demo
  hk-swipe
    hk-swipe-item(
      v-for="i in 3",
      :key="i"
    )
      hk-dashboard(
        v-model="temp",
        :disabled="disabled",
        :max="max",
        :min="min",
        :equalCount="equalCount",
        :step="step",
        :type="type",
        @change="handleDashboard"
      )
        span.title(
          slot="inner"
        )
          div 设定温度
          div.hk-swipe-tempValue {{temp}}
          div(
          ) 状态一
          div 状态二
</template>

<script>
export default {
  name: 'hk-swipe-demo',
  data () {
    return {
      temp: 30,
      disabled: false,
      onColor: 'red',
      offColor: 'orange',
      active: true,
      text: '开关',
      min: 16,
      max: 100,
      equalCount: 50,
      step: 1,
      type: 'both'
    }
  },
  methods: {
    handleDashboard (val) {
      console.log('value status', val)
    }
  }
}
</script>

<style lang="stylus">
.hk-swipe-demo
  margin-top 60px
  text-align center
  .hk-icon
    margin 7px
  .hk-swipe-tempValue
    font-size 3rem
    text-align center
  &-contenter
    width 200px
    margin 0 auto
    .hk-icon
      margin 7px auto
</style>
