<template lang="pug">
.hk-alert 
  i(:class="icon")
  span {{text}}
</template>

<script>
export default {
  name: 'hk-alert',
  props: {
    text: {
      type: String
    },
    icon: {
      type: String,
      default: 'hk-icons-waring'
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"
.hk-alert
  width 100%
  padding-left 1rem
  height 2rem
  background rgba(0,0,0,0.50)
  font-size 0.6rem
  color #ffffff
  line-height 2rem
  text-align left
  vertical-align middle
  white-space nowrap
  overflow hidden
  text-overflow ellipsis
  i 
    display inline-block
    vertical-align middle
    font-size: 1rem
    color #fff
    margin-right 0.4rem
  span
    display inline-block
    vertical-align middle  
    white-space nowrap
</style>