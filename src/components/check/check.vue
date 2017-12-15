<template lang="pug">
.hk-check(
  @click="select"
)
  hk-icon(
    :name = "getIcon",
    :text = "text",
    :active = "value",
    :disabled = "disabled",
    :activeColor = "onColor",
    :fontColor = "offColor",
    block
  )
</template>
<script>
  export default {
    name: 'hk-check',
    props: {
      value: {
        type: Boolean,
        default: false
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
      },
      onIcon: {
        type: String,
        default: 'hk-icons-check-checked'
      },
      offIcon: {
        type: String,
        default: 'hk-icons-circle'
      }
    },
    computed: {
      getIcon () {
        return this.value ? this.onIcon : this.offIcon
      }
    },
    methods: {
      select () {
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
</style>
