<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->
<script lang="ts" setup>
import { QList, QUploader } from 'quasar'
import { QRejectedEntry } from 'quasar/dist/types/api'
import { computed, defineProps, nextTick, ref, watch, withDefaults } from 'vue'
import { useError, useInputHelper, useValue } from '../../composables'
import { useMyth } from '../../vue3'
import { MUploaderMediaItem, MUploaderProps as Props, MUploaderXhrInfo } from './models'
import { QUploaderFactoryObject } from 'quasar/dist/types/api/quploader'
import { useFieldArray, useFieldValue, useFormValues, useResetForm } from 'vee-validate'
import UploaderItem from '../parials/UploaderItem.vue'

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
  readonly useQuasarLoading?: Props['useQuasarLoading'];
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
  mediaLabel?: Props['mediaLabel'];
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
  fieldOptions: undefined,
  mediaLabel: () => 'name'
})

interface Emits {
  (e: 'failed', error: MUploaderXhrInfo): void;

  (e: 'rejected', files: QRejectedEntry[]): void;

  (e: 'uploaded', error: MUploaderXhrInfo): void;

  (e: 'delete-media', media: MUploaderMediaItem, result: boolean): void;

  (e: 'remove-file', File: File): void;
}

const emit = defineEmits<Emits>()

type Form = Record<string, any>;

const myth = useMyth()
const { alertError, alertSuccess, __ } = myth
const fieldId = useFieldValue<string | undefined>('id')
const modelIdProp = computed(() => props.modelId !== undefined ? props.modelId : fieldId.value)
const modelValue = defineModel<Props['modelValue']>({ required: !1, default: undefined })
const { field } = useValue<Props['modelValue']>(() => props.name)
watch(field, v => (modelValue.value = v), { deep: !0 })
const { error, setErrors } = useError(() => props.name)
const resetForm = useResetForm<Form>()
const formValues = useFormValues<Form>()
const { fields: attachments } = useFieldArray<MUploaderMediaItem | File>(() => props.name)

// const setFormValues = useSetFormValues()
// const setFormTouched = useSetFormTouched()
// const error = useFieldError(() => props.name)
// const setErrors = useSetFieldError(() => props.name)
// const setFormValues = useSetFormValues()
// const setTouched = useSetFieldTouched(() => props.name)
// const modelValue = computed<Props['modelValue']>({
//   get: () => value.value || [],
//   set: (v) => {
//     setFormValues({ [props.name]: v }, !1)
//     model.value = v
//     setTouched(!1)
//   }
// })
// const { value: modelValue, error, setErrors, resetField } = useField<Props['modelValue']>(() => props.name, undefined, {
//   syncVModel: !0,
//   label: () => __(props.label),
//   validateOnValueUpdate: !1,
//   ...toValue<any>(props.fieldOptions)
// })
const setModelValue = async (value: Props['modelValue']) => {
  const name = props.name
  resetForm({ values: { ...formValues.value, [name]: value }, errors: { [name]: undefined }, touched: { [name]: !1 } })
}
const uploader = ref<InstanceType<typeof QUploader>>()
const uploading = defineModel<boolean>('uploading', { required: !1, default: () => !1 })
const { accepts } = useInputHelper<any>(() => props, 'uploader')
const attachmentTypeProp = computed(() => props.attachmentType)
const returnTypeProp = computed(() => props.returnType)
const collectionProp = computed(() => props.collection)
const formFieldsProp = computed(() => props.formFields)
const serviceProp = computed(() => props.service)
const headersProp = computed(() => props.headers)
const iconsSizeProp = computed(() => myth.options.uploaderOptions?.iconsSize || props.iconsSize)

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
        setModelValue(response.data ?? [])
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

const onDeleteUploaderFile = (file: File) => {
  uploader.value?.removeFile(file)
  emit('remove-file', file)
}
const onDeleteMedia = (media: MUploaderMediaItem, result: boolean) => emit('delete-media', media, result)
watch(() => uploader.value?.isUploading, (v) => {
  uploading.value = Boolean(v)
  // if (useQuasarLoadingProp.value) {
  //   quasarLoading.value = v
  // }
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
        v-if="!!error"
        class="row items-center q-pa-sm bg-negative text-white q-mb-xs rounded-borders"
      >
        <q-icon
          :name="errorsIcon"
          left
        />
        {{ error }}
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
          v-if="!scope.files.length && !attachments?.length"
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
            :items="attachments"
            name="list"
            v-bind="scope"
          />
        </template>
        <MRow
          v-else-if="!!$slots['item-list']"
          class="q-col-gutter-sm"
        >
          <template
            v-for="(file,i) in [...scope.files,...(attachments || [])]"
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
            v-for="(file,i) in scope.files"
            :key="`fi-${i}`"
          >
            <UploaderItem
              :collection="collection"
              :default-file-icon="defaultFileIcon"
              :delete-media-icon="deleteMediaIcon"
              :display-mode="displayMode"
              :download-file-icon="downloadFileIcon"
              :hide-delete-media="hideDeleteMedia"
              :icons-size="iconsSizeProp"
              :item="file"
              :media-label="mediaLabel"
              :model-id="modelIdProp"
              :name="name"
              :return-type="returnType"
              :scope="scope"
              :service="serviceProp"
              @remove-file="onDeleteUploaderFile"
              @delete-media="onDeleteMedia"
            />
          </template>
          <template v-if="attachments">
            <template
              v-for="f in attachments"
              :key="f.key"
            >
              <UploaderItem
                :collection="collection"
                :default-file-icon="defaultFileIcon"
                :delete-media-icon="deleteMediaIcon"
                :display-mode="displayMode"
                :download-file-icon="downloadFileIcon"
                :hide-delete-media="hideDeleteMedia"
                :icons-size="iconsSizeProp"
                :item="f.value"
                :media-label="mediaLabel"
                :model-id="modelIdProp"
                :name="name"
                :return-type="returnType"
                :scope="scope"
                :service="serviceProp"
                @values="setModelValue"
                @remove-file="onDeleteUploaderFile"
                @delete-media="onDeleteMedia"
              />
            </template>
          </template>
        </q-list>
      </template>
    </q-uploader>
  </MCol>
</template>
