<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { MInputProps as Props, MInputSlots } from './models'
import { reactive, ref, toValue } from 'vue'
import MInput from './MInput.vue'
import { useField } from 'vee-validate'
import { useInputHelper } from '../../composables'
import { QField, QInput } from 'quasar'

type P = {
  name: Props['name'];
  label?: Props['label'];
  required?: Props['required'];
  rules?: Props['rules'];
  viewMode?: Props['viewMode'];
  topLabel?: Props['topLabel'];
  fieldOptions?: Props['fieldOptions'];
}

const props = withDefaults(defineProps<P>(), {
  name: () => '',
  label: undefined,
  required: undefined,
  rules: undefined,
  viewMode: () => !1,
  topLabel: undefined,
  fieldOptions: undefined
})
defineModel<Props['modelValue']>({ required: !1, default: undefined })
const helper = useInputHelper<P>(() => props, 'input')
const { getLabel, getRules } = helper
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
const input = ref<InstanceType<typeof QInput | typeof QField> | null>(null)
const scopes = reactive(inputScope)
defineExpose<typeof scopes & { input: typeof input }>({ input, ...scopes })
defineOptions({ name: 'MColor' })

</script>

<template>
  <MInput
    ref="input"
    :field-options="fieldOptions"
    :label="label"
    :model-value="value"
    :name="name"
    :required="required"
    :rules="getRules"
    :top-label="topLabel"
    :view-mode="viewMode"
    color
    v-on="listeners"
  >
    <template #prepend>
      <div
        :style="`width: 20px; height: 20px; background-color: ${value};`"
        class="m--input__color-preview"
      />
    </template>
    <template #append>
      <q-icon
        class="cursor-pointer"
        name="colorize"
      >
        <q-popup-proxy
          cover
          transition-hide="scale"
          transition-show="scale"
        >
          <q-color v-model="value" />
        </q-popup-proxy>
      </q-icon>
    </template>
    <template
      v-for="(_,slot) in $slots as Readonly<MInputSlots>"
      :key="slot"
      #[slot]
    >
      <slot :name="slot" />
    </template>
  </MInput>
</template>
