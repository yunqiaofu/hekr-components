<template lang="pug">
.hk-notify-demo
  hk-button(@click="showNotify1") 显示提示
  hk-button(@click="showNotify2") 文字对齐并{{ getText }}
  hk-button(@click="showNotify3") 组件方式调用
  hk-notify(v-model="showComponent", :delay="delay")
    i.hk-icons-check-checked
    span 我初始delay为2s,1s后修改我的delay为5s，所以我会显示5s
</template>

<script>
export default {
  name: 'hek-notify-demo',
  data () {
    return {
      only: true,
      showComponent: false,
      delay: 2000,
      timer: null
    }
  },
  computed: {
    getText () {
      return this.only ? '只能显示一个提示' : '可同时出现两个提示'
    }
  },
  methods: {
    showNotify1 () {
      this.$notify('提示，呵呵呵！提示，呵呵呵提示，呵呵呵' + Math.random())
      console.dir(this.$notify)
    },
    showNotify2 () {
      this.$notify({
        message: '提示，呵呵呵！提示，' + this.getText,
        align: 'center',
        only: this.only
      })
      this.only = !this.only
      console.dir(this.$notify)
      setTimeout(() => {
        this.$notify({
          message: '提示，呵呵呵',
          delay: Math.random() * 1000 + 4000
        })
      }, 2000)
      console.dir(this.$notify)
    },
    showNotify3 () {
      const time = Date.now()
      this.showComponent = true
      // 显示提示后更改时间，只会在原有的基础上进行增减，不会重新计时
      // 例如原来时间是在2s后自动关闭，1s后修改时间为5s，则整个提示会显示5s
      setTimeout(() => {
        console.log('改变delay')
        this.delay = 5000
      }, 1000)
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.showComponent) {
          console.log(Date.now() - time)
        } else {
          clearInterval(this.timer)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="stylus">
.hk-notify-demo
  text-align center
</style>

