<template lang="pug">
#app
  Sidebar
  router-view
</template>

<script>
import Sidebar from './router/Sidebar'
export default {
  name: 'app',
  components: {
    Sidebar
  }
}
</script>

<style lang="stylus">
@import "~normalize.css"
@import "~font-awesome/css/font-awesome.css"
body
  overflow-x hidden
  overflow-y auto
</style>
