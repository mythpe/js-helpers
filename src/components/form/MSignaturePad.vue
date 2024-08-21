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
import { computed, onUnmounted, ref, useAttrs, watch } from 'vue'
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
  url?: Props['url'];
  noBtn?: Props['noBtn'];
  waterMark?: Props['waterMark'];

  auto?: Props['auto'];
  col?: Props['col'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
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
  url: undefined,
  noBtn: () => !1,
  waterMark: undefined
})

type Emits = {
  (e: 'clear'): void;
  (e: 'undo'): void;
}
const emit = defineEmits<Emits>()

const myth = useMyth()

defineModel<Props['modelValue']>({ required: !1, default: undefined })
const attrs = useAttrs()
const helper = useInputHelper<P & { name: string; }>(() => props, 'signaturePad', () => ({ attrs }))
const { getLabel, getRules } = helper
const inputScope = useField<Props['modelValue']>(() => props.name, getRules, {
  syncVModel: !0,
  label: getLabel
})
const { value, errorMessage, handleChange } = inputScope

const padRef = ref<InstanceType<typeof Vue3Signature>>()
const confirmed = ref(!1)
const disabledRef = ref(!1)
const isDisabled = computed(() => props.disabled || disabledRef.value || confirmed.value)
const reset = () => {
  confirmed.value = !1
  disabledRef.value = !1
}
const save = (type: 'image/jpeg' | 'image/svg+xml') => {
  if (props.required && padRef.value?.isEmpty()) {
    myth.alertError(myth.__('validation.messages.required', { field: myth.__(props.label || myth.__('signature')) }))
    return
  }
  // handleReset()
  confirmed.value = !0
  const v = padRef.value?.save(type)
  handleChange(v || null, !0)
}
const clear = () => {
  padRef.value?.clear()
  confirmed.value && handleChange(null, !0)
  emit('clear')
  reset()
}
const undo = () => {
  padRef.value?.undo()
  emit('undo')
  confirmed.value && handleChange(null, !1)
  reset()
}
// const addWaterMark = () => {
//   padRef.value.addWaterMark({
//     text: 'mark text', // watermark text, > default ''
//     font: '20px Arial', // mark font, > default '20px sans-serif'
//     style: 'all', // fillText and strokeText,  'all'/'stroke'/'fill', > default 'fill
//     fillStyle: 'red', // fillcolor, > default '#333'
//     strokeStyle: 'blue', // strokecolor, > default '#333'
//     x: 100, // fill positionX, > default 20
//     y: 200, // fill positionY, > default 20
//     sx: 100, // stroke positionX, > default 40
//     sy: 200 // stroke positionY, > default 40
//   })
// }

// const fromDataURL = (url: any) => {
//   padRef.value.fromDataURL('https://avatars2.githubusercontent.com/u/17644818?s=460&v=4')
// }

const isEmpty = () => !!padRef.value?.isEmpty()
const addWaterMark = (opt: SignaturePadWaterMark) => padRef.value?.addWaterMark(opt)
const fromDataURL = (url: string) => padRef.value?.fromDataURL(url)
defineExpose({ reset, save, clear, undo, disabled: isDisabled, isEmpty, addWaterMark, fromDataURL, padRef })

const watchStopHandle = watch(() => props.url, (url) => {
  if (url) {
    fromDataURL(url)
    if (!confirmed.value) {
      confirmed.value = !0
    }
  }
})
onUnmounted(() => {
  watchStopHandle?.()
})
</script>

<script lang="ts">
export default {
  name: 'MSignaturePad',
  inheritAttrs: !1
}
</script>

<template>
  <MCol
    :auto="auto"
    :class="[$attrs.class, {'m--input__required': !!getRules?.required && !value }]"
    :col="col"
    :lg="lg"
    :md="md"
    :name="name"
    :sm="sm"
    :xs="xs"
  >
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
            v-bind="{ width, height, reset, save, clear, undo }"
          >
            <Vue3Signature
              ref="padRef"
              :class="{'q-mx-auto': !0, 'hidden': !!$slots.pad}"
              :clear-on-resize="clearOnResize"
              :default-url="url"
              :disabled="isDisabled"
              :h="height"
              :sig-option="{
                penColor: color,
                backgroundColor: bg
              }"
              :w="width"
              :water-mark="waterMark"
            />
          </slot>
          <slot v-bind="inputScope" />
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
  </MCol>
</template>
