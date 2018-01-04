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
    leftIcon="fa fa-home",
    leftText="温度",
    :rightText="index",
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
    @click="changeValue",
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
  hk-list(
    type="switch",
    leftText="设备开关",
    v-model="switchValue",
    :switchProps="props",
    border
  )
  hk-list(
    type="check",
    leftText="选择",
    v-model="checkValue",
    :checkProps="props",
    border
  )
  h2 使用slot
  hk-list(
    border,
    @click="changeInput"
  )
    span(slot="list") 点击这里会改变输入框type不分左右 {{ inputValue }}
  hk-list(
    type="text",
    leftIcon="fa fa-home",
    leftText="左侧内容",
    border
  )
    span(slot="right", class="delete") 任意文字

  .demo-button
    hk-button(@click="toggleDisabled") 切换Disabled
    hk-button(@click="toggleSwitch") 切换Switch


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
        maxLength: 8,
        disabled: false
      },
      inputValue: 'test',
      switchValue: true,
      checkValue: false,
      props: {
        disabled: false
      }
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
    },
    changeInput () {
      this.inputProps.type = this.inputProps.type === 'text' ? 'password' : 'text'
    },
    toggleDisabled () {
      this.props.disabled = !this.props.disabled
      this.inputProps.disabled = !this.inputProps.disabled
    },
    toggleSwitch () {
      this.switchValue = !this.switchValue
      this.checkValue = !this.checkValue
    }
  }
}
</script>
<style lang="stylus">
.hk-list-demo
  .hk-list
    background #fff
    .delete
      color red
  .demo-button
    width 100%
    text-align center
    margin-top 20px
    .hk-button
      margin 10px
</style>

