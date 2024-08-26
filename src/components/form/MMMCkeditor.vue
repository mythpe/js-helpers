<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts">
import { computed, PropType, reactive, ref, toValue, useAttrs } from 'vue'

import { useField } from 'vee-validate'
import { MCkeditorProps as Props } from './models.d'
import { useInputHelper } from '../../composables'
import { useMyth } from '../../vue3'

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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import arTranslations from 'ckeditor5/translations/ar.js'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import enTranslations from 'ckeditor5/translations/en.js'

// type P = {
//   name: Props['name'];
//   lang: Props['lang'];
//   config?: Props['config'];
//   tagName?: Props['tagName'];
//   disabled?: Props['disabled'];
//   disableTwoWayDataBinding?: Props['disableTwoWayDataBinding'];
//   auto?: Props['auto'];
//   col?: Props['col'];
//   xs?: Props['xs'];
//   sm?: Props['sm'];
//   md?: Props['md'];
//   lg?: Props['lg'];
//   xl?: Props['xl'];
//   label?: Props['label'];
//   caption?: Props['caption'];
//   help?: Props['help'];
//   required?: Props['required'];
//   rules?: Props['rules'];
//   viewMode?: Props['viewMode'];
//   viewModeValue?: Props['viewModeValue'];
//   fieldOptions?: Props['fieldOptions'];
// }

export default {
  setup: (props) => {
    const { __ } = useMyth()
    const attrs = useAttrs()
    const helper = useInputHelper<any>(() => props, 'ckeditor', () => ({ attrs }))
    const { getLabel, getRules } = helper
    const inputScope = useField<Props['modelValue']>(() => props.name, getRules, {
      validateOnMount: !1,
      validateOnValueUpdate: !1,
      syncVModel: !0,
      label: getLabel,
      ...toValue<any>(props.fieldOptions)
    })
    const { value, errorMessage, handleChange } = inputScope

    const listeners = {
      'update:modelValue': (v: Props['modelValue']) => handleChange(v, !!errorMessage.value)
    }

    const isRtl = computed(() => props.lang === 'ar')
    const inpConfig = reactive<EditorConfig>({
      language: {
        ui: computed(() => props.lang).value,
        content: computed(() => props.lang).value,
        textPartLanguage: [
          {
            title: __('ar'),
            languageCode: 'ar',
            textDirection: 'rtl'
          },
          {
            title: __('en'),
            languageCode: 'en',
            textDirection: 'ltr'
          }
        ]
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

    const input = ref<any>()
    const scopes = reactive(inputScope)
    // defineExpose<typeof scopes & { input: typeof input }>({ input, ...scopes })

    return { getRules, errorMessage, getConfig, isRtl, listeners, value, scopes, getLabel, input }
  },
  name: 'MCkeditor',
  inheritAttrs: !1,
  props: {
    modelValue: {
      type: String as PropType<Props['name']>,
      required: !1,
      default: () => ''
    },
    name: {
      type: String as PropType<Props['name']>,
      required: !0,
      default: () => ''
    },
    lang: {
      type: String as PropType<Props['lang']>,
      required: !0,
      default: () => 'ar'
    },
    config: {
      type: Object as PropType<Props['config']>,
      required: !1,
      default: undefined
    },
    tagName: {
      type: String as PropType<Props['tagName']>,
      required: !1,
      default: () => 'div'
    },
    disabled: {
      type: Boolean as PropType<Props['disabled']>,
      required: !1,
      default: () => !1
    },
    disableTwoWayDataBinding: {
      type: Boolean as PropType<Props['disableTwoWayDataBinding']>,
      required: !1,
      default: () => !1
    },

    auto: {
      type: Boolean as PropType<Props['auto']>,
      required: !1,
      default: undefined
    },
    col: {
      type: String as PropType<Props['col']>,
      required: !1,
      default: undefined
    },
    xs: {
      type: String as PropType<Props['col']>,
      required: !1,
      default: undefined
    },
    sm: {
      type: String as PropType<Props['col']>,
      required: !1,
      default: undefined
    },
    md: {
      type: String as PropType<Props['col']>,
      required: !1,
      default: undefined
    },
    lg: {
      type: String as PropType<Props['col']>,
      required: !1,
      default: undefined
    },
    xl: {
      type: String as PropType<Props['col']>,
      required: !1,
      default: undefined
    },
    label: {
      type: String as PropType<Props['label']>,
      required: !1,
      default: undefined
    },
    caption: {
      type: String as PropType<Props['caption']>,
      required: !1,
      default: undefined
    },
    help: {
      type: String as PropType<Props['help']>,
      required: !1,
      default: undefined
    },
    required: {
      type: Boolean as PropType<Props['required']>,
      required: !1,
      default: undefined
    },
    rules: {
      type: Object as PropType<Props['rules']>,
      required: !1,
      default: undefined
    },
    viewMode: {
      type: Boolean as PropType<Props['viewMode']>,
      required: !1,
      default: () => !1
    },
    viewModeValue: {
      type: String as PropType<Props['viewModeValue']>,
      required: !1,
      default: undefined
    },
    fieldOptions: {
      type: Object as PropType<Props['fieldOptions']>,
      required: !1,
      default: undefined
    }
  },
  data () {
    return {
      editor: ClassicEditor
    }
  }
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
      v-bind="scopes"
    >
      <MHelpRow
        v-if="!getLabel"
        :text="help"
      />
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
        :config="getConfig"
        :disable-two-way-data-binding="disableTwoWayDataBinding"
        :disabled="disabled"
        :editor="editor"
        :model-value="value || ''"
        :tag-name="tagName"
        v-on="listeners"
      />
      <slot v-bind="scopes" />
    </div>
    <slot
      name="bottom-input"
      v-bind="scopes"
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
