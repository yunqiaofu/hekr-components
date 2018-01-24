<template lang="pug">
  .hk-notify-demo
    hk-order(
      :lists="list",
      @onRemove="onRemove",
      @onEdit="onEdit",
      @onAdd="onAdd",
      @back="back",
      :template="template",
      :options="options",
      :setting="setting"
    )
</template>

<script>
  const template = {
    taskName: '新加预约',
    code: {
      cmdTag: 'setSw'
    }
  }
  export default {
    name: 'hk-order-demo',
    data () {
      return {
        list: [],
        template: template,
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
          }
        ],
        setting: {
          maxLen: 10
        }
      }
    },
    methods: {
      onRemove (data) {
        console.log('onRemove', data)
      },
      onEdit (data) {
        console.log('onEdit', data)
      },
      onAdd (data) {
        console.log('onAdd', data)
      },
      back () {
        console.log('back')
      }
    }
  }
</script>

<style lang="stylus">
  .hk-notify-demo
    text-align center
</style>

