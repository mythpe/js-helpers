<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { MContainerProps } from './models.d'

type Props = {
  dense?: MContainerProps['dense'];
  fluid?: MContainerProps['fluid'];
}

defineProps<Props>()
</script>

<template>
  <div
    :class="{
      'm--container' : !0,
      'm--container__dense' : dense !== !1 && dense !== undefined,
      'm--container__fluid' : fluid !== !1 && fluid !== undefined,
    }"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'MContainer',
  inheritAttrs: !1
}
</script>
