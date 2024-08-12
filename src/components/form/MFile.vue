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
import { computed, defineProps, reactive, ref } from 'vue'
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
  // modelValue?: Props['modelValue'];
  label?: Props['label'];
  caption?: Props['caption'];
  hint?: Props['hint'];
  placeholder?: Props['placeholder'];
  help?: Props['help'];
  required?: Props['required'];
  rules?: Props['rules'];
  errors?: Props['errors'];
  viewMode?: Props['viewMode'];
  viewModeValue?: Props['viewModeValue'];
  topLabel?: Props['topLabel'];
  accept?: Props['accept'];
  images?: Props['images'];
  video?: Props['video'];
  pdf?: Props['pdf'];
  excel?: Props['excel'];
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
  // modelValue: undefined,
  label: undefined,
  caption: undefined,
  hint: undefined,
  placeholder: undefined,
  help: undefined,
  required: undefined,
  rules: undefined,
  errors: undefined,
  viewMode: () => !1,
  viewModeValue: undefined,
  topLabel: undefined,
  accept: undefined,
  images: undefined,
  video: undefined,
  pdf: undefined,
  excel: undefined
})
const modelValue = defineModel<Props['modelValue']>({ required: !1, default: null })
const helper = useInputHelper<P>(() => props, 'file', { choose: !0 })
const { hasTopLabel, getLabel, getPlaceholder, accepts } = helper

const inputScope = useField<Props['modelValue']>(() => props.name, computed(() => props.rules), {
  initialValue: modelValue,
  syncVModel: !0,
  label: getLabel
})
const { value, errors: fieldErrors, handleChange, handleBlur } = inputScope
const getErrors = computed(() => [...(props.errors || []), ...fieldErrors.value])
const errorMessage = computed(() => getErrors.value[0] || undefined)

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

</script>

<script lang="ts">
export default {
  name: 'MFile',
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
    :sm="sm"
    :xs="xs"
  >
    <slot
      name="top-input"
      v-bind="inputScope"
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
      :is="viewMode ? QField : QFile"
      ref="input"
      v-model="value"
      :accept="accepts.join(',')"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :hint="__(hint)"
      :label="hasTopLabel ? getPlaceholder : getLabel"
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
          <div
            class="self-center full-width no-outline"
            tabindex="0"
          >
            {{ viewModeValue ?? value }}
          </div>
        </slot>
      </template>
    </component>
    <slot
      name="help"
      v-bind="inputScope"
    >
      <MHelpRow :text="help" />
    </slot>
    <slot
      name="bottom-input"
      v-bind="inputScope"
    />
  </MCol>
</template>
