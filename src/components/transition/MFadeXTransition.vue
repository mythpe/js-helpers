<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <Transition
    appear
    name="myth-transition__fade-x"
    v-bind="$attrs"
  >
    <slot />
  </Transition>
</template>

<script lang="ts">
export default {
  name: 'MFadeXTransition',
  inheritAttrs: !1
}
</script>
