<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts" setup>
import { Form as VeeForm } from 'vee-validate'
import { nextTick, ref, UnwrapNestedRefs, watch } from 'vue'
import { MFormProps } from './models'

interface Props extends MFormProps {
  form?: UnwrapNestedRefs<Record<string, any>> | undefined;
  errors?: UnwrapNestedRefs<Record<string, string[]>> | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  form: () => ({}),
  errors: () => ({})
})

type Events = {
  (e: 'submit', evt?: Event): void;
// (e: 'update:form', values?: any): void;
// (e: 'update:errors', values?: any): void;
}
const emit = defineEmits<Events>()

watch(() => props.errors, (v) => {
  setErrors(v || {})
  // console.log(v)
  nextTick(() => {
    setTouched(Object.keys(v))
  })
})

watch(() => props.form, (v) => setValues(v))
const onSubmit = (...args: any[]): void => {
  emit('submit', ...args)
}

const veeForm = ref<typeof VeeForm>()
const resetForm = (...args: any[]) => {
  if (veeForm.value) {
    veeForm.value?.resetForm(...args)
  }
}
const validate = (...args: any[]) => {
  if (veeForm.value) {
    veeForm.value?.validate(...args)
  }
}
const setTouched = (...args: any[]) => {
  if (veeForm.value) {
    veeForm.value?.setTouched(...args)
  }
}
const setErrors = (...args: any[]) => {
  if (veeForm.value) {
    veeForm.value?.setErrors(...args)
  }
}
const setValues = (...args: any[]) => {
  if (veeForm.value) {
    veeForm.value?.setValues(...args)
  }
}
const validateField = (...args: any[]) => {
  if (veeForm.value) {
    veeForm.value?.validateField(...args)
  }
}
const setFieldTouched = (...args: any[]) => {
  if (veeForm.value) {
    veeForm.value?.setFieldTouched(...args)
  }
}
const setFieldError = (...args: any[]) => {
  if (veeForm.value) {
    veeForm.value?.setFieldError(...args)
  }
}
const setFieldValue = (...args: any[]) => {
  if (veeForm.value) {
    veeForm.value?.setFieldValue(...args)
  }
}

defineExpose({
  resetForm,
  validate,
  setTouched,
  setErrors,
  setValues,
  validateField,
  setFieldTouched,
  setFieldError,
  setFieldValue
})

// onBeforeMount(() => {
// console.log(props.errors)
// setValues(props.form)
// })
</script>

<script lang="ts">
export default {
  // inheritAttrs: false
}
</script>

<template>
  <VeeForm
    ref="veeForm"
    v-slot="v"
    :initial-errors="errors"
    :initial-values="form"
    as="div"
    class="m--form"
  >
    <form @submit="v.handleSubmit($event, onSubmit)">
      <slot v-bind="v" />
    </form>
  </VeeForm>
</template>

<style scoped>
.m--form {
  /*width: 100%;*/
}
</style>
