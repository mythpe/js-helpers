<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script
  lang="ts"
  setup
>

import { MDtAvatarProps } from './models'

interface Props extends MDtAvatarProps {
  width?: string | undefined
  src?: string | undefined
  href?: string | undefined;
}

withDefaults(defineProps<Props>(), {
  width: '50px',
  src: undefined,
  href: undefined
})
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>

<template>
  <q-avatar
    rounded
    v-bind="$attrs"
  >
    <q-img
      v-if="src"
      :height="width"
      :src="src"
      :width="width"
      class="cursor-pointer"
      fit="contain"
      @click="$myth.openWindow(Boolean(href) ? href: src)"
    />
  </q-avatar>
</template>
