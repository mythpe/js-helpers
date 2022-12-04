<!--
  - MyTh Ahmed Faiz Copyright © 2016-2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<template>
  <MCol
    :auto="auto"
    :col="col"
    :lg="lg"
    :md="md"
    :sm="sm"
    :xs="xs"
  >
    <p v-if="label">
      {{ getLabel }}
    </p>
    <q-editor
      v-model="inputValue"
      :dense="dense"
      :min-height="minHeight"
    />
    <slot />
    <q-slide-transition>
      <p
        v-if="inputErrors[0]"
        class="text-body2 text-negative"
      >
        {{ inputErrors[0] }}
      </p>
    </q-slide-transition>
  </MCol>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { computed } from 'vue'
import useInputProps from '../../composition/useInputProps'
import { ColStyleType } from '../grid/models'
import { MEditorProps } from './models'

interface Props extends MEditorProps {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  modelValue: string;
  minHeight?: string | undefined;
  label?: string | undefined;
  errors?: Record<string, string[]> | undefined;
  dense?: boolean | undefined;
}

const q = useQuasar()

const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  modelValue: undefined,
  minHeight: '5rem',
  label: undefined,
  errors: undefined,
  dense: q.screen.lt.md
})

type EmitsTypes = {
  (e: 'update:modelValue', value: any): void
}
const emit = defineEmits<EmitsTypes>()

const inputValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const { getLabel, inputErrors } = useInputProps(props)
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
