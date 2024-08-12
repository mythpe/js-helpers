<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { MInputSlots, MPasswordProps as Props } from './models'
import MInput from './MInput.vue'

const inputType = ref<'text' | 'password'>('password')

type P = {
  icon?: Props['icon'];
  noToggle?: Props['noToggle'];
}
withDefaults(defineProps<P>(), {
  icon: () => !1,
  noToggle: () => !1
})

const togglePassword = () => {
  inputType.value = inputType.value === 'text' ? 'password' : 'text'
}
const input = ref<InstanceType<typeof MInput> | null>(null)
defineExpose<{ input: typeof input }>({ input })
</script>

<script lang="ts">
export default {
  name: 'MPassword',
  inheritAttrs: !1
}
</script>

<template>
  <MInput
    ref="input"
    :type="inputType"
    v-bind="$attrs"
  >
    <template
      v-if="icon && !Boolean($slots.prepend)"
      #prepend
    >
      <q-icon name="password" />
    </template>
    <template
      v-if="!noToggle && !Boolean($slots.prepend)"
      #append
    >
      <q-btn
        :icon="'ion-ios-eye' + (inputType !== 'password' ? '-off' : '')"
        flat
        round
        @click="togglePassword()"
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
