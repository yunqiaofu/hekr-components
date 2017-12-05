<template lang="pug">
  .hk-select-demo
    hk-button(
      @click="show=true"
    ) 点击弹出
    .hk-select-demo-block 你选择了{{value}}
    hk-pop(
      v-model="show",
      :maskClickDisabled="true"
    )
      hk-select(
        :title="title",
        :options="options",
        v-model="value",
        @change="change"
      )
</template>

<script>
  export default {
    name: 'hk-select-demo',
    data () {
      return {
        options: [
          {
            name: '制冷模式',
            value: 'code',
            disabled: true
          },
          {
            name: '制热模式',
            value: 'hot'
          },
          {
            name: '送风模式',
            value: 'winds'
          }
        ],
        title: '模式设定',
        value: 'code',
        show: false
      }
    },
    methods: {
      change (value) {
        this.show = false
      }
    }
  }
</script>

<style lang="stylus">
  .hk-select-demo
    margin-top 60px
    text-align center
    font-size 17px
    height 100vh
    background-color #efefef
    &-block
      margin 20px 0
</style>
