<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Website: https://www.unique-apps.net
  - Github: https://github.com/mythpe
  -->

<template>
  <MCol
    auto
    class="text-center"
  >
    <div :class="`row ${$q.lang.rtl ? 'reverse' : ''} q-gutter-x-sm justify-center`">
      <q-input
        v-for="i in length"
        :key="i"
        :ref="el => updateFieldRef(el, i - 1)"
        v-model.number="fieldValues[i - 1]"
        :autofocus="i === 1"
        input-class="text-center"
        maxlength="1"
        outlined
        style="width: 6ch"
        v-bind="$attrs"
        @keyup="onKeyUp($event, i - 1)"
        @paste.prevent="onPaste($event,i - 1)"
        @update:model-value="onUpdate($event, i - 1)"
      />
    </div>
    <MFadeTransition>
      <div
        v-if="!hideTime"
        class="q-mt-sm"
      >
        <span>{{ $t('myth.otp.expire_line') }}:&nbsp;</span>
        <span>{{ getTime }}</span>
      </div>
    </MFadeTransition>
    <MFadeTransition>
      <div
        v-if="!hideSendAgain"
        class="q-mt-sm"
      >
        <span>{{ $t('myth.otp.send_again_title') }}&nbsp;</span>
        <span
          :class="{'text-decoration-underline':!0, disabled,'cursor-pointer': !disabled}"
          @click="onSend()"
        >{{ $t('myth.otp.send_again_btn') }}</span>
      </div>
    </MFadeTransition>
  </MCol>
</template>

<script lang="ts" setup>

import { computed, defineProps, onBeforeUnmount, onBeforeUpdate, ref, watch } from 'vue'
import { date } from 'quasar'
import { MOtpProps } from './models'

export interface Props {
  modelValue?: MOtpProps['modelValue'];
  inputLength?: MOtpProps['inputLength'];
  time?: MOtpProps['time'];
  hideTime?: MOtpProps['hideTime'];
  hideSendAgain?: MOtpProps['hideSendAgain'];
}

interface Emits {
  (e: 'update:modelValue', value: any): void;

  (e: 'end'): void;

  (e: 'send'): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  inputLength: () => 6,
  time: () => 120,
  hideTime: () => !1,
  hideSendAgain: () => !1
})

const emit = defineEmits<Emits>()

const length = computed<number>(() => parseInt(props.inputLength?.toString() || '0'))
const fields = ref<any>([])
const fieldValues = ref<number[]>([])

const composite = computed(() => {
  const nonNullFields = fieldValues.value.filter((value) => value)
  if (length.value !== nonNullFields.length) {
    return ''
  }
  return nonNullFields.join('')
})

watch(composite, () => {
  if (composite.value) {
    emit('update:modelValue', composite.value)
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

const onUpdate = (value: string | number, index: number) => {
  if (value) {
    focus(index + 1)
  }
}

const onKeyUp = (evt: KeyboardEvent, index: number) => {
  const key = evt.key

  if (['Tab', 'Shift', 'Meta', 'Control', 'Alt'].includes(key)) {
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
}
const onPaste = (evt: ClipboardEvent, index: number) => {
  const value: any = evt.clipboardData?.getData('text')?.toString() || ''
  if (isNaN(value)) {
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

</script>

<script lang="ts">
export default {
  name: 'MOtp',
  inheritAttrs: !1
}
</script>
