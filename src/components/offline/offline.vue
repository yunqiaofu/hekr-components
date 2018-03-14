<template lang="pug">
.hk-offline(v-if="value")
  .hk-offline-container(@click="click")
    slot
      .hk-offline-container-icon
        i(:class="getIcon")
      .hk-offline-container-text {{ getText }}
</template>

<script>
export default {
  name: 'hk-offline',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    },
    text: {
      type: String
    },
    closeabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getIcon () {
      return this.icon || 'hk-icons-offline'
    },
    getText () {
      return this.text || this.$i('offline.text')
    }
  },
  methods: {
    click () {
      if (this.closeabled) {
        this.$emit('input')
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"

.hk-offline
  position absolute
  // header组件的高度
  top 2.25rem
  right 0
  bottom 0
  left 0
  background-color rgba(0,0,0,0.8)
  z-index $zindex-base
  &-container
    max-width 80%
    max-height 60%
    position absolute
    top 42%
    left 50%
    transform translate(-50%, -50%)
    padding 0.5rem
    text-align center
    color #fff
    overflow hidden
    cursor pointer
    &-icon
      padding 0.5rem
      font-size 3rem
    &-text
      width 100%
</style>

