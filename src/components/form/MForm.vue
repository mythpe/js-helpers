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
import { reactive } from 'vue'
import { useMyth } from '../../vue3'

interface P {
  formProps?: Props['formProps'];
  opts?: Props['opts'];
  target?: Props['target'];
  emitValues?: Props['emitValues'];
}

const props = withDefaults(defineProps<P>(), {
  formProps: undefined,
  opts: undefined,
  target: undefined,
  emitValues: () => !1
})
const formScope = useForm(props.opts)
const myth = useMyth()
const { handleSubmit } = formScope
type Emits = {
  // (e: 'submit', ctx: SubmissionContext, evt?: Event): void;
  (e: 'submit', values: Record<string, any>, ctx: SubmissionContext, s: typeof formScope): void;
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
const defaultSubmit = props.emitValues
  ? handleSubmit(onSuccessSubmission, onErrorSubmission)
  : handleSubmit.withControlled(onSuccessSubmission, onErrorSubmission)
// const submit = (e?: Event) => {
//   e?.preventDefault()
//   e?.stopImmediatePropagation()
//   emit('submit', formScope, e)
// }
const scope = reactive(formScope)
defineExpose({ ...scope })

// watch(form, (v) => {
//   console.log(v)
// }, { once: !0, deep: !0 })
</script>

<script lang="ts">
export default {
  name: 'MForm',
  inheritAttrs: !1
}
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
