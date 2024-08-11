<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { useField } from 'vee-validate'
import { computed, defineProps, reactive, ref } from 'vue'
import { useInputHelper } from '../../composables'
import { MCheckboxProps as Props } from './models'
import { QCheckbox, QField } from 'quasar'

type P = {
  auto?: Props['auto'];
  col?: Props['col'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
  modelValue: Props['modelValue'];
  name: Props['name'];
  label?: Props['label'];
  caption?: Props['caption'];
  hint?: Props['hint'];
  help?: Props['help'];
  val?: Props['val'];
  required?: Props['required'];
  rules?: Props['rules'];
  errors?: Props['errors'];
  dense?: Props['dense'];
  trueValue?: Props['trueValue'];
  falseValue?: Props['falseValue'];
  checkedIcon?: Props['checkedIcon'];
  indeterminateIcon?: Props['indeterminateIcon'];
}

const props = withDefaults(defineProps<P>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  modelValue: undefined,
  name: () => '',
  label: undefined,
  caption: undefined,
  hint: undefined,
  help: undefined,
  val: undefined,
  required: undefined,
  rules: undefined,
  errors: undefined,
  dense: undefined,
  trueValue: () => !0,
  falseValue: () => !1,
  checkedIcon: () => 'ion-checkbox-outline',
  indeterminateIcon: undefined
})

const helper = useInputHelper<P & Props>(() => props, 'checkbox')
const { getLabel, inputProps } = helper

const inputScope = useField<Props['modelValue']>(() => props.name, computed(() => props.rules), {
  initialValue: props.modelValue,
  syncVModel: !0
})
const { value, errors: fieldErrors, handleChange } = inputScope
const getErrors = computed(() => [...(props.errors || []), ...fieldErrors.value])
const errorMessage = computed(() => getErrors.value[0] || undefined)

const listeners = {
  'update:modelValue': (v: Props['modelValue']) => handleChange(v, !!errorMessage.value)
}
const input = ref<InstanceType<typeof QCheckbox> | null>(null)
const scopes = reactive(inputScope)
defineExpose<typeof scopes & { input: typeof input }>({ input, ...scopes })

</script>

<script lang="ts">
export default {
  name: 'MCheckbox',
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
        :for="name"
        class="no-margin"
      >
        {{ __(label ?? name) }}
      </MInputLabel>
    </slot>
    <slot name="caption">
      <div
        v-if="!!caption"
        class="text-caption m--input__caption"
      >
        {{ __(caption) }}
      </div>
    </slot>
    <MRow>
      <slot
        name="before"
        v-bind="inputScope"
      />
      <MCol col="shrink">
        <q-field
          :error="!!errorMessage"
          :error-message="errorMessage"
          :hint="__(hint)"
          v-bind="{
            ...$myth.options.input as any,
            ...$myth.options.field,
            ...$attrs,
            borderless: !0,
            outlined: !1,
            dense: inputProps.dense,
            stackLabel: !0
          }"
        >
          <q-checkbox
            ref="input"
            v-model="value"
            :label="getLabel"
            :val="val"
            v-bind="{
              ...$myth.options.checkbox,
              ...$attrs,
              dense: inputProps.dense,
              checkedIcon: inputProps.checkedIcon,
              indeterminateIcon: inputProps.indeterminateIcon
            }"
            v-on="listeners"
          >
            <slot />
          </q-checkbox>
        </q-field>
      </MCol>
      <slot
        name="after"
        v-bind="inputScope"
      />
    </MRow>
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
