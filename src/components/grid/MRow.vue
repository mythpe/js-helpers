<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script
  lang="ts"
  setup
>
import { MRowProps } from './models.d'

interface Props {
  space?: MRowProps['space'];
  gutter?: MRowProps['gutter'];
  col?: MRowProps['col'];
}

withDefaults(defineProps<Props>(), {
  space: undefined,
  gutter: undefined,
  col: undefined
})
const defSpace = 'md'
</script>

<template>
  <div
    :class="{
      'm--row row': !0,
      [`q-gutter-${space || $myth.options.row?.space || defSpace}`]: gutter !== undefined ? gutter : ( $myth.options.row?.gutter !== undefined ? $myth.options.row.gutter : !1 ),
      [`q-col-gutter-${space || $myth.options.row?.space || defSpace}`]: col !== undefined ? col : ( $myth.options.row?.col !== undefined ? $myth.options.row.col : !1 ),
    }"
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
