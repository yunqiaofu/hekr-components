<template lang="pug">
.hk-dashboard-demo
  .hk-icon-demo-title(
    :style="{ margin: '20px' }"
  ) dashboard 组件
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
      div.hk-dashboard-tempValue {{temp}}
      div(
      ) 状态一
      div 状态二
</template>

<script>
export default {
  name: 'hk-swtich-demo',
  data () {
    return {
      temp: 30,
      disabled: false,
      onColor: 'red',
      offColor: 'orange',
      active: true,
      text: '开关',
      min: 16,
      max: 32,
      equalCount: 50,
      step: 1,
      type: 'both'
    }
  },
  methods: {
    handleDashboard (d) {
      console.log('example status', d)
      // this.active = !d
    }
  }
}
</script>

<style lang="stylus">
.hk-dashboard-demo
  margin-top 60px
  text-align center
  .hk-icon
    margin 7px
  .hk-dashboard-tempValue
    font-size 3rem
    text-align center
  &-contenter
    width 200px
    margin 0 auto
    .hk-icon
      margin 7px auto
</style>
