<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->
<script lang="ts" setup>
import { QList, QUploader, useQuasar } from 'quasar'
import { QRejectedEntry } from 'quasar/dist/types/api'
import { computed, defineProps, nextTick, ref, toValue, watch, withDefaults } from 'vue'
import { useInputHelper } from '../../composables'
import { useMyth } from '../../vue3'
import { MUploaderMediaItem, MUploaderProps as Props, MUploaderXhrInfo } from './models'
import { QUploaderFactoryObject } from 'quasar/dist/types/api/quploader'
import { useField, useFieldValue } from 'vee-validate'

interface P {
  name?: Props['name'];
  auto?: Props['auto'];
  col?: Props['col'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
  disable?: Props['disable'];
  readonly?: Props['readonly'];
  accept?: Props['accept'];
  images?: Props['images'];
  svg?: Props['svg'];
  video?: Props['video'];
  pdf?: Props['pdf'];
  excel?: Props['excel'];
  autoUpload?: Props['autoUpload'];
  fieldName?: Props['fieldName'];
  collection?: Props['collection'];
  attachmentType?: Props['attachmentType'];
  returnType?: Props['returnType'];
  formFields?: Props['formFields'];
  headers?: Props['headers'];
  label?: Props['label'];
  hideDeleteMedia?: Props['hideDeleteMedia'];
  hideUploadBtn?: Props['hideUploadBtn'];
  service: Props['service'];
  modelId?: Props['modelId'];
  uploading?: Props['uploading'];
  useQuasarLoading?: Props['useQuasarLoading'];
  batch?: Props['batch'];
  defaultFileIcon?: Props['defaultFileIcon'];
  deleteMediaIcon?: Props['deleteMediaIcon'];
  uploadFilesIcon?: Props['uploadFilesIcon'];
  pickFilesIcon?: Props['pickFilesIcon'];
  removeUploadedIcon?: Props['removeUploadedIcon'];
  removeQueuedIcon?: Props['removeQueuedIcon'];
  abortUploadIcon?: Props['abortUploadIcon'];
  downloadFileIcon?: Props['downloadFileIcon'];
  errorsIcon?: Props['errorsIcon'];
  iconsSize?: Props['iconsSize'];
  displayMode?: Props['displayMode'];
  shadow?: Props['shadow'];
  fieldOptions?: Props['fieldOptions'];
}

const props = withDefaults(defineProps<P>(), {
  name: () => 'attachments',
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
  images: () => !1,
  svg: () => !1,
  video: () => !1,
  pdf: () => !1,
  excel: () => !1,
  autoUpload: () => !0,
  fieldName: 'attachment',
  collection: undefined,
  attachmentType: undefined,
  returnType: undefined,
  formFields: undefined,
  headers: undefined,
  label: undefined,
  hideDeleteMedia: undefined,
  hideUploadBtn: undefined,
  service: undefined,
  modelId: undefined,
  uploading: undefined,
  useQuasarLoading: () => !1,
  defaultFileIcon: () => 'o_file_present',
  deleteMediaIcon: () => 'o_clear',
  uploadFilesIcon: () => 'o_cloud_upload',
  pickFilesIcon: () => 'o_upload_file',
  removeUploadedIcon: () => 'o_done_all',
  removeQueuedIcon: () => 'o_clear_all',
  abortUploadIcon: () => 'o_clear',
  downloadFileIcon: () => 'o_download',
  errorsIcon: () => 'o_error_outline',
  batch: () => !1,
  iconsSize: () => '30px',
  displayMode: () => 'card',
  shadow: () => 'shadow-5',
  fieldOptions: undefined
})

interface Events {
  (e: 'failed', error: MUploaderXhrInfo): void;

  (e: 'rejected', files: QRejectedEntry[]): void;

  (e: 'uploaded', error: MUploaderXhrInfo): void;

  (e: 'delete-media', media: MUploaderMediaItem, result: boolean): void;

  (e: 'remove-file', File: File): void;

  (e: 'update:uploading', value: boolean): void;
}

const emit = defineEmits<Events>()
const $q = useQuasar()
const myth = useMyth()
const { alertError, alertSuccess, confirmMessage, __ } = myth
const fieldId = useFieldValue<string | undefined>('id')
const modelIdProp = computed(() => props.modelId !== undefined ? props.modelId : fieldId.value)
// const value = useFieldValue<Props['modelValue']>(() => props.name)
// const setValue = useSetFieldValue(() => props.name)
// const setTouched = useSetFieldTouched(() => props.name)
// const errorMessage = useFieldError(() => props.name)
// const setErrors = useSetFieldError(() => props.name)
// const modelValue = computed<Props['modelValue']>({
//   get: () => value.value || [],
//   set: (v) => setValue(v)
// })
// const setModelValue = (val: any) => {
//   setValue(val)
//   setTouched(!1)
// }

const { value: modelValue, errorMessage, setErrors, resetField } = useField<Props['modelValue']>(() => props.name, undefined, {
  syncVModel: !0,
  label: () => __(props.label),
  validateOnValueUpdate: !1,
  controlled: !1,
  ...toValue<any>(props.fieldOptions)
})
const uploader = ref<InstanceType<typeof QUploader>>()
const { accepts } = useInputHelper<any>(() => props, 'uploader')
const quasarLoading = computed<boolean | undefined>({
  get: () => $q.loading.isActive,
  set: v => v ? $q.loading.show() : $q.loading.hide()
})
const attachmentTypeProp = computed(() => props.attachmentType)
const returnTypeProp = computed(() => props.returnType)
const collectionProp = computed(() => props.collection)
const formFieldsProp = computed(() => props.formFields)
const serviceProp = computed(() => props.service)
const headersProp = computed(() => props.headers)
const hideDeleteMediaProp = computed(() => props.hideDeleteMedia)
const useQuasarLoadingProp = computed(() => props.useQuasarLoading)
const iconsSizeProp = computed(() => myth.options.uploaderOptions?.iconsSize || props.iconsSize)
// const errors = ref<any>([])
/* Events Callback */
const startUpload = async (files: readonly File[]): Promise<QUploaderFactoryObject> => {
  return new Promise((resolve, reject) => {
    if (!modelIdProp.value) {
      reject()
      return
    }
    try {
      const common = myth.axios?.defaults?.headers.common || {}
      const headers = []
      setErrors([])
      for (const i in common) {
        if (common[i]) {
          headers.push({
            name: i,
            value: common[i]
          })
        }
      }
      if (headersProp.value) {
        for (const f in headersProp.value) {
          if (headersProp.value[f]) {
            headers.push({
              name: f,
              value: headersProp.value[f]
            })
          }
        }
      }
      const formFields: any = []
      if (formFieldsProp.value) {
        for (const f in formFieldsProp.value) {
          if (formFieldsProp.value[f]) {
            formFields.push({
              name: f,
              value: formFieldsProp.value[f]
            })
          }
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
      const url: string = typeof serviceProp.value !== 'object'
        ? myth.services[serviceProp.value].getUploadAttachmentsUrl(modelIdProp.value)
        : serviceProp.value.uploadAttachments(modelIdProp.value, files)
      resolve({
        url: `${myth.baseUrl}/${url}`,
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
  alertError(__('myth.errors.uploaderRejectedEntries', { c: rejectedEntries.length }))
  nextTick(() => emit('rejected', rejectedEntries))
}
const onError = (info: MUploaderXhrInfo) => {
  const { xhr } = info
  try {
    if (xhr.responseText) {
      const response = JSON.parse(xhr.responseText)
      response?.message && alertError(response.message)
      if (response.errors) {
        const name = typeof props.fieldName === 'function' ? props.fieldName({} as File) : props.fieldName
        if (response.errors[name]) {
          setErrors(response.errors[name])
        } else {
          setErrors(Object.values(response.errors) || [])
        }
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
        resetField({ value: response.data ?? [] })
        // setModelValue(response.data)
        files.forEach(f => uploader.value?.removeFile(f))
      }
      if (response?.message) {
        alertSuccess(response.message)
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
      const config: any = { params: { collection: collectionProp.value, return: returnTypeProp.value } }
      if (!config.params.collection) {
        delete config.params.collection
      }
      if (!config.params.return) {
        delete config.params.return
      }
      const method = async (file: MUploaderMediaItem) => typeof serviceProp.value !== 'object' ? await myth.services[serviceProp.value].deleteAttachment(
        modelIdProp.value,
        file.id,
        config) : serviceProp.value.deleteAttachment(media, config)
      if (method) {
        const { _message, _success, _data }: any = await method(media)
        _message && alertSuccess(_message)
        r = Boolean(_success)
        resetField({ value: _data ?? [] })
        // setModelValue(_data ?? [])
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
    confirmMessage().onOk(() => {
      deleteUploaderFile(file)
    })
  } else {
    deleteMedia(file)
  }
}

watch(deleting, (v) => (quasarLoading.value = v))
watch(() => uploader.value?.isUploading, (v) => {
  emit('update:uploading', Boolean(v))
  if (useQuasarLoadingProp.value) {
    quasarLoading.value = v
  }
})
defineOptions({ name: 'MUploader', inheritAttrs: !1 })
</script>

<template>
  <MCol
    v-if="!!modelIdProp"
    :auto="auto"
    :class="$attrs.class"
    :col="col"
    :lg="lg"
    :md="md"
    :name="name"
    :sm="sm"
    :xs="xs"
  >
    <MFadeTransition>
      <div
        v-if="!!errorMessage"
        class="row items-center q-pa-sm bg-negative text-white q-mb-xs rounded-borders"
      >
        <q-icon
          :name="errorsIcon"
          left
        />
        {{ errorMessage }}
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
      :label="__(label)"
      :readonly="readonly"
      style="width: 100%;max-height: 450px;"
      v-bind="{...$myth.options.uploader as any,...$attrs}"
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
              {{ __(label) }}
            </div>
            <div class="q-uploader__subtitle">
              {{ scope.uploadSizeLabel }} / {{ scope.uploadProgressLabel }}
            </div>
          </div>
          <q-btn
            v-if="scope.queuedFiles.length > 0"
            :icon="removeQueuedIcon"
            :label="__('myth.uploader.clearAll')"
            dense
            flat
            @click="scope.removeQueuedFiles"
          />
          <q-btn
            v-if="scope.uploadedFiles.length > 0"
            :icon="removeUploadedIcon"
            :label="__('myth.uploader.removeUploadedFiles')"
            dense
            flat
            @click="scope.removeUploadedFiles"
          />
          <q-btn
            v-if="scope.canAddFiles && !hideUploadBtn"
            :icon="pickFilesIcon"
            :label="__('myth.uploader.pickFiles')"
            dense
            flat
            @click="scope.pickFiles"
          >
            <q-uploader-add-trigger />
          </q-btn>
          <q-btn
            v-if="scope.canUpload && !hideUploadBtn"
            :icon="uploadFilesIcon"
            :label="__('myth.uploader.uploadFiles')"
            dense
            flat
            @click="scope.upload"
          />
          <q-btn
            v-if="scope.isUploading"
            :icon="abortUploadIcon"
            :label="__('myth.uploader.abortUpload')"
            dense
            flat
            @click="scope.abort"
          />
        </MRow>
        <slot
          name="header"
          v-bind="scope as QUploader"
        />
      </template>

      <template #list="scope">
        <div
          v-if="!scope.files.length && !modelValue?.length"
          key="m--uploader-no-data"
          class="absolute-full"
        >
          <div class="full-width full-height  overflow-hidden">
            <MRow class="full-height justify-center items-center">
              <MCol
                auto
                class="text-h6 text-center"
              >
                <q-icon
                  left
                  name="error_outline"
                />
                <span v-text="__('myth.select.noData')" />
              </MCol>
            </MRow>
          </div>
        </div>
        <template v-else-if="!!$slots.list">
          <slot
            :items="modelValue"
            name="list"
            v-bind="scope"
          />
        </template>
        <MRow
          v-else-if="!!$slots['item-list']"
          class="q-col-gutter-sm"
        >
          <template
            v-for="(file,i) in [...scope.files,...(modelValue || [])]"
            :key="`item-${i}`"
          >
            <slot
              :index="i"
              :item="file as MUploaderMediaItem"
              name="item-list"
            />
          </template>
        </MRow>
        <q-list
          v-else
          :class="{'row': displayMode === 'card','q-gutter-sm': displayMode === 'card'}"
          :separator="displayMode === 'list' ? !0 : undefined"
        >
          <template
            v-for="(file,i) in [...scope.files,...(modelValue || [])]"
            :key="`item-${i}`"
          >
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
              <q-item-section :class="{'overflow-hidden': displayMode === 'card'}">
                <q-item-label v-if="!!file.file_name">
                  {{ file.file_name }}
                </q-item-label>
                <q-item-label v-else-if="!!file.label">
                  {{ __(file.label) }}
                </q-item-label>
                <q-item-label v-if="!!file.user_id_to_string">
                  <q-icon
                    color="primary"
                    name="ion-ios-contact"
                  />
                  {{ file.user_id_to_string }}
                </q-item-label>
                <q-item-label v-if="!!file.description">
                  {{ file.description }}
                </q-item-label>
                <q-item-label v-else-if="!!file.attachment_type">
                  {{ file.attachment_type }}
                </q-item-label>
                <slot
                  :item="file"
                  name="item"
                />
                <q-item-label
                  v-if="!!file.__status"
                  :class="{'print-hide': !0,'text-positive' : (file.__status === 'uploaded' || Boolean(file.id)),'text-orange' : file.__status === 'uploading','text-amber-10' : file.__status === 'idle' || file.__status === 'failed'}"
                  caption
                >
                  <q-icon
                    :name="file.__status === 'uploaded' ? 'o_check' : ( file.__status === 'uploading' ? 'o_cloud_sync' : (file.__status === 'idle' ? 'o_hourglass_empty' : (file.__status === 'failed' ? 'o_error_outline' : undefined)))"
                    size="22px"
                  />
                  <span class="text-body2 q-pl-xs">
                    {{ $te(`myth.uploader.statuses.${file.__status}`) ? __(`myth.uploader.statuses.${file.__status}`) : file.__status }}
                  </span>
                </q-item-label>
                <q-item-label
                  v-if="!!file.size_to_string || !!file.__sizeLabel"
                  caption
                  class="print-hide"
                >
                  <span v-if="file.size_to_string">{{ file.size_to_string }} | {{ file.type }}</span>
                  <span v-else-if="file.__sizeLabel">{{ file.__sizeLabel }} / {{ file.__progressLabel }}</span>
                </q-item-label>
                <q-item-label
                  v-if="(Boolean(file.id) && file.url) || (!hideDeleteMedia || (hideDeleteMedia && !Boolean(file.id)))"
                  class="print-hide"
                >
                  <MBtn
                    v-if="Boolean(file.id) && file.url"
                    :href="file.url"
                    :icon="downloadFileIcon"
                    :label="__('myth.titles.download')"
                    dense
                    flat
                    target="_blank"
                    type="a"
                    v-bind="$myth.options.uploaderOptions?.downloadBtnProps"
                  />
                  <MBtn
                    v-if="(!hideDeleteMedia || (hideDeleteMedia && !Boolean(file.id))) && displayMode === 'list'"
                    :disable="deleting || scope.isBusy || scope.isUploading"
                    :icon="deleteMediaIcon"
                    :label="__(file.id ? 'myth.uploader.deleteMedia' : 'myth.uploader.removeMedia')"
                    color="negative"
                    dense
                    flat
                    type="a"
                    v-bind="$myth.options.uploaderOptions?.removeBtnProps"
                    @click="onClickDeleteAttachment(file)"
                  >
                    <q-tooltip class="m--dt-btn-tooltip">
                      {{ __(file.id ? 'myth.uploader.deleteMedia' : 'myth.uploader.removeMedia') }}
                    </q-tooltip>
                  </MBtn>
                </q-item-label>
              </q-item-section>
              <q-item-section
                v-if="(!hideDeleteMedia || (hideDeleteMedia && !Boolean(file.id))) && displayMode === 'card'"
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
                    @click="onClickDeleteAttachment(file)"
                  >
                    <q-tooltip class="m--dt-btn-tooltip">
                      {{ __(file.id ? 'myth.uploader.deleteMedia' : 'myth.uploader.removeMedia') }}
                    </q-tooltip>
                  </q-btn>
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-list>
      </template>
    </q-uploader>
  </MCol>
</template>
