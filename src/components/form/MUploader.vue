<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

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
    <MFadeTransition>
      <div
        v-if="errors.length"
        class="row items-center q-pa-sm bg-negative text-white q-mb-xs rounded-borders"
      >
        <q-icon
          :name="errorsIcon"
          left
        />
        {{ errors[0] }}
      </div>
    </MFadeTransition>
    <q-uploader
      ref="uploader"
      :accept="accepts.join(',')"
      :auto-upload="autoUpload"
      :batch="batch"
      :disable="disable"
      :factory="startUpload"
      :field-name="fieldName"
      :label="label"
      :readonly="readonly"
      style="width: 100%;max-height: 450px;"
      v-bind="{...($myth.options.uploader?.props || {}),...$attrs}"
      @failed="onError"
      @rejected="onReject"
      @uploaded="onFinishUpload"
    >
      <template #header="scope">
        <MRow class="row no-wrap items-center q-pa-sm q-gutter-xs">
          <q-spinner
            v-if="scope.isUploading"
            class="q-uploader__spinner"
          />
          <div class="col">
            <div class="q-uploader__title">
              {{ label }}
            </div>
            <div class="q-uploader__subtitle">
              {{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}
            </div>
          </div>
          <q-btn
            v-if="scope.queuedFiles.length > 0"
            :icon="removeQueuedIcon"
            :label="$t('myth.uploader.clearAll')"
            dense
            flat
            @click="scope.removeQueuedFiles"
          />
          <q-btn
            v-if="scope.uploadedFiles.length > 0"
            :icon="removeUploadedIcon"
            :label="$t('myth.uploader.removeUploadedFiles')"
            dense
            flat
            @click="scope.removeUploadedFiles"
          />
          <q-btn
            v-if="scope.canAddFiles"
            :icon="pickFilesIcon"
            :label="$t('myth.uploader.pickFiles')"
            dense
            flat
            @click="scope.pickFiles"
          >
            <q-uploader-add-trigger />
          </q-btn>
          <q-btn
            v-if="scope.canUpload"
            :icon="uploadFilesIcon"
            :label="$t('myth.uploader.uploadFiles')"
            dense
            flat
            @click="scope.upload"
          />
          <q-btn
            v-if="scope.isUploading"
            :icon="abortUploadIcon"
            :label="$t('myth.uploader.abortUpload')"
            dense
            flat
            @click="scope.abort"
          />
        </MRow>
        <slot
          name="header"
          v-bind="scope"
        />
      </template>

      <template
        v-if="$slots.list"
        #list="scope"
      >
        <slot
          name="list"
          v-bind="scope"
        />
      </template>
      <template
        v-else
        #list="scope"
      >
        <MFadeTransition>
          <template v-if="[...scope.files,...attachmentsRef].length < 1">
            <div class="absolute-full">
              <div class="full-width full-height  overflow-hidden">
                <MRow class="full-height justify-center items-center">
                  <MCol class="text-h6">
                    <q-icon
                      name="error_outline"
                      left
                    />
                    <span v-text="$t('myth.select.noData')" />
                  </MCol>
                </MRow>
              </div>
            </div>
          </template>
          <q-list
            separator
            v-else
          >
            <q-item
              v-for="(file,i) in [...scope.files,...attachmentsRef]"
              :key="i"
            >
              <q-item-section avatar>
                <q-icon
                  v-if="file.icon"
                  :name="file.icon"
                  :size="iconsSizeProp"
                  color="primary"
                />
                <q-img
                  v-else-if="Boolean(file.__img) || (file.url && file.type === 'image')"
                  :ratio="1"
                  :src="file.__img ? file.__img.src : file.url"
                  fit="contain"
                />
                <q-icon
                  v-else
                  :name="file.type === 'pdf' ? 'fa-regular fa-file-pdf' : (file.type === 'excel' ? 'fa-regular fa-file-excel' : (file.type === 'image' ? 'o_image' :defaultFileIcon))"
                  :size="iconsSizeProp"
                  color="primary"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="full-width ellipsis">
                  {{ file.name }}
                </q-item-label>
                <q-item-label
                  class="full-width ellipsis"
                  v-if="file.attachment_type"
                  :lines="1"
                >
                  {{ file.attachment_type }}
                </q-item-label>
                <q-item-label
                  class="full-width ellipsis"
                  v-if="file.description"
                  :lines="1"
                >
                  {{ file.description }}
                </q-item-label>

                <q-item-label
                  :class="{'text-positive' : (file.__status === 'uploaded' || Boolean(file.id)),'text-orange' : file.__status === 'uploading','text-amber-10' : file.__status === 'idle' || file.__status === 'failed'}"
                  caption
                >
                  <q-icon
                    v-if="file.__status"
                    :name="file.__status === 'uploaded' ? 'o_check' : ( file.__status === 'uploading' ? 'o_cloud_sync' : (file.__status === 'idle' ? 'o_hourglass_empty' : (file.__status === 'failed' ? 'o_error_outline' : undefined)))"
                    size="22px"
                  />
                  <span
                    v-if="file.__status"
                    class="text-body2 q-pl-xs"
                  >{{ $te(`myth.uploader.statuses.${file.__status}`) ? $t(`myth.uploader.statuses.${file.__status}`) : file.__status }}</span>
                  <MBtn
                    v-if="Boolean(file.id)"
                    :href="file.url"
                    :icon="downloadFileIcon"
                    :label="$t('myth.titles.download')"
                    target="_blank"
                    size="sm"
                    v-bind="$myth.options.uploader?.downloadBtnProps"
                  />
                  <slot
                    name="item"
                    :item="file"
                  />
                </q-item-label>

                <q-item-label caption>
                  <span v-if="file.size_to_string">{{ file.size_to_string }} | {{ file.type }}</span>
                  <span v-else>{{ file.__sizeLabel }} / {{ file.__progressLabel }}</span>
                </q-item-label>
              </q-item-section>
              <q-item-section
                v-if="!hideDeleteMedia || (hideDeleteMedia && !Boolean(file.id))"
                side
                top
              >
                <q-btn
                  :disable="deleting"
                  :icon="deleteMediaIcon"
                  color="negative"
                  dense
                  flat
                  round
                  size="12px"
                  type="a"
                  v-bind="$myth.options.uploader?.removeBtnProps"
                  @click="onClickDeleteAttachment(file)"
                >
                  <q-tooltip>{{ $t('myth.uploader.deleteMedia') }}</q-tooltip>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </MFadeTransition>
      </template>
    </q-uploader>
  </MCol>
</template>

<script lang="ts" setup>
import { QUploader, useQuasar } from 'quasar'
import { QRejectedEntry } from 'quasar/dist/types/api'
import { computed, defineProps, nextTick, ref, watch, withDefaults } from 'vue'
import useAcceptProp from '../../composition/useAcceptProp'
import { useMyth } from '../../vue3'
import { ColStyleType } from '../grid/models'
import { MUploaderMediaItem, MUploaderProps, MUploaderXhrInfo } from './models'
import { useI18n } from 'vue-i18n'

interface Props {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  disable?: MUploaderProps['disable'];
  readonly?: MUploaderProps['readonly'];
  accept?: MUploaderProps['accept'];
  images?: MUploaderProps['images'];
  video?: MUploaderProps['video'];
  pdf?: MUploaderProps['pdf'];
  excel?: MUploaderProps['excel'];
  autoUpload?: MUploaderProps['autoUpload'];
  fieldName?: MUploaderProps['fieldName'];
  collection?: MUploaderProps['collection'];
  attachmentType?: MUploaderProps['attachmentType'];
  returnType?: MUploaderProps['returnType'];
  formFields?: MUploaderProps['formFields'];
  headers?: MUploaderProps['headers'];
  label?: MUploaderProps['label'];
  modelValue: MUploaderProps['modelValue'];
  hideDeleteMedia?: MUploaderProps['hideDeleteMedia'];
  service: MUploaderProps['service'];
  modelId: MUploaderProps['modelId'];
  uploading?: MUploaderProps['uploading'];
  useQuasarLoading?: MUploaderProps['useQuasarLoading'];
  batch?: MUploaderProps['batch'];
  defaultFileIcon?: MUploaderProps['defaultFileIcon'];
  deleteMediaIcon?: MUploaderProps['deleteMediaIcon'];
  uploadFilesIcon?: MUploaderProps['uploadFilesIcon'];
  pickFilesIcon?: MUploaderProps['pickFilesIcon'];
  removeUploadedIcon?: MUploaderProps['removeUploadedIcon'];
  removeQueuedIcon?: MUploaderProps['removeQueuedIcon'];
  abortUploadIcon?: MUploaderProps['abortUploadIcon'];
  downloadFileIcon?: MUploaderProps['downloadFileIcon'];
  errorsIcon?: MUploaderProps['errorsIcon'];
  iconsSize?: MUploaderProps['iconsSize'];
}

const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  readonly: undefined,
  disable: undefined,
  accept: undefined,
  images: !1,
  video: !1,
  pdf: !1,
  excel: !1,
  autoUpload: () => !0,
  fieldName: 'attachment',
  collection: undefined,
  attachmentType: undefined,
  returnType: undefined,
  formFields: undefined,
  headers: undefined,
  label: undefined,
  modelValue: () => ([]),
  hideDeleteMedia: !1,
  service: undefined,
  modelId: undefined,
  uploading: undefined,
  useQuasarLoading: () => !1,
  defaultFileIcon: () => 'o_file_present',
  deleteMediaIcon: () => 'o_delete',
  uploadFilesIcon: () => 'o_cloud_upload',
  pickFilesIcon: () => 'o_upload_file',
  removeUploadedIcon: () => 'o_done_all',
  removeQueuedIcon: () => 'o_clear_all',
  abortUploadIcon: () => 'o_clear',
  downloadFileIcon: () => 'o_download',
  errorsIcon: () => 'o_error_outline',
  batch: () => !0,
  iconsSize: () => '28px'
})

interface Events {
  (e: 'failed', error: MUploaderXhrInfo): void;

  (e: 'rejected', files: QRejectedEntry[]): void;

  (e: 'uploaded', error: MUploaderXhrInfo): void;

  (e: 'delete-media', media: MUploaderMediaItem, result: boolean): void;

  (e: 'remove-file', File: File): void;

  (e: 'update:modelValue', value: MUploaderMediaItem[]): void;

  (e: 'update:uploading', value: boolean): void;
}

const emit = defineEmits<Events>()
const $q = useQuasar()
const $myth = useMyth()
const { alertError, alertSuccess, confirmMessage } = $myth
const { t } = useI18n({ useScope: 'global' })

const uploader = ref<InstanceType<typeof QUploader>>()
const attachmentsRef = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
const accepts = useAcceptProp(props)
const quasarLoading = computed<boolean | undefined>({
  get: () => $q.loading.isActive,
  set: v => v ? $q.loading.show() : $q.loading.hide()
})
const attachmentTypeProp = computed(() => props.attachmentType)
const returnTypeProp = computed(() => props.returnType)
const collectionProp = computed(() => props.collection)
const formFieldsProp = computed(() => props.formFields)
const serviceProp = computed(() => props.service)
const modelIdProp = computed(() => props.modelId)
const headersProp = computed(() => props.headers)
const hideDeleteMediaProp = computed(() => props.hideDeleteMedia)
const useQuasarLoadingProp = computed(() => props.useQuasarLoading)
const iconsSizeProp = computed(() => $myth.options.uploader?.iconsSize || props.iconsSize)
const fieldNameProp = computed(() => props.fieldName)
const errors = ref([])
/* Events Callback */
const startUpload = async (files: readonly File[]) => {
  return new Promise((resolve, reject) => {
    try {
      const common = $myth.axios?.defaults?.headers.common || {}
      const headers = []
      errors.value = []
      for (const i in common) {
        headers.push({
          name: i,
          value: common[i]
        })
      }
      if (headersProp.value) {
        for (const f in headersProp.value) {
          headers.push({
            name: f,
            value: headersProp.value[f]
          })
        }
      }
      const formFields: any = []
      if (formFieldsProp.value) {
        for (const f in formFieldsProp.value) {
          formFields.push({
            name: f,
            value: formFieldsProp.value[f]
          })
        }
      }
      if (collectionProp.value) {
        formFields.push({ name: 'collection', value: collectionProp.value })
      }
      if (attachmentTypeProp.value) {
        formFields.push({ name: 'attachment_type', value: attachmentTypeProp.value })
      }
      if (returnTypeProp.value) {
        formFields.push({ name: 'return', value: returnTypeProp.value })
      }
      let url: string
      url = typeof serviceProp.value !== 'object' ? $myth.services[serviceProp.value].getUploadAttachmentsUrl(modelIdProp.value) : serviceProp.value.uploadAttachments(modelIdProp.value, files)
      url = `${$myth.baseUrl}/${url}`
      resolve({
        url,
        method: 'POST',
        headers,
        formFields
      })
    } catch (e) {
      reject(e)
      console.log(e)
    }
  })
}
const onReject = (rejectedEntries: QRejectedEntry[]) => {
  alertError(t('myth.errors.uploaderRejectedEntries', { c: rejectedEntries.length }))
  nextTick(() => emit('rejected', rejectedEntries))
}
const onError = (info: MUploaderXhrInfo) => {
  // console.log(info)
  const { xhr } = info
  try {
    if (xhr.responseText) {
      const response = JSON.parse(xhr.responseText)
      response?.message && alertError(response.message)
      if (response.errors && fieldNameProp.value && typeof fieldNameProp.value !== 'function') {
        errors.value = response.errors[fieldNameProp.value]
      }
    }
  } catch (e: any) {
    e?.message && alertError(e.message)
  }
  nextTick(() => emit('failed', info))
}
const onFinishUpload = ({ files, xhr }: MUploaderXhrInfo) => {
  try {
    if (xhr.responseText) {
      const response = JSON.parse(xhr.responseText)
      if (response?.data?.length !== undefined) {
        attachmentsRef.value = response.data
        files.forEach(f => uploader.value?.removeFile(f))
      }
      if (response?.message) {
        $myth.alertSuccess(response.message)
      }
    }
  } catch (e: any) {
    // e?.message && alertError(e.message)
  } finally {
    nextTick(() => emit('uploaded', {
      files,
      xhr
    }))
  }
}
const deleting = ref(!1)
const deleteMedia = (media: MUploaderMediaItem) => {
  if (deleting.value || hideDeleteMediaProp.value) {
    return
  }
  const destroy = async () => {
    let r = !1
    try {
      const method = async (file: MUploaderMediaItem) => typeof serviceProp.value !== 'object' ? await $myth.services[serviceProp.value].deleteAttachment(modelIdProp.value,
        file.id,
        { params: { collection: collectionProp.value } }) : serviceProp.value.deleteAttachment(media)
      if (method) {
        const { _message, _success, _data }: any = await method(media)
        _message && alertSuccess(_message)
        r = Boolean(_success)
        attachmentsRef.value = _data ?? []
      }
    } catch (e: any) {
      alertError(e?._message || e?.message)
      r = !1
    } finally {
      deleting.value = !1
      nextTick(() => emit('delete-media', media, r))
    }
  }
  confirmMessage().onOk(() => {
    deleting.value = !0
    nextTick(destroy)
  })
}
const deleteUploaderFile = (file: File) => {
  uploader.value?.removeFile(file)
  nextTick(() => emit('remove-file', file))
}
const onClickDeleteAttachment = (file: File | MUploaderMediaItem) => {
  if (file instanceof File) {
    deleteUploaderFile(file)
    return
  }
  deleteMedia(file)
}

watch(deleting, (v) => (quasarLoading.value = v))
watch(() => uploader.value?.isUploading, (v) => {
  emit('update:uploading', Boolean(v))
  if (useQuasarLoadingProp.value) {
    quasarLoading.value = v
  }
})
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
