<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { useField } from 'vee-validate'
import { MHiddenProps as Props } from './models.d'
import { reactive, toValue } from 'vue'
import { useInputHelper } from '../../composables'

type P = {
  name: Props['name'];
  auto?: Props['auto'];
  col?: Props['col'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
  rules?: Props['rules'];
  required?: Props['required'];
  fieldOptions?: Props['modelValue'];
  viewMode?: Props['viewMode'];
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
  rules: undefined,
  required: () => !1,
  fieldOptions: undefined,
  viewMode: () => !1
})
defineModel<Props['modelValue']>({ required: !1, default: undefined })
const helper = useInputHelper<P>(() => props, 'input')
const { getRules, getLabel } = helper
const inputScope = useField<Props['modelValue']>(() => props.name, getRules, {
  syncVModel: !0,
  label: getLabel,
  validateOnValueUpdate: !1,
  validateOnMount: !1,
  controlled: !0,
  ...toValue<any>(props.fieldOptions)
})
const { value, errorMessage } = inputScope

const scopes = reactive(inputScope)
defineExpose<typeof scopes>({ ...scopes })
defineOptions({ name: 'MHidden', inheritAttrs: !1 })
</script>

<template>
  <MCol
    :auto="auto"
    :class="[$attrs.class,{'m--input__required':getRules?.required!==undefined,'m--input__error':!!errorMessage,'m--input__view':viewMode}]"
    :col="col"
    :lg="lg"
    :md="md"
    :name="name"
    :sm="sm"
    :xs="xs"
  >
    <input
      v-model="value"
      v-bind="{...$attrs,type: 'hidden' }"
    >
    <slot />
  </MCol>
</template>
