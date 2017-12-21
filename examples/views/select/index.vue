<template lang="pug">
  .hk-select-demo
    .hk-icon-demo-title 单选
    hk-select(
      v-model="value1",
      :title="title",
      :items="items",
      @change="change"
    )
    .hk-icon-demo-title 多选并且没有标题
    hk-button(@click="changeDisabled") 改变disabled
    hk-select(
      v-model="value2",
      :items="items",
      multiple,
      :disabled="disabled",
      @change="change"
    )
</template>

<script>
  export default {
    name: 'hk-select-demo',
    data () {
      return {
        value1: [1],
        value2: [0, 2],
        disabled: false,
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
        ],
        title: '模式设定'
      }
    },
    methods: {
      change (value) {
        console.log('getvalue', value)
      },
      changeDisabled () {
        this.disabled = !this.disabled
      }
    }
  }
</script>

<style lang="stylus">
  .hk-select-demo
    text-align center
    font-size 17px
    height 100%
    &-title
      margin 10px auto
    &-block
      margin 20px 0
</style>
