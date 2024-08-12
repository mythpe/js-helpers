<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { MInputSlots, MTimeProps } from './models'
import { ref } from 'vue'
import MPicker from './MPicker.vue'

const modelValue = defineModel<MTimeProps['modelValue']>({ required: !1, default: null })
const input = ref<InstanceType<typeof MPicker> | null>(null)
defineExpose<{ input: typeof input }>({ input })
</script>

<script lang="ts">
export default {
  name: 'MTime'
}
</script>

<template>
  <MPicker
    ref="input"
    v-model="modelValue"
    type="time"
  >
    <template
      v-for="(_,slot) in ($slots as Readonly<MInputSlots>)"
      :key="slot"
      #[slot]
    >
      <slot :name="slot" />
    </template>
  </MPicker>
</template>
