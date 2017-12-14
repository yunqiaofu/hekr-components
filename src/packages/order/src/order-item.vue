
<template lang="pug">
  .hk-order-item(
    :class="{'hk-order-item-border': border}",
    @click.stop="isDelete=false"
  )
    i.hk-icons-delete-simple.hk-order-item-left-icon(
      v-show="isEdit",
      :class="{'hk-order-item-left-icon-delete':isDelete}",
      @click.stop="isDelete=true"
    )
    .hk-order-item-left(
      :class="{'hk-order-item-left-edit':isEdit&&!isDelete}",
    )
      .hk-order-item-left-time {{oValue.time}}
      .hk-order-item-left-day {{oValue.day}}
      .hk-order-item-left-day {{oValue.name}}
    .hk-order-item-right(
      :class="{'hk-order-item-right-delete':isDelete}",
      @click="check"
    ) {{oValue.checked?'定时开':'定时关'}}
      i.hk-order-item-right-icon(
        :class="{'hk-order-item-right-icon-disable': !this.oValue.checked,'hk-icons-check-checked': !this.isEdit,'hk-icons-angel-right': this.isEdit}"
      )
    .hk-order-item-delete(
      :class="{'hk-order-item-delete-active':isDelete}",
      @click.stop="remove"
    )
      i.hk-icons-delete-device

</template>

<script>
  export default {
    name: 'hk-order-item',
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      border: {
        type: Boolean,
        default: false
      },
      value: {
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        oValue: this.value || {},
        isDelete: false
      }
    },

    methods: {
      check () {
        if (this.isEdit) {
          return
        }
        this.oValue.checked = !this.oValue.checked
        this.$emit('input', this.oValue)
        this.$emit('check', this.oValue)
      },
      remove () {
        this.$emit('remove', this.oValue)
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../../stylus/variables.styl"
  .hk-order-item
    animation: slideRight .5s ;
    @keyframes slideRight {
      0% {
        opacity: 0;
        transform: translateX(-100%);
      }
      60% {
        opacity: 0;
        transform: translateX(-100%);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    .hk-icons-angel-right
      color #b2b2b2
    background #ffffff
    height 4rem
    padding 0.5rem 1rem
    position relative
    &-border
      border-bottom 1px solid #cccccc
    &-left-icon
      position absolute
      left 0.8rem
      font-size 1.5rem
      height 4rem
      line-height 3rem
      color #f15151
      transition all 0.2s ease-in-out
      &-delete
        transform translateX(-2.5rem)
    &-left-edit
      transform translateX(2.5rem)
    &-left
      position absolute
      left 1rem
      text-align left
      transition all 0.1s ease-in-out
      &-time
        font-size 1rem
        line-height 1.25rem
        color #333333
      &-day
        font-size 0.6rem
        color #999999
    &-right
      position absolute
      right 1rem
      font-size 0.85rem
      color #a4a4a4
      line-height 3rem
      letter-spacing -0.41px
      transition all 0.1s ease-in-out
      &-delete
        transform translateX(-1.3rem)
      &-icon
        font-size 1.2rem
        margin-left 0.5rem
        vertical-align middle
        color #0096fb
        &-disable
          color #efefef
    &-delete
      background-color #f15151
      position absolute
      transition all 0.1s ease-in-out
      right -3.5rem
      top 0
      height 3.95rem
      line-height 3.9rem
      width 3.5rem
      opacity 0
      &-active
        right 0
        opacity 1
      i
        line-height 3.9rem
        color #fff
        font-size 1.5rem
</style>
