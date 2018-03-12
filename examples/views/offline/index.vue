<template lang="pug">
.hk-offline-demo
  hk-button(@click="showOffline1") 显示离线1
  hk-button(@click="showOffline2") 显示离线2并点击中心图标文字关闭
  hk-button(@click="showOffline3") 显示离线3自定义文字图标
  hk-button(@click="showOffline4") 显示离线4自定义文字
  hk-button(@click="showOffline5") 组件方式调用
  hk-offline(v-model="show", :closeabled="true")
</template>

<script>
export default {
  name: 'hek-offline-demo',
  data () {
    return {
      show: false
    }
  },
  methods: {
    showOffline1 () {
      this.$offline()
      setTimeout(() => {
        this.$offline.close()
      }, 3000)
      console.dir(this.$offline)
    },
    showOffline2 () {
      this.$offline({ closeabled: true })
    },
    showOffline3 () {
      this.$offline({
        icon: 'hk-icons-waring',
        text: Math.random()
      })
    },
    showOffline4 () {
      this.$offline('sdasdasdasdas')
    },
    showOffline5 () {
      this.show = true
    }
  }
}
</script>

<style lang="stylus">
.hk-offline-demo
  text-align center
</style>

