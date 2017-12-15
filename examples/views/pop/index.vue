<template lang="pug">
.hk-button-demo
  .hk-button-demo-title 基本样式
  hk-button(@click="clickButton") 默认
  hk-pop(v-model="show")
    div(style="height: 160px") asdasdasdas
</template>

<script>
export default {
  name: 'hk-button-demo',
  data () {
    return {
      show: false
    }
  },
  methods: {
    clickButton () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="stylus">
.hk-button-demo
  text-align center
  .hk-button
    display block
    margin 0.35rem auto
  &-title
    margin 0.5rem auto
  &-contenter
    width 10rem
    margin 0 auto

</style>
