<template lang="pug">
.hk-alert
  .hk-alert-container(
    :style="getStyle"
  )
    .hk-alert-container-item(
      v-for="(item, index) in items",
      :key="index"
    )
      slot(:item="item")
        .hk-alert-container-item-icon
          i(:class="item.icon || 'hk-icons-waring'")
        .hk-alert-container-item-text {{ item.text }}
</template>

<script>
import isEqual from 'lodash/isEqual'

export default {
  name: 'hk-alert',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      step: 0,
      timer: null,
      delay: null
    }
  },
  computed: {
    items () {
      if (this.list.length <= 1) return this.list
      return [...this.list, this.list[0]]
    },
    getStyle () {
      if (this.items.length <= 1) return
      const y = this.step / this.items.length * 100
      return {
        transition: this.step === 0 ? 'none' : 'transform 0.3s linear',
        transform: `translateY(${-y}%)`
      }
    }
  },
  mounted () {
    this.play()
  },
  destoryed () {
    clearInterval(this.timer)
    clearTimeout(this.delay)
  },
  watch: {
    list (nVal, oVal) {
      // 内存地址相同时isEqual比较没用
      // 所以地址相同的时候直接就更新
      if (nVal === oVal || !isEqual(nVal, oVal)) {
        this.step = 0
        this.play()
      }
    }
  },
  methods: {
    play () {
      clearInterval(this.timer)
      clearTimeout(this.delay)
      if (this.items.length <= 1) return
      this.timer = setInterval(() => {
        clearTimeout(this.delay)
        if (this.step >= this.items.length - 1) {
          this.step = 0
          this.delay = setTimeout(() => {
            this.step = 1
          }, 300)
        } else {
          this.step++
        }
      }, 3000)
    }
  }
}
</script>

<style lang="stylus">
.hk-alert
  padding 0 0.2rem
  height 2rem
  background-color rgba(0, 0, 0, 0.5)
  overflow hidden
  color #fff
  &-container
    font-size 0.6rem
    text-align left
    &-item
      &-icon
        width 2rem
        height 2rem
        line-height 2rem
        text-align center
        font-size 1rem
      &-text
        height 2rem
        line-height 2rem
        margin-top -2rem
        margin-left 2rem
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
</style>
