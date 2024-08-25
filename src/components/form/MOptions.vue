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
import { reactive, ref, toValue, useAttrs } from 'vue'
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
  color?: Props['color'];
  type?: Props['type'];
  keepColor?: Props['keepColor'];
  service?: Props['service'];
  fullWidth?: Props['fullWidth'];
  fitWidth?: Props['fullWidth'];
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
  color: () => 'primary',
  type: 'radio',
  keepColor: undefined,
  service: undefined,
  fullWidth: () => !1,
  fitWidth: () => !1,
  fieldOptions: undefined
})
defineModel<Props['modelValue']>({ required: !1, default: undefined })
const loading = defineModel<Props['loading']>('loading', { required: !1, default: !1 })
const options = defineModel<MOptionsOptionContext[]>('options', { required: !1, default: undefined })
const attrs = useAttrs()
const helper = useInputHelper<P>(() => props, 'options', () => ({ attrs }))
const { getLabel, inputProps, getRules } = helper
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
const input = ref<InstanceType<typeof QOptionGroup | typeof QField> | null>(null)
const scopes = reactive(inputScope)
defineExpose<typeof scopes & { input: typeof input }>({ input, ...scopes })
const { alertError } = useMyth()
const fetchData = async () => {
  if (props.service) {
    loading.value = !0
    try {
      const { _data } = await props.service()
      options.value = _data as any
    } catch (e: any) {
      alertError(e?._message || e?.message || 'Failed to fetch data')
    } finally {
      loading.value = !1
    }
  }
}
fetchData()
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
        v-if="!!getLabel"
        :field="scopes"
      >
        <MHelpRow
          :text="help"
          tooltip
        />
        <MTransition>
          <q-spinner-dots
            v-if="loading"
            color="primary"
            size="25px"
          />
        </MTransition>
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
    <MTransition>
      <div
        v-if="!!errorMessage"
        class="text-negative text-caption"
      >
        <q-icon
          v-if="!!errorMessage"
          color="negative"
          name="ion-ios-information-circle-outline"
          size="20px"
        />
        {{ errorMessage }}
      </div>
    </MTransition>
    <component
      :is="viewMode ? QField : QOptionGroup"
      ref="input"
      :class="{'m--options': !0, 'm--options__full_width': fullWidth, 'm--options__fit_width': fitWidth }"
      :color="!!errorMessage ? 'negative' : inputProps.color"
      :error="viewMode ? !!errorMessage : undefined"
      :error-message="viewMode ? errorMessage : undefined"
      :hint="viewMode ? __(hint) : undefined"
      :keep-color="!!errorMessage ? !0 : inputProps.keepColor"
      :label="getLabel"
      :model-value="value"
      :options="options"
      :type="viewMode ? undefined : type"
      v-bind="{ ...$myth.options.options as any,...( viewMode ? $myth.options.field : {} ), ...$attrs, ...( viewMode ? { stackLabel: !0 } : {} ) }"
      v-on="listeners"
    >
      <template
        v-for="(_,slot) in $slots as Readonly<QOptionGroupSlots>"
        :key="slot"
        #[slot]="inputSlot"
      >
        <slot
          :name="slot"
          v-bind="inputSlot || {}"
        />
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
        v-if="!getLabel"
        :text="help"
      />
    </slot>
    <slot
      name="bottom-input"
      v-bind="scopes"
    />
    <slot
      :options="options"
      v-bind="scopes"
    />
  </MCol>
</template>

<style lang="sass">
$c: calc(100% /3)

.m--options
  .q-checkbox__inner,
  .q-radio__inner,
  .q-toggle__inner
    align-self: flex-start

  &__full_width
    > div
      .q-checkbox,
      .q-radio,
      .q-toggle,
      .q-checkbox__label,
      .q-radio__label,
      .q-toggle__label
        width: 100%

  &__fit_width
    margin-left: 0
    > div
      width: calc(100% /3)
      margin-left: 0
</style>
