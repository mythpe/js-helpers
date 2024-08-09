<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { MCheckboxProps } from '@mythpe/js-helpers'

type Props = {
  auto?: MCheckboxProps['auto'];
  col?: MCheckboxProps['col'];
  xs?: MCheckboxProps['xs'];
  sm?: MCheckboxProps['sm'];
  md?: MCheckboxProps['md'];
  lg?: MCheckboxProps['lg'];
  xl?: MCheckboxProps['xl'];
  name: MCheckboxProps['name'];
  label?: MCheckboxProps['label'];
  noLabel?: MCheckboxProps['noLabel'];
  val?: MCheckboxProps['val'];
  required?: MCheckboxProps['required'];
  colProps?: MCheckboxProps['colProps'];
}

withDefaults(defineProps<Props>(), {
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
  colProps: undefined
})
const modelValue = defineModel<any>({ required: !0, default: undefined })
const errors = defineModel<string[]>('errors', { required: !1, default: () => [] })
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
            <q-checkbox
              v-model="modelValue"
              :label="!noLabel && label ? __(label) : undefined"
              :val="val"
              v-bind="{...$myth.options.checkbox,...$attrs}"
            >
              <slot />
            </q-checkbox>
            <div
              v-if="errors.length > 0"
              class="text-caption text-negative"
            >
              {{ errors[0] }}
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
