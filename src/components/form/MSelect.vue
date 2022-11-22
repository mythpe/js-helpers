<!--
  - MyTh Ahmed Faiz Copyright © 2016-2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts" setup>
import { Field as VeeField } from 'vee-validate'
import { defineProps } from 'vue'
import useInputProps from '../../composition/useInputProps'
import { ColStyleType } from '../grid/models'
import { MSelectProps } from './models'

interface Props extends MSelectProps {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  behavior?: 'default' | 'menu' | 'dialog' | undefined;
  borderless?: boolean | undefined;
  dense?: boolean | undefined;
  emitValue?: boolean | undefined;
  filled?: boolean | undefined;
  hideBottomSpace?: boolean | undefined;
  inputDebounce?: number | string | undefined;
  mapOptions?: boolean | undefined;
  optionLabel?: ((option: string | any) => string) | string | undefined;
  optionsDense?: boolean | undefined;
  outlined?: boolean | undefined;
  stackLabel?: boolean | undefined;
  standout?: boolean | string | undefined;
  useInput?: boolean | undefined;
  name: string | undefined;
  label?: string | undefined;
  required?: boolean | undefined;
  hideRequired?: boolean | undefined;
  clearable?: boolean | undefined;
  loading?: boolean | undefined;
  rules?: string | string[] | undefined;
  errors?: Record<string, string[]>;
  modelValue: any;
  options: any[];
}

const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  behavior: undefined,
  borderless: undefined,
  dense: undefined,
  emitValue: !0,
  filled: undefined,
  hideBottomSpace: undefined,
  inputDebounce: 3,
  mapOptions: !0,
  optionLabel: 'text',
  optionsDense: !0,
  outlined: undefined,
  stackLabel: undefined,
  standout: undefined,
  useInput: !1,
  name: undefined,
  label: undefined,
  required: undefined,
  hideRequired: undefined,
  clearable: undefined,
  loading: undefined,
  rules: undefined,
  errors: undefined,
  modelValue: undefined,
  options: () => ([])
})

const {
  getRules,
  getLabel
} = useInputProps(props)
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>

<template>
  <q-slide-transition>
    <m-col
      :auto="auto"
      :col="col"
      :lg="lg"
      :md="md"
      :sm="sm"
      :xs="xs"
    >
      <VeeField
        v-slot="fieldProps"
        :name="name"
        :rules="getRules"
        v-bind="$attrs"
      >
        <q-select
          :behavior="$q.platform.is.ios === !0 ? 'dialog' : behavior"
          :borderless="borderless"
          :clearable="clearable"
          :dense="dense"
          :emit-value="emitValue"
          :error="fieldProps.errors.length>0"
          :error-message="fieldProps.errorMessage"
          :filled="filled"
          :hide-bottom-space="hideBottomSpace"
          :input-debounce="inputDebounce"
          :label="getLabel"
          :loading="loading"
          :map-options="mapOptions"
          :model-value="modelValue"
          :option-label="optionLabel"
          :options="options"
          :options-dense="optionsDense"
          :outlined="outlined"
          :stack-label="stackLabel"
          :standout="standout"
          :use-input="useInput"
          v-bind="{...$attrs,...fieldProps.field}"
        >
          <template #no-option>
            <slot name="no-option">
              <q-item>
                <q-item-section class="text-italic text-grey">
                  {{ $t('messages.no_items') }}
                </q-item-section>
              </q-item>
            </slot>
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
        </q-select>
        <slot
          v-bind="fieldProps"
        />
      </VeeField>
    </m-col>
  </q-slide-transition>
</template>