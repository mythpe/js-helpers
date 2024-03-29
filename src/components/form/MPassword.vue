<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <MInput
    :type="inputType"
    v-bind="$attrs"
  >
    <template
      v-if="passwordIcon && !Boolean($slots.prepend)"
      #prepend
    >
      <q-icon name="password" />
    </template>
    <template #append>
      <q-btn
        :icon="'ion-ios-eye' + (inputType !== 'password' ? '-off' : '')"
        flat
        round
        @click="inputType = inputType === 'text' ? 'password' : 'text'"
      />
    </template>
    <template
      v-for="(_,slot) in ($slots as Readonly<MInputSlots>)"
      :key="slot"
      #[slot]
    >
      <slot :name="slot" />
    </template>
  </MInput>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { MInputSlots } from './models'

const inputType = ref<'text' | 'password'>('password')
</script>
<script lang="ts">

export default {
  name: 'MPassword',
  inheritAttrs: !1,
  props: {
    passwordIcon: {
      type: Boolean,
      default: () => !1
    }
  }
}
</script>
