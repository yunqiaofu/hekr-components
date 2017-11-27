<template lang="pug">
  .hk-week
    .hk-week-header
    .hk-week-body
      .hk-week-body-item(
        v-for="i in 6",
        :key="i"
      ) {{i}}


</template>

<script>
  export default {
    name: 'hk-week',
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
  .hk-week
    background-color $color-white
    width 100%
    &-header
      height 25px
      border-bottom solid 1px #DEDEDE
    &-body
      height 55px
</style>
