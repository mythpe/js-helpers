<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->
<script lang="ts" setup>
import { MDateProps } from './models'
import { computed, defineEmits } from 'vue'

interface Props extends MDateProps {
  modelValue: any
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
// const inputValue = ref(props.modelValue)

</script>
<template>
  <MPicker
    v-model="inputValue"
    type="date"
    v-bind="$attrs"
  />
</template>
