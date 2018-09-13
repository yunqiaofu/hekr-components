<template lang="pug">
.hk-timing-edit
  hk-header(
    :title="$i('timing.editTitle')",
    @click-left="back",
    :rightText="$i('timing.save')",
    @click-right="save"
  )
  .hk-timing-edit-container

    .hk-timing-edit-title
      .hk-timing-edit-title-label {{ $i('timing.label') }}
      input.hk-timing-edit-title-input(
        v-model="taskName",
        :placeholder="$i('timing.placeholder')",
        maxlength="12"
      )

    .hk-timing-edit-timepicker
      .hk-timing-edit-timepicker-title {{ $i('timing.time') }}
      hk-timepicker(v-model="date")

    hk-week(v-model="week")

    .hk-timing-edit-components
      .hk-timing-edit-components-item(
        v-for="item in options",
        :key="item.argument"
      )
        .hk-timing-edit-components-item-buttons(v-if="item.type==='button'")
          hk-list(
            type="text",
            :leftText="item.label"
          )
            .hk-timing-edit-components-item-buttons-items(slot="right")
              .hk-timing-edit-components-item-buttons-items-item(
                v-for="(button, index) in item.maps",
                :key="index",
                :class="{ 'hk-timing-edit-components-item-buttons-items-item-active': value[item.argument] === button.value }",
                @click="click(item.argument, button.value)"
              ) {{ button.name }}

        .hk-timing-edit-components-item-slider(v-if="item.type === 'slider'")
          hk-slider(
            v-model="value[item.argument]",
            :min="item.min",
            :max="item.max",
            :title="item.label",
            :unit="item.unit"
          )

        .hk-timing-edit-components-item-select(v-if="item.type === 'select'")
          hk-list(
            type="text",
            :leftText="item.label",
            :rightText="item.maps[value[item.argument]].name",
            rightIcon="hk-icons-angle-right",
            @right-click="selectShow(item)"
          )
          hk-pop(v-model="selectes[item.argument]")
            hk-select(
              v-model="value[item.argument]",
              @input="selectHide",
              :title="item.label",
              :items="item.maps"
            )
</template>

<script>
const weeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

export default {
  name: 'hk-timing-edit',
  props: {
    template: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      taskName: '',
      code: '',
      date: { },
      enable: true,
      selectes: {},
      value: {},
      week: [],
      selectValue: [],
      selectList: [],
      selectType: ''
    }
  },
  computed: {
    repeatList () {
      return this.week.map(item => weeks[item])
    }
  },
  created () {
    this.init()
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const value = {}
      const selectes = {}
      const template = this.template
      const options = this.options
      options.forEach(item => {
        const key = item.argument
        const isUndef = template.code[key] === undefined
        if (item.type === 'slider') {
          value[key] = isUndef ? item.min : template.code[key]
        } else if (item.type === 'select') {
          value[key] = isUndef ? 0 : template.code[key]
          selectes[key] = false
        } else {
          value[key] = isUndef ? item.maps[0].value : template.code[key]
        }
      })
      const repeatList = this.template.date.repeatList || []
      this.week = repeatList.map(week => weeks.indexOf(week))
      this.taskName = this.template.taskName
      this.code = this.template.code
      this.date = this.template.date
      this.enable = this.template.enable
      this.selectes = selectes
      this.value = value
    },
    selectShow (item) {
      this.selectes[item.argument] = true
      this.selectType = item.argument
      this.selectList = item.maps
    },
    selectHide () {
      Object
        .keys(this.selectes)
        .forEach(key => {
          this.selectes[key] = false
        })
    },
    back () {
      this.$emit('back')
    },
    click (argument, value) {
      this.value[argument] = value
    },
    save () {
      let template = {
        ...this.template,
        date: {
          ...this.date,
          repeatList: this.repeatList
        },
        taskName: this.taskName,
        code: {
          ...this.code,
          ...this.value
        },
        schedulerType: this.repeatList.length === 0 ? 'ONCE' : 'LOOP'
      }
      this.$emit('input', template)
      if (this.template.taskId) {
        this.$emit('onEdit', template)
      } else {
        template.enable = true // 新增默认可用
        this.$emit('onAdd', template)
      }
      this.$emit('back')
    }
  }
}
</script>

<style lang="stylus">
.hk-timing-edit
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
    bottom 0
    left 0
    padding 0.5rem 0
    overflow-x hidden
    overflow-y auto
  &-title
    display flex
    height 2.2rem
    overflow hidden
    background-color #fff
    border-bottom 0.05rem solid #ccc
    &-label
      min-width 4rem
      height 2.2rem
      line-height 2.2rem
      padding 0 1rem
      text-align left
      color #030303
      font-size 0.8rem
    &-input
      flex 1
      height 2.2rem
      line-height 2.2rem
      display block
      border none
      outline none
      padding 0
      margin 0
      background-color #fff

  &-timepicker
    margin-bottom 0.5rem
    padding-bottom 0.5rem
    background-color #fff
    &-title
      background-color #fff
      padding 0 1rem
      height 2.2rem
      line-height 2.2rem
      font-size 0.8rem
      color #030303
      text-align left

  &-components
    line-height 2.2rem
    text-align left
    &-item
      margin-top 0.5rem
      background-color #fff

      &-buttons
        &-items
          text-align right
          height 2.2rem
          padding 0.35rem 0
          white-space nowrap
          &-item
            min-width 2.7rem
            max-width 46%
            height 1.15rem
            padding 0 0.2rem
            display inline-block
            line-height 1.05rem
            border 0.05rem solid #ccc
            border-radius 0.2rem
            text-align center
            color #555
            font-size 0.6rem
            overflow hidden
            text-overflow ellipsis
            cursor pointer
            &:not(:first-child)
              margin-left 0.5rem
            &-active
              border-color #3aa4f7
              color #3aa4f7
      &-slider
        padding 0.5rem 1rem
</style>
