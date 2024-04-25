<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <MPicker
    v-model="inputValue"
    type="time"
    v-bind="$attrs"
  >
    <slot />
  </MPicker>
</template>

<script lang="ts" setup>
import { computed, defineEmits } from 'vue'
import { MTimeProps } from './models'

interface Props {
  modelValue: MTimeProps['modelValue'];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined
})

interface Emits {
  (e: 'update:modelValue', value: any): void
}

const emit = defineEmits<Emits>()
const inputValue = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})

</script>

<script lang="ts">
export default {
  name: 'MTime',
  inheritAttrs: !1
}
</script>
