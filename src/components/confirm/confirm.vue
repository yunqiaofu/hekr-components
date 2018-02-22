<template lang="pug">
.hk-confirm
  hk-dialog(
    v-model="val",
    v-back="val",
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
  computed: {
    val: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    confirm () {
      this.$emit('confirm')
    }
  }
}
</script>
