<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <VeeForm
    ref="veeFormRef"
    v-bind="$attrs"
    v-slot="v"
    :initial-errors="errors"
    :initial-values="form"
    as=""
  >
    <form @submit="v.handleSubmit($event, onSubmit)">
      <slot v-bind="v" />
    </form>
  </VeeForm>
</template>

<script lang="ts" setup>
import { Form as VeeForm, SubmissionContext } from 'vee-validate'
import { nextTick, ref, UnwrapNestedRefs, watch } from 'vue'
import { MFormProps } from './models'

interface Props {
  form?: Record<string, any>;
  errors?: Record<string, string[]>;
}

const props = withDefaults(defineProps<Props>(), {
  form: () => ({}),
  errors: () => ({})
})

type Events = {
  (e: 'submit', values: Record<string, any>, ctx: SubmissionContext): void;
}
const emit = defineEmits<Events>()
const veeFormRef = ref()
const onSubmit = (values: Record<string, any>, ctx: SubmissionContext) => {
  // console.log(values, ctx)
  emit('submit', values, ctx)
}
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
