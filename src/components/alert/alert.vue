<template lang="pug">
.hk-alert
  .hk-alert-animate(
    :style="setAnimate"
  )
    .hk-alert-container(
      v-for="item,k in myList",
      :key="k"
    )
      slot(
        :item="item"
      )
        .hk-alert-icon
          i(:class="item.icon||'hk-icons-waring'")
        .hk-alert-text {{ item.text }}
</template>

<script>
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
      running: false,
      count: 0
    }
  },
  computed: {
    myList () {
      return this.list.concat(this.list)
    },
    setAnimate () {
      let t = this.list.length
      console.log(t, this.count)
      if (t > 1 && this.count <= t * 2 - 1) {
        return {
          animationDuration: t + 's',
          animationPlayState: this.running ? 'running' : 'paused'
        }
      } else {
        this.count = 0
        return {
          animation: 'none'
        }
      }
    }
  },
  mounted () {
    this.interval = setInterval(() => {
      this.running = !this.running
      this.count++
    }, 1000)
  },
  destoryed () {
    this.interval && clearInterval(this.interval)
  }
}
</script>

<style lang="stylus">
.hk-alert
  padding 0 0.2rem
  height 2rem
  background-color rgba(0, 0, 0, 0.5)
  overflow hidden
  &-animate
    animation: up 2s linear infinite
  @keyframes up
    from 
      transform translateY(0)
    to  
      transform translateY(-50%)  
  &-container
    font-size 0.6rem
    color #fff
    text-align left
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
