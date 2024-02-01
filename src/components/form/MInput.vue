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
    <template v-if="viewMode">
      <q-field
        :label="getLabel"
        :placeholder="getPlaceholder"
        stack-label
        v-bind="{...($myth.options.input||{}),...($attrs || {})}"
      >
        <template #control>
          <div
            class="self-center full-width no-outline ellipsis"
            tabindex="0"
          >
            {{ viewModeValue || inputValue }}
          </div>
        </template>
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
      </q-field>
    </template>
    <VeeField
      v-else
      ref="veeFieldRef"
      v-slot="fieldScope"
      v-model="inputValue"
      :name="name"
      :rules="getRules"
      v-bind="$attrs"
    >
      <q-input
        :error="fieldScope.errors.length > 0"
        :error-message="fieldScope.errorMessage"
        :label="getLabel"
        :model-value="inputValue"
        :placeholder="getPlaceholder"
        :stack-label="stackLabel"
        v-bind="{...($myth.options.input||{}),...($attrs || {}),...fieldScope.field}"
        @update:model-value="fieldScope.handleChange"
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
      <slot v-bind="fieldScope" />
    </VeeField>
  </MCol>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'
import { Field as VeeField } from 'vee-validate'
import useInputProps from '../../composition/useInputProps'
import { MInputProps } from './models'

interface Props {
  name?: MInputProps['name'];
  auto?: MInputProps['auto'];
  col?: MInputProps['col'];
  xs?: MInputProps['xs'];
  sm?: MInputProps['sm'];
  md?: MInputProps['md'];
  lg?: MInputProps['lg'];
  xl?: MInputProps['xl'];
  label?: MInputProps['label'];
  stackLabel?: MInputProps['stackLabel'];
  placeholder?: MInputProps['placeholder'];
  hidePlaceholder?: MInputProps['hidePlaceholder'];
  required?: MInputProps['required'];
  hideRequired?: MInputProps['hideRequired'];
  email?: MInputProps['email'];
  mobile?: MInputProps['mobile'];
  rules?: MInputProps['rules'];
  errors?: MInputProps['errors'];
  modelValue?: MInputProps['modelValue'];
  viewMode?: MInputProps['viewMode'];
  viewModeValue?: MInputProps['viewModeValue'];
}

const props = withDefaults(defineProps<Props>(), {
  name: () => '',
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  label: undefined,
  stackLabel: undefined,
  placeholder: undefined,
  hidePlaceholder: undefined,
  required: undefined,
  hideRequired: undefined,
  email: undefined,
  mobile: undefined,
  rules: undefined,
  errors: undefined,
  modelValue: undefined,
  viewMode: () => !1,
  viewModeValue: undefined
})
type EmitsTypes = {
  (e: 'update:modelValue', value: any): void
}
const emit = defineEmits<EmitsTypes>()
const inputValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
const { getRules, getLabel, getPlaceholder } = useInputProps(props)
</script>

<script lang="ts">
export default {
  name: 'MInput',
  inheritAttrs: !1
}
</script>
