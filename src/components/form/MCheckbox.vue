<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts" setup>
import { getMyThPluginOptions } from '../../utils/Const'
import { Field as VeeField } from 'vee-validate'
import { defineProps, ref } from 'vue'
import useInputProps from '../../composition/useInputProps'
import { ColStyleType } from '../grid/models'
import { MCheckboxProps } from './models'

interface Props extends MCheckboxProps {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  name: string;
  modelValue: any;
  val?: any | undefined;
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
  modelValue: undefined,
  val: undefined
})
const inputValue = ref(props.modelValue)
const {
  getRules,
  getLabel,
  getPlaceholder
} = useInputProps(props)
const def = getMyThPluginOptions().options?.button || {}

</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>

<template>
  <MCol
    :auto="auto"
    :col="col"
    :lg="lg"
    :md="md"
    :sm="sm"
    :xs="xs"
    :class="$attrs.class"
  >
    <VeeField
      v-slot="fieldProps"
      v-model="inputValue"
      :name="name"
      :rules="getRules"
      v-bind="$attrs"
    >
      <q-checkbox
        :error="fieldProps.errors.length>0"
        :error-message="fieldProps.errorMessage"
        :label="getLabel"
        :model-value="modelValue"
        :placeholder="getPlaceholder"
        :val="val"
        v-bind="{...def,...$attrs,...fieldProps.field}"
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
      </q-checkbox>
    </VeeField>
  </MCol>
</template>
