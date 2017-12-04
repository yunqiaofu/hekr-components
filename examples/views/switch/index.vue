<template lang="pug">
.hk-switch-demo
  .hk-icon-demo-title(
    :style="{ margin: '20px' }"
  ) switch组件
  hk-switch(
    :active="active",
    @click="getSwitch"
  )
  div(
    :style="{ margin: '20px' }"
  ) switch默认样式
  hk-switch(
    :active="active",
    :activeColor="activeColor",
    :offColor="offColor",
    :text="text",
    @click="getSwitch",
  )
  div(
    :style="{ margin: '20px' }"
  ) switch修改背景颜色
  hk-switch(
    :disabled="disabled",
    :active="active",
    :activeColor="activeColor",
  )
  div switch为disabled
</template>

<script>
export default {
  name: 'hk-swtich-demo',
  data () {
    return {
      disabled: true,
      activeColor: 'red',
      offColor: 'orange',
      active: true,
      text: '开关'
    }
  },
  methods: {
    getSwitch (d) {
      console.log('example status', d)
      this.active = !d
    }
  }
}
</script>

<style lang="stylus">
.hk-switch-demo
  margin-top 60px
  text-align center
  .hk-icon
    margin 7px
  &-title
    margin 10px auto
  &-contenter
    width 200px
    margin 0 auto
    .hk-icon
      margin 7px auto
</style>
