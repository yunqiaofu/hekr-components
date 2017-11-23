<template lang="pug">
button.hk-button(
  :class="getClass",
  :disabled="disabled",
  @touchend.prevent="click($event)",
  @click="click($event)"
)
  slot
</template>

<script>
export default {
  name: 'hk-button',
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    active: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getClass () {
      return {
        'hk-button-disabled': this.disabled,
        'hk-button-active': this.active
      }
    }
  },
  methods: {
    click (e) {
      console.log(e)
      if (!this.disabled) {
        this.$emit('click', e)
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"
.hk-button
  height 40px
  border none
  background-color $color-primary
  color $color-white
  font-size $font-size-3
  border-radius $border-radius
</style>
