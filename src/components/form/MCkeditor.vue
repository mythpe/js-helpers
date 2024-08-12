<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { useField } from 'vee-validate'
import { MCkeditorProps as Props } from './models.d'
import { computed, reactive, ref, useAttrs } from 'vue'
import { useInputHelper } from '../../composables'

import {
  Alignment,
  Autoformat,
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  CKFinder,
  CKFinderUploadAdapter,
  ClassicEditor,
  CloudServices,
  Code,
  CodeBlock,
  EditorConfig,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Mention,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  RemoveFormat,
  SourceEditing,
  Strikethrough,
  Subscript,
  Superscript,
  Table,
  TableColumnResize,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline
} from 'ckeditor5'
import arTranslations from 'ckeditor5/translations/ar.js'
import enTranslations from 'ckeditor5/translations/en.js'
import { ExtractEditorType } from '@ckeditor/ckeditor5-vue/dist/types'

type P = {
  name: Props['name'];
  lang: Props['lang'];
  config?: Props['config'];
  tagName?: Props['tagName'];
  disabled?: Props['disabled'];
  disableTwoWayDataBinding?: Props['disableTwoWayDataBinding'];

  auto?: Props['auto'];
  col?: Props['col'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
  label?: Props['label'];
  caption?: Props['caption'];
  help?: Props['help'];
  // required?: Props['required'];
  rules?: Props['rules'];
  errors?: Props['errors'];
  viewMode?: Props['viewMode'];
  viewModeValue?: Props['viewModeValue'];
}

const props = withDefaults(defineProps<P>(), {
  name: () => '',
  lang: () => 'ar',
  config: undefined,
  tagName: () => 'div',
  disabled: () => !1,
  disableTwoWayDataBinding: () => !1,

  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  label: undefined,
  caption: undefined,
  help: undefined,
  // required: undefined,
  rules: undefined,
  errors: undefined,
  viewMode: () => !1,
  viewModeValue: undefined
})
defineModel<Props['modelValue']>({ required: !1, default: '' })
const attrs = useAttrs()
const helper = useInputHelper<any>(() => props, 'ckeditor', () => ({ attrs }))
const { getLabel, getRules } = helper
const inputScope = useField<Props['modelValue']>(() => props.name, getRules, {
  validateOnMount: !1,
  validateOnValueUpdate: !1,
  // initialValue: modelValue,
  syncVModel: !0,
  label: getLabel
})
const { value, errors: fieldErrors, handleChange, handleBlur } = inputScope
const getErrors = computed(() => [...(props.errors || []), ...fieldErrors.value])
const errorMessage = computed(() => getErrors.value[0] || undefined)

const inpConfig = reactive<EditorConfig>({
  language: {
    // ui: toValue(locale),
    ui: (props.lang as string) ?? 'ar',
    content: (props.lang as string) ?? 'ar'
  },
  translations: [
    arTranslations,
    enTranslations
  ],
  plugins: [
    Autoformat,
    BlockQuote,
    Bold,
    CKFinder,
    CKFinderUploadAdapter,
    CloudServices,
    Essentials,
    Heading,
    Image,
    ImageCaption,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    Base64UploadAdapter,
    Indent,
    IndentBlock,
    Italic,
    Link,
    List,
    MediaEmbed,
    Mention,
    Paragraph,
    PasteFromOffice,
    PictureEditing,
    Table,
    TableColumnResize,
    TableToolbar,
    TextTransformation,
    Underline,
    FontSize,
    FontFamily,
    FontColor,
    FontBackgroundColor,
    RemoveFormat,
    Strikethrough,
    Subscript,
    Code,
    CodeBlock,
    Alignment,
    Superscript,
    TodoList,
    SourceEditing
  ],
  toolbar: {
    items: [
      'undo',
      'redo',
      '|',
      'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript', 'code',
      '|',
      'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
      '|',
      'alignment',
      'insertTable',
      'heading',
      '|',
      'link', 'uploadImage', 'blockQuote', 'codeBlock',
      '|',
      'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
      '|',
      // 'ckbox',
      'removeFormat',
      'mediaEmbed',
      '|',
      'sourceEditing'
    ],
    shouldNotGroupWhenFull: true
  },
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph'
      },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1'
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2'
      },
      {
        model: 'heading3',
        view: 'h3',
        title: 'Heading 3',
        class: 'ck-heading_heading3'
      },
      {
        model: 'heading4',
        view: 'h4',
        title: 'Heading 4',
        class: 'ck-heading_heading4'
      }
    ]
  },
  image: {
    resizeOptions: [
      {
        name: 'resizeImage:original',
        label: 'Default image width',
        value: null
      },
      {
        name: 'resizeImage:50',
        label: '50% page width',
        value: '50'
      },
      {
        name: 'resizeImage:75',
        label: '75% page width',
        value: '75'
      }
    ],
    toolbar: [
      'imageTextAlternative',
      'toggleImageCaption',
      '|',
      'imageStyle:inline',
      'imageStyle:wrapText',
      'imageStyle:breakText',
      '|',
      'resizeImage'
    ]
  },
  menuBar: {
    isVisible: !1
  },
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: 'https://'
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  }
})
const getConfig = computed<EditorConfig>(() => {
  if (props.config) {
    return props.config(inpConfig) as EditorConfig
  }
  return inpConfig as EditorConfig
})
const isRtl = computed(() => inpConfig.language === 'ar' || inpConfig.language === 'ar' || inpConfig.language?.ui === 'ar')

const input = ref<ExtractEditorType>()
const scopes = reactive(inputScope)
defineExpose<typeof scopes & { input: typeof input }>({ input, ...scopes })
</script>

<script lang="ts">
export default {
  name: 'MCkeditor',
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
        :for="name"
      >
        {{ getLabel }}
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
    <slot
      name="help"
      v-bind="inputScope"
    >
      <MHelpRow :text="help" />
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
    <div
      v-if="viewMode"
      v-html="value"
    />
    <div
      v-else
      :dir="isRtl ? 'rtl' : 'ltr'"
      :style="`direction: ${isRtl ? 'rtl' : 'ltr'}`"
      v-bind="$attrs"
    >
      <ckeditor
        ref="input"
        v-model="value"
        :config="getConfig"
        :disable-two-way-data-binding="disableTwoWayDataBinding"
        :disabled="disabled"
        :editor="ClassicEditor"
        :tag-name="tagName"
      />
      <slot v-bind="scopes" />
    </div>
    <slot
      name="bottom-input"
      v-bind="inputScope"
    />
  </MCol>
</template>

<style lang="scss">
.ck.ck-block-toolbar-button {
  transform: translateX(-10px);
}

.ck[dir="rtl"] .ck-block-toolbar-button {
  transform: translateX(10px) !important;
}
</style>
