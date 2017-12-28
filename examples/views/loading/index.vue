<template lang="pug">
.hk-loading-demo
  hk-button(@click="showLoading") 显示菊花
  hk-button(@click="showLoading2") 函数调用
  hk-loading(v-model="show")
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
    }
  }
}
</script>
