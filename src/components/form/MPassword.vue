<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { MInputSlots, MPasswordProps } from './models'

const inputType = ref<'text' | 'password'>('password')

type Props = {
  icon?: MPasswordProps['icon'];
  noToggle?: MPasswordProps['noToggle'];
}
withDefaults(defineProps<Props>(), {
  icon: () => !1,
  noToggle: () => !1
})

const togglePassword = () => {
  inputType.value = inputType.value === 'text' ? 'password' : 'text'
}
</script>

<script lang="ts">
export default {
  name: 'MPassword',
  inheritAttrs: !1
}
</script>

<template>
  <MInput
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
      #append
      v-if="!noToggle && !Boolean($slots.prepend)"
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
