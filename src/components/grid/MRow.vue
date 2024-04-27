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
import { MRowProps } from './models.d'

interface Props {
  space?: MRowProps['space'];
  gutter?: MRowProps['gutter'];
  col?: MRowProps['col'];
}

const props = withDefaults(defineProps<Props>(), {
  space: undefined,
  gutter: undefined,
  col: undefined
})
const defaultSpace: Props['space'] = 'sm'
const classes = computed(() => (opts?: MRowProps) => {
  const space = props.space === undefined ? (opts?.space === undefined ? defaultSpace : opts.space) : props.space
  const gutter = Boolean(props.gutter === undefined ? (opts?.gutter === undefined ? undefined : opts.gutter) : props.gutter)
  const col = Boolean(props.col === undefined ? (opts?.col === undefined ? undefined : opts.col) : props.col)

  const l = ['m--row', 'row']
  if (gutter) {
    l.push(`q-gutter-${space}`)
  }
  if (col) {
    l.push(`q-col-gutter-${space}`)
  }
  return l
})
</script>

<template>
  <div
    :class="classes($myth.options.row)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script lang="ts">

export default {
  name: 'MRow',
  inheritAttrs: !1
}
</script>
