<template lang="pug">
  .hk-select-demo
    .hk-icon-demo-title select
    hk-select(
      :title="title",
      :type="type"
      :options="options",
      @change="change"
    )
</template>

<script>
  export default {
    name: 'hk-select-demo',
    data () {
      return {
        type: 'single',
        options: [
          {
            name: '制冷模式',
            checked: true, // 必选
            disabled: false
          },
          {
            name: '制热模式',
            checked: false,
            offIcon: 'hk-icons-circle', // 可选
            disabled: false
          },
          {
            name: '送风模式',
            checked: false,
            onIcon: 'fa fa-gratipay', // 可选
            disabled: false
          }
        ],
        title: '模式设定',
        value: 'code',
        show: false
      }
    },
    methods: {
      change (value) {
        console.log('getvalue', value)
        this.show = false
      }
    }
  }
</script>

<style lang="stylus">
  .hk-select-demo
    text-align center
    font-size 17px
    height 100vh
    &-title
      margin 10px auto
    &-block
      margin 20px 0
</style>
