<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { useField } from 'vee-validate'
import { defineProps, reactive, ref, toValue, useAttrs } from 'vue'
import { useInputHelper } from '../../composables'
import { MRadioProps as Props } from './models'
import { QField, QRadio } from 'quasar'

type P = {
  auto?: Props['auto'];
  col?: Props['col'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
  name: Props['name'];
  label?: Props['label'];
  caption?: Props['caption'];
  hint?: Props['hint'];
  help?: Props['help'];
  val: Props['val'];
  required?: Props['required'];
  rules?: Props['rules'];
  dense?: Props['dense'];
  checkedIcon?: Props['checkedIcon'];
  topLabel?: Props['topLabel'];
  rowProps?: Props['rowProps'];
  colProps?: Props['colProps'];
  viewMode?: Props['viewMode'];
  fieldOptions?: Props['fieldOptions'];
}

const props = withDefaults(defineProps<P>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  name: () => '',
  label: undefined,
  caption: undefined,
  hint: undefined,
  help: undefined,
  val: undefined,
  required: undefined,
  rules: undefined,
  dense: undefined,
  checkedIcon: undefined,
  topLabel: undefined,
  rowProps: undefined,
  colProps: undefined,
  viewMode: () => !1,
  fieldOptions: undefined
})
defineModel<Props['modelValue']>({ required: !1, default: undefined })
const attrs = useAttrs()
const helper = useInputHelper<P>(() => props, 'radio', () => ({ attrs }))
const { getLabel, inputProps, getRules } = helper
const inputScope = useField<Props['modelValue']>(() => props.name, getRules, {
  syncVModel: !0,
  label: getLabel,
  type: 'radio',
  checkedValue: () => props.val,
  ...toValue<any>(props.fieldOptions)
})
const { value, errorMessage, handleChange } = inputScope

const listeners = {
  'update:modelValue': (v: Props['modelValue']) => handleChange(v, !!errorMessage.value)
}
const input = ref<InstanceType<typeof QRadio> | null>(null)
const scopes = reactive(inputScope)
defineExpose<typeof scopes & { input: typeof input }>({ input, ...scopes })

</script>

<script lang="ts">
export default {
  name: 'MRadio',
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
    <slot name="top-label">
      <MInputLabel
        v-if="!!topLabel"
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
        class="m--input__caption text-caption"
      >
        {{ __(caption) }}
      </div>
    </slot>
    <MRow v-bind="rowProps">
      <slot
        name="before"
        v-bind="scopes"
      />
      <MCol v-bind="colProps">
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
          <template #control>
            <q-radio
              ref="input"
              :disable="viewMode"
              :label="getLabel"
              :model-value="value"
              :val="val"
              v-bind="{
                ...$myth.options.radio,
                ...$attrs,
                dense: inputProps.dense,
                checkedIcon: inputProps.checkedIcon,
              }"
              v-on="listeners"
            />
          </template>
        </q-field>
        <slot v-bind="scopes" />
      </MCol>
      <slot
        name="after"
        v-bind="scopes"
      />
    </MRow>
    <slot
      name="help"
      v-bind="scopes"
    >
      <MHelpRow
        v-if="!topLabel"
        :text="help"
      />
    </slot>
    <slot
      name="bottom-input"
      v-bind="scopes"
    />
  </MCol>
</template>
