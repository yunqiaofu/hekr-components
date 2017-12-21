<template lang="pug">
.hk-switch-demo
  .hk-switch-demo-title(
    :style="{ margin: '20px' }"
  ) switch组件
  hk-switch(
    v-model="active"
  )
  div(
    :style="{ margin: '20px' }"
  ) switch默认样式
  hk-switch(
    v-model="active",
    :onColor="onColor",
    :offColor="offColor",
    :text="text"
  )
  div(
    :style="{ margin: '20px' }"
  ) switch修改背景颜色
  hk-switch(
    v-model="active",
    :disabled="disabled",
    :onColor="onColor",
  )
  div switch为disabled
</template>

<script>
export default {
  name: 'hk-swtich-demo',
  data () {
    return {
      disabled: true,
      onColor: 'red',
      offColor: 'orange',
      active: true,
      text: '开关'
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
