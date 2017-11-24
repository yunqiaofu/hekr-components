<template lang="pug">
.hk-button-demo
  .hk-button-demo-title 基本样式
  hk-button 默认
  hk-button(type="primary") primary
  hk-button(type="warning") warning
  hk-button(
    type="info",
    :active="active"
    @click="clickButton"
  ) info激活样式
  .hk-button-demo-title 禁用样式
  hk-button(disabled) 默认
  hk-button(
    type="primary",
    disabled
  ) primary
  hk-button(
    type="primary",
    disabled,
    active
  ) primary激活样式切换
  hk-button(
    type="warning",
    disabled
  ) warning
  hk-button(
    type="info",
    disabled
  ) info
  .hk-button-demo-title 块级样式
  .hk-button-demo-contenter
    hk-button(block) 默认
    hk-button(
      type="primary",
      block
    ) primary
    hk-button(
      type="warning",
      block
    ) warning
    hk-button(
      type="info",
      block
    ) info
</template>

<script>
export default {
  name: 'hk-button-demo',
  data () {
    return {
      active: true
    }
  },
  methods: {
    clickButton () {
      this.active = !this.active
    }
  }
}
</script>

<style lang="stylus">
.hk-button-demo
  margin-top 60px
  text-align center
  .hk-button
    margin 7px
  &-title
    margin 10px auto
  &-contenter
    width 200px
    margin 0 auto
    .hk-button
      margin 7px auto
</style>
