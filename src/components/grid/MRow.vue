<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->
<script
  lang="ts"
>

import { defineComponent } from 'vue'
import { MythVue } from '../../vue3'

export default defineComponent({
  inheritAttrs: !1,
  props: {
    defaultGutters: {
      type: String,
      default: () => MythVue.options.row?.defaultGutters
    },
    gutters: {
      type: [String, Boolean],
      default: () => MythVue.options.row?.gutters
    },
    col: {
      type: [String, Boolean],
      default: () => MythVue.options.row?.col
    }
  },
  computed: {
    classes () {
      const l = ['m--row', 'row']
      const gutters = this.gutters
      const col = this.col

      if (typeof gutters === 'string') {
        if (gutters.length >= 1) {
          l.push(`q-gutter-${gutters}`)
        } else {
          l.push(`q-gutter-${this.$myth.options.row?.defaultGutters || 'sm'}`)
        }
      }
      if (typeof col === 'string') {
        if (col.length >= 1) {
          l.push(`q-col-gutter-${col}`)
        } else {
          l.push(`q-col-gutter-${this.$myth.options.row?.defaultGutters || 'sm'}`)
        }
      }

      return l
    }
  }
})
</script>

<template>
  <div
    :class="classes"
    :col="undefined"
    :default-gutters="undefined"
    :gutters="undefined"
    v-bind="{...($myth.options.row),...$attrs}"
  >
    <slot />
  </div>
</template>

<style>
.m--row {

}
</style>
