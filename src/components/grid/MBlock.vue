<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { MBlockProps } from './models.d'

interface Props {
  dense?: MBlockProps['dense'];
  size?: MBlockProps['size'];
  rounded?: MBlockProps['rounded'];
  shadow?: MBlockProps['shadow'];
}

withDefaults(defineProps<Props>(), {
  dense: undefined,
  size: () => 'md',
  rounded: undefined,
  shadow: () => 2
})

</script>

<template>
  <div
    :class="{
      'rounded-borders' : rounded !== undefined ? Boolean(rounded) : ($myth.options.block?.rounded !== undefined ? $myth.options.block?.rounded : !0),
      [`q-pa-${$myth.options.block?.size || size}`] : dense !== undefined ? Boolean(dense) : ($myth.options.block?.dense !== undefined ? $myth.options.block?.dense : !0),
      [`shadow-${$myth.options.block?.shadow || shadow}`] : !0
    }"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'MBlock',
  inheritAttrs: !1
}
</script>
