
<template lang="pug">
  .hk-order-add
    hk-header.hk-order-add-header(
      :title="lang.order.setting",
      @click-left="go('list')",
      :rightText="lang.order.save",
      @click-right="save"
    )
    .hk-order-add-tag
      span {{lang.order.label}}
      input.hk-order-add-tag-input(
        placeholder="lang.order.taskName",
        v-model="taskName"
        maxlength="12"
      )
    .hk-order-add-timepick-title {{lang.order.time}}
    .hk-order-add-timepick
      hk-timepicker(
        v-model="date",
        :type="'hh:mm'",
        :needTitle="false"
      )
    hk-week(
      v-model="week"
    )
    .hk-order-add-control(
      v-for="item in options",
      :key="item.argument"
      @click="selectShow(item)"
    )
      span(
        v-if="item.type!=='slider'"
      ) {{item.label}}
        .hk-order-add-control-btn(
          v-if="item.type==='button'"
          v-for="i,k in item.maps",
          :key="k",
          :class="{'hk-order-add-control-active':value[item.argument]===i.value}",
          @click="click(item.argument, i.value)"
        ) {{i.name}}
      span(
        v-if="item.type==='slider'"
      )
        hk-slider(
          v-model="value[item.argument]",
          :min="item.min",
          :max="item.max",
          :title="item.label",
          :unit="item.unit"
        )
      .hk-order-add-control-right(
        v-if="item.type==='select'"
      ) {{item.maps[value[item.argument]].name}}
      hk-pop(
        v-if="item.type==='select'"
        v-model="showSelect[item.argument]"
      )
        hk-select(
          v-model="value[item.argument]",
          :title="item.label",
          :items="item.maps"
        )
</template>

<script>
  const weeks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  export default {
    name: 'order-add',
    props: {
      selected: {
        type: Object,
        default: () => {}
      },
      type: {
        type: String,
        default: 'add'
      },
      template: {
        type: Object,
        default: () => {}
      },
      options: {
        type: Array,
        default: () => []
      }
    },
    data () {
      let myTemplate = this.selected || this.template
      let now = new Date()
      let value = {}
      let showSelect = {}
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].type === 'slider') {
          value[this.options[i].argument] = this.options[i].min
        } else if (this.options[i].type === 'select') {
          value[this.options[i].argument] = 0
        } else {
          value[this.options[i].argument] = this.options[i].maps[0].value
        }
        showSelect[this.options[i].argument] = false
      }
      return {
        myTemplate: myTemplate,
        taskName: myTemplate.taskName,
        enable: myTemplate.enable,
        week: [],
        date: {h: myTemplate.date.hour || now.getHours(), m: myTemplate.date.minute || now.getMinutes()},
        code: {},
        showSelect: showSelect,
        selectValue: [],
        value: value,
        selectList: [],
        selectType: ''
      }
    },
    mounted () {
      const repeatList = this.myTemplate.date.repeatList || []
      let l = []
      for (let i = 0; i < repeatList.length; i++) {
        l.push(weeks.indexOf(repeatList[i]))
      }
      this.week = l
      this.taskName = this.myTemplate.taskName
      this.code = this.myTemplate.code
      let selecteObj = {}
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].type === 'select') {
          selecteObj[this.options[i].argument] = {
            show: false,
            maps: this.options[i].maps
          }
        }
      }
      this.selecteObj = selecteObj
      console.log('this.selecteObj', this.selecteObj)
    },
    computed: {
      hour () {
        let hour = []
        for (let i = 0; i < 24; i++) {
          hour.push(i)
        }
        return hour
      },
      min () {
        let min = []
        for (let i = 0; i < 60; i++) {
          min.push(i)
        }
        return min
      },
      repeatList () {
        let l = []
        for (let i = 0; i < this.week.length; i++) {
          l.push(weeks[this.week[i]])
        }
        return l
      }
    },
    methods: {
      selectShow (item) {
        if (item.type === 'select') {
          this.showSelect[item.argument] = !this.showSelect[item.argument]
          this.selectType = item.argument
          this.selectList = item.maps
        }
      },
      go (route) {
        this.$emit('go', route)
      },
      click (argument, value) {
        this.value[argument] = value
        // this.code = {
        //   ...this.code
        // }
      },

      save () {
        let ob = {
          ...this.myTemplate,
          date: {
            hour: this.date.h,
            minute: this.date.m,
            repeatList: this.repeatList
          },
          taskName: this.taskName,
          code: {
            ...this.code,
            ...this.value
          },
          schedulerType: this.repeatList.length === 0 ? 'ONCE' : 'LOOP'
        }
        this.$emit('input', ob)
        if (this.myTemplate.taskId || this.type === 'edit') {
          this.$emit('onEdit', ob)
        } else {
          ob.enable = true // 新增默认可用
          this.$emit('onAdd', ob)
        }
        this.go('list')
      }
    }
  }
</script>

<style lang="stylus">
  .hk-order-add
    position fixed
    width 100%
    height 100%
    overflow auto
    padding-bottom 2rem
    background-color #f5f5f5
    &-header
      background-color #fff
    &-tag
      background #ffffff
      height 2.2rem
      text-align left
      line-height 2.2rem
      padding-left 1rem
      border-bottom 0.05rem solid #dedede
      margin-top 2.75rem
      &-input
        margin-left 0.5rem
        border none
        outline none
        width calc(100% - 3.5rem)
      span
        font-size 0.8rem
        color #030303
        display inline-block
        width 2.5rem
    &-timepick-title
      background-color #fff
      padding-left 1rem
      height 2.2rem
      line-height 2.2rem
      font-size 0.8rem
      color #030303
      text-align left
    &-timepick
      margin-bottom 0.5rem
      padding-bottom 0.5rem
      background-color #fff
    &-control
      background #ffffff
      line-height 2.2rem
      padding 0  1rem
      margin-top 0.5rem
      text-align left
      &-btn
        border 0.05rem solid #cccccc
        border-radius 0.2rem
        width 2.7rem
        height 1.15rem
        float right
        text-align center
        font-size 0.6rem
        color rgba(0,0,0,0.65)
        margin 0.5rem
        line-height 1.05rem
        cursor pointer
      &-right
        width 2.7rem
        margin 0.5rem
        height 1.15rem
        float right
        text-align center
        font-size 0.8rem
        line-height 1.05rem
      &-active
        border 0.05rem solid #3aa4f7
        color #3aa4f7
</style>
