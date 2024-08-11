<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { useMyth } from '../../vue3'
import { computed, reactive, ref } from 'vue'
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
  modelValue?: Props['modelValue'];
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
  color?: Props['color'];
  checkedIcon?: Props['checkedIcon'];
  indeterminateIcon?: Props['indeterminateIcon'];
  uncheckedIcon?: Props['uncheckedIcon'];
  statusLabels?: Props['statusLabels'];
  errors?: Props['errors'];
  rules?: Props['rules'];
  dense?: Props['dense'];
  keepColor?: Props['keepColor'];
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
  val: undefined,
  name: () => '',
  label: undefined,
  caption: undefined,
  hint: undefined,
  help: undefined,
  trueValue: !0,
  falseValue: !1,
  color: 'primary',
  checkedIcon: 'ion-checkmark',
  uncheckedIcon: 'ion-close',
  indeterminateIcon: 'ion-ios-code-working',
  activeLabel: 'yes',
  inactiveLabel: 'no',
  statusLabels: !1,
  errors: undefined,
  rules: undefined,
  dense: undefined,
  keepColor: () => !0
})
const { __ } = useMyth()
const helper = useInputHelper<Props>(() => props, 'toggle')
const { inputProps } = helper

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
const getLabel = computed<string | undefined>(() => {
  const def = undefined
  const v = value.value
  if (v === props.trueValue) {
    return __(props.statusLabels ? 'active' : props.activeLabel) as string || def
  }
  if (v === props.falseValue) {
    return __(props.statusLabels ? 'inactive' : props.inactiveLabel) as string || def
  }
  return __('none') as string || def
})

const input = ref<InstanceType<typeof QToggle> | null>(null)
const scopes = reactive(inputScope)
defineExpose({ input, ...scopes })
</script>

<script lang="ts">
export default {
  name: 'MToggle',
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
          v-bind="{...$myth.options.input as any,...$myth.options.field,...$attrs, borderless: !0, outlined: !1, dense: inputProps.dense}"
        >
          <q-toggle
            v-model="value"
            :false-value="falseValue"
            :label="getLabel"
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
