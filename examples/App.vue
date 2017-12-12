<template lang="pug">
#app
  sidebar
  demo
  docs
</template>

<script>
import Sidebar from './Sidebar'
import Demo from './Demo'
import Docs from './Docs'

export default {
  name: 'app',
  components: {
    Sidebar,
    Demo,
    Docs
  }
}
</script>

<style lang="stylus">
@import "~normalize.css"
@import "~font-awesome/css/font-awesome.css"
@import "~github-markdown-css/github-markdown.css"
body
  overflow-x hidden
  overflow-y auto

*
html
body
  user-select text
</style>
