<template lang="pug">
.hk-list-demo
  hk-list(
    type="text",
    leftIcon="fa fa-home",
    leftText="设备品类",
    rightText="插座",
    border
  )
  hk-list(
    type="text",
    leftIcon="fa fa-edit",
    leftText="新建群控类",
    rightIcon="fa fa-angle-right",
    border
  )
  hk-list(
    type="text",
    leftText="设备名称",
    :rightText="socketName",
    rightIcon="fa fa-angle-right",
    @list-click="changeValue",
    border
  )
  hk-list(
    type="text",
    leftText="妈妈",
    rightText="删除共享",
    textColor="red",
    @right-click="changeValue",
    border
  )
  hk-list(
    type="input",
    leftText="设备名称",
    :rightText="socketName",
    :inputProps="inputProps",
    v-model="inputValue",
    border
  )
  h2 使用slot
  hk-list(
    border
  )
    span(slot="list") 内容内容内容，不分左右 {{ inputValue }}
  hk-list(
    type="text",
    leftIcon="fa fa-home",
    leftText="左侧内容",
    border
  )
    span(slot="right", class="delete") 任意文字
    

</template>

<script>
export default {
  name: 'hekr-list-demo',
  data () {
    return {
      socketNames: ['客厅插座', '卧室插座', '厨房插座', '卫生间插座'],
      index: 0,
      inputProps: {
        type: 'text', // 可选text, number, password
        maxLength: 8
      },
      inputValue: 'test'
    }
  },
  computed: {
    socketName () {
      return this.socketNames[this.index]
    }
  },
  methods: {
    changeValue () {
      if (this.index > 2) {
        this.index = 0
      } else {
        this.index ++
      }
    }
  }
}
</script>
<style lang="stylus">
.hk-list-demo
  margin-top 20%
  .hk-list
    background #fff
    .delete
      color red
</style>

