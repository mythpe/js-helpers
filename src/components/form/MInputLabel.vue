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
  name: Props['name'];
  label?: Props['label'];
  error?: Props['error'];
  required?: Props['required'];
}

withDefaults(defineProps<P>(), {
  name: () => '',
  label: undefined,
  error: undefined,
  required: undefined
})
</script>

<template>
  <div
    :class="{
      'm--input__top-label' : !0,
      'm--input__top-label__required' : !!required,
      'text-negative' : !!error
    }"
    v-bind="$attrs"
  >
    {{ __(label) }}
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'MInputLabel'
}
</script>

<style lang="sass" scoped>
.m--input__top-label
  &.m--input__top-label__required::after
    content: '*'
    color: var(--q-negative)
</style>
