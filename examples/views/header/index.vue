<template lang="pug">
.hk-header-demo
  .hk-header-demo-title 基本样式
  hk-header(
    :title="title",
    left-icon="fa fa-angle-left",
    left-text="返回",
    :right-icon="rightIcon",
    right-text="更多",
  )
  hk-button(@click="clickButton") toggle rightIcon

  .hk-header-demo-title slot
  hk-header(
    :title="title",
    left-text="返回",
    right-icon="fa fa-bars"
  )
    i.fa.fa-bars(
      slot="left-icon",
      aria-hidden="true"
    )
</template>

<script>
export default {
  name: 'hk-header-demo',
  data () {
    return {
      title: '标题',
      rightIcon: 'fa fa-angle-right'
    }
  },
  methods: {
    clickButton () {
      this.rightIcon = this.rightIcon ? '' : 'fa fa-angle-right'
    }
  }
}
</script>

<style lang="stylus">
.hk-header-demo
  margin-top 60px
  text-align center
  &-title
    margin 10px auto
</style>
