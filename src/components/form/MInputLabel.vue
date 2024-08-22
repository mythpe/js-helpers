<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { MInputLabelProps as Props } from './models'
import { computed } from 'vue'

type P = {
  field: Props['field'];
}

withDefaults(defineProps<P>(), {
  field: () => ({} as Props['field'])
})
// const meta = computed<P['field']['meta']>(() => props.field.meta || {})
// const label = computed<P['field']['label']>(() => props.field.label || undefined)
// const errorMessage = computed(() => props.field.errorMessage.value || undefined)

</script>

<template>
  <div
    :class="{
      'm--input__top-label' : !0,
      'm--input__top-label__invalid' : !field.meta?.valid && field.meta?.dirty,
      'text-negative' : !!field.errorMessage?.length
    }"
    v-bind="$attrs"
  >
    {{ field.label }}
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'MInputLabel'
}
</script>
