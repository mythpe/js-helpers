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
    <div
      v-if="!!getLabel || !!hint"
      class="q-mb-md"
    >
      <div
        v-if="!!getLabel "
        class="text-body1"
      >
        {{ getLabel }}
      </div>
      <div
        v-if="!!hint"
        class="text-caption"
      >
        {{ hint }}
      </div>
    </div>
    <VeeField
      ref="veeFieldRef"
      v-slot="fieldScope"
      v-model="inputValue"
      :label="label ? __(label) : name"
      :name="name"
      :rules="getRules"
      v-bind="$attrs"
    >
      <q-editor
        :_definitions="{..._definitions,...$myth.options.editor?.definitions}"
        :dense="dense !== undefined ? dense : $q.screen.lt.md"
        :fonts="fonts || _fonts"
        :min-height="minHeight"
        :model-value="inputValue"
        :toolbar="toolbar || _toolbar"
        v-bind="{...$myth.options.editor,...$attrs}"
        @update:model-value="fieldScope.handleChange"
      />
    </VeeField>
    <slot />
    <MTransition>
      <p
        v-if="inputErrors.length > 0"
        class="text-body2 text-negative"
      >
        {{ inputErrors[0] }}
      </p>
    </MTransition>
  </MCol>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar'
import { computed } from 'vue'
import { useInputProps } from '../../composables'
import { Field as VeeField } from 'vee-validate'
import { MEditorProps } from './models'

interface Props {
  auto?: MEditorProps['auto'];
  col?: MEditorProps['col'];
  xs?: MEditorProps['xs'];
  sm?: MEditorProps['sm'];
  md?: MEditorProps['md'];
  lg?: MEditorProps['lg'];
  xl?: MEditorProps['xl'];
  modelValue?: MEditorProps['modelValue'];
  minHeight?: MEditorProps['minHeight'];
  name: MEditorProps['name'];
  label?: MEditorProps['label'];
  hint?: MEditorProps['hint'];
  dense?: MEditorProps['dense'];
  toolbar?: MEditorProps['toolbar'];
  fonts?: MEditorProps['fonts'];
}

const $q = useQuasar()
const _toolbar = [
  [
    // {
    //   label: $q.lang.editor.align,
    //   icon: $q.iconSet.editor.align,
    //   fixedLabel: true,
    //   list: 'only-icons',
    //   options: ['left', 'center', 'right', 'justify']
    // },
    {
      label: $q.lang.editor.align,
      icon: $q.iconSet.editor.align,
      fixedLabel: true,
      options: ['left', 'center', 'right', 'justify']
    }
  ],
  ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
  ['hr', 'link', 'print', 'fullscreen'],
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
const _definitions = {
  colors: {
    label: 'Colors',
    tip: 'Change the text & background colors',
    icon: 'colorize'
  }
}
const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  modelValue: () => '',
  minHeight: '10rem',
  name: () => '',
  label: undefined,
  hint: undefined,
  dense: undefined,
  toolbar: undefined,
  fonts: undefined
})

type EmitsTypes = {
  (e: 'update:modelValue', value: any): void
}
const emit = defineEmits<EmitsTypes>()

const inputValue = computed({
  get: () => props.modelValue || '',
  set: value => emit('update:modelValue', value)
})

const { getRules, getLabel, inputErrors } = useInputProps(() => props)
</script>

<script lang="ts">
export default {
  name: 'MEditor',
  inheritAttrs: !1
}
</script>
