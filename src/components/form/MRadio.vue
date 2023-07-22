<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { Field as VeeField } from 'vee-validate'
import { defineProps, ref } from 'vue'
import useInputProps from '../../composition/useInputProps'
import { ColStyleType } from '../grid/models'
import { MCheckboxProps } from './models'
import { getMythOptions } from 'src/vue3'

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
  val: any | undefined;
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
const { getRules, getLabel, getPlaceholder } = useInputProps(props)
const def = getMythOptions().radio || {}

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
      <q-radio
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
            v-else-if="slot !== 'default'"
            :name="slot"
          />
        </template>
      </q-radio>
      <slot
        v-bind="fieldProps"
      />
    </VeeField>
  </MCol>
</template>
