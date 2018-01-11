<template lang="pug">
.hk-button-demo
  .hk-button-demo-title 基本样式
  hk-button(@click="clickButton") 打开pop
  hk-pop(v-model="show")
    div(style="height: 160px") asdasdasdas

  hk-button(@click="clickButton2") 打开列表
  hk-pop(v-model="show2")
    hk-select(
      v-model="value",
      :items="items",
      multiple,
      @change="change"
    )
</template>

<script>
export default {
  name: 'hk-button-demo',
  data () {
    return {
      show: false,
      show2: false,
      value: [],
      items: [
        {
          name: '制冷模式'
        },
        {
          name: '制热模式'
        },
        {
          name: '送风模式',
          checkProps: {
            disabled: true
          }
        }
      ]
    }
  },
  methods: {
    clickButton () {
      this.show = !this.show
    },
    clickButton2 () {
      this.show2 = !this.show2
    },
    change () {
      this.show2 = false
      console.log(arguments)
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
