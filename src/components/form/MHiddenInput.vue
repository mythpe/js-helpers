<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { useField } from 'vee-validate'
import { MHiddenInputProps as Props } from './models.d'
import { reactive } from 'vue'

type P = {
  name: Props['name'];
}

const props = withDefaults(defineProps<P>(), {
  name: () => '',
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  // modelValue: undefined,
  label: undefined,
  caption: undefined,
  hint: undefined,
  placeholder: undefined,
  help: undefined,
  required: undefined,
  rules: undefined,
  errors: undefined,
  viewMode: () => !1,
  viewModeValue: undefined,
  autocomplete: undefined,
  topLabel: undefined
})
const modelValue = defineModel<Props['modelValue']>({ required: !0, default: undefined })
const inputScope = useField<Props['modelValue']>(() => props.name, undefined, {
  initialValue: modelValue,
  validateOnValueUpdate: !1,
  validateOnMount: !1,
  controlled: !0
})
const { value } = inputScope

const scopes = reactive(inputScope)
defineExpose<typeof scopes>({ ...scopes })
</script>

<script lang="ts">
export default {
  name: 'MHiddenInput',
  inheritAttrs: !1
}
</script>

<template>
  <input
    :value="value"
    type="hidden"
  >
</template>
