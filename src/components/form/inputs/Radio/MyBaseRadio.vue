<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { MyBaseRadioProps as Props } from './models.d'
import { useField } from 'vee-validate'

type P = {
  name: Props['name'];
  label?: Props['label'];
  noLabel?: Props['noLabel'];
  val: Props['val'];
  required?: Props['required'];
  color?: Props['color'];
  rules?: Props['rules'];
  colProps?: Props['colProps'];
}

const props = withDefaults(defineProps<P>(), {
  name: () => '',
  label: undefined,
  noLabel: undefined,
  val: undefined,
  color: undefined,
  required: undefined,
  rules: undefined,
  colProps: undefined
})
defineModel<Props['modelValue']>({ required: !0, default: undefined })
const field = useField(() => props.name, props.rules, { syncVModel: !0 })
const { value, errorMessage, meta } = field
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>

<template>
  <MRow>
    <slot
      name="left"
      v-bind="field"
    />
    <MCol v-bind="colProps">
      <MColumn>
        <slot
          name="top"
          v-bind="field"
        />
        <MCol auto>
          <slot
            name="before"
            v-bind="field"
          />
          <q-radio
            v-model="value"
            :color="meta.valid ? color : 'negative'"
            :label="!noLabel && !!label ? __(label) : undefined"
            :val="val"
            v-bind="{...$myth.options.radio,...$attrs}"
          >
            <slot v-bind="field" />
          </q-radio>
          <MFadeTransition>
            <div
              v-if="!!errorMessage"
              class="text-caption text-negative"
            >
              {{ errorMessage }}
            </div>
          </MFadeTransition>
          <slot
            name="after"
            v-bind="field"
          />
        </MCol>
        <slot
          name="bottom"
          v-bind="field"
        />
      </MColumn>
    </MCol>
    <slot
      name="right"
      v-bind="field"
    />
  </MRow>
</template>

<style lang="sass" scoped>

</style>
