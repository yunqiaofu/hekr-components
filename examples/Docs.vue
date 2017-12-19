<template lang="pug">
.docs
  component.markdown-body(:is="view")
  .docs-source(v-if="source")
    .docs-source-title 示例源码
    .docs-source-code
      pre
        code {{ source }}
</template>

<script>
import axios from 'axios'
import router from './router'
const components = {
  readme: () => import('../README.md')
}
router.options.routes.forEach(route => {
  components[`${route.name}-doc`] = () => import(`./views/${route.name}/README.md`)
})

export default {
  name: 'docs',
  components,
  data () {
    return {
      view: '',
      source: ''
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
      if (this.$http) {
        this.$http.cancel()
      }
      if (this.$route.name) {
        this.view = this.$route.name + '-doc'
        this.$http = axios.CancelToken.source()
        axios.get(`/views/${this.$route.name}/index.vue`, {
          cancelToken: this.$http.token
        }).then(({ data }) => {
          this.source = data
        })
      } else {
        this.source = ''
        this.view = 'readme'
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
  &-source
    max-width 960px
    margin 0 auto
    padding 1rem 0
    &-title
      padding 0.3rem 0
      font-size 1rem
      font-weight 600
    &-code
      padding 0.8rem
      overflow auto
      font-size 85%
      line-height 1.45
      background-color #f6f8fa
      border-radius 3px
      word-wrap normal
.markdown-body
  max-width 960px
  margin 0 auto

</style>
