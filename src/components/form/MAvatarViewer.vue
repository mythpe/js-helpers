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
import { MAvatarViewerItem, MAvatarViewerProps } from './models'

interface Props {
  auto?: boolean;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  modelValue: MAvatarViewerItem;
  accept?: string;
  images?: boolean;
  video?: boolean;
  pdf?: boolean;
  excel?: boolean;
  item?: MAvatarViewerItem;
  errors: Record<string, any[]>;
  size?: string;
  name?: string;
  url?: string;
  avatarText?: string;
  fit?: MAvatarViewerProps['fit'];
  clearable?: boolean;
  label?: string;
  rounded?: boolean;
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
  accept: undefined,
  images: !0,
  video: !1,
  pdf: !1,
  excel: !1,
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
  (e: 'update:modelValue', value: any): void;
  (e: 'update:errors', value: any): void;
}
const emit = defineEmits<Events>()
const fileInput = ref<typeof MFile>()
const accepts = useAcceptProp(props)

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
const itemRef = ref(props.modelValue)
const hasSrc = computed(() => {
  return props.modelValue && (Boolean(props.modelValue[props.name]) || Boolean(props.modelValue[props.url]))
})

const isFile = computed(() => {
  if (!(props.modelValue[props.name] instanceof File)) return !1
  return props.modelValue[props.name] instanceof File && props.modelValue[props.name].type.slice(0, 6) !== 'image/'
})
const getAvatarText = () => props.avatarText ? itemRef.value[props.avatarText]?.slice(0, 1)?.toUpperCase() : undefined
const setLoaded = () => {
  isLoaded.value = !0
}
const onClick = (e?: Event) => {
  if (props.clearable && (hasSrc.value)) {
    onClearInput()
    return
  }
  if (fileInput.value) {
    fileInput.value?.pickFiles()
  }
  nextTick(() => emit('click', e))
}
const onClearInput = () => {
  if (fileInput.value) {
    fileInput.value?.removeAtIndex(0)
  }
  // itemRef.value = Object.assign(itemRef, {
  //   [props.url]: null,
  //   [`${props.name}Removed`]: !0
  // })
  itemRef.value[props.url] = null
  itemRef.value[`${props.name}Removed`] = !0
}

onBeforeUnmount(() => {
  revoke()
  itemRef.value[props.name] = null
  itemRef[`${props.name}Removed`] = undefined
})
watch(props.modelValue, (v) => {
  if (v[props.name] instanceof File) {
    toUrl(v[props.name])
    emit('update:errors', {})
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
      <MCol
        v-if="label"
        col="auto"
      >
        <p class="text-h6 q-mb-sm">
          {{ label }}
          <span
            v-if="!clearable"
            class="text-negative"
          >*</span>
        </p>
      </MCol>
      <MCol
        class="q-mb-sm"
        col="auto"
      >
        <div class="relative-position">
          <q-avatar
            :color="(!isLoaded || !hasSrc || isFile) ? 'primary' : undefined"
            :icon="isFile ? 'o_description' : undefined"
            :rounded="rounded === undefined ? !!hasSrc : rounded"
            :size="size"
            text-color="white"
          >
            <q-img
              v-if="hasSrc && !isFile"
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
            <div
              v-if="avatarText && !hasSrc"
              class="text-white text-h3"
            >
              {{ getAvatarText() }}
            </div>
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
      </MCol>
      <MCol col="auto">
        <MBtn
          :color="!hasSrc ? 'positive' : 'secondary'"
          :disable="!isLoaded && Boolean(itemRef[url])"
          @click="onClick"
        >
          <span v-if="clearable && hasSrc">{{ $t('remove') }}</span>
          <span v-else-if="!clearable && hasSrc">{{ $t('change') }}</span>
          <span v-else>{{ $t('choose') }}</span>
        </MBtn>
      </MCol>
      <MCol
        v-if="errors[name]"
        col="12"
      >
        <span class="text-body2 text-negative">{{ typeof errors[name] === 'string' ? errors[name] : errors[name][0] }}</span>
      </MCol>
      <MFile
        ref="fileInput"
        v-model="itemRef[name]"
        :accept="accepts.join(',')"
        :clearable="clearable"
        :errors="errors"
        :name="name"
        class="hidden"
      />
    </MColumn>
  </MCol>
</template>

<style>
.m--avatar-viewer {

}
</style>
