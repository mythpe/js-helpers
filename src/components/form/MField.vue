<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { useFieldError, useFieldValue } from 'vee-validate'
import { MFieldProps as Props } from './models.d'
import { ref } from 'vue'
import { QField, QFieldSlots } from 'quasar'
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
  autocomplete?: Props['autocomplete'];
  topLabel?: Props['topLabel'];
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
  autocomplete: undefined,
  topLabel: undefined,
  clearable: undefined
})
const modelValue = defineModel<Props['modelValue']>({ required: !1, default: undefined })
const helper = useInputHelper<P>(() => props, 'input')
const { hasTopLabel, getLabel, getPlaceholder, getRules } = helper
const value = useFieldValue(() => props.name)
const errorMessage = useFieldError(() => props.name)
const input = ref<InstanceType<typeof QField> | null>(null)
defineExpose<{ input: typeof input }>({ input })
defineOptions({ name: 'MField', inheritAttrs: !1 })
</script>

<template>
  <MCol
    :auto="auto"
    :class="[$attrs.class,{'m--input__required':getRules?.required!==undefined,'m--input__error':!!errorMessage,'m--input__view': !0}]"
    :col="col"
    :lg="lg"
    :md="md"
    :name="name"
    :sm="sm"
    :xs="xs"
  >
    <slot name="top-input" />
    <slot name="top-label">
      <MInputLabel
        v-if="hasTopLabel"
        :field="{label: getLabel} as any"
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
    <q-field
      ref="input"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :hint="__(hint)"
      :label="hasTopLabel ? undefined : getLabel"
      :model-value="value"
      :placeholder="getPlaceholder"
      v-bind="{
        ...$myth.options.input as any,
        ...$myth.options.field as any,
        ...$attrs,
        clearable: !1,
        stackLabel: !0
      }"
    >
      <template
        v-for="(_,slot) in $slots as Readonly<QFieldSlots>"
        :key="slot"
        #[slot]
      >
        <slot :name="slot" />
      </template>
      <template #control>
        <slot name="control">
          <MInputFieldControl>
            {{ modelValue ?? value }}
          </MInputFieldControl>
        </slot>
      </template>
    </q-field>
    <slot name="help">
      <MHelpRow
        v-if="!hasTopLabel"
        :text="help"
      />
    </slot>
    <slot name="bottom-input" />
  </MCol>
</template>
