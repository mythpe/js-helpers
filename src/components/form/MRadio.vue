<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { Field as VeeField } from 'vee-validate'
import { defineProps } from 'vue'
import { useInputProps } from '../../composables'
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
  label?: MRadioProps['label'];
  noLabel?: MRadioProps['noLabel'];
  // modelValue: MRadioProps['modelValue'];
  val: MRadioProps['val'];
  required?: MRadioProps['required'];
  colProps?: MRadioProps['colProps'];
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
  noLabel: undefined,
  // modelValue: undefined,
  val: undefined,
  required: undefined,
  colProps: undefined
})

// interface Emits {
//   (e: 'update:modelValue', value: any): void
// }

// const emit = defineEmits<Emits>()
const inputValue = defineModel<any>({ required: !0, default: undefined })
const { getRules, getLabel, getPlaceholder } = useInputProps(() => props)

</script>

<script lang="ts">
export default {
  name: 'MRadio',
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
      :label="label ? __(label) : name"
      :name="name"
      :rules="getRules"
      v-bind="$attrs"
    >
      <MRow>
        <slot name="left" />
        <MCol v-bind="colProps">
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
              <q-radio
                :label="noLabel ? undefined : (getLabel ?? undefined)"
                :model-value="modelValue"
                :placeholder="getPlaceholder"
                :val="val"
                v-bind="{...$myth.options.radio,...$attrs,...fieldProps.field}"
              />
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
        </MCol>
        <slot name="right" />
      </MRow>
    </VeeField>
    <slot />
  </MCol>
</template>
