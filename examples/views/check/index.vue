<template lang="pug">
.hk-check-demo
  hk-check(
    :active = "active",
    @click="getRadio",
    :icon="icon",
    :offIcon="offIcon"
  )
  div radio组件
  hk-check(
    :active = "active",
    :text="text",
    :icon="icon",
    :offIcon="offIcon",
    :disabled="disabled"
  )
  div radio组件 disabled
  hk-check(
    :active = "active",
    :text="text",
    @click="getRadio",
    :icon="anoIcon",
    :offIcon="offIcon"
  )
  div radio组件 改变icon
</template>

<script>
export default {
  name: 'hk-swtich-demo',
  data () {
    return {
      disabled: true,
      icon: 'fa fa-check-circle-o',
      offIcon: 'fa fa-circle-o',
      anoIcon: 'fa fa-gratipay',
      active: true,
      text: 'test radio'
    }
  },
  methods: {
    getRadio (d) {
      console.log('radio example status', d)
      this.active = !d
    }
  }
}
</script>

<style lang="stylus">
.hk-check-demo
  margin-top 60px
  text-align center
  &-title
    margin 10px auto
  &-contenter
    width 200px
    margin 0 auto
    .hk-icon
      margin 7px auto
</style>
