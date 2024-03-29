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
        v-bind="{...($myth.options.radio||{}),...($attrs||{}),...fieldProps.field}"
      />
      <slot
        v-bind="fieldProps"
      />
    </VeeField>
  </MCol>
</template>

<script lang="ts" setup>
import { Field as VeeField } from 'vee-validate'
import { computed, defineEmits, defineProps } from 'vue'
import useInputProps from '../../composition/useInputProps'
import { MRadioProps } from './models'

interface Props {
  auto?: MRadioProps['auto'];
  col?: MRadioProps['col'];
  xs?: MRadioProps['xs'];
  sm?: MRadioProps['sm'];
  md?: MRadioProps['md'];
  lg?: MRadioProps['lg'];
  xl?: MRadioProps['xl'];
  name: MRadioProps['name'];
  modelValue: MRadioProps['modelValue'];
  val: MRadioProps['val'];
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
  modelValue: undefined,
  val: undefined
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
  name: 'MRadio',
  inheritAttrs: !1
}
</script>
