<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->
<script lang="ts" setup>
import { computed, defineEmits } from 'vue'
import { MDateProps } from './models'

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
    type="time"
    v-bind="$attrs"
  />
</template>
