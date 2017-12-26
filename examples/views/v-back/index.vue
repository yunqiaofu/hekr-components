<template lang="pug">
.hk-vback-demo
  hk-button(@click="showDialog") 同时打开两个对话框
  hk-dialog(
    v-model="visible1",
    v-back="closeMySelf",
    title="提示",
    text="滤芯寿命即将耗尽，请及时更换滤芯，这个是函数参数v-back='function'",
    @confirm="confirm"
  )
  hk-dialog(
    v-model="visible2",
    v-back="visible2",
    title="上面一个",
    @confirm="confirm"
  )
  hk-button(@click="showConfirm") 打开confirm
</template>

<script>
export default {
  name: 'hk-vback-demo',
  data () {
    return {
      visible1: false,
      visible2: false
    }
  },
  methods: {
    showDialog () {
      this.visible1 = true
      console.log(this.$back)
      this.visible2 = true
      this.closeDialog()
    },
    closeDialog () {
      setTimeout(() => {
        this.$back.pop()
        console.log(this.$back.length)
        console.log([...this.$back])
        if (this.$back.length) {
          this.closeDialog()
        }
      }, 3000)
    },
    closeMySelf () {
      this.visible1 = false
    },
    showConfirm () {
      const d = this.$confirm({
        text: '我是测试v-back的, 实际使用中这里已经集成了v-back，不用再写了，直接调用就好了, 要关闭我直接传递参数vback:false就行了'
      })
      console.dir(this.$back)
      const key = this.$back.push(() => d.close())
      d.finally(() => {
        console.log('删除key前', [...this.$back])
        this.$back.delete(key)
        console.log('删除key后', [...this.$back])
      })
      console.log([...this.$back])
    },
    confirm (value) {
      console.log([...this.$back])
      console.log(value)
    }
  }
}
</script>

<style lang="stylus">
.hk-vback-demo
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
