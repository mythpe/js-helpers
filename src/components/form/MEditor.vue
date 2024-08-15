<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { QEditor, QField, useQuasar } from 'quasar'
import { useInputHelper } from '../../composables'
import { useField } from 'vee-validate'
import { MEditorProps as Props } from './models'
import { computed, reactive, ref, useAttrs } from 'vue'

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

interface P {
  auto?: Props['auto'];
  col?: Props['col'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
  minHeight?: Props['minHeight'];
  name: Props['name'];
  label?: Props['label'];
  caption?: Props['caption'];
  hint?: Props['hint'];
  placeholder?: Props['placeholder'];
  help?: Props['help'];
  dense?: Props['dense'];
  toolbar?: Props['toolbar'];
  fonts?: Props['fonts'];
  rules?: Props['rules'];
  // errors?: Props['errors'];
  viewMode?: Props['viewMode'];
  topLabel?: Props['topLabel'];
  required?: Props['required'];
}

const props = withDefaults(defineProps<P>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  minHeight: () => '10rem',
  name: () => '',
  label: undefined,
  caption: undefined,
  hint: undefined,
  placeholder: undefined,
  help: undefined,
  dense: undefined,
  toolbar: undefined,
  fonts: undefined,
  rules: undefined,
  // errors: undefined,
  topLabel: undefined,
  viewMode: undefined,
  required: undefined
})
defineModel<Props['modelValue']>({ required: !1, default: '' })
const attrs = useAttrs()
const helper = useInputHelper<any>(() => props, 'editor', () => ({ attrs }))
const { hasTopLabel, getLabel, getPlaceholder, inputProps, getRules } = helper
const inputScope = useField<Props['modelValue']>(() => props.name, getRules, {
  // initialValue: modelValue,
  syncVModel: !0,
  label: getLabel
})
const { value, errorMessage, handleChange } = inputScope

const listeners = {
  'update:modelValue': (v: Props['modelValue']) => handleChange(v, !!errorMessage.value)
}

const input = ref<InstanceType<typeof QEditor | typeof QField> | null>(null)
const scopes = reactive(inputScope)
defineExpose<typeof scopes & { input: typeof input }>({ input, ...scopes })
</script>

<script lang="ts">
export default {
  name: 'MEditor',
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
        v-if="hasTopLabel"
        :error="!!errorMessage"
        :label="getLabel"
        :name="name"
        :required="!!getRules?.required"
      />
    </slot>
    <slot name="caption">
      <div
        v-if="!!caption"
        class="m--input__caption"
      >
        {{ __(caption) }}
      </div>
    </slot>
    <slot
      name="help"
      v-bind="inputScope"
    >
      <MHelpRow :text="help" />
    </slot>
    <component
      :is="viewMode ? QField : QEditor"
      ref="input"
      :_definitions="{..._definitions,...$myth.options.editor?.definitions}"
      :fonts="fonts || _fonts"
      :label="hasTopLabel ? undefined : getLabel"
      :min-height="minHeight"
      :model-value="value"
      :placeholder="getPlaceholder"
      :toolbar="toolbar || _toolbar"
      v-bind="{
        ...$myth.options.editor,
        ...( viewMode ? $myth.options.field : {} ),
        ...$attrs,
        ...( viewMode ? { stackLabel: !0 } : {} ),
        dense: inputProps.dense !== undefined ? inputProps.dense : $q.screen.lt.lg
      }"
      v-on="listeners"
    />
    <slot
      name="bottom-input"
      v-bind="inputScope"
    />
    <MFadeXTransition>
      <p
        v-if="!!errorMessage"
        class="text-body2 text-negative"
      >
        {{ errorMessage }}
      </p>
    </MFadeXTransition>
  </MCol>
</template>
