<template lang="pug">
.hk-switch
  .hk-switch-wrap
    .hk-switch-switch(
      :class="getClass",
      @click="toggle",
      :style="{ backgroundColor : getStyle, borderColor : getStyle }"
    )
      .hk-switch-switch-toggle
    .hk-switch-text {{text}}
</template>

<script>
export default {
  name: 'hk-switch',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: '#3AA4F7'
    },
    offColor: {
      type: String,
      default: '#C0BFBF'
    },
    text: {
      type: String,
      default: ''
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getClass () {
      const className = []
      if (this.active) {
        className.push('hk-switch-switch-on')
      }
      if (this.disabled) {
        className.push('hk-switch-switch-disabled')
      }
      return className.join(' ')
    },
    getStyle () {
      var style = ''
      if (this.disabled) {
        return
      }
      if (this.activeColor && this.active) {
        style = this.activeColor
      }
      if (this.offColor && !this.active) {
        style = this.offColor
      }
      return style
    }
  },
  methods: {
    toggle () {
      if (!this.disabled) {
        this.$emit('click', this.active)
      }
    }
  }
}
</script>

<style lang="stylus">
@import "../../stylus/variables.styl"
.hk-switch {
  display: inline-block
  text-align center
  .hk-switch-switch {
    display: inline-block
    border: 1px solid #C0BFBF;
    background-color: #C0BFBF;
    width: 2rem;
    height: 1.2rem;
    border-radius: 1rem;
    &:after {
      content: "";
      display: table;
      clear: both;
      float: none;
    }
    &-toggle {
      background-color: #fff;
      width: 1rem;
      height: 1rem;
      margin: 0.05rem;
      border-radius: 50%;
      transition: all 0.2s ease-in-out;
    }
    &-on {
      background-color: #3AA4F7;
      border-color: #3AA4F7;
      .hk-switch-switch-toggle {
        float: right;
        background-color: #fff;
      }
    }
    &-disabled {
      .hk-switch-switch-toggle {
        background-color: #B2B2B2;
      };
      cursor: not-allowed;
      background-color: #ccc;
      border-color: #ccc
    }
    .hk-switch-text {
      color: #666
      font-size: 0.7rem
    }
  }
}
</style>
