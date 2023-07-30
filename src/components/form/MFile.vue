<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { QFile } from 'quasar'
import useAcceptProp from '../../composition/useAcceptProp'
import { Field as VeeField } from 'vee-validate'
import { computed, defineProps, ref } from 'vue'
import useInputProps from '../../composition/useInputProps'
import { ColStyleType } from '../grid/models'

interface Props {
  auto?: boolean;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  accept?: string;
  images?: boolean;
  video?: boolean;
  pdf?: boolean;
  excel?: boolean;
  outlined?: boolean;
  standout?: boolean | string;
  borderless?: boolean;
  stackLabel?: boolean;
  filled?: boolean;
  dense?: boolean;
  hideBottomSpace?: boolean;
  name?: string;
  label?: string;
  placeholder?: string;
  hidePlaceholder?: boolean;
  required?: boolean;
  hideRequired?: boolean;
  email?: boolean;
  clearable?: boolean;
  loading?: boolean;
  rules?: string | string[];
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
const { getRules, getLabel, getPlaceholder } = useInputProps(props)
const accepts = useAcceptProp(props)
const fileInput = ref<InstanceType<typeof QFile>>()
// const inputValue = ref(props.modelValue)
const inputValue = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
const pickFiles = (...args: any[]) => fileInput.value?.pickFiles(...args)
const removeAtIndex = (...args: any[]) => fileInput.value?.removeAtIndex(...args)

defineExpose({
  pickFiles,
  removeAtIndex
})

</script>

<template>
  <MCol
    :auto="auto"
    :class="$attrs.class"
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
        :model-value="fieldScope.value"
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
        v-bind="{...($myth.options.input||{}),...$attrs}"
        @clear="fieldScope.handleBlur"
        @update:model-value="fieldScope.handleChange"
        @change="fieldScope.handleChange"
        @blur="fieldScope.handleBlur"
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
