<template lang="pug">
.hk-check(
  :class="getClass",
  @click="click"
)
  .hk-check-icon(:style="getStyle")
    i(:class="getIcon")
  .hk-check-text(v-if="text") {{ this.text }}
</template>
<script>
export default {
  name: 'hk-check',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    onIcon: {
      type: String,
      default: 'hk-icons-check-checked'
    },
    offIcon: {
      type: String,
      default: 'hk-icons-circle'
    },
    text: {
      type: String,
      default: ''
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
      default: '#666'
    }
  },
  computed: {
    getClass () {
      return {
        'hk-check-disabled': this.disabled
      }
    },
    getStyle () {
      if (this.value) {
        return {
          color: this.onColor
        }
      } else {
        return {
          color: this.offColor
        }
      }
    },
    getIcon () {
      return this.value ? this.onIcon : this.offIcon
    }
  },
  methods: {
    click () {
      if (!this.disabled) {
        this.$emit('input', !this.value)
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"
.hk-check
  display inline-block
  &-icon
    font-size $font-size-2
    cursor pointer
  &-text
    font-size $font-size-3
  &-disabled &-icon
    opacity 0.6
    cursor not-allowed
</style>
