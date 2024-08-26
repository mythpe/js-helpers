<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { QField, QFile, QFileSlots } from 'quasar'
import { useInputHelper } from '../../composables'
import { useField } from 'vee-validate'
import { defineProps, reactive, ref, toValue } from 'vue'
import { MFileProps as Props } from './models'

interface P {
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
  topLabel?: Props['topLabel'];
  accept?: Props['accept'];
  images?: Props['images'];
  svg?: Props['svg'];
  video?: Props['video'];
  pdf?: Props['pdf'];
  excel?: Props['excel'];
  fieldOptions?: Props['fieldOptions'];
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
  topLabel: undefined,
  accept: undefined,
  images: () => !1,
  svg: () => !1,
  video: () => !1,
  pdf: () => !1,
  excel: () => !1,
  fieldOptions: undefined
})
defineModel<Props['modelValue']>({ required: !1, default: undefined })
const helper = useInputHelper<P>(() => props, 'file', () => ({ choose: !0 }))
const { hasTopLabel, getLabel, getPlaceholder, accepts, getRules } = helper
const inputScope = useField<Props['modelValue']>(() => props.name, getRules, {
  syncVModel: !0,
  label: getLabel,
  ...toValue<any>(props.fieldOptions)
})
const { value, errorMessage, handleChange, handleBlur } = inputScope

const listeners = {
  focus: (v: Event) => handleBlur(v, !1),
  blur: (v: Event) => handleBlur(v, !1),
  'update:modelValue': (v: Props['modelValue']) => handleChange(v, !!errorMessage.value)
}
const input = ref<InstanceType<typeof QFile | typeof QField> | null>(null)
const scopes = reactive(inputScope)

const pickFiles = (evt?: Event) => (input.value as QFile)?.pickFiles(evt)
const addFiles = (files: readonly any[] | FileList) => (input.value as QFile)?.addFiles(files)
const resetValidation = () => (input.value as QFile)?.resetValidation()
const validate = (value?: any) => (input.value as QFile)?.validate(value)
const focus = () => (input.value as QFile)?.focus()
const blur = () => (input.value as QFile)?.blur()
const removeAtIndex = (index: number) => (input.value as QFile)?.removeAtIndex(index)
const removeFile = (index: number) => (input.value as QFile)?.removeAtIndex(index)
const methods = {
  pickFiles,
  addFiles,
  resetValidation,
  validate,
  focus,
  blur,
  removeAtIndex,
  removeFile
}

defineExpose({ input, ...scopes, ...methods })
defineOptions({ name: 'MFile', inheritAttrs: !1 })
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
    <slot name="top-label">
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
      :is="viewMode ? QField : QFile"
      ref="input"
      :accept="accepts.join(',')"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :hint="__(hint)"
      :label="hasTopLabel ? (viewMode ? undefined : getPlaceholder) : getLabel"
      :model-value="value"
      v-bind="{ ...$myth.options.file as any,...( viewMode ? $myth.options.field : {} ), ...$attrs, ...( viewMode ? { stackLabel: !0 } : {} ) }"
      v-on="listeners"
    >
      <template #prepend>
        <slot name="prepend">
          <q-icon
            class="cursor-pointer"
            name="ion-ios-attach"
            @click="pickFiles($event)"
          />
        </slot>
      </template>

      <template
        v-for="(_,slot) in $slots as Readonly<QFileSlots>"
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
  <slot
    name="hidden"
    v-bind="scopes"
  />
</template>
