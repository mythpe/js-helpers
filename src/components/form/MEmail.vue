<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
//
</script>
<template>
  <MInput
    email
    type="email"
    v-bind="$attrs"
  >
    <slot />
  </MInput>
</template>

<script lang="ts">

export default {
  name: 'MEmail',
  inheritAttrs: !1
}
</script>
