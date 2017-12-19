<template lang="pug">
  .hk-notify-demo
    hk-order(
      :lists="list",
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
    }
  }
</script>

<style lang="stylus">
  .hk-notify-demo
    text-align center
</style>

