<template lang="pug">
.hk-confirm-demo
  hk-button(@click="show1") 简单调用
  hk-button(@click="show2") 对象参数并自己关闭
  hk-button(@click="show3") 组件调用
  hk-confirm(
    v-model="val",
    title="温馨提示",
    text="滤芯寿命即将耗尽，请及时更换滤芯",
    bodyTextAlign="center",
    cancelText="自定义取消"
  )
</template>

<script>
export default {
  name: 'hk-confirm-demo',
  data () {
    return {
      val: false
    }
  },
  methods: {
    show1 () {
      this.$confirm('确认提示内容')
        .then(() => {
          console.log('您点击了确定')
        }).catch(() => {
          console.log('您点击了取消')
        })
    },
    show2 () {
      const a = this.$confirm({
        title: '温馨提示',
        text: '滤芯寿命即将耗尽，请及时更换滤芯',
        showCancel: false,
        bodyTextAlign: 'center'
      })
      console.log(a)
      setTimeout(() => {
        a.close()
      }, 2000)
    },
    show3 () {
      this.val = true
    }
  }
}
</script>

<style lang="stylus">
.hk-confirm-demo
  text-align center
</style>
