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
    v-slot="v"
    :initial-errors="errors"
    :initial-values="form"
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

<script lang="ts">
import { Form as VeeForm, SubmissionContext } from 'vee-validate'
import { defineComponent, PropType } from 'vue'

interface Props {
  form?: Record<string, any>;
  errors?: Record<string, string[]>;
  formProps?: Record<string, any>;
}

export default defineComponent({
  inheritAttrs: !1,
  components: { VeeForm },
  props: {
    form: {
      type: Object as PropType<Props['form']>,
      required: !1,
      default: () => undefined
    },
    errors: {
      type: Object as PropType<Props['errors']>,
      required: !1,
      default: () => undefined
    },
    formProps: {
      type: Object as PropType<Props['formProps']>,
      required: !1,
      default: () => undefined
    }
  },
  extends: [VeeForm],
  emits: ['submit'],
  setup (props, { emit }) {
    // type Events = {
    //   (e: 'submit', values: Record<string, any>, ctx: SubmissionContext): void;
    // }
    // const emit = defineEmits<Events>()
    const onSubmit = (values: Record<string, any>, ctx: SubmissionContext) => {
      // console.log(values, ctx)
      emit('submit', values, ctx)
    }
    console.log(VeeForm)
    return {
      onSubmit
    }
  }
})
</script>
