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
    disabled,
    loading
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
    hk-button(block, loading) 默认
    hk-button(
      type="primary",
      block,
      loading
    ) primary
    hk-button(
      type="warning",
      block
    ) warning
    hk-button(
      type="info",
      block
    ) info
  .hk-button-demo-title 加载中
  hk-button(loading) 默认
  hk-button(
    type="primary",
    loading
  ) primary
  hk-button(
    type="warning",
    loading
  ) warning
  hk-button(
    type="info",
    loading
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
  margin-top 6rem
  text-align center
  .hk-button
    display block
    margin 0.7rem auto
  &-title
    margin 1rem auto
  &-contenter
    width 20rem
    margin 0 auto

</style>
