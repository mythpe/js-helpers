<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

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
    <slot name="beforeField" />
    <VeeField
      v-slot="fieldProps"
      v-model="inputValue"
      :label="label ?? name"
      :name="name"
      :rules="getRules"
      v-bind="$attrs"
    >
      <MColumn>
        <slot
          name="top"
          v-bind="fieldProps"
        />
        <MCol auto>
          <slot
            name="before"
            v-bind="fieldProps"
          />
          <q-checkbox
            :label="getLabel"
            :model-value="modelValue"
            :placeholder="getPlaceholder"
            :val="val"
            v-bind="{...($myth.options.checkbox),...($attrs || {}),...fieldProps.field}"
          >
            <slot />
          </q-checkbox>
          <div
            v-if="fieldProps.errors.length > 0"
            class="text-caption text-negative"
          >
            {{ fieldProps.errorMessage }}
          </div>
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
    <slot name="afterField" />
  </MCol>
</template>

<script lang="ts" setup>
import { Field as VeeField } from 'vee-validate'
import { computed, defineEmits, defineProps } from 'vue'
import useInputProps from '../../composition/useInputProps'
import { MCheckboxProps } from './models'

interface Props {
  auto?: MCheckboxProps['auto'];
  col?: MCheckboxProps['col'];
  xs?: MCheckboxProps['xs'];
  sm?: MCheckboxProps['sm'];
  md?: MCheckboxProps['md'];
  lg?: MCheckboxProps['lg'];
  xl?: MCheckboxProps['xl'];
  name: MCheckboxProps['name'];
  label?: MCheckboxProps['label'];
  modelValue: MCheckboxProps['modelValue'];
  val?: MCheckboxProps['val'];
  required?: MCheckboxProps['required'];
}

const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  name: () => '',
  label: undefined,
  modelValue: undefined,
  val: undefined,
  required: undefined
})

interface Emits {
  (e: 'update:modelValue', value: any): void
}

const emit = defineEmits<Emits>()
const inputValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
const { getRules, getLabel, getPlaceholder } = useInputProps(props)

</script>

<script lang="ts">
export default {
  name: 'MCheckbox',
  inheritAttrs: !1
}
</script>
