<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <div
    class="m--column column"
    v-bind="{...$myth.options.column,...$attrs}"
  >
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  name: 'MColumn',
  inheritAttrs: !1
}
</script>
