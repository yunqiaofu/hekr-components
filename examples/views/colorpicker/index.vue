<template lang="pug">
.hk-colorpicker-demo
  hk-colorpicker(
    v-model="color",
    :disabled="false"
  )
  hk-pop-colorpicker(
    v-model="show",
    :color="color",
    @cancel="cancel",
    @confirm="confirm"
  )
  hk-button(@click="click") 选择颜色
</template>

<script>
export default {
  name: 'hk-colorpicker-demo',
  data () {
    return {
      show: false,
      color: {
        r: 230,
        g: 255,
        b: 12
      }
    }
  },
  methods: {
    click () {
      this.show = true
    },
    cancel (val) {
      this.color = val
    },
    confirm (val) {
      this.color = val
    }
  }
}
</script>

<style lang="stylus">
.hk-colorpicker-demo
  text-align center
</style>
