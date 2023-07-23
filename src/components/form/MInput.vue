<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <MCol
    :auto="auto"
    :class="$attrs.class"
    :col="col"
    :lg="lg"
    :md="md"
    :sm="sm"
    :xs="xs"
  >
    <VeeField
      v-slot="fieldScope"
      v-bind="$attrs"
      v-model="inputValue"
      :name="name"
      :rules="getRules"
    >
      <q-input
        :error="fieldScope.errors.length > 0"
        :error-message="fieldScope.errorMessage"
        v-bind="{...def,...$attrs,...fieldScope.field}"
        :clear-icon="clearIcon"
        :label="getLabel"
        :placeholder="getPlaceholder"
        :type="type"
        :model-value="inputValue"
      >
        <template
          v-for="(_,slot) in $slots"
          :key="slot"
          #[slot]="inputSlot"
        >
          <slot
            v-if="inputSlot"
            :name="slot"
            v-bind="inputSlot"
          />
          <slot
            v-else-if="slot !== 'default'"
            :name="slot"
          />
        </template>
      </q-input>
      <slot
        v-bind="fieldScope"
      />
    </VeeField>
  </MCol>
</template>

<script lang="ts" setup>
import { Field as VeeField } from 'vee-validate'

import { computed, defineProps, onMounted, ref } from 'vue'
import useInputProps from '../../composition/useInputProps'
import { ColStyleType } from '../grid/models'
import { MInputProps } from './models'
import { VueClassProp, VueStyleProp } from 'quasar/dist/types/api'
import { getMythOptions } from '../../vue3'

interface Props extends MInputProps {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  placeholder?: string | undefined;
  hidePlaceholder?: boolean | undefined;
  required?: boolean | undefined;
  hideRequired?: boolean | undefined;
  email?: boolean | undefined;
  rules?: string | string[] | undefined;
  errors?: Record<string, string[]>;
  modelValue: string | number | null | symbol | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  placeholder: undefined,
  hidePlaceholder: undefined,
  required: undefined,
  hideRequired: undefined,
  email: undefined,
  rules: undefined,
  errors: undefined,
  modelValue: undefined
})

type EmitsTypes = {
  (e: 'update:modelValue', value: any): void
}
const emit = defineEmits<EmitsTypes>()
/* Emit instead of use ref */
const inputValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
// const inputValue = ref(props.modelValue)

const { getRules, getLabel, getPlaceholder } = useInputProps(props)

const ready = ref(!1)
const def = getMythOptions()?.input || {}
onMounted(() => {
  ready.value = !0
})
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
