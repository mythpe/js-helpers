<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <q-tooltip
    class="m--dt-btn-tooltip"
    transition-hide="scale"
    transition-show="scale"
    v-bind="{...($myth.options.tooltip),...($attrs || {})}"
  >
    <slot />
  </q-tooltip>
</template>

<script
  lang="ts"
  setup
>

interface Props {
  noCloseBtn?: boolean;
}

withDefaults(defineProps<Props>(), {
  noCloseBtn: () => !1
})
</script>

<script
  lang="ts"
>

export default {
  name: 'MTooltip',
  inheritAttrs: !1
}
</script>
