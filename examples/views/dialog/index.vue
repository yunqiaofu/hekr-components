<template lang="pug">
.hk-dialog-demo
  .hk-dialog-demo-title 基本用法
  hk-button(@click="showDialog") 打开窗口
  hk-dialog(
    v-model="visible",
    :title="title",
    :show-mask="mask",
    text="您确定要滤芯复位吗？滤芯复位后滤芯数据将被清零"
  )
  hk-button(@click="showInputDialog") 类型为输入框且背景不可关闭
  hk-dialog(
    v-model="visibleInput",
    type="input",
    title="修改设备名称",
    :show-mask="mask",
    :mask-click-disabled="true",
    :input-props="inputProps",
    @confirm="confirm"
  )
  hk-button(@click="showCoustomDialog") 自定义按钮文字
  hk-dialog(
    v-model="visibleCoustom",
    :title="title",
    :show-mask="false",
    text="滤芯寿命即将耗尽，请及时更换滤芯",
    body-text-align="right",
    :show-cancel="false",
    confirm-text="我知道了",
    @confirm="confirm"
  )
  hk-button(@click="showFooterDialog") slot footer
  hk-dialog(
    v-model="visibleFooter",
    :title="title",
    :show-mask="true",
    text="滤芯寿命即将耗尽，请及时更换滤芯",
  )
    hk-button(slot="footer", @click="closeVvisibleFooter") 自定义按钮
</template>

<script>
export default {
  name: 'hk-dialog-demo',
  data () {
    return {
      visible: false,
      title: '温馨提示',
      mask: true,
      count: 0,
      bodyProps: {
        style: 'text-align: center'
      },
      visibleInput: false,
      inputProps: {
        maxlength: 12,
        placeholder: '请输入设备名称'
      },
      visibleCoustom: false,
      visibleFooter: false
    }
  },
  methods: {
    showDialog () {
      this.visible = !this.visible
      this.title = '温馨提示' + this.count++
    },
    showInputDialog () {
      this.visibleInput = !this.visibleInput
    },
    showCoustomDialog () {
      this.visibleCoustom = true
    },
    showFooterDialog () {
      this.visibleFooter = true
    },
    closeVvisibleFooter () {
      this.visibleFooter = false
    },
    confirm (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="stylus">
.hk-dialog-demo
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
