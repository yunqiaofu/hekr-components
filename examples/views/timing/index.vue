<template lang="pug">
.hk-timing-demo
  hk-timing(
    :items="list",
    :title="title",
    :code="code",
    :options="options",
    :maxlength="maxlength",
    @onRemove="onRemove",
    @onEdit="onEdit",
    @onAdd="onAdd",
    @back="back"
  )
</template>

<script>
export default {
  name: 'hk-timing-demo',
  data () {
    return {
      list: [],
      code: {
        cmdTag: 'setSw'
      },
      options: [
        {
          type: 'button',
          argument: 'curtain_Sw',
          label: 'open / close',
          maps: [
            {
              name: '定时开',
              value: 1
            },
            {
              name: '定时关',
              value: 0
            }]
        },
        {
          type: 'button',
          argument: 'curtain_Qr',
          label: '强 / 弱',
          maps: [
            {
              name: '强',
              value: 1
            },
            {
              name: '弱',
              value: 0
            }]
        },
        {
          type: 'select',
          argument: 'flow',
          label: '风速',
          maps: [
            {
              name: '1档',
              value: 1
            },
            {
              name: '2档',
              value: 2
            },
            {
              name: '3档',
              value: 3
            }]
        },
        {
          type: 'slider',
          argument: 'hd',
          label: '湿度',
          min: 0,
          max: 100,
          unit: '%'
        }
      ],
      title: '预约标题(可选)',
      maxlength: 10
    }
  },
  methods: {
    onRemove (data, index) {
      this.list.splice(index, 1)
      console.log('onRemove', data)
    },
    onEdit (data, index) {
      const list = [ ...this.list ]
      list[index] = data
      this.list = list
      console.log('onEditonEdit', data)
    },
    onAdd (data) {
      data.taskId = Date.now()
      this.list.push(data)
      console.log('onAdd', data)
    },
    back () {
      console.log('back')
    }
  }
}
</script>

<style lang="stylus">
.hk-timing-demo
  text-align center
</style>

