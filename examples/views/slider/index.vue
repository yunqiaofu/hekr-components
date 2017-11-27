<template lang="pug">
.hk-slider-demo
  .hk-slider-demo-title 基本样式
  hk-slider(
    :title="title",
    left-icon="fa fa-angle-left",
    :left-text="leftText",
    :right-icon="rightIcon",
    right-text="更多",
    @click-left="clickLeft",
    @click-right="clickRight"
  )
</template>

<script>
export default {
  name: 'hk-slider-demo',
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
.hk-slider-demo
  margin-top 60px
  text-align center
  &-title
    margin 10px auto
</style>
