<template lang="pug">
#app
  Sidebar
  router-view
</template>

<script>
import Sidebar from './sidebar'
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
*
  box-sizing border-box
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
</style>
