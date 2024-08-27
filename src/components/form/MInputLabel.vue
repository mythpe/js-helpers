<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { MInputLabelProps as Props } from './models'

type P = {
  field: Props['field'];
}

withDefaults(defineProps<P>(), {
  field: () => ({} as Props['field'])
})
defineOptions({ name: 'MInputLabel' })
</script>

<template>
  <div
    :class="{
      'row items-center m--input__top-label' : !0,
      'm--input__top-label__invalid' : !field.meta?.valid && field.meta?.dirty
    }"
  >
    <div class="m--input__top-label__content">
      {{ field.label }}
    </div>
    <slot />
  </div>
</template>
