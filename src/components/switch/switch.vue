<template lang="pug">
.hk-switch(
  :class="getClass"
)
  .hk-switch-container(
    :style="getStyle",
    @click="toggle"
  )
    .hk-switch-container-toggle
  .hk-switch-text(v-if="text") {{ text }}
</template>

<script>
export default {
  name: 'hk-switch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    onColor: {
      type: String,
      default: '#3AA4F7'
    },
    offColor: {
      type: String,
      default: '#C0BFBF'
    },
    text: {
      type: String,
      default: ''
    }
  },
  computed: {
    getClass () {
      return {
        'hk-switch-on': this.value,
        'hk-switch-disabled': this.disabled
      }
    },
    getStyle () {
      if (this.disabled) {
        return
      }
      if (this.value) {
        return {
          'background-color': this.onColor,
          'border-color': this.onColor
        }
      } else {
        return {
          'background-color': this.offColor,
          'border-color': this.offColor
        }
      }
    }
  },
  methods: {
    toggle () {
      if (!this.disabled) {
        this.$emit('input', !this.value)
      }
    }
  }
}
</script>

<style lang="stylus">
.hk-switch
  display inline-block
  text-align center
  &-container
    border 0.05rem solid #c0bfbf
    background-color #c0bfbf
    width 2rem
    height 1.2rem
    border-radius 1rem
    cursor pointer
    &-toggle
      background-color #fff
      width 1rem
      height 1rem
      margin 0.05rem
      border-radius 50%
      transition transform 0.2s ease-in-out

  &-text
    margin-top 0.15rem
    font-size 0.75rem
    color #666

  &-on &-container
      background-color #3aa4f7
      border-color #3aa4f7
      &-toggle
        transform translateX(0.8rem)
        background-color #fff

  &-disabled &-container
    background-color #ccc
    border 0.05rem solid #ccc
    cursor not-allowed
    &-toggle
      background-color #b2b2b2

</style>
