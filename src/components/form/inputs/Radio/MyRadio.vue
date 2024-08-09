<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { MRadioProps } from '../../4myth/packages/js-helpers'
import { useField } from 'vee-validate'
import { computed } from 'vue'

type Props = {
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
  val: MRadioProps['val'];
  required?: MRadioProps['required'];
  rules?: MRadioProps['rules'];
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
  val: undefined,
  required: undefined,
  rules: undefined,
  colProps: undefined
})
const modelValue = defineModel<any>({ required: !0, default: undefined })
const errors = defineModel<string[]>('errors', { required: !1, default: () => [] })
const { value, errorMessage } = useField(() => props.name, props.rules, {
  syncVModel: !0
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
    <MRow>
      <slot name="left" />
      <MCol v-bind="colProps">
        <MColumn>
          <slot name="top" />
          <MCol auto>
            <slot name="before" />
            <q-radio
              v-model="modelValue"
              :label="!noLabel && !!label ? __(label) : undefined"
              :val="val"
              v-bind="{...$myth.options.radio,...$attrs}"
            />
            <div
              v-if="!!errorMessage"
              class="text-caption text-negative"
            >
              {{ errorMessage }}
            </div>
            <slot name="after" />
          </MCol>
          <slot name="bottom" />
        </MColumn>
      </MCol>
      <slot name="right" />
    </MRow>
  </MCol>
</template>

<style lang="scss" scoped>

</style>
