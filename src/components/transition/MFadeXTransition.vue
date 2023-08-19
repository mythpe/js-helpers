<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->
<script
  lang="ts"
>
export default {
  inheritAttrs: !1
}
</script>

<template>
  <Transition
    appear
    name="myth-transition__fade-x"
    v-bind="$attrs"
  >
    <slot />
  </Transition>
</template>
