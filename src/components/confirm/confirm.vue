<template lang="pug">
.hk-confirm
  hk-dialog(
    :value="value",
    :title="title || $i('confirm.title')",
    :text="text",
    :maskClickDisabled="true",
    :bodyTextAlign="bodyTextAlign",
    :showCancel="showCancel",
    :cancelText="cancelText",
    :showConfirm="showConfirm",
    :confirmText="confirmText",
    @cancel="cancel",
    @confirm="confirm"
  )
</template>

<script>
export default {
  name: 'hk-confirm',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    text: {
      type: String
    },
    bodyTextAlign: {
      type: String,
      default: 'left'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
      this.$emit('input', false)
    },
    confirm () {
      this.$emit('confirm')
      this.$emit('input', false)
    }
  }
}
</script>
