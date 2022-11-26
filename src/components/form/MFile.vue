<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts" setup>

import { QFile } from 'quasar'
import useAcceptProp from 'src/composition/useAcceptProp'
import { Field as VeeField } from 'vee-validate'
import { computed, defineProps, ref } from 'vue'
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
  accept?: string | undefined;
  images?: boolean | undefined;
  video?: boolean | undefined;
  pdf?: boolean | undefined;
  excel?: boolean | undefined;
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
  accept: undefined,
  images: !0,
  video: !1,
  pdf: !1,
  excel: !1,
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

type Events = {
  (e: 'update:modelValue', value: any | undefined): void;
}
const emit = defineEmits<Events>()
// defineEmits<Events>()

const {
  getRules,
  getLabel,
  getPlaceholder
} = useInputProps(props)
const accepts = useAcceptProp(props)
const fileInput = ref<typeof QFile>()
// const inputValue = ref(props.modelValue)
const inputValue = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})

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

// watch(inputValue, (v) => {
//   console.log('watch: ', v)
// })
// const handleChange = (value: any, callback?: (() => void) | undefined) => {
//   console.log(value,callback)
//   // inputValue.value = value
//   if (callback) {
//     callback()
//   }
// }
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
        v-model="inputValue"
        :accept="accepts.join(',')"
        :borderless="borderless"
        :clearable="clearable"
        :dense="dense"
        :error="fieldScope.errors.length > 0"
        :error-message="fieldScope.errorMessage"
        :filled="filled"
        :hide-bottom-space="hideBottomSpace"
        :label="getLabel"
        :loading="loading"
        :outlined="outlined"
        :placeholder="getPlaceholder"
        :stack-label="stackLabel"
        :standout="standout"
        v-bind="$attrs"
        @clear="fieldScope.handleBlur()"
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
    </VeeField>
  </MCol>
</template>
