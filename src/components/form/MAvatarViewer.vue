<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import useAcceptProp from '../../composition/useAcceptProp'
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { ColStyleType } from '../grid/models'

import MFile from './MFile.vue'
import { MAvatarViewerProps } from './models'
import { Field as VeeField } from 'vee-validate'

interface Props {
  auto?: boolean;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  accept?: MAvatarViewerProps['accept'];
  images?: MAvatarViewerProps['images'];
  video?: MAvatarViewerProps['video'];
  pdf?: MAvatarViewerProps['pdf'];
  excel?: MAvatarViewerProps['excel'];
  size?: MAvatarViewerProps['size'];
  avatarText?: MAvatarViewerProps['avatarText'];
  fit?: MAvatarViewerProps['fit'];
  clearable?: MAvatarViewerProps['clearable'];
  label?: MAvatarViewerProps['label'];
  rounded?: MAvatarViewerProps['rounded'];
  errors: MAvatarViewerProps['errors'];
  name?: MAvatarViewerProps['name'];
  modelValue?: MAvatarViewerProps['modelValue'];
  url?: MAvatarViewerProps['url'];
  removed?: MAvatarViewerProps['removed'];
}

const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  accept: undefined,
  images: !0,
  video: !1,
  pdf: !1,
  excel: !1,
  size: () => '150px',
  avatarText: undefined,
  fit: () => 'contain',
  clearable: undefined,
  label: undefined,
  rounded: undefined,
  errors: () => ({}),
  modelValue: undefined,
  name: () => 'avatar',
  url: undefined,
  removed: undefined
})

type Events = {
  (e: 'click', evt?: Event): void;
  (e: 'update:errors', value: MAvatarViewerProps['errors']): void;
  (e: 'update:modelValue', value: MAvatarViewerProps['modelValue']): void;
  (e: 'update:url', value: MAvatarViewerProps['url']): void;
  (e: 'update:removed', value: MAvatarViewerProps['removed']): void;
}
const emit = defineEmits<Events>()
const accepts = useAcceptProp(props)
const errorsProp = computed<MAvatarViewerProps['errors']>({
  get: () => props.errors,
  set: v => emit('update:errors', v)
})
const hasErrors = computed(() => Boolean(errorsProp.value && errorsProp.value[props.name]))

const blobRef = ref<typeof MFile>()
const blobValue = computed<File | null | undefined>({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})

const veeFieldRemovedValue = ref<InstanceType<typeof VeeField>>()
const removedValue = computed<boolean>({
  get: () => props.removed,
  set: v => emit('update:removed', v)
})

const veeFieldUrlValue = ref<InstanceType<typeof VeeField>>()
const urlValue = computed<MAvatarViewerProps['url']>({
  get: () => props.url,
  set: v => emit('update:url', v)
})

/** Blob file to url helpers */
const blobUrl = ref<string | undefined>()
const isLoaded = ref(!1)
const revoke = () => {
  if (blobUrl.value) {
    URL.revokeObjectURL(blobUrl.value)
    blobUrl.value = undefined
  }
}
const toUrl = (data?: any) => {
  revoke()
  blobUrl.value = URL.createObjectURL(data)
  return blobUrl
}
/** Blob file to url helpers */

const hasSrc = computed(() => {
  // return props.modelValue && (Boolean(props.modelValue[props.name]) || Boolean(props.modelValue[props.url]))
  return Boolean(blobValue.value) || Boolean(urlValue.value)
})
/** Check if blob value is a File & not image */
const isFile = computed(() => {
  if (!(blobValue.value instanceof File)) {
    return !1
  }
  return blobValue.value instanceof File && blobValue.value?.type.slice(0, 6) !== 'image/'
})
const getAvatarText = computed(() => props.avatarText ? props.avatarText.slice(0, 1).toUpperCase() : undefined)
const onClick = (e?: Event) => {
  if (props.clearable && (hasSrc.value)) {
    onClearInput()
    return
  }
  if (blobRef.value) {
    blobRef.value?.pickFiles()
  }
  nextTick(() => emit('click', e))
}
const onClearInput = () => {
  blobRef.value?.removeAtIndex(0)
  nextTick(() => veeFieldUrlValue.value?.reset({ value: undefined }))
  setTimeout(() => {
    nextTick(() => veeFieldRemovedValue.value?.reset({ value: !0 }))
  }, 60)
}

onBeforeUnmount(() => {
  revoke()
  blobRef.value?.removeAtIndex(0)
  veeFieldRemovedValue.value?.reset({ value: undefined })
})
watch(() => blobValue.value, (v) => {
  if (v instanceof File) {
    toUrl(v)
    errorsProp.value = {}
  }
})
</script>

<script lang="ts">
export default {
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
    :sm="sm"
    :xs="xs"
  >
    <MColumn class="items-center">
      <MFadeTransition>
        <MCol
          v-if="label"
          col="auto"
        >
          <div :class="`text-h6 q-px-sm rounded-borders q-mb-sm ${hasErrors ? 'text-negative' : ''}`">
            {{ label }}
            <span
              v-if="!clearable"
              class="text-negative"
            >*</span>
          </div>
        </MCol>
      </MFadeTransition>
      <MCol
        :class="`rounded-borders q-mb-sm ${hasErrors ? 'q-pa-xs bg-negative' : ''}`"
        col="auto"
      >
        <q-avatar
          :color="hasErrors ? 'negative' : ((!isLoaded || !hasSrc || isFile) ? 'primary' : undefined)"
          :icon="isFile ? 'o_description' : undefined"
          :rounded="rounded === undefined ? !!hasSrc : rounded"
          :size="size"
          text-color="white"
        >
          <q-img
            v-if="hasSrc && !isFile"
            :fit="fit"
            :height="size"
            :src="blobUrl || urlValue"
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
      </MCol>
      <MCol col="auto">
        <MBtn
          :color="!hasSrc ? 'positive' : 'secondary'"
          :disable="!isLoaded && Boolean(urlValue)"
          @click="onClick"
        >
          <span v-if="clearable && hasSrc">{{ __('remove') }}</span>
          <span v-else-if="!clearable && hasSrc">{{ __('change') }}</span>
          <span v-else>{{ __('choose') }}</span>
        </MBtn>
      </MCol>
      <MFadeTransition>
        <MCol
          v-if="errors && errors[name]"
          class="q-mt-sm"
          col="12"
        >
          <span class="text-body2 text-negative">{{ typeof errors[name] === 'string' ? errors[name] : errors[name][0] }}</span>
        </MCol>
      </MFadeTransition>
      <MFile
        ref="blobRef"
        v-model="blobValue"
        :accept="accepts.join(',')"
        :clearable="clearable"
        :errors="errorsProp"
        :name="name"
        class="hidden"
      />
      <VeeField
        ref="veeFieldRemovedValue"
        v-model="removedValue"
        :name="`${name}_removed`"
        :value="!0"
        class="hidden"
        type="checkbox"
      />
      <VeeField
        ref="veeFieldUrlValue"
        v-model="urlValue"
        :name="`${name}_url`"
        class="hidden"
        type="textarea"
      />
    </MColumn>
  </MCol>
</template>

<style>
.m--avatar-viewer {

}
</style>
