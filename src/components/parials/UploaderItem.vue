<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { computed, defineProps, nextTick, ref, withDefaults } from 'vue'
import { MUploaderMediaItem, MUploaderProps as Props, MUploaderServiceType } from '../form/models'
import { useMyth } from '../../vue3'
import { QUploader, useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

type ModelValue = MUploaderMediaItem | File & {
  __sizeLabel?: string;
  __progressLabel?: string;
  __status?: string;
  __img?: string;
};

interface P {
  name: Props['name'];
  modelId?: Props['modelId'];
  iconsSize?: Props['iconsSize'];
  hideDeleteMedia?: Props['hideDeleteMedia'];
  updateBtn?: Props['updateBtn'];
  collection?: Props['collection'];
  returnType?: Props['returnType'];
  service: Props['service'];
  displayMode?: Props['displayMode'];
  shadow?: Props['shadow'];
  scope: QUploader;
  defaultFileIcon?: Props['defaultFileIcon'];
  deleteMediaIcon?: Props['deleteMediaIcon'];
  downloadFileIcon?: Props['downloadFileIcon'];
  mediaLabel?: Props['mediaLabel'];
}

const props = withDefaults(defineProps<P>(), {
  // item: () => ({} as ModelValue),
  name: () => '',
  modelId: undefined,
  iconsSize: undefined,
  hideDeleteMedia: undefined,
  updateBtn: undefined,
  collection: undefined,
  returnType: undefined,
  service: undefined,
  displayMode: undefined,
  shadow: undefined,
  scope: () => ({} as QUploader),
  defaultFileIcon: undefined,
  deleteMediaIcon: undefined,
  downloadFileIcon: undefined,
  mediaLabel: () => ''
})
const modelValue = defineModel<ModelValue>({ required: !0, default: () => ({} as ModelValue) })
const mediaProp = computed<MUploaderMediaItem>(() => modelValue.value as MUploaderMediaItem)

interface Emits {
  (e: 'delete-media', media: MUploaderMediaItem, result: boolean): void;

  (e: 'remove-file', File: File): void;

  (e: 'values', value: Props['modelValue']): void;
}

const emit = defineEmits<Emits>()

const q = useQuasar()
const myth = useMyth()
const { te } = useI18n({ useScope: 'global' })
const { alertError, alertSuccess, confirmMessage, __ } = myth
const setModelValue = (value: Props['modelValue']) => emit('values', value)
const deleting = ref(!1)
const onClickDeleteAttachment = () => {
  const file = modelValue.value
  if (file instanceof File) {
    confirmMessage().onOk(() => {
      deleteUploaderFile(file)
    })
  } else {
    deleteMedia(file)
  }
}

const hideDeleteMediaProp = computed(() => props.hideDeleteMedia)
const getRequestConfig = () => ({
  params: {
    collection: props.collection !== undefined ? props.collection : undefined,
    return: props.returnType !== undefined ? props.returnType : undefined
  }
})
const deleteMedia = (media: MUploaderMediaItem) => {
  if (deleting.value || hideDeleteMediaProp.value) {
    return
  }
  confirmMessage().onOk(() => {
    const model = modelValue.value as MUploaderMediaItem
    let r = !1
    const method = (typeof props.service === 'string' ? myth.services[props.service] : props.service) as MUploaderServiceType
    if (method) {
      deleting.value = !0
      q.loading.show()
      method.deleteAttachment(props.modelId, model.id, getRequestConfig())
        .then(({ _message, _success, _data }) => {
          _message && alertSuccess(_message)
          r = _success
          setModelValue((_data ?? []) as MUploaderMediaItem[])
        })
        .catch((e) => {
          alertError(e?._message || e?.message)
          r = !1
        })
        .finally(() => {
          deleting.value = !1
          q.loading.hide()
          emit('delete-media', media, r)
        })
    }
  })
}
const deleteUploaderFile = (file: File) => {
  nextTick(() => emit('remove-file', file))
}
const onUpdateField = (data: any) => {
  const model = modelValue.value as MUploaderMediaItem
  const method = (typeof props.service === 'string' ? myth.services[props.service] : props.service) as MUploaderServiceType
  if (method) {
    deleting.value = !0
    q.loading.show()
    method.updateAttachment(props.modelId, model.id, data, getRequestConfig())
      .then(({ _message, _data }) => {
        _message && alertSuccess(_message)
        setModelValue((_data ?? []) as MUploaderMediaItem[])
      })
      .catch((e) => {
        alertError(e?._message || e?.message)
      })
      .finally(() => {
        deleting.value = !1
        q.loading.hide()
      })
  }
}
defineOptions({ name: 'UploaderItem' })
</script>

<template>
  <q-item
    :class="displayMode === 'card' ? `rounded-borders ${shadow || 'shadow-1'}` : undefined"
    :dense="displayMode === 'card'"
    :style="displayMode === 'card' ? 'max-width: 300px; min-width: 200px;' : undefined"
  >
    <q-item-section
      v-if="displayMode === 'list'"
      avatar
      top
    >
      <q-icon
        v-if="!!mediaProp.icon"
        :name="mediaProp.icon"
        :size="iconsSize"
        color="primary"
      />
      <q-img
        v-else-if="!!modelValue.__img || (mediaProp.url && modelValue.type === 'image')"
        :ratio="1"
        :src="modelValue.__img ? modelValue.__img.src : mediaProp.url"
        fit="contain"
      />
      <q-icon
        v-else
        :name="modelValue.type === 'pdf' ? 'fa-regular fa-file-pdf' : (modelValue.type === 'excel' ? 'fa-regular fa-file-excel' : (modelValue.type === 'image' ? 'o_image' :defaultFileIcon))"
        :size="props.iconsSize"
        color="primary"
      />
    </q-item-section>
    <q-item-section :class="{'overflow-hidden': displayMode === 'card'}">
      <q-item-label v-if="!!mediaProp[mediaLabel]">
        {{ mediaProp[mediaLabel] }}
        <q-icon
          v-if="updateBtn"
          class="cursor-pointer"
          color="primary"
          name="o_edit"
          right
        >
          <q-popup-edit
            v-slot="popupScope"
            :label-set="__('labels.save')"
            :model-value="{name: mediaProp.name, order_column: mediaProp.order_column}"
            :title="__('labels.update')"
            buttons
            cover
            max-width="350px"
            persistent
            @save="onUpdateField( $event)"
          >
            <q-input
              v-model="popupScope.value.name"
              :label="__('name')"
              autofocus
              dense
              hide-bottom-space
            />
            <q-input
              v-model="popupScope.value.order_column"
              :label="__('order_column')"
              autofocus
              dense
              hide-bottom-space
            />
          </q-popup-edit>
          <q-tooltip>{{ __('labels.update') }}</q-tooltip>
        </q-icon>
      </q-item-label>
      <q-item-label v-else-if="!!mediaProp.label">
        {{ __(mediaProp.label) }}
      </q-item-label>
      <q-item-label v-if="!!mediaProp.user_id_to_string">
        <q-icon
          color="primary"
          name="ion-ios-contact"
        />
        {{ mediaProp.user_id_to_string }}
      </q-item-label>
      <q-item-label v-if="!!mediaProp.description">
        {{ mediaProp.description }}
      </q-item-label>
      <q-item-label v-else-if="!!mediaProp.attachment_type">
        {{ mediaProp.attachment_type }}
      </q-item-label>
      <slot
        :item="modelValue"
        name="item"
      />
      <q-item-label
        v-if="!!modelValue.__status"
        :class="{'print-hide': !0,'text-positive' : (modelValue.__status === 'uploaded' || !!mediaProp.id),'text-orange' : modelValue.__status === 'uploading','text-amber-10' : modelValue.__status === 'idle' || modelValue.__status === 'failed'}"
        caption
      >
        <q-icon
          :name="modelValue.__status === 'uploaded' ? 'o_check' : ( modelValue.__status === 'uploading' ? 'o_cloud_sync' : (modelValue.__status === 'idle' ? 'o_hourglass_empty' : (modelValue.__status === 'failed' ? 'o_error_outline' : undefined)))"
          size="22px"
        />
        <span class="text-body2 q-pl-xs">
          {{ te(`myth.uploader.statuses.${modelValue.__status}`) ? __(`myth.uploader.statuses.${modelValue.__status}`) : modelValue.__status }}
        </span>
      </q-item-label>
      <q-item-label
        v-if="!!mediaProp.size_to_string || !!modelValue.__sizeLabel"
        caption
        class="print-hide"
      >
        <span v-if="!!mediaProp.size_to_string">{{ mediaProp.size_to_string }} | {{ modelValue.type }}</span>
        <span v-if="modelValue.__sizeLabel">{{ modelValue.__sizeLabel }} / {{ modelValue.__progressLabel }}</span>
      </q-item-label>
      <q-item-label
        v-if="(mediaProp.id && mediaProp.url) || (!hideDeleteMedia || (hideDeleteMedia && !mediaProp.id))"
        class="print-hide justify-between"
      >
        <q-btn
          v-if="mediaProp.id && mediaProp.url"
          :href="mediaProp.url"
          :icon="downloadFileIcon"
          dense
          flat
          target="_blank"
          v-bind="$myth.options.uploaderOptions?.downloadBtnProps"
        >
          <q-tooltip class="m--dt-btn-tooltip">
            {{ __('myth.titles.download') }}
          </q-tooltip>
        </q-btn>
        <q-btn
          v-if="(!hideDeleteMedia || (hideDeleteMedia && !mediaProp.id))"
          :disable="deleting || scope.isBusy || scope.isUploading"
          :icon="deleteMediaIcon"
          dense
          flat
          v-bind="$myth.options.uploaderOptions?.removeBtnProps"
          @click="onClickDeleteAttachment()"
        >
          <q-tooltip class="m--dt-btn-tooltip">
            {{ __(mediaProp.id ? 'myth.uploader.deleteMedia' : 'myth.uploader.removeMedia') }}
          </q-tooltip>
        </q-btn>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
