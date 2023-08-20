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
    <template v-if="viewMode">
      <MInput
        v-model="inputValue"
        :disable="disable"
        :mask="mask"
        :readonly="readonly"
        :view-mode="viewMode"
        :view-mode-value="viewModeValue"
        v-bind="$attrs"
      />
    </template>
    <MInput
      v-else
      ref="inputRef"
      v-model="inputValue"
      :disable="disable"
      :mask="mask"
      :readonly="readonly"
      v-bind="$attrs"
    >
      <template #append>
        <q-btn
          v-if="!disable&&!readonly"
          :icon="icon"
          flat
          round
          v-bind="{...btnProps,...$myth.options?.pickerBtn}"
        >
          <q-popup-proxy
            cover
            persistent
            transition-hide="scale"
            transition-show="scale"
            @before-show="onBeforeShow()"
            @before-hide="onBeforeHide()"
          >
            <q-date
              v-if="isDate"
              v-model="dateRef"
              :mask="format"
              :multiple="multiple"
              :range="range"
              today-btn
              v-bind="{...($myth.options.date||{}),...$attrs}"
            >
              <div class="row items-center justify-end">
                <MBtn
                  v-close-popup
                  :label="$t('close')"
                  color="negative"
                  flat
                />
                <MBtn
                  v-close-popup
                  :label="$t('save')"
                  flat
                  @click="saveDialog()"
                />
              </div>
            </q-date>
            <q-time
              v-else
              v-model="dateRef"
              :mask="format"
              now-btn
              v-bind="{...($myth.options.time||{}),...$attrs}"
            >
              <div class="row items-center justify-end">
                <MBtn
                  v-close-popup
                  :label="$t('close')"
                  color="negative"
                  flat
                />
                <MBtn
                  v-close-popup
                  :label="$t('save')"
                  flat
                  @click="saveDialog()"
                />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-btn>
      </template>
    </MInput>
  </MCol>
</template>

<script lang="ts" setup>
import { computed, defineEmits, nextTick, ref } from 'vue'
import { MPickerProps } from './models'

interface Props {
  auto?: MPickerProps['auto'];
  col?: MPickerProps['col'];
  xs?: MPickerProps['xs'];
  sm?: MPickerProps['sm'];
  md?: MPickerProps['md'];
  lg?: MPickerProps['lg'];
  xl?: MPickerProps['xl'];
  modelValue: MPickerProps['modelValue'];
  type?: MPickerProps['type'];
  range?: MPickerProps['range'];
  multiple?: MPickerProps['multiple'];
  btnProps?: MPickerProps['btnProps'];
  readonly?: MPickerProps['readonly'];
  disable?: MPickerProps['disable'];
  viewMode?: MPickerProps['viewMode'];
  viewModeValue?: MPickerProps['viewModeValue'];
}

const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  modelValue: undefined,
  type: () => 'date',
  range: () => !1,
  multiple: () => !1,
  btnProps: undefined,
  readonly: undefined,
  disable: undefined,
  viewMode: () => !1,
  viewModeValue: undefined
})

interface Emits {
  (e: 'update:modelValue', value: any): void
}

const emit = defineEmits<Emits>()

const isDate = computed(() => props.type === 'date')
const isRange = computed(() => props.range !== !1 && props.range !== undefined)
const isMultiple = computed(() => props.multiple !== !1 && props.multiple !== undefined)

const inputValue = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const mask = computed(() => {
  if (isRange.value || isMultiple.value) {
    return undefined
    // return isDate.value ? '####-##-## - ####-##-##' : '##:## - ##:##'
  }
  return isDate.value ? '####-##-##' : '##:##'
})
const format = isDate.value ? 'YYYY-MM-DD' : 'HH:mm'
const icon = isDate.value ? 'event' : 'access_time'
const dateRef = ref()
const inputRef = ref()
const onBeforeShow = () => {
  dateRef.value = props.modelValue || undefined
}
const onBeforeHide = () => {
  nextTick(() => (dateRef.value = undefined))
}
const saveDialog = () => {
  let newVal = dateRef.value
  if (typeof newVal === 'object' && isDate.value) {
    const values: any[] = Object.values(newVal)
    for (const aKey in values) {
      if (typeof values[aKey] === 'object') {
        values[aKey] = Object.values(values[aKey])
      }
    }
    newVal = values
  }
  inputValue.value = newVal
  inputRef.value?.$refs?.veeFieldRef?.handleChange(newVal)
}
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
