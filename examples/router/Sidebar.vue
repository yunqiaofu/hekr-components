<template lang="pug">
.sidebar(:class="getClass", v-click-out="hide")
  .sidebar-toggle(@click="toggle")
    i.fa(:class="getIcon",aria-hidden="true")
  ul.sidebar-nav
    router-link.sidebar-nav-item(
      :to='{ name: "button" }',
      tag="li"
    ) Button
    li.sidebar-nav-item asfsd
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
    },
    getIcon () {
      return this.isToggle ? 'fa-times' : 'fa-bars'
    }
  },
  methods: {
    toggle () {
      this.isToggle = !this.isToggle
    },
    hide () {
      this.isToggle = false
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
  z-index 3000
  background-color #fff
  border-right 1px solid #eee
  transform translateX(-100%)
  transition transform 0.3s ease-in-out
  &-active
    transform translateX(0)
  &-toggle
    width 30px
    height 30px
    line-height 29px
    text-align center
    color #fff
    position absolute
    top  20px
    left 100%
    background-color #08f
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
      padding 6px 12px 6px 20px
      border-bottom 1px solid #cccccc
      &:last-child
        border-bottom none
      &-active
        color #333
        background-color #f8f8f8
        border-left 6px solid #08f
        padding-left 14px
        border-radius 4px 0 0 4px
</style>
