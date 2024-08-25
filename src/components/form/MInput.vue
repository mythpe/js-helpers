<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { useField } from 'vee-validate'
import { MInputProps as Props } from './models.d'
import { reactive, ref, toValue, useAttrs } from 'vue'
import { QField, QInput, QInputSlots } from 'quasar'
import { useInputHelper } from '../../composables'

type P = {
  name: Props['name'];
  auto?: Props['auto'];
  col?: Props['col'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
  label?: Props['label'];
  caption?: Props['caption'];
  hint?: Props['hint'];
  placeholder?: Props['placeholder'];
  help?: Props['help'];
  required?: Props['required'];
  rules?: Props['rules'];
  viewMode?: Props['viewMode'];
  viewModeValue?: Props['viewModeValue'];
  autocomplete?: Props['autocomplete'];
  topLabel?: Props['topLabel'];
  fieldOptions?: Props['fieldOptions'];
  clearable?: Props['clearable'];
}

const props = withDefaults(defineProps<P>(), {
  name: () => '',
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  label: undefined,
  caption: undefined,
  hint: undefined,
  placeholder: undefined,
  help: undefined,
  required: undefined,
  rules: undefined,
  viewMode: () => !1,
  viewModeValue: undefined,
  autocomplete: undefined,
  topLabel: undefined,
  fieldOptions: undefined,
  clearable: undefined
})
defineModel<Props['modelValue']>({ required: !1, default: undefined })
const attrs = useAttrs()
const helper = useInputHelper<P>(() => props, 'input', () => ({ attrs }))
const { hasTopLabel, getLabel, getPlaceholder, getAutocompleteAttribute, getRules } = helper
const inputScope = useField<Props['modelValue']>(() => props.name, getRules, {
  syncVModel: !0,
  label: getLabel,
  ...toValue<any>(props.fieldOptions)
})
const { value, errorMessage, handleChange, handleBlur } = inputScope

const listeners = {
  blur: (v: any) => handleBlur(v, !0),
  'update:modelValue': (v: Props['modelValue']) => handleChange(v, !!errorMessage.value)
}
const input = ref<InstanceType<typeof QInput | typeof QField> | null>(null)
const scopes = reactive(inputScope)
defineExpose<typeof scopes & { input: typeof input }>({ input, ...scopes })
</script>

<script lang="ts">
export default {
  name: 'MInput',
  inheritAttrs: !1
}
</script>

<template>
  <MCol
    :auto="auto"
    :class="[$attrs.class,{'m--input__required':getRules?.required!==undefined,'m--input__error':!!errorMessage,'m--input__view':viewMode}]"
    :col="col"
    :lg="lg"
    :md="md"
    :name="name"
    :sm="sm"
    :xs="xs"
  >
    <slot
      name="top-input"
      v-bind="scopes"
    />
    <slot
      name="top-label"
      v-bind="scopes"
    >
      <MInputLabel
        v-if="hasTopLabel"
        :field="scopes"
      >
        <MHelpRow
          :text="help"
          tooltip
        />
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
      ref="input"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :hint="__(hint)"
      :label="hasTopLabel ? undefined : getLabel"
      :model-value="value"
      :placeholder="getPlaceholder"
      v-bind="{
        ...$myth.options.input as any,
        ...( viewMode ? $myth.options.field : {} ),
        ...$attrs,
        ...( viewMode ? { stackLabel: !0 } : {} ),
        autocomplete:getAutocompleteAttribute,
        clearable: viewMode ? !1 : clearable
      }"
      v-on="listeners"
    >
      <template
        v-for="(_,slot) in $slots as Readonly<QInputSlots>"
        :key="slot"
        #[slot]
      >
        <slot :name="slot" />
      </template>
      <template
        v-if="viewMode"
        #control
      >
        <slot name="control">
          <MInputFieldControl>
            {{ viewModeValue ?? value }}
          </MInputFieldControl>
        </slot>
      </template>
    </component>
    <slot
      name="help"
      v-bind="scopes"
    >
      <MHelpRow
        v-if="!hasTopLabel"
        :text="help"
      />
    </slot>
    <slot
      name="bottom-input"
      v-bind="scopes"
    />
  </MCol>
</template>
