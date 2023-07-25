<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <div
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script
  lang="ts"
  setup
>
import { computed } from 'vue'
import { ColStyleType } from './models'

interface Props {
  auto?: boolean
  col?: ColStyleType
  xs?: ColStyleType
  sm?: ColStyleType
  md?: ColStyleType
  lg?: ColStyleType
  xl?: ColStyleType
}

const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined
})
const classes = computed(() => {
  const list = ['m--col']
  if (props.auto) {
    list.push('col-auto')
  }

  if (props.col) {
    if (props.col?.toString()?.length > 0) {
      list.push(`col-${props.col}`)
    } else {
      list.push('col')
    }
  }

  let k: keyof Props
  for (k in props) {
    if (k) {
      if (k === 'col') {
        continue
      }
      if (props[k] && typeof props[k] !== 'boolean') {
        list.push(`col-${k}-${props[k]}`)
      }
    }
  }
  return list
})
</script>
<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
<style>
.m--col {

}
</style>
