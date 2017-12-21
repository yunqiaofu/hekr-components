
<template lang="pug">
  .hk-order-item(
    :class="{'hk-order-item-border': border,'hk-order-item-remove': removed}",
    @click.stop="itemClick"
  )
    i.hk-icons-delete-simple.hk-order-item-left-icon(
      v-show="isEdit",
      :class="{'hk-order-item-left-icon-delete':isDelete}",
      @click.stop="isDelete=true"
    )
    .hk-order-item-left(
      :class="{'hk-order-item-left-edit':isEdit&&!isDelete}",
    )
      .hk-order-item-left-time {{time}}
      .hk-order-item-left-day {{days}}
      .hk-order-item-left-day {{oValue.taskName}}
    .hk-order-item-right(
      :class="{'hk-order-item-right-delete':isDelete}",
      @click="check"
    )
      span(
        v-for="item in options",
        v-if="oValue.code[item.argument]!==undefined"
      ) {{getLabel(item.maps,oValue.code[item.argument])}}
      i.hk-order-item-right-icon(
        :class="{'hk-order-item-right-icon-disable': !this.oValue.enable,'hk-icons-check-checked': !this.isEdit,'hk-icons-angel-right': this.isEdit}"
      )
    .hk-order-item-delete(
      :class="{'hk-order-item-delete-active':isDelete&&isEdit}",
      @click.stop="remove"
    )
      i.hk-icons-delete-device

</template>

<script>
  const weeks = {SUN: '周日', MON: '周一', TUE: '周二', WED: '周三', THU: '周四', FRI: '周五', SAT: '周六'}
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
      },
      options: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      time () {
        return this.format(this.oValue.date.hour, 2) + ':' + this.format(this.oValue.date.minute, 2)
      },
      days () {
        const repeatList = this.oValue.date.repeatList || []
        let days = ''
        for (let j = 0; j < repeatList.length; j++) {
          days = days + weeks[repeatList[j]] + ' '
        }
        return days
      }
    },
    activated () {
      this.isDelete = false
      this.removed = false
    },
    data () {
      return {
        oValue: this.value || {},
        isDelete: false,
        removed: false
      }
    },

    methods: {
      getLabel (maps, value) {
        for (let i = 0; i < maps.length; i++) {
          if (maps[i].value === value) {
            return maps[i].name + '  '
          }
        }
      },
      format (n, l) {
        if (n) {
          n = n.toString()
          while (n.length < l) {
            n = '0' + n
          }
        }
        return n
      },
      itemClick () {
        if (!this.isDelete && this.isEdit) {
          this.$emit('edit')
        }
        this.isDelete = false
      },
      check () {
        if (this.isEdit) {
          return
        }
        this.oValue.enable = !this.oValue.enable
        this.$emit('input', this.oValue)
        this.$emit('check', this.oValue)
      },
      remove () {
        this.removed = true
        setTimeout(() => {
          this.$emit('remove', this.oValue)
        }, 600)
      }
    }
  }
</script>

<style lang="stylus">
  .hk-order-item-remove
    transform translateX(-100%)
  .hk-order-item
    animation slideRight .5s
    overflow hidden
    transition all .5s ease-in-out
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
      border-bottom 0.05rem solid #cccccc
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
      font-size 0.8rem
      color #a4a4a4
      line-height 3rem
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
      opacity 0
      &-active
        right 0
        opacity 1
        width 3.5rem
        text-align center
      i
        line-height 3.9rem
        color #fff
        font-size 1.5rem
</style>
