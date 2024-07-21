<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { MInputSlots, MPickerProps } from './models'

interface Props {
  auto?: MPickerProps['auto'];
  col?: MPickerProps['col'];
  xs?: MPickerProps['xs'];
  sm?: MPickerProps['sm'];
  md?: MPickerProps['md'];
  lg?: MPickerProps['lg'];
  xl?: MPickerProps['xl'];
  type?: MPickerProps['type'];
  range?: MPickerProps['range'];
  multiple?: MPickerProps['multiple'];
  btnProps?: MPickerProps['btnProps'];
  readonly?: MPickerProps['readonly'];
  disable?: MPickerProps['disable'];
  viewMode?: MPickerProps['viewMode'];
  viewModeValue?: MPickerProps['viewModeValue'];
  topLabel?: MPickerProps['topLabel'];
  caption?: MPickerProps['caption'];
  modelValue: MPickerProps['modelValue'];
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
  viewModeValue: undefined,
  topLabel: undefined,
  caption: undefined
})

const isDate = computed(() => props.type === 'date')
const isRange = computed(() => props.range !== !1 && props.range !== undefined)
const isMultiple = computed(() => props.multiple !== !1 && props.multiple !== undefined)

const inputValue = defineModel({ required: !0 })

const mask = computed(() => {
  if (isRange.value || isMultiple.value) {
    return undefined
    // return isDate.value ? '####-##-## - ####-##-##' : '##:## - ##:##'
  }
  return isDate.value ? '####-##-##' : '##:##'
})
const format = computed(() => isDate.value ? 'YYYY-MM-DD' : 'HH:mm')
const dateRef = ref()
const inputRef = ref()
const onBeforeShow = () => {
  dateRef.value = inputValue.value ?? null
}
const onBeforeHide = () => {
  dateRef.value = null
}
const saveDialog = () => {
  let newVal: any = dateRef.value
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
      >
        <template
          v-for="(_,slot) in ($slots as Readonly<MInputSlots>)"
          :key="slot"
          #[slot]
        >
          <slot :name="slot" />
        </template>
      </MInput>
    </template>
    <MInput
      v-else
      ref="inputRef"
      v-model="inputValue"
      :caption="caption"
      :disable="disable"
      :mask="mask"
      :readonly="readonly"
      :top-label="topLabel"
      v-bind="$attrs"
    >
      <template
        v-for="(_,slot) in ($slots as Readonly<MInputSlots>)"
        :key="slot"
        #[slot]
      >
        <slot :name="slot" />
      </template>
      <template #append>
        <q-btn
          v-if="!disable&&!readonly"
          :icon="isDate ? 'event' : 'access_time'"
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
              v-bind="{...$myth.options.date as any,...$attrs}"
            >
              <div class="row items-center justify-end">
                <MBtn
                  v-close-popup
                  :label="__('close')"
                  color="negative"
                  flat
                />
                <MBtn
                  v-close-popup
                  :label="__('save')"
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
              v-bind="{...$myth.options.time,...$attrs}"
            >
              <div class="row items-center justify-end">
                <MBtn
                  v-close-popup
                  :label="__('close')"
                  color="negative"
                  flat
                />
                <MBtn
                  v-close-popup
                  :label="__('save')"
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

<script lang="ts">
export default {
  name: 'MPicker',
  inheritAttrs: !1
}
</script>
