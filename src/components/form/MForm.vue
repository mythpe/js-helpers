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
import { nextTick, reactive, watch } from 'vue'
import { useMyth } from '../../vue3'

interface P {
  formProps?: Props['formProps'];
  opts?: Props['opts'];
  target?: Props['target'];
  emitValues?: Props['emitValues'];
  readonly form?: Props['form'];
}

const props = withDefaults(defineProps<P>(), {
  formProps: undefined,
  opts: undefined,
  target: undefined,
  emitValues: () => !1,
  form: undefined
})
const formScope = useForm<Record<string, any>>(props.opts)
const myth = useMyth()
const { handleSubmit, resetForm } = formScope
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
defineExpose({ ...scope })
defineOptions({ name: 'MForm', inheritAttrs: !1 })
watch(() => props.form, (v) => {
  if (v) {
    resetForm({ values: v, errors: {}, touched: {} })
  }
}, { deep: !0, immediate: !0, once: !0 })
</script>

<template>
  <div
    class="m--form__container"
    v-bind="$attrs"
  >
    <form
      class="m--form"
      v-bind="formProps"
      @submit="defaultSubmit"
    >
      <slot
        v-bind="scope"
      />
    </form>
  </div>
</template>
