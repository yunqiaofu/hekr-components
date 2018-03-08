
<template lang="pug">
.hk-order-item(@click.stop="itemClick")
  i.hk-icons-delete-simple.hk-order-item-left-icon(
    v-show="isEdit",
    :class="{ 'hk-order-item-left-icon-delete': isDelete }",
    @click.stop="isDelete=true"
  )
  .hk-order-item-left(
    :class="{ 'hk-order-item-left-edit': isEdit && !isDelete }",
  )
    .hk-order-item-left-time {{ time }}
    .hk-order-item-left-day {{ days }}
    .hk-order-item-left-name {{ data.taskName }}
  .hk-order-item-right(
    :class="{ 'hk-order-item-right-delete': isDelete}",
    @click="check"
  )
    span(
      v-for="item in options",
      v-if="data.code[item.argument] !== undefined"
    ) {{ getLabel(item, data.code[item.argument]) }}
    i.hk-order-item-right-icon(
      :class="getIcon"
    )
  .hk-order-item-delete(
    :class="{ 'hk-order-item-delete-active': isDelete && isEdit }",
    @click.stop="remove"
  )
    i.hk-icons-delete-device

</template>

<script>
export default {
  name: 'hk-order-item',
  props: {
    task: {
      type: Object,
      default: () => {}
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      data: { ...this.task } || {},
      isDelete: false
    }
  },
  computed: {
    getIcon () {
      return {
        'hk-order-item-right-icon-disable': !this.data.enable || this.data.expired,
        'hk-icons-check-checked': !this.isEdit,
        'hk-icons-angel-right': this.isEdit
      }
    },
    time () {
      return this.format(this.data.date.hour, 2) + ':' + this.format(this.data.date.minute, 2)
    },
    days () {
      const weeks = {
        SUN: this.$i('week.SUN'),
        MON: this.$i('week.MON'),
        TUE: this.$i('week.TUE'),
        WED: this.$i('week.WED'),
        THU: this.$i('week.THU'),
        FRI: this.$i('week.FRI'),
        SAT: this.$i('week.SAT')
      }
      const repeatList = this.data.date.repeatList || []
      let days = ''
      for (let j = 0; j < repeatList.length; j++) {
        days = days + weeks[repeatList[j]] + ' '
      }
      return days
    }
  },
  watch: {
    task: {
      deep: true,
      handler (val) {
        this.data = { ...val }
      }
    },
    isEdit (val) {
      if (!val) {
        this.isDelete = false
      }
    }
  },
  activated () {
    this.isDelete = false
  },
  methods: {
    getLabel (item, value) {
      if (item.maps) {
        for (let i = 0; i < item.maps.length; i++) {
          if (item.maps[i].value === value) {
            return item.maps[i].name + '  '
          }
        }
      } else {
        return item.label + value + item.unit
      }
    },
    format (n, l) {
      if (n || n === 0) {
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
      this.$emit('check')
    },
    remove () {
      this.isDelete = false
      this.$emit('remove')
    }
  }
}
</script>

<style lang="stylus">
.hk-order-item
  height 4rem
  padding 0.5rem 1rem
  animation slideRight .5s
  transition all 0.5s ease-in-out
  background-color #ffffff
  overflow hidden
  position relative
  &:not(:last-child)
    border-bottom 0.05rem solid #ccc
  .hk-icons-angel-right
    color #b2b2b2
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
    &-day,
    &-name
      height 0.85rem
      line-height 0.85rem
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

@keyframes slideRight
  0%
    opacity 0
    transform translateX(-100%)
  60%
    opacity 0
    transform translateX(-100%)
  100%
    opacity 1
    transform translateX(0)
</style>
