<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <VeeForm
    v-bind="$attrs"
    ref="veeForm"
    v-slot="v"
    as=""
  >
    <form
      @submit="v.handleSubmit($event, onSubmit)"
      v-bind="formProps"
    >
      <slot v-bind="v" />
    </form>
  </VeeForm>
</template>

<script lang="ts" setup>
import { Form as VeeForm, SubmissionContext } from 'vee-validate'
import { nextTick, ref, watch } from 'vue'
import { MFormProps } from './models'

type VeeFormElm = InstanceType<typeof VeeForm>

interface Props extends MFormProps {
  form?: Record<string, any>;
  errors?: Record<string, string[]>;
  formProps?: Record<string, any>;
}

withDefaults(defineProps<Props>(), {
  form: () => ({}),
  errors: () => ({}),
  formProps: undefined
})

type Events = {
  (e: 'submit', values: Record<string, any>, ctx: SubmissionContext): void;
}

const emit = defineEmits<Events>()
const veeForm = ref<VeeFormElm>()
const onSubmit = (values: Record<string, any>, ctx: SubmissionContext): void => emit('submit', values, ctx)
const setFieldValue: VeeFormElm['setFieldValue'] = (...args: Parameters<VeeFormElm['setFieldValue']>) => veeForm.value?.setFieldValue(...args)
const setFieldError: VeeFormElm['setFieldError'] = (...args: Parameters<VeeFormElm['setFieldError']>) => veeForm.value?.setFieldError(...args)
const setErrors: VeeFormElm['setErrors'] = (...args: Parameters<VeeFormElm['setErrors']>) => veeForm.value?.setErrors(...args)
const setValues: VeeFormElm['setValues'] = (...args: Parameters<VeeFormElm['setValues']>) => veeForm.value?.setValues(...args)
const setFieldTouched: VeeFormElm['setFieldTouched'] = (...args: Parameters<VeeFormElm['setFieldTouched']>) => veeForm.value?.setFieldTouched(...args)
const setTouched: VeeFormElm['setTouched'] = (...args: Parameters<VeeFormElm['setTouched']>) => veeForm.value?.setTouched(...args)
const resetForm: VeeFormElm['resetForm'] = (...args: Parameters<VeeFormElm['resetForm']>) => veeForm.value?.resetForm(...args)
const resetField: VeeFormElm['resetField'] = (...args: Parameters<VeeFormElm['resetField']>) => veeForm.value?.resetField(...args)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const validate: VeeFormElm['validate'] = (...args: Parameters<VeeFormElm['validate']>) => veeForm.value?.validate(...args)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const validateField: VeeFormElm['validateField'] = (...args: Parameters<VeeFormElm['validateField']>) => veeForm.value?.validateField(...args)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const getValues: VeeFormElm['getValues'] = (...args: Parameters<VeeFormElm['getValues']>) => veeForm.value?.getValues(...args)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const getMeta: VeeFormElm['getMeta'] = (...args: Parameters<VeeFormElm['getMeta']>) => veeForm.value?.getMeta(...args)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const getErrors: VeeFormElm['getErrors'] = (...args: Parameters<VeeFormElm['getErrors']>) => veeForm.value?.getErrors(...args)

defineExpose({
  setFieldValue,
  setFieldError,
  setErrors,
  setValues,
  setFieldTouched,
  setTouched,
  resetForm,
  resetField,
  validate,
  validateField,
  getValues,
  getMeta,
  getErrors
})

// watch(() => props.errors, (v) => {
//   // setErrors(v || {})
//   nextTick(() => {
//     // setTouched(Object.keys(v))
//   })
// })

// watch(() => props.form, (v) => setValues(v))
// onBeforeMount(() => {
// console.log(props.errors)
// setValues(props.form)
// })
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
