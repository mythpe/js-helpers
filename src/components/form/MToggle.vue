<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { useMyth } from '../../vue3'
import { Field as VeeField } from 'vee-validate'
import { computed } from 'vue'
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
  borderless?: boolean | undefined;
  clearable?: boolean | undefined;
  dense?: boolean | undefined;
  modelValue?: any | undefined;
  val?: any | undefined;
  name?: string | undefined;
  label?: string | undefined;
  activeLabel?: string;
  inactiveLabel?: string;
  trueValue?: any | undefined;
  falseValue?: any | undefined;
  color?: string | undefined;
  checkedIcon?: string | undefined;
  uncheckedIcon?: string | undefined;
  toggleIndeterminate?: boolean | undefined;
  statusLabels?: boolean | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  borderless: undefined,
  clearable: undefined,
  dense: undefined,
  modelValue: undefined,
  val: undefined,
  name: undefined,
  label: undefined,
  activeLabel: 'yes',
  inactiveLabel: 'no',
  trueValue: !0,
  falseValue: !1,
  color: 'primary',
  checkedIcon: 'check',
  uncheckedIcon: 'cancel',
  toggleIndeterminate: !1,
  statusLabels: !1
})
const { getRules } = useInputProps(props)
const { __ } = useMyth()
type Events = {
  (e: 'update:modelValue', value: any): void;
}
const emit = defineEmits<Events>()
const inputValue = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})

const topLabel = computed<string | null>(() => __(props.label === undefined ? props.name : props.label) ?? null)

const getLabel = computed<string | undefined>(() => {
  const v = props.modelValue
  if (v === props.trueValue) {
    return __(props.statusLabels ? 'active' : props.activeLabel) || undefined
  }
  if (v === props.falseValue) {
    return __(props.statusLabels ? 'inactive' : props.inactiveLabel) || undefined
  }
  return __('none') || undefined
})

</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
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
      v-slot="fieldProps"
      v-model="inputValue"
      :name="name"
      :rules="getRules"
      v-bind="$attrs"
    >
      <MColumn>
        <slot
          name="top"
          v-bind="fieldProps"
        />
        <div v-if="topLabel">
          {{ topLabel }}
        </div>
        <MCol auto>
          <slot
            name="before"
            v-bind="fieldProps"
          />
          <q-toggle
            :borderless="borderless"
            :checked-icon="checkedIcon"
            :clearable="clearable"
            :color="color"
            :dense="dense"
            :error="fieldProps.errors.length>0"
            :error-message="fieldProps.errorMessage"
            :false-value="falseValue"
            :label="getLabel"
            :model-value="modelValue"
            :toggle-indeterminate="toggleIndeterminate"
            :true-value="trueValue"
            :unchecked-icon="uncheckedIcon"
            keep-color
            v-bind="{...($myth.options.toggle||{}),...($attrs || {}),...fieldProps.field}"
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
            <slot />
          </q-toggle>
          <slot
            name="after"
            v-bind="fieldProps"
          />
        </MCol>
        <slot
          name="bottom"
          v-bind="fieldProps"
        />
      </MColumn>
    </VeeField>
  </MCol>
</template>
