<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts" setup>
import { AxiosResponse } from 'axios'
import { QUploader, useQuasar } from 'quasar'
import { QRejectedEntry } from 'quasar/dist/types/api'
import { defineProps, nextTick, ref, watch, withDefaults } from 'vue'
import { useMyTh } from '../../vue3'
import { useTranslate } from '../../vue3/MTranslate'
import { ColStyleType } from '../grid/models'
import { MUploaderMediaItem, MUploaderProps, MUploaderXhrInfo } from './models'

interface Props extends MUploaderProps {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  disable?: boolean | undefined;
  readonly?: boolean | undefined;
  accept?: string | undefined;
  images?: boolean | undefined;
  video?: boolean | undefined;
  pdf?: boolean | undefined;
  excel?: boolean | undefined;
  style?: string;
  autoUpload?: boolean | undefined;
  maxFileSize?: number | string | undefined;
  maxTotalSize?: number | string | undefined;
  maxFiles?: number | string | undefined;
  fieldName?: string | ((files: File) => string) | undefined;
  formFields?: Record<string, any> | undefined;
  label?: string | undefined;
  url: string | ((files: readonly File[]) => string);
  modelValue: Record<string, any | any[]>;
  errors?: string[] | undefined;
  attachments: string;
  hideDeleteMedia?: boolean | undefined;
  deleteMedia?: ((media: MUploaderMediaItem) => Promise<AxiosResponse>) | undefined;
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
  style: () => 'width: 100%',
  autoUpload: !1,
  maxFileSize: 2,
  maxTotalSize: 2,
  maxFiles: undefined,
  fieldName: 'attachment',
  formFields: undefined,
  label: undefined,
  url: undefined,
  modelValue: undefined,
  attachments: undefined,
  hideDeleteMedia: !1,
  deleteMedia: undefined,
  errors: undefined
})

interface Events {
  (e: 'failed', error: MUploaderXhrInfo): void;

  (e: 'rejected', files: QRejectedEntry[]): void;

  (e: 'uploaded', error: MUploaderXhrInfo): void;

  (e: 'delete-media', media: MUploaderMediaItem, result: boolean): void;

  (e: 'remove-file', File: File): void;
}

const emit = defineEmits<Events>()
const $q = useQuasar()
const $myth = useMyTh()
const {
  alertError,
  alertSuccess,
  confirmMessage
} = $myth
const { t } = useTranslate()

const uploader = ref<QUploader>()
const formRef = ref<Record<string, any>>(props.modelValue)
const accepts: string[] = []

const prepareAcceptProp = () => {
  if (props.accept) {
    accepts.push(props.accept)
  }
  if (props.images) {
    accepts.push('image/png,image/jpg,image/jpeg')
  }
  if (props.video) {
    accepts.push('video/mp4,video/x-m4v,video/*')
  }
  if (props.pdf) {
    accepts.push('application/pdf')
  }
  if (props.excel) {
    accepts.push('.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
  }
}
prepareAcceptProp()

/* Events Callback */
const factoryFn = (files: readonly File[]) => {
  return new Promise((resolve, reject) => {
    if (props.readonly) {
      reject({ message: t('messages.error') })
      return
    }
    const common = $myth.api.axios.defaults.headers.common
    const headers = []
    for (const i in common) {
      headers.push({
        name: i,
        value: common[i]
      })
    }
    const formFields: any = []
    if (props.formFields) {
      for (const f in props.formFields) {
        formFields.push({
          name: f,
          value: formFields[f]
        })
      }
    }
    resolve({
      url: typeof props.url === 'function' ? props.url(files) : props.url,
      method: 'POST',
      headers,
      formFields
    })
  })
}
const onReject = (rejectedEntries: QRejectedEntry[]) => {
  alertError(t('messages.errors.uploaderRejectedEntries', { c: rejectedEntries.length }))
  nextTick(() => emit('rejected', rejectedEntries))
}
const onError = (info: MUploaderXhrInfo) => {
  const { xhr } = info
  try {
    if (xhr.responseText) {
      const response = JSON.parse(xhr.responseText)
      response?.message && alertError(response.message)
    }
  } catch (e: any) {
    e?.message && alertError(e.message)
  }
  nextTick(() => emit('failed', info))
}
const onFinishUpload = ({
  files,
  xhr
}: MUploaderXhrInfo) => {
  try {
    if (xhr.responseText) {
      const response = JSON.parse(xhr.responseText)
      if (response && response.data && response.data.length !== undefined && props.attachments) {
        formRef.value[props.attachments] = response.data
        files.forEach(f => uploader.value?.removeFile(f))
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
watch(deleting, (v) => {
  (v ? $q.loading.show() : $q.loading.hide())
})
const deleteMedia = (media: MUploaderMediaItem) => {
  if (deleting.value || props.hideDeleteMedia) {
    return
  }
  const destroy = async () => {
    let r = !1
    try {
      if (props.deleteMedia) {
        const {
          _message,
          _success,
          _data
        }: any = await props.deleteMedia(media)
        _message && alertSuccess(_message)
        r = Boolean(_success)
        if (r) {
          if (_data && _data?.length !== undefined) {
            formRef.value[props.attachments] = _data || []
          } else {
            formRef.value[props.attachments] = formRef.value[props.attachments].filter((e: MUploaderMediaItem) => e.id !== media.id)
          }
        }
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

/**
 * Props
 */
const getMaxFileSize: number = (parseInt(props.maxFileSize?.toString()) ?? 1) * Math.pow(1024, 2)
const getMaxTotalSize: number = (parseInt(props.maxTotalSize?.toString()) ?? 1) * Math.pow(1024, 2)

</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
<template>
  <MCol
    :auto="auto"
    :col="col"
    :lg="lg"
    :md="md"
    :sm="sm"
    :xs="xs"
  >
    <div
      v-if="errors && errors.length"
      class="text-body1 text-negative"
    >
      {{ errors[0] }}
    </div>
    <q-uploader
      ref="uploader"
      :accept="accepts.join(',')"
      :auto-upload="autoUpload"
      :disable="disable"
      :factory="factoryFn"
      :field-name="fieldName"
      :label="label?$myth.parseAttribute(label):undefined"
      :max-file-size="getMaxFileSize"
      :max-files="maxFiles"
      :max-total-size="getMaxTotalSize"
      :readonly="readonly"
      :style="style"
      v-bind="$attrs"
      @failed="onError"
      @rejected="onReject"
      @uploaded="onFinishUpload"
    >
      <template
        v-if="$slots.header"
        #header="scope"
      >
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
        <q-list separator>
          <q-item
            v-for="(file,i) in [...scope.files,...(props.modelValue[props.attachments] ??[])]"
            :key="i"
          >
            <q-item-section
              avatar
              class="gt-xs"
            >
              <q-img
                :src="file.__img ? file.__img.src : file.url"
                fit="contain"
                ratio="1"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label class="full-width ellipsis">
                {{ file.name }}
              </q-item-label>

              <q-item-label
                :class="{'text-positive' : (file.__status === 'uploaded' || Boolean(file.id)),'text-orange' : file.__status === 'uploading','text-amber-10' : file.__status === 'idle' || file.__status === 'failed'}"
                caption
              >
                <q-icon
                  v-if="!file.icon"
                  :name="(file.__status === 'uploaded' || Boolean(file.id)) ? 'o_check' : ( file.__status === 'uploading' ? 'o_cloud_sync' : (file.__status === 'idle' ? 'o_hourglass_empty' : (file.__status === 'failed' ? 'o_error_outline' : undefined)))"
                  size="22px"
                />
                <span
                  v-if="file.__status"
                  class="text-body2 q-pl-xs"
                >{{ $myth.parseAttribute(file.__status) }}</span>
                <m-btn
                  v-if="Boolean(file.id)"
                  :href="file.url"
                  target="_blank"
                  unelevated
                >
                  {{ $t('download') }}
                </m-btn>
                <slot
                  name="item"
                  v-bind="{item:file}"
                />
              </q-item-label>

              <q-item-label caption>
                <span v-if="file.size_to_string">{{ file.size_to_string }}</span>
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
                :loading="deleting"
                class="gt-xs"
                dense
                flat
                icon="delete"
                round
                size="12px"
                @click="onClickDeleteAttachment(file)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </template>
    </q-uploader>
  </MCol>
</template>
