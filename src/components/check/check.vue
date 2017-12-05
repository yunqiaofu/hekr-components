<template lang="pug">
.hk-check(
  @click="select"
)
  hk-icon(
      :name = "getIcon",
      :text = "text",
      :active = "value",
      :disabled = "disabled",
      :fontColor = "fontColor",
      :activeColor = "activeColor"
    )
</template>
<script>
  export default {
    name: 'hk-check',
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      activeColor: {
        type: String,
        default: '#3AA4F7'
      },
      text: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: 'fa fa-check-circle-o'
      },
      offIcon: {
        type: String,
        default: 'fa fa-circle-o'
      },
      value: {
        type: Boolean,
        default: false
      },
      fontColor: {
        type: String,
        default: '#666'
      }
    },
    computed: {
      getIcon () {
        let icon = 'fa fa-check-circle'
        if (this.value) {
          icon = this.icon
        }
        if (!this.value) {
          icon = this.offIcon
        }
        return icon
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
.hk-check {
  display: inline-block;
  i {
    width: 100%
  }
}
</style>
