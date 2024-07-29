<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script
  lang="ts"
  setup
>
import { computed } from 'vue'
import { ColStyleType } from './models'
import lodash from 'lodash'

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
  const list: string[] = ['m--col']
  if (props.auto === !0) {
    list.push('col-auto')
  }

  if (props.col === !0) {
    list.push('col')
  } else if (props.col === 'grow') {
    list.push('col-grow')
  } else if (props.col === 'shrink') {
    list.push('col-shrink')
  } else if (typeof props.col === 'string') {
    if (props.col?.toString()?.trim()?.length > 0) {
      if (list.indexOf(`col-${props.col}`) === -1) {
        list.push(`col-${props.col}`)
      }
    }
  }

  let k: keyof Props
  for (k in props) {
    if (k) {
      if (['col', 'auto'].indexOf(k) > -1) {
        continue
      }
      if (props[k] && typeof props[k] !== 'boolean') {
        if (list.indexOf(`col-${k}-${props[k]}`) === -1) {
          list.push(`col-${k}-${props[k]}`)
        }
      }
    }
  }

  if (list.indexOf('col') === -1 || list.length === 1) {
    if (props.col !== !1 && !props.auto) {
      list.push('col')
    }
  }
  return lodash.uniq(list)
})
</script>

<script lang="ts">
export default {
  name: 'MCol'
}
</script>

<template>
  <div
    :class="classes"
    v-bind="$myth.options.col"
  >
    <slot />
  </div>
</template>
