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
import { MColProps } from './models'
import lodash from 'lodash'

interface Props {
  name?: MColProps['name']
  auto?: MColProps['auto']
  col?: MColProps['col']
  noCol?: MColProps['noCol']
  xs?: MColProps['xs']
  sm?: MColProps['sm']
  md?: MColProps['md']
  lg?: MColProps['lg']
  xl?: MColProps['xl']
}

const props = withDefaults(defineProps<Props>(), {
  name: undefined,
  auto: undefined,
  col: undefined,
  noCol: () => !1,
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

  if ((props.col === !0 || props.col?.toString?.() === '') && !props.noCol) {
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

  for (const k in (['xs', 'sm', 'md', 'lg', 'xl'] as keyof Props)) {
    if (k) {
      if (props[k] && typeof props[k] !== 'boolean') {
        if (list.indexOf(`col-${k}-${props[k]}`) === -1) {
          list.push(`col-${k}-${props[k]}`)
        }
      }
    }
  }

  if (list.indexOf('col') === -1 || list.length === 1) {
    if (props.col !== !1 && !props.auto) {
      if (!props.noCol) {
        list.push('col')
      }
    }
  }
  if (props.name) {
    list.push(`m--input__div__${props.name}`)
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
