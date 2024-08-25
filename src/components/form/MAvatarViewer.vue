<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { computed, nextTick, onBeforeUnmount, ref, useAttrs, watch } from 'vue'

import MFile from './MFile.vue'
import { MAvatarViewerProps as Props } from './models'
import { useField } from 'vee-validate'
import { useInputHelper } from '../../composables'

interface P {
  auto?: Props['auto'];
  col?: Props['col'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
  accept?: Props['accept'];
  images?: Props['images'];
  svg?: Props['svg'];
  video?: Props['video'];
  pdf?: Props['pdf'];
  excel?: Props['excel'];
  size?: Props['size'];
  avatarText?: Props['avatarText'];
  fit?: Props['fit'];
  clearable?: Props['clearable'];
  label?: Props['label'];
  rounded?: Props['rounded'];
  name?: Props['name'];
  caption?: Props['caption'];
  captionProps?: Props['captionProps'];
  hint?: Props['hint'];
  hintProps?: Props['hintProps'];
  formErrors?: Props['formErrors'];
  help?: Props['help'];
}

const props = withDefaults(defineProps<P>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  accept: undefined,
  images: !0,
  svg: !0,
  video: !1,
  pdf: !1,
  excel: !1,
  size: () => '100px',
  avatarText: undefined,
  fit: () => 'contain',
  clearable: undefined,
  label: undefined,
  rounded: undefined,
  name: 'avatar',
  hint: undefined,
  hintProps: undefined,
  caption: undefined,
  captionProps: undefined,
  formErrors: () => ({}),
  help: undefined
})
type Events = {
  (e: 'click', evt?: Event): void;
}
const emit = defineEmits<Events>()
const attrs = useAttrs()
const { accepts } = useInputHelper<any>(() => props, 'avatarViewer', () => ({ attrs }))
const modelValueScope = useField<Props['modelValue']>(() => props.name, undefined, {
  syncVModel: !0
})
const { value: modelValue, errorMessage, handleReset } = modelValueScope

const removedScope = useField<Props['removed']>(() => `${props.name}_removed`, undefined, {
  syncVModel: 'removed'
})
const { handleChange: handleRemoved } = removedScope

const urlScope = useField<Props['url']>(() => `${props.name}_url`, undefined, {
  syncVModel: 'url'
})
const { value: url, handleChange: handleUrl } = urlScope

const fileRef = ref<typeof MFile | null | undefined>()
const pickFiles = () => fileRef.value?.pickFiles()
const removeFile = () => fileRef.value?.removeAtIndex(0)

/**
 * Blob file to url helpers
 */
const blobUrl = ref<string | null>(null)
const isLoaded = ref(!1)
const revoke = () => {
  if (blobUrl.value) {
    URL.revokeObjectURL(blobUrl.value)
    blobUrl.value = null
  }
}
const toUrl = (data?: any) => {
  revoke()
  blobUrl.value = URL.createObjectURL(data)
  return blobUrl
}

const hasSrc = computed(() => !!modelValue.value || !!url.value)

/**
 * Check if blob value is a File & not image
 */
const isFile = computed(() => {
  if (!(modelValue.value instanceof File)) {
    return !1
  }
  return modelValue.value instanceof File && modelValue.value?.type.slice(0, 6) !== 'image/'
})
const getAvatarText = computed(() => props.avatarText ? props.avatarText.slice(0, 1).toUpperCase() : undefined)
const onClick = (e?: Event) => {
  handleReset()
  if (props.clearable && hasSrc.value) {
    onClearInput()
    return
  }
  pickFiles()
  nextTick(() => emit('click', e))
}
const onClearInput = () => {
  removeFile()
  handleRemoved(!0, !1)
  handleUrl(null, !1)
}
onBeforeUnmount(() => {
  revoke()
  removeFile()
  handleRemoved(undefined, !1)
})
watch(modelValue, (v) => {
  if (v instanceof File) {
    nextTick(() => toUrl(v))
  }
})
</script>

<script lang="ts">
export default {
  name: 'MAvatarViewer',
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
    <MColumn class="items-center">
      <MTransition>
        <div
          v-if="!!label"
          key="label"
          class="row items-center"
        >
          <div :class="`text-h6 q-px-sm rounded-borders q-mb-sm ${!!errorMessage ? 'text-negative' : ''}`">
            {{ __(label) }}
            <span
              v-if="!clearable"
              class="text-negative"
            >*</span>
          </div>
          <MHelpRow
            v-if="!!help"
            tooltip
            :text="help"
          />
        </div>
        <slot name="hint">
          <div
            v-if="!!hint"
            key="hint"
            class="m--input__hint"
            v-bind="hintProps"
          >
            <span>{{ __(hint) }}</span>
          </div>
        </slot>
        <div
          key="avatar"
          :class="`rounded-borders q-mb-sm ${!!errorMessage ? 'q-pa-xs bg-negative' : ''}`"
        >
          <q-avatar
            :color="!!errorMessage ? 'negative' : ((!isLoaded || !hasSrc || isFile) ? 'primary' : undefined)"
            :icon="isFile ? 'o_description' : undefined"
            :rounded="rounded === undefined ? hasSrc : rounded"
            :size="size"
            text-color="white"
          >
            <q-img
              v-if="hasSrc && !isFile"
              :fit="fit"
              :height="size"
              :src="blobUrl || url"
              ratio="1"
              @error="isLoaded = !0"
              @load="isLoaded = !0"
            >
              <template #loading>
                <div class="text-white">
                  <q-spinner-ios />
                </div>
              </template>
            </q-img>
            <div
              v-if="getAvatarText && !hasSrc"
              class="text-white text-h3"
              v-text="getAvatarText"
            />
          </q-avatar>
        </div>
        <div
          key="btn"
          class="q-mb-sm"
        >
          <MBtn
            :color="!hasSrc ? 'positive' : 'secondary'"
            :disable="!isLoaded && !!url"
            :label="__( clearable && hasSrc ? 'remove' : ( !clearable && hasSrc ? 'change' : 'choose') )"
            @click="onClick"
          />
        </div>
        <div
          v-if="!!errorMessage"
          key="errors"
          class="q-mb-sm"
        >
          <span class="text-body2 text-negative">{{ errorMessage }}</span>
        </div>
      </MTransition>
      <slot name="caption">
        <div
          v-if="!!caption"
          class="m--input__caption"
          v-bind="captionProps"
        >
          {{ __(caption) }}
        </div>
      </slot>
    </MColumn>
    <slot />
    <MFile
      key="file"
      ref="fileRef"
      v-model="modelValue"
      :accept="accepts.join(',')"
      :clearable="clearable"
      :name="name"
      class="hidden"
    />
  </MCol>
</template>
