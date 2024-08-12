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
import { computed, reactive, ref, useAttrs } from 'vue'
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
  // required?: Props['required'];
  rules?: Props['rules'];
  errors?: Props['errors'];
  viewMode?: Props['viewMode'];
  viewModeValue?: Props['viewModeValue'];
  topLabel?: Props['topLabel'];
  color?: Props['color'];
  type?: Props['type'];
  keepColor?: Props['keepColor'];
  service?: Props['service'];
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
  // required: undefined,
  rules: undefined,
  errors: undefined,
  viewMode: () => !1,
  viewModeValue: undefined,
  topLabel: undefined,
  color: () => 'primary',
  type: 'radio',
  keepColor: undefined,
  service: undefined
})
defineModel<Props['modelValue']>({ required: !1, default: undefined })
const loading = defineModel<Props['loading']>('loading', { required: !1, default: !1 })
const options = defineModel<MOptionsOptionContext[]>('options', { required: !1, default: [] })
const attrs = useAttrs()
const helper = useInputHelper<P>(() => props, 'options', () => ({ attrs }))
const { getLabel, getPlaceholder, inputProps, getRules } = helper
const inputScope = useField<Props['modelValue']>(() => props.name, getRules, {
  // initialValue: modelValue,
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
        :class="{'text-negative':!!errorMessage }"
        :for="name"
      >
        {{ getLabel }}
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
      :color="!!errorMessage ? 'negative' : inputProps.color"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :hint="__(hint)"
      :keep-color="!!errorMessage ? !0 : inputProps.keepColor"
      :label="getLabel"
      :model-value="value"
      :options="options"
      :placeholder="getPlaceholder"
      :type="type"
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
    <slot
      :options="options"
      v-bind="inputScope"
    />
  </MCol>
</template>
