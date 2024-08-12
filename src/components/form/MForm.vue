<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { Form as VeeForm, InvalidSubmissionHandler, SubmissionContext, SubmissionHandler, useForm } from 'vee-validate'
import { reactive } from 'vue'
import { MFormProps as Props } from 'src/components/form/models'

type VeeFormElm = InstanceType<typeof VeeForm>

interface P {
  formProps?: Props['formProps'];
  opts?: Props['opts'];
}

const props = withDefaults(defineProps<P>(), {
  formProps: undefined,
  opts: undefined
})

const formContext = useForm(props.opts)
const { handleSubmit } = formContext
// (cb: SubmissionHandler<TValues, TOutput, TReturn>, onSubmitValidationErrorCb?: InvalidSubmissionHandler<TValues, TOutput>)
type Events = {
  (e: 'submit', values: Record<string, any>, ctx: SubmissionContext): void;
}
const emit = defineEmits<Events>()
// const onSubmit = (values: Record<string, any>, ctx: SubmissionContext): void => emit('submit', values, ctx)

const onSuccess: SubmissionHandler = (values, ctx) => {
  console.log(ctx)
}

const onInvalidSubmit: InvalidSubmissionHandler = (values) => {
  console.log(values) // current form values
  // console.log(errors) // a map of field names and their first error message
  // console.log(results) // a detailed map of field names and their validation results
}

const submit = (e?: Event) => {
  e?.preventDefault()
  e?.stopImmediatePropagation()

  const a = handleSubmit(onSuccess, onInvalidSubmit)
  const onSubmit = handleSubmit((...values) => {
    console.log(values)
  })
  onSubmit(e)
  console.log(e)
}
const scope = reactive(formContext)
defineExpose({ ...scope })
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
      @submit="submit"
    >
      <slot v-bind="scope" />
    </form>
  </div>
</template>
