<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <MPicker
    v-model="inputValue"
    type="time"
    v-bind="$attrs"
  >
    <slot />
  </MPicker>
</template>

<script lang="ts" setup>

import { MTimeProps } from './models'

const inputValue = defineModel<MTimeProps['modelValue']>({ required: !0 })

</script>

<script lang="ts">
export default {
  name: 'MTime',
  inheritAttrs: !1
}
</script>
