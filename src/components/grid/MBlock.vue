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
  rounded?: MBlockProps['rounded'];
  shadow?: MBlockProps['shadow'];
}

withDefaults(defineProps<Props>(), {
  dense: undefined,
  rounded: undefined,
  shadow: () => 2
})
// .rounded-borders
</script>

<template>
  <div
    :class="{
      'm--block' : !0,
      'rounded-borders' : !0,
    }"
    v-bind="{...$myth.options.card,...$attrs}"
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
