<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { useField } from 'vee-validate'
import { MOptionsOptionContext, MOptionsProps as Props } from './models.d'
import { computed, reactive, ref } from 'vue'
import { QField, QOptionGroup, QOptionGroupSlots } from 'quasar'
import { useInputHelper } from '../../composables'
import { useMyth } from '../../vue3'

type P = {
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
  color?: Props['color'];
  type?: Props['type'];
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
  // modelValue: null,
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
  color: () => 'primary',
  type: 'radio'
})
defineModel<Props['modelValue']>({ required: !1, default: null })
const options = defineModel<MOptionsOptionContext[]>('options', { required: !1, default: [] })
const helper = useInputHelper<P>(() => props, 'input')
const { getLabel, getPlaceholder } = helper
const { __ } = useMyth()
const inputScope = useField<Props['modelValue']>(() => props.name, computed(() => props.rules), {
  initialValue: props.modelValue,
  syncVModel: !0,
  label: getLabel
})
const { value, errors: fieldErrors, handleChange, handleBlur } = inputScope
const getErrors = computed(() => [...(props.errors || []), ...fieldErrors.value])
const errorMessage = computed(() => getErrors.value[0] || undefined)

const listeners = {
  blur: (v: any) => handleBlur(v, !0),
  'update:modelValue': (v: Props['modelValue']) => handleChange(v, !!errorMessage.value)
}
const input = ref<InstanceType<typeof QOptionGroup | typeof QField> | null>(null)
const scopes = reactive(inputScope)
defineExpose<typeof scopes & { input: typeof input }>({ input, ...scopes })
const getOptions = computed(() => {
  return options.value.map((option: Props['options'][number]) => {
    return {
      label: option.label,
      value: option.value
    }
  })
})
</script>

<script lang="ts">
export default {
  name: 'MOptions',
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
        v-if="!!getLabel"
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
      :is="viewMode ? QField : QOptionGroup"
      ref="input"
      v-model="value"
      :color="color"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :hint="__(hint)"
      :label="getLabel"
      :options="getOptions"
      :placeholder="getPlaceholder"
      keep-color
      v-bind="{ ...$myth.options.options as any,...( viewMode ? $myth.options.field : {} ), ...$attrs, ...( viewMode ? { stackLabel: !0 } : {} ) }"
      v-on="listeners"
    >
      <template
        v-for="(_,slot) in $slots as Readonly<QOptionGroupSlots>"
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
