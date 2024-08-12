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
import { MAvatarViewerModelValue, MAvatarViewerProps as Props } from './models'
import { Field as VeeField } from 'vee-validate'
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
  captionProps: undefined
})
type Events = {
  (e: 'click', evt?: Event): void;
}
const emit = defineEmits<Events>()
const attrs = useAttrs()
const { accepts } = useInputHelper<any>(() => props, 'avatarViewer', () => ({ attrs }))

const modelValue = defineModel<MAvatarViewerModelValue>({ required: !0, default: undefined })
const url = defineModel<string>('url', { required: false, type: String })
const errors = defineModel<Props['errors']>('errors', { required: true, default: () => ({}) })
const getErrors = computed<Record<string, string[]> | undefined>(() => {
  if (errors.value?.[props.name]) {
    if (typeof errors.value[props.name] === 'string') {
      return {
        [props.name]: [
          errors.value[props.name] as string
        ]
      }
    }
    return errors.value as Record<string, string[]>
  }
  return undefined
})
const removed = defineModel<boolean>('removed')

const blobRef = ref<typeof MFile | null | undefined>()

const hasErrors = computed(() => (errors.value?.[props.name] ?? []).length > 0)

const veeFieldRemovedValue = ref<InstanceType<typeof VeeField>>()
const veeFieldUrlValue = ref<InstanceType<typeof VeeField>>()

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
const hasSrc = computed(() => !!modelValue.value || !!url.value)

/** Check if blob value is a File & not image */
const isFile = computed(() => {
  if (!(modelValue.value instanceof File)) {
    return !1
  }
  return modelValue.value instanceof File && modelValue.value?.type.slice(0, 6) !== 'image/'
})
const getAvatarText = computed(() => props.avatarText ? props.avatarText.slice(0, 1).toUpperCase() : undefined)
const onClick = (e?: Event) => {
  errors.value = {}
  if (props.clearable && hasSrc.value) {
    onClearInput()
    return
  }
  blobRef.value?.pickFiles()
  nextTick(() => emit('click', e))
}
const onClearInput = () => {
  blobRef.value?.removeAtIndex(0)
  nextTick(() => {
    veeFieldUrlValue.value?.reset({ value: undefined })
    veeFieldRemovedValue.value?.reset({ value: !0 })
  })
}
onBeforeUnmount(() => {
  revoke()
  blobRef.value?.removeAtIndex(0)
  veeFieldRemovedValue.value?.reset({ value: undefined })
})
watch(() => modelValue.value, (v) => {
  if (v instanceof File) {
    toUrl(v)
    errors.value = {}
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
    :sm="sm"
    :xs="xs"
  >
    <MColumn class="items-center">
      <MTransition>
        <div
          v-if="label"
          key="label"
        >
          <div :class="`text-h6 q-px-sm rounded-borders q-mb-sm ${hasErrors ? 'text-negative' : ''}`">
            {{ label }}
            <span
              v-if="!clearable"
              class="text-negative"
            >*</span>
          </div>
        </div>
        <slot name="hint">
          <div
            v-if="!!hint"
            key="hint"
            class="m--input__hint"
            v-bind="hintProps"
          >
            <q-icon
              left
              name="ion-help-circle-outline"
            />
            <span>{{ __(hint) }}</span>
          </div>
        </slot>
        <div
          key="avatar"
          :class="`rounded-borders q-mb-sm ${hasErrors ? 'q-pa-xs bg-negative' : ''}`"
        >
          <q-avatar
            :color="hasErrors ? 'negative' : ((!isLoaded || !hasSrc || isFile) ? 'primary' : undefined)"
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
          v-if="!!errors"
          key="errors"
          class="q-mb-sm"
        >
          <span class="text-body2 text-negative">{{ typeof errors[name] === 'string' ? errors[name] : errors[name]?.[0] }}</span>
        </div>
        <MFile
          key="file"
          ref="blobRef"
          v-model="modelValue"
          :accept="accepts.join(',')"
          :clearable="clearable"
          :errors="getErrors"
          :name="name"
          class="hidden"
        />
        <VeeField
          key="removed"
          ref="veeFieldRemovedValue"
          v-model="removed"
          :name="`${name}_removed`"
          :value="!0"
          class="hidden"
          type="checkbox"
        />
        <VeeField
          key="url"
          ref="veeFieldUrlValue"
          v-model="url"
          :name="`${name}_url`"
          class="hidden"
          type="textarea"
        />
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
      <slot />
    </MColumn>
  </MCol>
</template>
