<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { MInputProps as Props, MInputSlots } from './models'
import { ref } from 'vue'
import MInput from './MInput.vue'

const modelValue = defineModel<Props['modelValue']>({ required: !1, default: undefined })
const input = ref<InstanceType<typeof MInput> | null>(null)
defineExpose<{ input: typeof input }>({ input })
defineOptions({ name: 'MMobile', inheritAttrs: !1 })
</script>

<template>
  <MInput
    ref="input"
    v-model="modelValue"
    type="tel"
    v-bind="{...$myth.options.mobile,...$attrs}"
  >
    <template
      v-for="(_,slot) in $slots as Readonly<MInputSlots>"
      :key="slot"
      #[slot]
    >
      <slot :name="slot" />
    </template>
  </MInput>
</template>
