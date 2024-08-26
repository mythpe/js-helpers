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
import MPicker from './MPicker.vue'

type P = {
  name: Props['name'];
  rules?: Props['rules'];
}
withDefaults(defineProps<P>(), {
  name: () => '',
  rules: undefined
})
const modelValue = defineModel<Props['modelValue']>({ required: !1, default: undefined })
const input = ref<InstanceType<typeof MPicker> | null>(null)
defineExpose<{ input: typeof input }>({ input })
defineOptions({ name: 'MDate', inheritAttrs: !1 })
</script>

<template>
  <MPicker
    ref="input"
    v-model="modelValue"
    v-bind="{...$attrs,type:'date',name}"
  >
    <template
      v-for="(_,slot) in $slots as Readonly<MInputSlots>"
      :key="slot"
      #[slot]
    >
      <slot :name="slot" />
    </template>
  </MPicker>
</template>
