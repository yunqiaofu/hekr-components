<template lang="pug">
  .hk-notify-demo
    hk-order(
      :lists="list",
      @onRemove="onRemove",
      @onEdit="onEdit",
      @onAdd="onAdd",
      :template="template"
    )
</template>

<script>
  const template = {
    taskName: '新加预约',
    code: {
      curtain_Sw: 1,
      cmdId: 2
    },
    schedulerType: 'LOOP'
  }
  export default {
    name: 'hk-order-demo',
    data () {
      return {
        list: [],
        template: template
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
      }
    }
  }
</script>

<style lang="stylus">
  .hk-notify-demo
    text-align center
</style>

