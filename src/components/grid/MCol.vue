<!--
  - MyTh Ahmed Faiz Copyright © 2016-2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script
  lang="ts"
  setup
>
import { computed } from 'vue'
import { ColStyleType, MColProps } from './models'

interface Props extends MColProps {
  auto?: boolean | undefined
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

  if (props.col !== undefined) {
    if (props.col === !0) {
      list.push('col')
    } else if (props.col && props.col?.toString()?.length > 0) {
      list.push(`col-${props.col}`)
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

<template>
  <div
    :class="classes"
  >
    <slot />
  </div>
</template>

<style>
.m--col {

}
</style>
