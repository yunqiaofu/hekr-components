<template lang="pug">
.hk-modal-demo(:class="{'dark': modalTheme === 'dark'}")
  .demo-button
    hk-button(@click="toggleBg") 切换背景
    hk-button(@click="toggleNum") 切换数量
  hk-modal(:items="getItems", :theme="modalTheme", @change="func")
</template>

<script>
export default {
  name: 'hekr-modal-demo',
  data () {
    return {
      items: [
        {
          icon: 'fa fa-home',
          label: '功能',
          name: 'home',
          active: true,
          disabled: false
        },
        {
          icon: 'fa fa-camera-retro',
          label: '预约',
          name: 'timing',
          active: false,
          disabled: false
        },
        {
          icon: 'fa fa-cog',
          label: '设置',
          name: 'setting',
          active: false,
          disabled: false
        },
        {
          icon: 'fa fa-cog',
          label: '其他',
          name: 'other',
          active: false,
          disabled: true
        }
      ],
      modalTheme: 'light',
      num: 3
    }
  },
  computed: {
    getItems () {
      return this.items.slice(0, this.num)
    }
  },
  methods: {
    func (val) {
      val.active = !val.active
      switch (val.name) {
        case 'home':
          console.log('home')
          break
        case 'timing':
          console.log('timing')
          break
        case 'setting':
          console.log('setting')
          break
      }
    },
    toggleBg () {
      if (this.modalTheme === 'dark') {
        this.modalTheme = 'light'
      } else {
        this.modalTheme = 'dark'
      }
    },
    toggleNum () {
      if (this.num > 3) {
        this.num = 1
      } else {
        this.num ++
      }
    }
  }
}
</script>
<style lang="stylus">
.hk-modal-demo
  width 100vw
  height 100vh
  display flex
  justify-content center
  align-items center
  background #f5f5f5
  .hk-button
    margin 10px
  &.dark
    background #666666
</style>

