<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { MDateProps as Props, MInputSlots } from './models'
import { ref } from 'vue'
import MInput from './MInput.vue'

type P = {
  name: Props['name'];
  rules?: Props['rules'];
}

const props = withDefaults(defineProps<P>(), {
  name: () => '',
  rules: undefined
})
const modelValue = defineModel<Props['modelValue']>({ required: !1, default: undefined })
const input = ref<InstanceType<typeof MInput> | null>(null)
defineExpose<{ input: typeof input }>({ input })
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

<script lang="ts">
export default {
  name: 'MMobile',
  inheritAttrs: !1
}
</script>
