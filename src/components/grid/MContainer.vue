<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { MContainerProps } from './models.d'
import { computed } from 'vue'

interface Props {
  dense?: MContainerProps['dense']
}

const props = withDefaults(defineProps<Props>(), {
  dense: undefined
})
const getDense = computed(() => (opts?: MContainerProps) => props.dense !== undefined ? props.dense : (opts?.dense !== undefined ? opts.dense : undefined))
</script>

<template>
  <div
    :class="{
      'm--container' : !0,
      'm--container--dense' : getDense($myth.options.container) !== undefined
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
