<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { computed, ref, useAttrs } from 'vue'
import { MPickerProps as Props } from './models'
import { useInputHelper } from '../../composables'
import { useField } from 'vee-validate'
import { QDate, QField, QFieldSlots, QTime } from 'quasar'

interface P {
  name: Props['name'];
  auto?: Props['auto'];
  col?: Props['col'];
  xs?: Props['xs'];
  sm?: Props['sm'];
  md?: Props['md'];
  lg?: Props['lg'];
  xl?: Props['xl'];
  // modelValue?: Props['modelValue'];
  label?: Props['label'];
  caption?: Props['caption'];
  hint?: Props['hint'];
  placeholder?: Props['placeholder'];
  help?: Props['help'];
  required?: Props['required'];
  rules?: Props['rules'];
  // errors?: Props['errors'];
  viewMode?: Props['viewMode'];
  viewModeValue?: Props['viewModeValue'];
  autocomplete?: Props['autocomplete'];
  topLabel?: Props['topLabel'];
  type?: Props['type'];
  range?: Props['range'];
  multiple?: Props['multiple'];
  btnProps?: Props['btnProps'];
  readonly?: Props['readonly'];
  disable?: Props['disable'];
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
  // modelValue: undefined,
  label: undefined,
  caption: undefined,
  hint: undefined,
  placeholder: undefined,
  help: undefined,
  required: undefined,
  rules: undefined,
  // errors: undefined,
  viewMode: () => !1,
  viewModeValue: undefined,
  autocomplete: undefined,
  topLabel: undefined,
  type: () => 'date',
  range: () => !1,
  multiple: () => !1,
  btnProps: undefined,
  readonly: undefined,
  disable: undefined
})

defineModel<Props['modelValue']>({ required: !1, default: undefined })
const attrs = useAttrs()
const helper = useInputHelper<P>(() => props, 'input', () => ({ choose: !0, attrs }))
const { hasTopLabel, getLabel, getPlaceholder, getRules } = helper
const inputScope = useField<Props['modelValue']>(() => props.name, getRules, {
  // initialValue: modelValue,
  syncVModel: !0,
  label: getLabel
})
const { value, errorMessage, handleChange } = inputScope

const isDate = computed(() => props.type === 'date')
// const mask = computed(() => {
//   if (props.range || props.multiple) {
//     return undefined
//     // return isDate.value ? '####/##/## - ####-##-##' : '##:## - ##:##'
//   }
//   return isDate.value ? '####/##/##' : '##:##'
// })
const format = computed(() => isDate.value ? 'YYYY/MM/DD' : 'HH:mm')
const dateRef = ref()
const onBeforeShow = () => {
  dateRef.value = value.value || null
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
  handleChange(newVal, !!errorMessage.value)
}

const dateElm = ref<InstanceType<typeof QDate> | null>(null)
const timeElm = ref<InstanceType<typeof QTime> | null>(null)
defineExpose<{ input: typeof dateElm | typeof timeElm }>({ input: isDate.value ? dateElm : timeElm })
</script>

<template>
  <MCol
    :auto="auto"
    :class="$attrs.class"
    :col="col"
    :lg="lg"
    :md="md"
    :name="name"
    :sm="sm"
    :xs="xs"
  >
    <slot
      name="top-input"
      v-bind="inputScope"
    />
    <slot name="top-label">
      <MInputLabel
        v-if="hasTopLabel"
        :error="!!errorMessage"
        :label="getLabel"
        :name="name"
        :required="!!getRules?.required"
      />
    </slot>
    <slot name="caption">
      <div
        v-if="!!caption"
        class="m--input__caption"
      >
        {{ __(caption) }}
      </div>
    </slot>
    <q-field
      ref="input"
      :error="!!errorMessage"
      :error-message="errorMessage"
      :hint="__(hint)"
      :label="hasTopLabel ? undefined : getLabel"
      v-bind="{ ...$myth.options.input as any,...$attrs, topLabel: undefined }"
    >
      <template #control>
        <slot name="control">
          <div
            v-if="!disable && !readonly && !viewMode && !!getPlaceholder && !value"
            class="q-placeholder"
          >
            {{ getPlaceholder }}
          </div>
          <template v-else-if="viewMode && viewModeValue">
            <div>{{ viewModeValue?.toString() }}</div>
          </template>
          <template v-else>
            <div>{{ value?.toString() }}</div>
          </template>
        </slot>
      </template>
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
              {{ dateRef }}
              <q-date
                v-if="isDate"
                ref="dateElm"
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
                ref="timeElm"
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
        v-for="(_,slot) in ($slots as Readonly<QFieldSlots>)"
        :key="slot"
        #[slot]
      >
        <slot :name="slot" />
      </template>
    </q-field>
    <slot
      name="help"
      v-bind="inputScope"
    >
      <MHelpRow :text="help" />
    </slot>
    <slot
      name="bottom-input"
      v-bind="inputScope"
    />
  </MCol>
</template>

<script lang="ts">
export default {
  name: 'MPicker',
  inheritAttrs: !1
}
</script>
