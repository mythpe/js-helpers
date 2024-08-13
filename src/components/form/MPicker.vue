<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { MInputSlots, MPickerProps as Props } from './models'
import MInput from './MInput.vue'

interface P {
  auto?: Props['auto'];
  col?: Props['col'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
  name: Props['name'];
  type?: Props['type'];
  range?: Props['range'];
  multiple?: Props['multiple'];
  btnProps?: Props['btnProps'];
  readonly?: Props['readonly'];
  disable?: Props['disable'];
  viewMode?: Props['viewMode'];
  required?: Props['required'];
}

const props = withDefaults(defineProps<P>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  name: () => '',
  type: () => 'date',
  range: () => !1,
  multiple: () => !1,
  btnProps: undefined,
  readonly: undefined,
  disable: undefined,
  viewMode: () => !1,
  required: undefined
})

const isDate = computed(() => props.type === 'date')
const modelValue = defineModel<Props['modelValue']>({ required: !1, default: undefined })

const mask = computed(() => {
  if (props.range || props.multiple) {
    return undefined
    // return isDate.value ? '####-##-## - ####-##-##' : '##:## - ##:##'
  }
  return isDate.value ? '####-##-##' : '##:##'
})
const format = computed(() => isDate.value ? 'YYYY-MM-DD' : 'HH:mm')
const dateRef = ref()
const onBeforeShow = () => {
  dateRef.value = modelValue.value || null
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
  modelValue.value = newVal
}

const input = ref<InstanceType<typeof MInput> | null>(null)
defineExpose<{ input: typeof input }>({ input })
</script>

<template>
  <MInput
    ref="input"
    v-model="modelValue"
    :auto="auto"
    :col="col"
    :disable="disable"
    :lg="lg"
    :mask="mask"
    :md="md"
    :name="name"
    :readonly="readonly"
    :sm="sm"
    :view-mode="viewMode"
    :xs="xs"
    v-bind="$attrs"
  >
    <template #append>
      <q-btn
        v-if="!disable && !readonly && !viewMode"
        :icon="isDate ? 'ion-ios-calendar' : 'ion-ios-clock'"
        flat
        round
        v-bind="{...btnProps, ...$myth.options?.pickerBtn}"
      >
        <q-popup-proxy
          cover
          no-shake
          persistent
          transition-hide="jump-down"
          transition-show="jump-up"
          @before-show="onBeforeShow()"
          @before-hide="onBeforeHide()"
        >
          <q-card>
            <q-date
              v-if="isDate"
              v-model="dateRef"
              :mask="format"
              :multiple="multiple"
              :range="range"
              today-btn
              v-bind="{...$myth.options.date as any, ...$attrs}"
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
              v-bind="{...$myth.options.time, ...$attrs}"
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
          </q-card>
        </q-popup-proxy>
      </q-btn>
    </template>

    <template
      v-for="(_,slot) in ($slots as Readonly<MInputSlots>)"
      :key="slot"
      #[slot]
    >
      <slot :name="slot" />
    </template>
  </MInput>
</template>

<script lang="ts">
export default {
  name: 'MPicker',
  inheritAttrs: !1
}
</script>
