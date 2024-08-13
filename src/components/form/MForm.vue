<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { MFormProps as Props, MFormScope } from './models'
import { reactive } from 'vue'

interface P {
  formProps?: Props['formProps'];
  opts?: Props['opts'];
}

const props = withDefaults(defineProps<P>(), {
  formProps: undefined,
  opts: undefined
})

const formContext = useForm(props.opts)
type Emits = {
  (e: 'submit', evt?: Event, ctx: MFormScope): void;
}
const emit = defineEmits<Emits>()

// const onSuccess: SubmissionHandler = (values, ctx) => {
//   console.log(ctx)
// }
// const onInvalidSubmit: InvalidSubmissionHandler = ({ errors }) => {
//   const keys: (keyof typeof errors)[] = Object.keys(errors)
//   if (keys.length) {
//     console.log(errors[keys[0]])
//     // console.log(keys[0])
//     helpers.scrollToElementFromErrors({
//       [keys[0]]: [
//         errors[keys[0]] as string
//       ]
//     })
//   }
//   // console.log(keys, errors) // current form values
//   // console.log(errors) // a map of field names and their first error message
//   // console.log(results) // a detailed map of field names and their validation results
// }
const scope = reactive(formContext)
const submit = (e?: Event) => {
  e?.preventDefault()
  e?.stopImmediatePropagation()
  emit('submit', e, formContext)
}
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
      <slot v-bind="formContext" />
    </form>
  </div>
</template>
