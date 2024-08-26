<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { useMyth } from '../../vue3'
import { computed, reactive, ref, toValue } from 'vue'
import { useField } from 'vee-validate'
import { MToggleProps as Props } from './models'
import { useInputHelper } from '../../composables'
import { QToggle } from 'quasar'

interface P {
  auto?: Props['auto'];
  col?: Props['col'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
  val?: Props['val'];
  name: Props['name'];
  label?: Props['label'];
  caption?: Props['caption'];
  hint?: Props['hint'];
  help?: Props['help'];
  activeLabel?: Props['activeLabel'];
  inactiveLabel?: Props['inactiveLabel'];
  trueValue?: Props['trueValue'];
  falseValue?: Props['falseValue'];
  indeterminateValue?: Props['indeterminateValue'];
  color?: Props['color'];
  checkedIcon?: Props['checkedIcon'];
  indeterminateIcon?: Props['indeterminateIcon'];
  uncheckedIcon?: Props['uncheckedIcon'];
  status?: Props['status'];
  rules?: Props['rules'];
  dense?: Props['dense'];
  keepColor?: Props['keepColor'];
  required?: Props['required'];
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
  val: undefined,
  name: () => '',
  label: undefined,
  caption: undefined,
  hint: undefined,
  help: undefined,
  trueValue: !0,
  falseValue: !1,
  indeterminateValue: null,
  color: () => 'primary',
  checkedIcon: () => 'ion-checkmark',
  uncheckedIcon: () => 'ion-close',
  indeterminateIcon: () => 'ion-ios-code-working',
  activeLabel: () => 'yes',
  inactiveLabel: () => 'no',
  status: () => !1,
  rules: undefined,
  dense: undefined,
  keepColor: undefined,
  required: undefined,
  rowProps: undefined,
  colProps: undefined,
  viewMode: () => !1,
  fieldOptions: undefined
})
defineModel<Props['modelValue']>({ required: !1, default: undefined })
const helper = useInputHelper<P>(() => props, 'toggle', () => ({ choose: !0 }))
const { inputProps, getLabel: toggleLabel, getRules } = helper
const inputScope = useField<Props['modelValue']>(() => props.name, getRules, {
  syncVModel: !0,
  label: toggleLabel,
  ...toValue<any>(props.fieldOptions)
})
const { value, errorMessage, handleChange } = inputScope

const listeners = {
  'update:modelValue': (v: Props['modelValue']) => handleChange(v, !!errorMessage.value)
}

const { __ } = useMyth()
const getLabel = computed<string | undefined>(() => {
  const def = undefined
  const v = value.value
  if (v === props.trueValue) {
    return __(props.status ? 'active' : props.activeLabel) as string || def
  }
  if (v === props.falseValue) {
    return __(props.status ? 'inactive' : props.inactiveLabel) as string || def
  }
  return __('none') as string || def
})

const input = ref<InstanceType<typeof QToggle> | null>(null)
const scopes = reactive(inputScope)
defineExpose({ input, ...scopes })
defineOptions({ name: 'MToggle', inheritAttrs: !1 })
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
        :field="scopes"
        class="no-margin"
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
          v-bind="{...$myth.options.input as any,...$myth.options.field,...$attrs, borderless: !0, outlined: !1, dense: inputProps.dense}"
        >
          <q-toggle
            :disable="viewMode"
            :false-value="falseValue"
            :indeterminate-value="indeterminateValue"
            :label="getLabel"
            :model-value="value"
            :true-value="trueValue"
            v-bind="{
              ...$myth.options.toggle,
              ...$attrs,
              dense: inputProps.dense,
              checkedIcon: inputProps.checkedIcon,
              uncheckedIcon: inputProps.uncheckedIcon,
              color: !!errorMessage ? 'negative' : inputProps.color,
              indeterminateIcon: inputProps.indeterminateIcon,
              keepColor: inputProps.keepColor,
            }"
            v-on="listeners"
          >
            <slot />
          </q-toggle>
        </q-field>
      </MCol>
      <slot
        name="after"
        v-bind="scopes"
      />
    </MRow>
    <slot
      name="bottom-input"
      v-bind="scopes"
    />
  </MCol>
</template>
