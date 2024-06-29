<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { MInputSlots } from './models'
</script>

<template>
  <MInput
    type="tel"
    v-bind="{...$myth.options.mobile,...$attrs}"
  >
    <template
      v-for="(_,slot) in ($slots as Readonly<MInputSlots>)"
      :key="slot"
      #[slot]
    >
      <slot :name="slot" />
    </template>
  </MInput>
</template>

<script lang="ts">
export default {
  name: 'MMobile',
  inheritAttrs: !1
}
</script>
