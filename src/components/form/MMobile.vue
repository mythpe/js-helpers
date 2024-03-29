<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <MInput
    v-bind="$attrs"
    mobile
  >
    <slot />
  </MInput>
</template>

<script lang="ts">
export default {
  name: 'MMobile',
  inheritAttrs: !1
}
</script>
