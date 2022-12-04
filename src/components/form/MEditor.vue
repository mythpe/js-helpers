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
      :dense="dense !== undefined ? dense : $q.screen.lt.md"
      :fonts="fonts"
      :min-height="minHeight"
      :toolbar="toolbar"
      v-bind="$attrs"
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
  toolbar?: readonly any[] | undefined;
  fonts?: any | undefined;
}

const $q = useQuasar()
const _toolbar = [
  [
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      list: 'only-icons',
      options: ['left', 'center', 'right', 'justify']
    },
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      options: ['left', 'center', 'right', 'justify']
    }
  ],
  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
  ['token', 'hr', 'link', 'custom_btn'],
  ['print', 'fullscreen'],
  [
    {
      label: $q.lang.editor.formatting,
      icon: $q.iconSet.editor.formatting,
      list: 'no-icons',
      options: [
        'p',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'code'
      ]
    },
    {
      label: $q.lang.editor.fontSize,
      icon: $q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'size-1',
        'size-2',
        'size-3',
        'size-4',
        'size-5',
        'size-6',
        'size-7'
      ]
    },
    {
      label: $q.lang.editor.defaultFont,
      icon: $q.iconSet.editor.font,
      fixedIcon: true,
      list: 'no-icons',
      options: [
        'default_font',
        'arial',
        'arial_black',
        'comic_sans',
        'courier_new',
        'impact',
        'lucida_grande',
        'times_new_roman',
        'verdana'
      ]
    },
    'removeFormat'
  ],
  ['quote', 'unordered', 'ordered', 'outdent', 'indent'],
  ['undo', 'redo'],
  ['viewsource']
]
const _fonts = {
  arial: 'Arial',
  arial_black: 'Arial Black',
  comic_sans: 'Comic Sans MS',
  courier_new: 'Courier New',
  impact: 'Impact',
  lucida_grande: 'Lucida Grande',
  times_new_roman: 'Times New Roman',
  verdana: 'Verdana'
}
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
  dense: undefined,
  toolbar: () => _toolbar,
  fonts: () => _fonts
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
