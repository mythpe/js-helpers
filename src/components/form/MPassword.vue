<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts">

import { ref } from 'vue'

export default {
  name: 'MPassword',
  data: () => ({
    inputType: ref<'text' | 'password'>('password')
  })
}
</script>

<template>
  <MInput
    :type="inputType"
  >
    <template #prepend>
      <q-icon name="password" />
    </template>
    <template #after>
      <q-btn
        :icon="inputType !== 'password' ? 'visibility_off' : 'visibility'"
        flat
        round
        @click="() => inputType = inputType === 'text' ? 'password' : 'text'"
      />
    </template>
  </MInput>
</template>
