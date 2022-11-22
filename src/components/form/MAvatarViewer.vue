<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts" setup>

import { QImgProps } from 'quasar'
import { nextTick, onBeforeUnmount, watch } from 'vue'

import MFile from './MFile.vue'
import { MAvatarViewerItem, MAvatarViewerProps } from './models'

interface Props extends MAvatarViewerProps {
  /**
   * Model of the component; Must be FileList or Array if using 'multiple' prop; Either use this property (along with a listener for 'update:modelValue' event) OR use v-model directive
   */
  modelValue: MAvatarViewerItem;
  /**
   * Comma separated list of unique file type specifiers. Maps to 'accept' attribute of native input type=file element
   */
  accept?: string | undefined;
  /**
   * The value that will be used to modify the image
   */
  item?: MAvatarViewerItem;
  /**
   * List of errors contains prop name { [name]: ['error1','error2']}
   */
  errors: Record<string, any[]> | undefined;
  /**
   * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
   */
  size?: string | undefined;
  /**
   * The name of the file for the image used and the field
   */
  name?: string;
  /**
   * Avatar url
   */
  url?: string;
  /**
   * Show text if no image
   */
  avatarText?: string | undefined;
  /**
   * How the image will fit into the container; Equivalent of the object-fit prop; Can be coordinated with 'position' prop
   * Default value: cover
   */
  fit?: QImgProps['fit'];
  /**
   * Can clear the input & not required
   */
  clearable?: boolean | undefined;
  /**
   * The label that will appear above the image
   */
  label?: string | undefined;
  /**
   * Applies a small standard border-radius for a squared shape of the component
   */
  rounded?: boolean | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  accept: undefined,
  item: undefined,
  errors: undefined,
  size: '150px',
  name: 'blobAvatar',
  url: 'avatar',
  avatarText: undefined,
  fit: 'contain',
  clearable: !1,
  label: undefined,
  rounded: undefined
})

type Events = {
  (e: 'click', evt?: Event): void;
  (e: 'remove-avatar', evt?: Event): void;
  (e: 'update:modelValue', value: any | undefined): void;
  (e: 'update:errors', value: any | undefined): void;
}
const emit = defineEmits<Events>()
const fileInput = $ref<typeof MFile>()

let blobUrl = $ref<string | null>(null)
let isLoaded = $ref(!1)
const revoke = () => {
  if (blobUrl) {
    URL.revokeObjectURL(blobUrl)
    nextTick(() => (blobUrl = null))
  }
}
const toUrl = (data?: any) => {
  revoke()
  blobUrl = URL.createObjectURL(data)
  return blobUrl
}
let itemRef = $ref(props.modelValue)
const hasSrc = $computed(() => {
  return props.modelValue && (Boolean(props.modelValue[props.name]) || Boolean(props.modelValue[props.url]))
})
const getAvatarText = () => props.avatarText ? itemRef[props.avatarText]?.slice(0, 1)?.toUpperCase() : undefined
const setLoaded = () => {
  isLoaded = !0
}
const onClick = (e?: Event) => {
  if (props.clearable && (hasSrc)) {
    onClearInput()
    return
  }
  if (fileInput) {
    fileInput?.pickFiles()
  }
  nextTick(() => emit('click', e))
}
const onClearInput = () => {
  if (fileInput) {
    fileInput?.removeAtIndex(0)
  }
  itemRef = Object.assign(itemRef, {
    [props.url]: null,
    [`${props.name}Removed`]: !0
  })
}

onBeforeUnmount(() => {
  revoke()
  itemRef = Object.assign(itemRef, {
    [props.name]: null
  })
  delete itemRef[`${props.name}Removed`]
})
watch(() => itemRef[props.name], (v) => {
  if (v instanceof File) {
    toUrl(v)
    emit('update:errors', {})
  }
})
</script>

<template>
  <m-row class="m--avatar-viewer">
    <m-col col="auto">
      <m-column class="items-center">
        <m-col
          v-if="label"
          col="auto"
        >
          <p
            class="text-h6 q-mb-sm"
          >
            {{ $myth.parseAttribute(label) }}
            <span
              v-if="!clearable"
              class="text-negative"
            >*</span>
          </p>
        </m-col>
        <m-col
          class="q-mb-sm"
          col="auto"
        >
          <div class="relative-position">
            <q-avatar
              :color="!isLoaded || !hasSrc ? 'primary' : undefined"
              :rounded="rounded === undefined ? !!hasSrc : rounded"
              :size="size"
            >
              <q-img
                v-if="hasSrc"
                :fit="fit"
                :height="size"
                :src="blobUrl??itemRef[url]"
                ratio="1"
                @error="setLoaded"
                @load="setLoaded"
              >
                <template #loading>
                  <div class="text-white">
                    <q-spinner-ios />
                  </div>
                </template>
              </q-img>
              <h3
                v-if="avatarText"
                class="text-white"
              >
                {{ getAvatarText() }}
              </h3>
            </q-avatar>
            <!--<q-slide-transition>-->
            <!--<template v-if="!hideRemoveAvatar || (hideRemoveAvatar && props.modelValue)">-->
            <!--  <q-btn-->
            <!--    v-if="(getSrc && isLoaded)"-->
            <!--    :style="`position: absolute; ${AppAlignReverse}: -20px`"-->
            <!--    color="white"-->
            <!--    round-->
            <!--    text-color="negative"-->
            <!--    unelevated-->
            <!--    @click="removeAvatar($event)"-->
            <!--  >-->
            <!--    <q-icon name="o_cancel" />-->
            <!--  </q-btn>-->
            <!--</template>-->
            <!--</q-slide-transition>-->
          </div>
        </m-col>
        <m-col col="auto">
          <m-btn
            :color="!hasSrc ? 'positive' : 'secondary'"
            :disable="!isLoaded && Boolean(itemRef[url])"
            @click="onClick"
          >
            <span v-if="clearable && hasSrc">{{ $t('remove') }}</span>
            <span v-else-if="!clearable && hasSrc">{{ $t('change') }}</span>
            <span v-else>{{ $t('choose') }}</span>
          </m-btn>
        </m-col>
        <m-col
          v-if="errors[name]"
          col="12"
        >
          <span class="text-body2 text-negative">{{ errors[name][0] }}</span>
        </m-col>
      </m-column>
    </m-col>
    <m-file
      ref="fileInput"
      v-model="itemRef[name]"
      :accept="accept"
      :clearable="clearable"
      :errors="errors"
      :name="name"
      class="hidden"
    />
  </m-row>
</template>

<style>
.m--avatar-viewer {

}
</style>
