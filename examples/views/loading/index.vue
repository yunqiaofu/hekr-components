<template lang="pug">
.hk-loading-demo
  hk-button(@click="showLoading") 显示菊花
  hk-button(@click="showLoading2") 函数调用
  hk-button(@click="showLoading3") 加载文字
  hk-loading(v-model="show" text="自定义文字...")
</template>

<script>
export default {
  name: 'hk-loading-demo',
  data () {
    return {
      show: false
    }
  },
  methods: {
    showLoading () {
      this.show = true
      setTimeout(() => {
        this.show = false
      }, 5000)
    },
    showLoading2 () {
      this.$loading(true)
      setTimeout(() => {
        this.$loading(false)
      }, 5000)
    },
    showLoading3 () {
      this.$loading('加载中...')
      setTimeout(() => {
        this.$loading(false)
      }, 5000)
    }
  }
}
</script>
