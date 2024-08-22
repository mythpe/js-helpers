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

const modelValue = defineModel<Props['modelValue']>({ required: !1, default: undefined })
const input = ref<InstanceType<typeof MInput> | null>(null)
defineExpose<{ input: typeof input }>({ input })
</script>

<template>
  <MInput
    ref="input"
    v-model="modelValue"
    v-bind="$attrs"
  >
    <template #prepend>
      <div :style="`width: 20px; height: 20px; background-color: ${modelValue}`" />
    </template>
    <template #append>
      <q-icon
        class="cursor-pointer"
        name="colorize"
      >
        <q-popup-proxy
          cover
          transition-hide="scale"
          transition-show="scale"
        >
          <q-color
            v-model="modelValue"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
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
  name: 'MColor',
  inheritAttrs: !1
}
</script>
