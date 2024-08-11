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
  if (props.col === 'grow') {
    list.push('col-grow')
  } else if (props.col === 'shrink') {
    list.push('col-shrink')
  } else if (typeof props.col === 'string') {
    if (props.col?.toString()?.trim()?.length > 0 && !list.includes(`col-${props.col}`)) {
      list.push(`col-${props.col}`)
    }
  }

  for (const k of (['xs', 'sm', 'md', 'lg', 'xl'] as (keyof Props)[])) {
    if (props[k] && typeof props[k] !== 'boolean') {
      if (!list.includes(`col-${k}-${props[k]}`)) {
        list.push(`col-${k}-${props[k]}`)
      }
    }
  }

  if (list.length === 1 && props.col !== !1) {
    list.push('col')
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
    :data-input-name="name"
    v-bind="{ ...$myth.options.col, ...$attrs }"
  >
    <slot />
  </div>
</template>
