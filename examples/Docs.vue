<template lang="pug">
.docs
  component.markdown-body(:is="view")
</template>

<script>
import router from './router'

const components = {}
router.options.routes.forEach(route => {
  components[`${route.name}-doc`] = () => import(`@/components/${route.name}/README.md`)
})

export default {
  name: 'docs',
  components,
  data () {
    return {
      view: ''
    }
  },
  mounted () {
    this.setView()
  },
  watch: {
    $route () {
      this.setView()
    }
  },
  methods: {
    setView () {
      if (this.$route.name) {
        this.view = this.$route.name + '-doc'
      } else {
        this.view = ''
      }
    }
  }
}
</script>

<style lang="stylus">
.docs
  padding 1rem
  text-align left
  margin-right 480px
  margin-left 40px
  @media (max-width: 960px)
    margin 0 auto
.markdown-body
  max-width 960px
  margin 0 auto

</style>
