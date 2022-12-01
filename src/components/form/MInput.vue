<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts" setup>
import { Field as VeeField } from 'vee-validate'

import { computed, defineProps, onMounted, ref } from 'vue'
import useInputProps from '../../composition/useInputProps'
import { ColStyleType } from '../grid/models'
import { MInputProps } from './models'

interface Props extends MInputProps {
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
  name: undefined,
  label: undefined,
  placeholder: undefined,
  hidePlaceholder: undefined,
  outlined: undefined,
  filled: undefined,
  standout: undefined,
  borderless: undefined,
  rules: undefined,
  required: undefined,
  hideRequired: undefined,
  email: undefined,
  stackLabel: undefined,
  clearable: undefined,
  dense: undefined,
  loading: undefined,
  hideBottomSpace: !0,
  errors: () => ({}),
  modelValue: undefined
})

type EmitsTypes = {
  (e: 'update:modelValue', value: any): void
}
const emit = defineEmits<EmitsTypes>()
/* Emit instead of use ref */
const inputValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
// const inputValue = ref(props.modelValue)

const {
  getRules,
  getLabel,
  getPlaceholder
} = useInputProps(props)

const ready = ref(!1)
onMounted(() => {
  ready.value = !0
})
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>

<template>
  <q-slide-transition>
    <MCol
      v-if="ready"
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
        <q-input
          :borderless="borderless"
          :clearable="clearable"
          :dense="dense"
          :error="fieldScope.errors.length>0"
          :error-message="fieldScope.errorMessage"
          :filled="filled"
          :hide-bottom-space="hideBottomSpace"
          :label="getLabel"
          :loading="loading"
          :model-value="inputValue"
          :outlined="outlined"
          :placeholder="getPlaceholder"
          :stack-label="stackLabel"
          :standout="standout"
          v-bind="{...$attrs,...fieldScope.field}"
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
              v-else-if="slot !== 'default'"
              :name="slot"
            />
          </template>
        </q-input>
        <slot
          v-bind="fieldScope"
        />
      </VeeField>
    </MCol>
  </q-slide-transition>
</template>
