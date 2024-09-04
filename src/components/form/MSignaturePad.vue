<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { useField } from 'vee-validate'
import { MSignaturePadProps as Props, SignaturePadWaterMark } from './models.d'
import { computed, reactive, ref, toValue, watch } from 'vue'
import { useInputHelper } from '../../composables'
import { useMyth } from '../../vue3'
import Vue3Signature from 'vue3-signature'

type P = {
  name: Props['name'];
  clearOnResize?: Props['clearOnResize'];
  large?: Props['large'];
  disabled?: Props['disabled'];
  required?: Props['required'];
  color?: Props['color'];
  bg?: Props['bg'];
  height?: Props['height'];
  width?: Props['width'];
  label?: Props['label'];
  center?: Props['center'];
  labelProps?: Props['labelProps'];
  // url?: Props['url'];
  noBtn?: Props['noBtn'];
  waterMark?: Props['waterMark'];

  auto?: Props['auto'];
  col?: Props['col'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
  fieldOptions?: Props['fieldOptions'];
}

const props = withDefaults(defineProps<P>(), {
  name: () => '',
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,

  clearOnResize: () => !1,
  large: () => !1,
  disabled: () => !1,
  required: () => !1,
  color: () => 'rgb(0, 0, 0)',
  bg: () => 'rgb(255,255,255)',
  height: () => '300px',
  width: () => '100%',
  label: undefined,
  center: () => !1,
  labelProps: undefined,
  // url: undefined,
  noBtn: () => !1,
  waterMark: undefined,
  fieldOptions: undefined
})

type Emits = {
  (e: 'clear'): void;
  (e: 'undo'): void;
}
const emit = defineEmits<Emits>()

const myth = useMyth()

defineModel<Props['modelValue']>({ required: !1, default: undefined })
const url = defineModel<Props['url']>('url', { required: !1, default: undefined })
const helper = useInputHelper<P & { name: string; }>(() => props, 'signaturePad')
const { getLabel, getRules } = helper
const inputScope = useField<Props['modelValue']>(() => props.name, getRules, {
  syncVModel: !0,
  label: getLabel,
  ...toValue<any>(props.fieldOptions)
})
const { errorMessage, handleChange, handleBlur } = inputScope

const padRef = ref<InstanceType<typeof Vue3Signature> | null>(null)
const confirmed = ref(!1)
const disabledRef = ref(!1)
const isDisabled = computed(() => props.disabled || disabledRef.value || confirmed.value)
const reset = () => {
  confirmed.value = !1
  url.value = undefined
  disabledRef.value = !1
}
const save = (type: 'image/jpeg' | 'image/svg+xml') => {
  const isEmpty = !!padRef.value?.isEmpty()
  if (isEmpty && props.required) {
    myth.alertError(myth.__('validation.messages.required', { field: myth.__(props.label || myth.__('signature')) }))
    return
  }
  confirmed.value = !0
  if (url.value) {
    url.value = undefined
    padRef.value?.clear()
  }
  const v = isEmpty ? null : padRef.value?.save(type)
  handleBlur(undefined, !0)
  handleChange(v, !0)
}
const clear = () => {
  padRef.value?.clear()
  handleBlur(undefined, !0)
  confirmed.value && handleChange(null, !0)
  emit('clear')
  reset()
}
const undo = () => {
  padRef.value?.undo()
  emit('undo')
  handleBlur(undefined, !0)
  confirmed.value && handleChange(null, !1)
  reset()
}
const isEmpty = () => !!padRef.value?.isEmpty()
const addWaterMark = (opt: SignaturePadWaterMark) => padRef.value?.addWaterMark(opt)
const fromDataURL = (url: string) => padRef.value?.fromDataURL(url)
const scopes = reactive(inputScope)
defineExpose({ reset, save, clear, undo, disabled: isDisabled, isEmpty, addWaterMark, fromDataURL, padRef, ...scopes })
defineOptions({ name: 'MSignaturePad', inheritAttrs: !1 })
watch(url, (url) => {
  if (url) {
    fromDataURL(url)
    if (!confirmed.value) {
      confirmed.value = !0
    }
  }
}, { immediate: !0 })
</script>

<template>
  <MCol
    :auto="auto"
    :class="[$attrs.class,{'m--input__required':getRules?.required!==undefined,'m--input__error':!!errorMessage}]"
    :col="col"
    :lg="lg"
    :md="md"
    :name="name"
    :sm="sm"
    :xs="xs"
  >
    <slot
      :confirmed="confirmed"
      name="top-input"
      v-bind="scopes"
    />
    <MTransition>
      <div
        key="top"
        class="row justify-between items-center"
      >
        <div
          :class="{
            'text-center': center,
            'q-mb-xs text-weight-bold' : !0,
            'text-body1': !large,
            'text-h6': large,
            'text-negative': !!errorMessage,
            'text-positive': !errorMessage && confirmed
          }"
          v-bind="labelProps"
        >
          <span v-if="!!label">{{ __(label) }}</span>
          <span
            v-if="label && required && !confirmed"
            class="text-negative print-hide"
          >&nbsp;*</span>
          <q-icon
            v-if="confirmed"
            color="positive"
            name="verified"
            right
            size="20px"
          />
        </div>
      </div>
      <div
        v-if="!!errorMessage"
        key="signature-errors"
        class="text-negative text-caption q-mb-sm"
      >
        <q-icon
          name="ion-ios-information-circle-outline"
          size="18px"
        />
        {{ errorMessage }}
      </div>
      <div
        key="signature-pad"
        :class="{
          'bg-negative': !!errorMessage,
          'print-shadow-none bordered' : !0
        }"
      >
        <div>
          <slot
            name="pad"
            v-bind="{...scopes,width,height,reset,save,clear,undo,confirmed}"
          >
            <Vue3Signature
              v-if="!url"
              ref="padRef"
              :class="{'q-mx-auto': !0, 'hidden': !!$slots.pad}"
              :clear-on-resize="clearOnResize"
              :disabled="isDisabled"
              :h="height"
              :sig-option="{
                penColor: color,
                backgroundColor: bg
              }"
              :w="width"
              :water-mark="waterMark"
            />
            <template v-else-if="!!url">
              <q-img
                :height="height"
                :src="url"
                :width="width"
              />
            </template>
          </slot>
          <slot
            v-bind="scopes"
            :confirmed="confirmed"
          />
        </div>
      </div>
      <div
        v-show="!disabled && !noBtn"
        key="signature-buttons"
        class="q-mt-sm print-hide"
      >
        <template v-if="!confirmed">
          <div class="column q-gutter-sm">
            <MBtn
              :label="__('labels.confirm_signature')"
              color="positive"
              flat
              icon="ion-ios-hand"
              @click="save('image/jpeg')"
            />
          </div>
          <MRow class="justify-between">
            <MBtn
              :label="__('labels.undo')"
              flat
              icon="ion-ios-undo"
              @click="undo"
            />
            <q-space />
            <MBtn
              :label="__('labels.clear_signature')"
              color="negative"
              flat
              icon="ion-ios-repeat"
              @click="clear"
            />
          </MRow>
        </template>
        <MTransition>
          <MColumn v-if="confirmed">
            <MBtn
              :label="__('labels.clear_signature')"
              color="negative"
              flat
              icon="ion-ios-refresh"
              @click="clear"
            />
          </MColumn>
        </MTransition>
      </div>
    </MTransition>
    <slot
      :confirmed="confirmed"
      name="bottom-input"
      v-bind="scopes"
    />
  </MCol>
</template>
