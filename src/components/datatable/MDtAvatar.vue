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
}

withDefaults(defineProps<Props>(), {
  width: '50px',
  src: undefined
})

</script>

<template>
  <q-avatar
    v-if="src"
    rounded
  >
    <q-img
      :height="width"
      :src="src"
      :width="width"
      class="cursor-pointer"
      fit="contain"
      @click="$myth.openWindow(src)"
    />
  </q-avatar>
</template>
