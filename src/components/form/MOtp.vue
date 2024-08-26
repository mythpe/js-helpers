<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { computed, defineProps, nextTick, onBeforeUnmount, onBeforeUpdate, ref, watch, watchEffect } from 'vue'
import { date } from 'quasar'
import { MOtpProps as Props } from './models'
import { isNaN } from 'lodash'

export interface P {
  // modelValue?: Props['modelValue'];
  inputLength?: Props['inputLength'];
  numeric?: Props['numeric'];
  time?: Props['time'];
  hideTime?: Props['hideTime'];
  hideSendAgain?: Props['hideSendAgain'];
  topLabel?: Props['topLabel'];
  topLabelProps?: Props['topLabelProps'];
  autofocus?: Props['autofocus'];
  errors?: Props['errors'];
}

interface Emits {

  (e: 'end'): void;

  (e: 'send'): void;
}

const props = withDefaults(defineProps<P>(), {
  // modelValue: undefined,
  inputLength: () => 6,
  numeric: () => !0,
  time: () => 120,
  hideTime: () => !1,
  hideSendAgain: () => !1,
  topLabel: undefined,
  topLabelProps: undefined,
  autofocus: () => !1,
  errors: () => ([])
})
const modelValue = defineModel<Props['modelValue']>({ required: !1, default: undefined })
const emit = defineEmits<Emits>()
const otpErrors = computed(() => props.errors ? props.errors : [])
const length = computed<number>(() => parseInt(props.inputLength?.toString() || '0'))
const fields = ref<any>([])
const fieldValues = ref<(string | number | null | undefined)[]>([])
watchEffect(() => {
  fieldValues.value = (modelValue.value || '').toString().split('').slice(0, length.value)
})

const composite = computed(() => {
  const nonNullFields = fieldValues.value.filter(v => (v || v?.toString() !== '0'))
  if (length.value !== nonNullFields.length) {
    return ''
  }
  return nonNullFields.join('')
})

watch(composite, () => {
  if (composite.value) {
    if (props.numeric !== !1) {
      if (!isNaN(composite.value) && composite.value?.toString()?.length?.toString() === props.inputLength.toString()) {
        modelValue.value = composite.value
      }
    } else {
      modelValue.value = composite.value
    }
  }
})

// make sure to reset the refs before each update
onBeforeUpdate(() => {
  fields.value = []
})

const updateFieldRef = (element: any, index: number) => {
  if (element) {
    fields.value[index] = element
  }
}

const focus = (index: number) => {
  if (index >= 0) {
    if (index < length.value) {
      fields.value[index]?.select()
    } else {
      if (composite.value) {
        fields.value[index - 1]?.blur()
      }
    }
  }
}

const blur = (index: number) => {
  fields.value[index]?.blur()
}

const onUpdate = (value: string | number | null, index: number) => {
  if (value) {
    if (props.numeric !== !1 && isNaN(value)) {
      nextTick(() => {
        setTimeout(() => {
          focus(index)
        }, 100)
      })
      return
    }
    focus(index + 1)
    if (index === (length.value - 1)) {
      blur(index)
    }
  }
}

const onKeyDown = (evt: KeyboardEvent, index: number) => {
  if (props.numeric !== !1 && evt.key && evt.key.toString() !== '0' && !parseInt(evt.key) && evt.key?.length === 1) {
    evt.preventDefault()
  }
}
const onKeyUp = (evt: KeyboardEvent, index: number) => {
  const key = evt.key
  if (['Tab', 'Shift', 'Meta', 'Control', 'Alt', 'Enter', ' '].includes(key)) {
    return
  }

  if (['Delete'].includes(key)) {
    focus(index - 1)
    return
  }

  if (key === 'ArrowLeft' || key === 'Backspace') {
    focus(index - 1)
  } else if (key === 'ArrowRight') {
    focus(index + 1)
  }

  // The input is fill & replace the value
  // if (key.length === 1) {
  //   onUpdate(key, index)
  //   const t = [...fieldValues.value]
  //   t[index] = key
  //   fieldValues.value = t
  // }
}
const onPaste = (evt: ClipboardEvent, index: number) => {
  const value: any = evt.clipboardData?.getData('text')?.toString() || ''
  if (props.numeric !== !1 && isNaN(value)) {
    evt.preventDefault()
    return
  }
  if (value?.length > 0) {
    fieldValues.value = value.slice(0, length.value).split('').map((e: string) => parseInt(e) || 0)
    blur(index)
  }
}

const seconds = ref<number>(0)
const temp = ref<number>(0)
watch(() => seconds.value, v => (temp.value = v))
const startTiming = () => {
  if (props.hideTime) {
    return
  }

  if (seconds.value > 0) {
    --seconds.value
    if (!seconds.value) {
      emit('end')
    }
  }
}
const getTime = computed<string | null>(() => {
  const nullValue = null
  if (props.hideTime) {
    return nullValue
  }
  if (seconds.value < 1) {
    return '00:00'
  }

  const newDate = date.buildDate({ minutes: 0, seconds: seconds.value, milliseconds: 0 })
  const m = newDate.getMinutes()
  const s = newDate.getSeconds()
  return `${(m < 9 ? '0' : '') + m}:${(s < 9 ? '0' : '') + s}`
})
const disabled = computed(() => seconds.value > 0)
let interval: any = null
const clear = () => {
  interval && clearInterval(interval)
}
const start = () => {
  if (props.hideTime) {
    return
  }
  clear()
  seconds.value = parseInt(props.time?.toString()) || 120
  interval = setInterval(() => startTiming(), 1000)
}
watch(() => props.time, () => start(), { immediate: !0, deep: !0 })
onBeforeUnmount(() => clear())
const onSend = () => {
  if (disabled.value) {
    return
  }
  emit('send')
}
defineExpose({ start })
defineOptions({ name: 'MOtp', inheritAttrs: !1 })
</script>

<template>
  <MCol
    auto
    class="text-center"
  >
    <slot name="before-all" />
    <MRow
      v-if="!!topLabel"
      class="justify-start q-mb-md text-body1"
      v-bind="topLabelProps"
    >
      <div>
        {{ __(topLabel) }}
      </div>
    </MRow>
    <div :class="`row ${$q.lang.rtl ? 'reverse' : ''} q-gutter-x-sm justify-center`">
      <q-input
        v-for="i in length"
        :key="i"
        :ref="el => updateFieldRef(el, i - 1)"
        v-model="fieldValues[i - 1]"
        :autofocus="autofocus && i === 1"
        :error="otpErrors.length > 0"
        hide-bottom-space
        input-class="text-center"
        maxlength="1"
        no-error-icon
        outlined
        style="width: 6ch"
        v-bind="{...($myth.options.otp || {}),...($attrs||{})}"
        @keydown="onKeyDown($event, i - 1)"
        @keyup="onKeyUp($event, i - 1)"
        @paste.prevent="onPaste($event,i - 1)"
        @update:model-value="onUpdate($event, i - 1)"
      />
    </div>
    <div
      v-if="otpErrors.length > 0"
      class="q-my-md text-negative"
    >
      {{ otpErrors[0] }}
    </div>
    <slot name="after-input" />
    <MFadeTransition>
      <div
        v-if="!hideTime"
        class="q-mt-sm"
      >
        <span>{{ __('myth.otp.expire_line') }}:&nbsp;</span>
        <span>{{ getTime }}</span>
      </div>
    </MFadeTransition>
    <MFadeTransition>
      <div
        v-if="!hideSendAgain"
        class="q-mt-sm"
      >
        <span>{{ __('myth.otp.send_again_title') }}&nbsp;</span>
        <span
          :class="{'text-decoration-underline':!0, disabled,'cursor-pointer': !disabled}"
          @click="onSend()"
        >{{ __('myth.otp.send_again_btn') }}</span>
      </div>
    </MFadeTransition>
    <slot name="after-all" />
  </MCol>
</template>
