<template lang="pug">
.hk-bar-demo(:class="{'dark': modalTheme === 'dark'}")
  .demo-button
    hk-button(@click="toggleBg") 切换背景
    hk-button(@click="toggleNum") 切换数量
    hk-button(@click="toggleColor") 切换颜色
  hk-bar(:items="getItems", :theme="modalTheme", :activeColor="activeColor", @change="func")
</template>

<script>
export default {
  name: 'hekr-bar-demo',
  data () {
    return {
      items: [
        {
          icon: 'fa fa-power-off',
          label: '开关',
          name: 'home',
          active: true,
          disabled: false,
          fontColor: 'red',
          activeColor: 'yellow'
        },
        {
          icon: 'fa fa-calendar',
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
          icon: 'fa fa-bar-chart',
          label: '图表',
          name: 'chart',
          active: false,
          disabled: true
        }
      ],
      modalTheme: 'light',
      activeColor: '',
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
        case 'chart':
          console.log('chart')
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
    },
    toggleColor () {
      if (this.activeColor === '') {
        this.activeColor = 'red'
      } else {
        this.activeColor = ''
      }
    }
  }
}
</script>
<style lang="stylus">
.hk-bar-demo
  position relative
  height 100%
  display flex
  justify-content center
  align-items center
  background #f5f5f5
  .hk-button
    margin 10px
  &.dark
    background #666666
</style>

