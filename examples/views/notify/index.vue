<template lang="pug">
.hk-notify-demo
  hk-button(@click="showNotify") 组件调用
  hk-button(@click="showNotify1") 显示提示
  hk-button(@click="showNotify2") 文字对齐
  hk-button(@click="showNotify3") mask
  hk-notify(v-if="show", v-model="show", notify="标签调用")
</template>

<script>
export default {
  name: 'hek-notify-demo',
  data () {
    return {
      show: false
    }
  },
  methods: {
    showNotify () {
      this.show = true
      console.dir(this.$notify)
    },
    showNotify1 () {
      this.$notify('提示，呵呵呵！提示，呵呵呵提示，呵呵呵')
      console.dir(this.$notify)
    },
    showNotify2 () {
      this.$notify({
        notify: '提示，呵呵呵！提示，呵呵呵提示，呵呵呵',
        align: 'center',
        only: true
      })
      console.dir(this.$notify)
      this.$notify('我不会关闭前面的提示')
      console.dir(this.$notify)
    },
    showNotify3 () {
      this.$notify({
        notify: '点我可关闭哟！',
        align: 'center',
        showMask: true,
        delay: 5000
      })
      console.dir(this.$notify)
    }
  }
}
</script>

<style lang="stylus">
.hk-notify-demo
  text-align center
</style>

