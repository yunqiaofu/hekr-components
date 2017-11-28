<template lang="pug">
.hk-header-demo
  .hk-header-demo-title 基本样式
  hk-header(
    :title="title",
    left-icon="fa fa-angle-left",
    :left-text="leftText",
    :right-icon="rightIcon",
    right-text="更多",
    @click-left="clickLeft",
    @click-right="clickRight"
  )
  hk-button(@click="toggleLeftText") toggle leftText
  hk-button(@click="toggleRightIcon") toggle rightIcon

  .hk-header-demo-title slot
  hk-header(
    :title="title",
    left-text="返回",
    right-icon="fa fa-bars"
  )
    i.fa.fa-angle-left(
      slot="left-icon",
      aria-hidden="true"
    )
    span(slot="right-text") 右边

  .hk-header-demo-title slot与props混合传入
  hk-header(
    :title="title",
    left-text="返回",
    right-icon="fa fa-bars",
    right-text="更多"
  )
    i.fa.fa-angle-left(
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
      leftText: '',
      rightIcon: 'fa fa-angle-right'
    }
  },
  methods: {
    toggleLeftText () {
      this.leftText = this.leftText ? '' : '返回'
    },
    toggleRightIcon () {
      this.rightIcon = this.rightIcon ? '' : 'fa fa-angle-right'
    },
    clickLeft () {
      console.log('点击了左边')
    },
    clickRight () {
      console.log('点击了右边')
    }
  }
}
</script>

<style lang="stylus">
.hk-header-demo
  margin-top 3rem
  text-align center
  &-title
    margin 0.5rem auto
  .hk-button
    margin 1.5rem auto
</style>
