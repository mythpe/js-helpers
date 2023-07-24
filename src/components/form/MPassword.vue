<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { ref } from 'vue'

const inputType = ref<'text' | 'password'>('password')
</script>
<script lang="ts">

export default {
  name: 'MPassword',
  inheritAttrs: !1
}
</script>

<template>
  <MInput
    v-bind="$attrs"
    :type="inputType"
  >
    <template #prepend>
      <q-icon name="password" />
    </template>
    <template #append>
      <q-btn
        :icon="inputType !== 'password' ? 'visibility_off' : 'visibility'"
        flat
        round
        @click="() => inputType = inputType === 'text' ? 'password' : 'text'"
      />
    </template>
  </MInput>
</template>
