<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
//
</script>

<template>
  <div
    :for="$attrs.name || undefined"
    class="m--input__top-label"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
