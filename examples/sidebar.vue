<template lang="pug">
.sidebar(:class="getClass")
  .sidebar-toggle(@click="toggle")
  ul.sidebar-nav
    router-link.sidebar-nav-item(
      :to='{ name: "hellword" }',
      tag="li"
    ) 概览
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      isToggle: false
    }
  },
  computed: {
    getClass () {
      return this.isToggle && 'sidebar-active'
    }
  },
  methods: {
    toggle () {
      this.isToggle = !this.isToggle
    }
  }
}
</script>

<style lang="stylus">
.sidebar
  width 256px
  position fixed
  top 0
  bottom 0
  left 0
  background-color #fff
  border-right 1px solid #eee
  transform translateX(-100%)
  transition transform 0.3s ease-in-out
  &-active
    transform translateX(0)
  &-toggle
    width 30px
    height 30px
    position absolute
    top 0
    left 100%
    background-color #ccc
    border 1px solid #eee
    border-radius 50%
    box-shadow 0 0 15px #fff inset
  &-nav
    margin 0
    padding 0
    list-style none
    position absolute
    top 0
    right 0
    bottom 0
    left 0
    overflow auto
    &-item
      height 42px
      line-height 42px
      transtion all .3s ease
      &-active
        color #108ee9
        background-color #ecf6fd
        border-right 3px solid #108ee9
</style>
