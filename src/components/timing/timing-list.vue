<template lang="pug">
.hk-timing-list
  hk-header(
    :title="title || $i('timing.title')",
    @click-left="back",
    :rightText="rightText",
    @click-right="toEdit"
  )
  .hk-timing-list-container
    timing-list-item(
      v-for="(task, index) in list",
      :key="index",
      :task="task",
      :isEdit="isEdit",
      :options="options",
      @remove="remove(task, index)",
      @edit="edit(task, index)",
      @check="check(task, index)"
    )
  .hk-timing-list-footer
    hk-button(
      :type="'primary'",
      :disabled="list.length + 1 > maxlength",
      block,
      @click="add"
  )  {{ getAddTxt }}
</template>

<script>
import TimingListItem from './timing-list-item.vue'
export default {
  name: 'hk-timing-list',
  components: {
    TimingListItem
  },
  props: {
    tasks: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    title: {
      type: String
    },
    maxlength: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      list: [ ...this.tasks ],
      isEdit: false
    }
  },
  computed: {
    len () {
      return this.list.length || 0
    },
    rightText () {
      return this.list.length === 0
        ? ''
        : this.isEdit
          ? this.$i('timing.done')
          : this.$i('timing.edit')
    },
    getAddTxt () {
      if (this.list.length >= this.maxlength) {
        return this.$i('timing.overTask')
      }
      return this.$i('timing.add')
    }
  },
  watch: {
    tasks: {
      deep: true,
      handler (val) {
        this.list = [ ...val ]
      }
    }
  },
  methods: {
    toEdit () {
      this.isEdit = !this.isEdit
    },
    back () {
      this.$emit('back')
    },
    add () {
      this.$emit('add')
    },
    edit (selected, index) {
      this.$emit('edit', selected, index)
    },
    check (item, index) {
      const data = {
        ...item,
        enable: item.expired ? true : !item.enable
      }
      this.$emit('check', data, index)
    },
    remove (item, index) {
      this.$emit('remove', item, index)
    }
  }
}
</script>

<style lang="stylus">
.hk-timing-list
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  background-color #f5f5f5
  .hk-header
    background-color #fff
  &-container
    position absolute
    top 2.25rem
    right 0
    bottom 4rem
    left 0
    padding 0.5rem 0
    overflow-x hidden
    overflow-y auto
  &-footer
    // height 4rem
    position absolute
    right 0
    bottom 0
    left 0
    background-color #fff
    .hk-button
      width 80%
      max-width 16rem
      margin 1rem auto
</style>
