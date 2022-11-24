<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts" setup>

import { QFile } from 'quasar'
import { Field as VeeField } from 'vee-validate'
import { defineProps, ref } from 'vue'
import useInputProps from '../../composition/useInputProps'
import { ColStyleType } from '../grid/models'
import { MFileProps } from './models'

interface Props extends MFileProps {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  outlined?: boolean | undefined;
  standout?: boolean | string | undefined;
  borderless?: boolean | undefined;
  stackLabel?: boolean | undefined;
  filled?: boolean | undefined;
  dense?: boolean | undefined;
  hideBottomSpace?: boolean | undefined;
  name?: string | undefined;
  label?: string | undefined;
  placeholder?: string | undefined;
  hidePlaceholder?: boolean | undefined;
  required?: boolean | undefined;
  hideRequired?: boolean | undefined;
  email?: boolean | undefined;
  clearable?: boolean | undefined;
  loading?: boolean | undefined;
  rules?: string | string[] | undefined;
  errors?: Record<string, string[]>;
  modelValue: any;
}

const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  outlined: undefined,
  standout: undefined,
  borderless: undefined,
  stackLabel: undefined,
  filled: undefined,
  dense: undefined,
  hideBottomSpace: undefined,
  name: undefined,
  label: undefined,
  placeholder: undefined,
  hidePlaceholder: undefined,
  required: undefined,
  hideRequired: undefined,
  email: undefined,
  clearable: undefined,
  loading: undefined,
  rules: () => ([]),
  errors: () => ({}),
  modelValue: undefined
})

// type Events = {
//   (e: 'update:modelValue', value: any | undefined): void;
// }
// const emit = defineEmits<Events>()

const {
  getRules,
  getLabel,
  getPlaceholder,
  inputErrors
} = useInputProps(props)

const fileInput = ref<typeof QFile>()
const inputValue = ref(props.modelValue)
// const inputValue = computed({
//   get: () => props.modelValue,
//   set: (v) => emit('update:modelValue', v)
// })

const pickFiles = (...args: any[]) => {
  fileInput.value?.pickFiles(...args)
}

const removeAtIndex = (...args: any[]) => {
  fileInput.value?.removeAtIndex(...args)
}
defineExpose({
  pickFiles,
  removeAtIndex
})
</script>

<template>
  <MCol
    :auto="auto"
    :col="col"
    :lg="lg"
    :md="md"
    :sm="sm"
    :xs="xs"
  >
    <VeeField
      v-slot="fieldScope"
      v-model="inputValue"
      :name="name"
      :rules="getRules"
      v-bind="$attrs"
    >
      <q-file
        ref="fileInput"
        :borderless="borderless"
        :clearable="clearable"
        :dense="dense"
        :error="inputErrors.length > 0"
        :error-message="inputErrors[0]"
        :filled="filled"
        :hide-bottom-space="hideBottomSpace"
        :label="getLabel"
        :loading="loading"
        :model-value="inputValue"
        :outlined="outlined"
        :placeholder="getPlaceholder"
        :stack-label="stackLabel"
        :standout="standout"
        v-bind="$attrs"
        @blur="fieldScope.handleBlur"
        @change="fieldScope.handleChange"
      >
        <template
          v-for="(_,slot) in $slots"
          :key="slot"
          #[slot]="inputSlot"
        >
          <slot
            v-if="inputSlot"
            :name="slot"
            v-bind="inputSlot"
          />
          <slot
            v-else
            :name="slot"
          />
        </template>
      </q-file>
      <slot
        v-bind="fieldScope"
      />
    </VeeField>
  </MCol>
</template>
