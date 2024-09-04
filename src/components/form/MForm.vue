<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { InvalidSubmissionHandler, SubmissionContext, SubmissionHandler, useForm } from 'vee-validate'
import { MFormProps as Props } from './models'
import { reactive, watch } from 'vue'
import { useMyth } from '../../vue3'

interface P {
  formProps?: Props['formProps'];
  opts?: Props['opts'];
  target?: Props['target'];
  emitValues?: Props['emitValues'];
  readonly state?: Props['state'];
  readonly form?: Props['form'];
  readonly values?: Props['values'];
  readonly errors?: Props['errors'];
  readonly padding?: Props['padding'];
}

const props = withDefaults(defineProps<P>(), {
  formProps: undefined,
  opts: undefined,
  target: undefined,
  emitValues: () => !1,
  state: undefined,
  form: undefined,
  values: undefined,
  errors: () => ({}),
  padding: undefined
})
const formScope = useForm<Record<string, any>>(props.opts)
const myth = useMyth()
const { handleSubmit, resetForm, setErrors, setValues } = formScope
type Emits = {
  (e: 'submit', values: Record<string, any>, ctx: SubmissionContext, scope: typeof formScope): void;
}
const emit = defineEmits<Emits>()
const onSuccessSubmission: SubmissionHandler = async (values, ctx) => emit('submit', values, ctx, formScope)
const onErrorSubmission: InvalidSubmissionHandler = ({ errors }) => {
  const keys: (keyof typeof errors)[] = Object.keys(errors)
  if (keys.length) {
    const message = errors[keys[0]] as string || myth.__('messages.the_given_data_was_invalid')
    myth.helpers.scrollToElementFromErrors({ [keys[0]]: [message] }, undefined, props.target)
  }
}
const defaultSubmit = props.emitValues ? handleSubmit(onSuccessSubmission, onErrorSubmission) : handleSubmit.withControlled(onSuccessSubmission,
  onErrorSubmission)
const scope = reactive(formScope)
defineExpose({ ...scope, defaultSubmit })
defineOptions({ name: 'MForm', inheritAttrs: !1 })
const options = { deep: !0, immediate: !0 }
watch(() => props.state, v => v && resetForm(v), options)
watch(() => props.form, v => v && resetForm({ values: v, errors: {}, touched: {} }), options)
watch(() => props.values, v => v && setValues(v), options)
watch(() => props.errors, e => e && setErrors(e), options)
</script>

<template>
  <div
    class="m--form__container"
    v-bind="$attrs"
  >
    <form
      :class="{'m--form': !0, 'm--container': padding}"
      v-bind="formProps"
      @submit="defaultSubmit"
    >
      <slot v-bind="scope" />
    </form>
  </div>
</template>
