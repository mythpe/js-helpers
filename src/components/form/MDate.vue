<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->
<script lang="ts" setup>
import { MDateProps } from 'src/components/form/models'
import { defineEmits, ref } from 'vue'

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
// const inputValue = computed({
//   get: () => props.modelValue,
//   set: value => emit('update:modelValue', value)
// })
const inputValue = ref(props.modelValue)

</script>
<template>
  <MPicker
    v-model="inputValue"
    type="date"
  />
</template>
