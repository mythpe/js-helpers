<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { computed, defineProps, nextTick, ref, withDefaults } from 'vue'
import { MUploaderMediaItem, MUploaderProps as Props } from '../form/models'
import { useMyth } from '../../vue3'
import { QUploader } from 'quasar'

type ModelValue = MUploaderMediaItem | File;

interface P {
  name: Props['name'];
  modelId?: Props['modelId'];
  iconsSize?: Props['iconsSize'];
  hideDeleteMedia?: Props['hideDeleteMedia'];
  collection?: Props['collection'];
  returnType?: Props['returnType'];
  service: Props['service'];
  displayMode?: Props['displayMode'];
  shadow?: Props['shadow'];
  scope: QUploader;
  defaultFileIcon?: Props['defaultFileIcon'];
  deleteMediaIcon?: Props['deleteMediaIcon'];
  downloadFileIcon?: Props['downloadFileIcon'];
  readonly item: ModelValue;
}

const props = withDefaults(defineProps<P>(), {
  item: () => ({}),
  name: () => '',
  modelId: undefined,
  iconsSize: undefined,
  hideDeleteMedia: () => !1,
  collection: undefined,
  returnType: undefined,
  service: undefined,
  displayMode: undefined,
  shadow: undefined,
  scope: () => ({}),
  defaultFileIcon: undefined,
  deleteMediaIcon: undefined,
  downloadFileIcon: undefined
})

interface Emits {
  (e: 'delete-media', media: MUploaderMediaItem, result: boolean): void;

  (e: 'remove-file', File: File): void;

  (e: 'values', value: Props['modelValue']): void;
}

const emit = defineEmits<Emits>()
const myth = useMyth()
const { alertError, alertSuccess, confirmMessage, __ } = myth
const setModelValue = (value: Props['modelValue']) => emit('values', value)
const deleting = ref(!1)
const onClickDeleteAttachment = () => {
  const file = props.item
  if (file instanceof File) {
    confirmMessage().onOk(() => {
      deleteUploaderFile(file)
    })
  } else {
    deleteMedia(file)
  }
}

const hideDeleteMediaProp = computed(() => props.hideDeleteMedia)
const deleteMedia = (media: MUploaderMediaItem) => {
  if (deleting.value || hideDeleteMediaProp.value || props.item instanceof File) {
    return
  }
  const destroy = async () => {
    let r = !1
    try {
      const config: any = { params: { collection: props.collection, return: props.returnType } }
      if (!config.params.collection) {
        delete config.params.collection
      }
      if (!config.params.return) {
        delete config.params.return
      }
      const method = async () => typeof props.service !== 'object'
        ? await myth.services[props.service].deleteAttachment(props.modelId, props.item.id, config)
        : props.service.deleteAttachment(media, config)
      if (method) {
        const { _message, _success, _data }: any = await method(media)
        _message && alertSuccess(_message)
        r = !!_success
        setModelValue(_data ?? [])
      }
    } catch (e: any) {
      alertError(e?._message || e?.message)
      r = !1
    } finally {
      deleting.value = !1
      emit('delete-media', media, r)
    }
  }
  confirmMessage().onOk(() => {
    deleting.value = !0
    nextTick(destroy)
  })
}
const deleteUploaderFile = (file: File) => {
  nextTick(() => emit('remove-file', file))
}
// const quasarLoading = computed<boolean | undefined>({
//   get: () => q.loading.isActive,
//   set: v => v ? q.loading.show() : q.loading.hide()
// })
// watch(deleting, (v) => (quasarLoading.value = v))

</script>

<template>
  <q-item
    :class="displayMode === 'card' ? `rounded-borders ${shadow || ''}` : undefined"
    :dense="displayMode === 'card'"
    :style="displayMode === 'card' ? 'max-width: 300px; min-width: 200px;' : undefined"
  >
    <q-item-section
      v-if="displayMode === 'list'"
      avatar
      top
    >
      <q-icon
        v-if="item.icon"
        :name="item.icon"
        :size="iconsSize"
        color="primary"
      />
      <q-img
        v-else-if="!!item.__img || (item.url && item.type === 'image')"
        :ratio="1"
        :src="item.__img ? item.__img.src : item.url"
        fit="contain"
      />
      <q-icon
        v-else
        :name="item.type === 'pdf' ? 'fa-regular fa-file-pdf' : (item.type === 'excel' ? 'fa-regular fa-file-excel' : (item.type === 'image' ? 'o_image' :defaultFileIcon))"
        :size="props.iconsSize"
        color="primary"
      />
    </q-item-section>
    <q-item-section :class="{'overflow-hidden': displayMode === 'card'}">
      <q-item-label v-if="!!item.file_name">
        {{ item.file_name }}
      </q-item-label>
      <q-item-label v-else-if="!!item.label">
        {{ __(item.label) }}
      </q-item-label>
      <q-item-label v-if="!!item.user_id_to_string">
        <q-icon
          color="primary"
          name="ion-ios-contact"
        />
        {{ item.user_id_to_string }}
      </q-item-label>
      <q-item-label v-if="!!item.description">
        {{ item.description }}
      </q-item-label>
      <q-item-label v-else-if="!!item.attachment_type">
        {{ item.attachment_type }}
      </q-item-label>
      <slot
        :item="item"
        name="item"
      />
      <q-item-label
        v-if="!!item.__status"
        :class="{'print-hide': !0,'text-positive' : (item.__status === 'uploaded' || !!item.id),'text-orange' : item.__status === 'uploading','text-amber-10' : item.__status === 'idle' || item.__status === 'failed'}"
        caption
      >
        <q-icon
          :name="item.__status === 'uploaded' ? 'o_check' : ( item.__status === 'uploading' ? 'o_cloud_sync' : (item.__status === 'idle' ? 'o_hourglass_empty' : (item.__status === 'failed' ? 'o_error_outline' : undefined)))"
          size="22px"
        />
        <span class="text-body2 q-pl-xs">
          {{ $te(`myth.uploader.statuses.${item.__status}`) ? __(`myth.uploader.statuses.${item.__status}`) : item.__status }}
        </span>
      </q-item-label>
      <q-item-label
        v-if="!!item.size_to_string || !!item.__sizeLabel"
        caption
        class="print-hide"
      >
        <span v-if="item.size_to_string">{{ item.size_to_string }} | {{ item.type }}</span>
        <span v-else-if="item.__sizeLabel">{{ item.__sizeLabel }} / {{ item.__progressLabel }}</span>
      </q-item-label>
      <q-item-label
        v-if="(item.id && item.url) || (!hideDeleteMedia || (hideDeleteMedia && !item.id))"
        class="print-hide"
      >
        <MBtn
          v-if="item.id && item.url"
          :href="item.url"
          :icon="downloadFileIcon"
          :label="__('myth.titles.download')"
          dense
          flat
          target="_blank"
          type="a"
          v-bind="$myth.options.uploaderOptions?.downloadBtnProps"
        />
        <MBtn
          v-if="(!hideDeleteMedia || (hideDeleteMedia && !item.id)) && displayMode === 'list'"
          :disable="deleting || scope.isBusy || scope.isUploading"
          :icon="deleteMediaIcon"
          :label="__(item.id ? 'myth.uploader.deleteMedia' : 'myth.uploader.removeMedia')"
          color="negative"
          dense
          flat
          type="a"
          v-bind="$myth.options.uploaderOptions?.removeBtnProps"
          @click="onClickDeleteAttachment()"
        >
          <q-tooltip class="m--dt-btn-tooltip">
            {{ __(item.id ? 'myth.uploader.deleteMedia' : 'myth.uploader.removeMedia') }}
          </q-tooltip>
        </MBtn>
      </q-item-label>
    </q-item-section>
    <q-item-section
      v-if="(!hideDeleteMedia || (hideDeleteMedia && !item.id)) && displayMode === 'card'"
      class="no-padding"
      side
      top
    >
      <q-item-label>
        <q-btn
          :disable="deleting || scope.isBusy || scope.isUploading"
          :icon="deleteMediaIcon"
          color="negative"
          dense
          flat
          round
          v-bind="$myth.options.uploaderOptions?.removeBtnProps"
          @click="onClickDeleteAttachment()"
        >
          <q-tooltip class="m--dt-btn-tooltip">
            {{ __(item.id ? 'myth.uploader.deleteMedia' : 'myth.uploader.removeMedia') }}
          </q-tooltip>
        </q-btn>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
