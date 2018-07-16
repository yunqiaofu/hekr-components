<template lang="pug">
.hk-vback-demo
  hk-button(@click="showDialog") 同时打开两个对话框
  hk-dialog(
    v-model="visible1",
    v-back="back1",
    title="提示",
    text="滤芯寿命即将耗尽，请及时更换滤芯，这个是函数参数v-back='function'",
    @confirm="confirm"
  )
  hk-dialog(
    v-model="visible2",
    v-back="back2",
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
  computed: {
    back1 () {
      return {
        action: this.visible1 ? 'PUSH' : 'DELETE',
        callback: () => {
          this.visible1 = false
        }
      }
    },
    back2 () {
      return {
        action: this.visible2,
        callback: () => {
          this.visible2 = false
        }
      }
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
        if (this.$back.length) {
          this.closeDialog()
        }
      }, 3000)
    },
    showConfirm () {
      this.$confirm({
        text: '我是测试v-back的, 实际使用中这里已经集成了v-back，不用再写了，直接调用就好了, 要关闭我直接传递参数vback:false就行了'
      }).finally(() => {
        setTimeout(() => {
          console.log('删除key后', this.$back.length)
        })
      })
      console.log(this.$back.length)
    },
    confirm (value) {
      console.log(this.$back.length)
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
