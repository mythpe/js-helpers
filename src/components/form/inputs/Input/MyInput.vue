<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { useField } from 'vee-validate'
import { MyInputProps as Props } from './models.d'
import { computed, defineEmits, reactive, watch } from 'vue'
import { useInputs } from '../../../../composables'
import { QField, QFieldSlots, QInput, QInputSlots } from 'quasar'

type P = {
  auto?: Props['auto'];
  col?: Props['col'];
  noCol?: Props['noCol'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
  help?: Props['help'];
  helpIcon?: Props['helpIcon'];
  helpProps?: Props['helpProps'];
  name?: Props['name'];
  label?: Props['label'];
  stackLabel?: Props['stackLabel'];
  placeholder?: Props['placeholder'];
  hidePlaceholder?: Props['hidePlaceholder'];
  required?: Props['required'];
  hideRequired?: Props['hideRequired'];
  email?: Props['email'];
  mobile?: Props['mobile'];
  rules?: Props['rules'];
  errors?: Props['errors'];
  // modelValue: Props['modelValue'];
  viewMode?: Props['viewMode'];
  viewModeValue?: Props['viewModeValue'];
  autocomplete?: Props['autocomplete'];
  topLabel?: Props['topLabel'];
  caption?: Props['caption'];
  hint?: Props['hint'];
}

const props = withDefaults(defineProps<P>(), {
  auto: undefined,
  col: undefined,
  noCol: () => !1,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  help: undefined,
  helpIcon: () => 'ion-ios-help-circle-outline',
  helpProps: undefined,
  name: () => '',
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
  // modelValue: undefined,
  viewMode: () => !1,
  viewModeValue: undefined,
  autocomplete: undefined,
  topLabel: undefined,
  caption: undefined,
  hint: undefined
})

// interface Emits {
// (e: 'update:modelValue', value: any): void
// }

// defineEmits<Emits>()
const modelValue = defineModel<P['modelValue']>({ required: !0, default: undefined })

// const fieldScope = { errors: [] }
const fieldScope = reactive(useField(() => props.name, props.rules, { syncVModel: !0 }))
const { value, errorMessage, errors: fieldErrors, name: fieldName, handleChange, handleBlur, handleReset } = fieldScope
const vOn = {
  'update:model-value': handleChange,
  blur: handleBlur,
  clear: handleReset
}
const getErrors = computed(() => [...(props.errors || []), ...fieldErrors])

const p = reactive(useInputs(() => props, { key: 'input' }))
const { hasTopLabel, getLabel, getPlaceholder, getAutocompleteAttribute, skipInputSlots: skips } = p
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
    :name="name"
    :no-col="noCol"
    :sm="sm"
    :xs="xs"
  >
    <div>value: {{ value }}</div>
    <div>fieldName: {{ fieldName }}</div>
    <div>---</div>
    <div>name: {{ name }}</div>
    <div>modelValue: {{ modelValue }}</div>
    <slot
      name="top-input"
      v-bind="fieldScope"
    />
    <slot name="top-label">
      <MInputLabel
        v-if="hasTopLabel"
        :for="name"
      >
        {{ getLabel }}
      </MInputLabel>
    </slot>
    <slot name="caption">
      <div
        v-if="!!caption"
        class="m--input__caption"
      >
        {{ __(caption) }}
      </div>
    </slot>
    <component
      :is="viewMode ? QField : QInput"
      :model-value="value"
      :autocomplete="getAutocompleteAttribute"
      :error="getErrors.length > 0"
      :error-message="errorMessage"
      :hint="hint ? __(hint) : hint"
      :label="hasTopLabel ? undefined : getLabel"
      :placeholder="getPlaceholder"
      v-bind="{...$myth.options.input as any,...$attrs,stackLabel}"
      v-on="vOn"
    >
      <template
        v-for="(_,slot) in ($slots as Readonly<QInputSlots>)"
        :key="slot"
        #[slot]
      >
        <slot
          v-if="!skips.includes(slot)"
          :name="slot"
        />
      </template>

      <template
        v-if="viewMode"
        #control
      >
        <slot name="control">
          <div
            class="self-center full-width no-outline"
            tabindex="0"
          >
            {{ viewModeValue ?? value }}
          </div>
        </slot>
      </template>
      <template
        v-for="(_,slot) in ($slots as Readonly<QFieldSlots>)"
        :key="slot"
        #[slot]
      >
        <slot
          v-if="viewMode && !skips.includes(slot)"
          :name="slot"
        />
      </template>
    </component>
    <slot
      name="help"
      v-bind="fieldScope"
    >
      <MRow
        v-if="!!help"
        class="items-center"
        v-bind="helpProps"
      >
        <q-icon
          :name="helpIcon"
          left
          size="20px"
        />
        <span class="text-caption">{{ __(help) }}</span>
      </MRow>
    </slot>
    <slot
      name="bottom-input"
      v-bind="fieldScope"
    />
  </MCol>
</template>

<style lang="scss" scoped>

</style>
