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
import { reactive, useAttrs } from 'vue'
import { useInputHelper } from '../../composables'

type P = {
  name: Props['name'];
  rules?: Props['rules'];
  required?: Props['required'];
}

const props = withDefaults(defineProps<P>(), {
  name: () => '',
  rules: undefined,
  required: () => !1
})
defineModel<Props['modelValue']>({ required: !1, default: undefined })
const attrs = useAttrs()
const helper = useInputHelper<P>(() => props, 'input', () => ({ attrs }))
const { getRules, getLabel } = helper
const inputScope = useField<Props['modelValue']>(() => props.name, getRules, {
  syncVModel: !0,
  label: getLabel,
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
    v-model="value"
    :class="[$attrs.class, {'m--input__required': !!getRules?.required && !value }]"
    v-bind="{...$attrs,type: 'hidden' }"
  >
</template>
