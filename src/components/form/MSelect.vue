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
      <q-field
        :label="getLabel"
        :placeholder="getPlaceholder"
        stack-label
        v-bind="{...($myth.options.select||{}),...$attrs}"
      >
        <template #control>
          <div
            class="self-center full-width no-outline"
            tabindex="0"
          >
            {{ viewModeValue || inputValue }}
          </div>
        </template>
      </q-field>
    </template>
    <component
      :is="useInput ? 'div' : VeeField"
      v-else
      v-slot="fieldProps"
      :model-value="inputValue"
      :name="name"
      :rules="getRules"
      v-bind="$attrs"
      @update:model-value="updateFieldValue"
    >
      <q-select
        ref="selectRef"
        :behavior="$q.platform.is.ios === !0 ? 'dialog' : behavior"
        :emit-value="emitValue"
        :error="(fieldProps||{errors:[]}).errors.length > 0 || Boolean(errorMessageField)"
        :error-message="(fieldProps||{errorMessage:undefined}).errorMessage || errorMessageField"
        :label="getLabel"
        :loading="loading"
        :map-options="mapOptions"
        :model-value="inputValue"
        :options="getOptions"
        :use-input="useInput"
        transition-hide="flip-up"
        transition-show="flip-down"
        v-bind="{...($myth.options.select||{}),...$attrs,...(fieldProps||{field:{}}).field}"
        @filter="filterFn"
        @update:model-value="updateModelValue"
      >
        <template #no-option>
          <slot name="no-option">
            <q-item>
              <q-item-section avatar>
                <template v-if="autoSearch && searchInput?.length > 0">
                  <q-icon
                    color="warning"
                    name="o_warning"
                  />
                </template>
                <template v-else-if="autoSearch && !searchInput?.length">
                  <q-icon name="o_search" />
                </template>
                <template v-else-if="loading">
                  <q-spinner color="primary" />
                </template>
                <template v-else>
                  <q-icon name="o_info" />
                </template>
              </q-item-section>
              <q-item-section
                class="text-italic text-grey"
              >
                <template v-if="autoSearch && searchInput?.length > 0">
                  {{ $t('myth.select.noData') }}
                </template>
                <template v-else-if="autoSearch && !searchInput?.length">
                  {{ $t('myth.select.typeToSearch') }}
                </template>
                <template v-else-if="loading">
                  <q-spinner color="primary" />
                </template>
                <template v-else>
                  {{ $t('myth.select.noData') }}
                </template>
              </q-item-section>
            </q-item>
          </slot>
        </template>
        <template
          v-for="(_,slot) in $slots"
          :key="slot"
          #[slot]="inputSlot"
        >
          <slot
            v-if="inputSlot"
            :name="slot"
            v-bind="inputSlot"
          />
          <slot
            v-else
            :name="slot"
          />
        </template>
      </q-select>
      <slot
        v-bind="fieldProps||{}"
      />
    </component>
    <VeeField
      ref="veeFieldRef"
      v-model="inputValue"
      :name="name"
      :rules="getRules"
      class="hidden"
    >
      <template #default="{errorMessage}">
        <div class="hidden">
          {{ (errorMessageField = errorMessage) }}
        </div>
      </template>
    </VeeField>
  </MCol>
</template>

<script lang="ts" setup>
import { Field as VeeField } from 'vee-validate'
import { computed, defineProps, ref, watch } from 'vue'
import useInputProps from '../../composition/useInputProps'
import { ColStyleType } from '../grid/models'
import { MSelectProps } from './models'

interface Props {
  auto?: boolean;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  behavior?: 'default' | 'menu' | 'dialog' | undefined;
  name: string | undefined;
  label?: string | undefined;
  required?: boolean | undefined;
  hideRequired?: boolean | undefined;
  rules?: string | string[] | undefined;
  errors?: Record<string, string[]>;
  modelValue: any;
  options: any[];
  emitValue?: MSelectProps['emitValue'];
  mapOptions?: MSelectProps['mapOptions'];
  useInput?: MSelectProps['useInput'];
  optionValue?: MSelectProps['optionValue'];
  optionLabel?: MSelectProps['optionLabel'];
  search?: MSelectProps['search'];
  timeout?: MSelectProps['timeout'];
  autoSearch?: MSelectProps['autoSearch'];
  loading?: MSelectProps['loading'];
  noFilter?: MSelectProps['noFilter'];
  viewMode?: MSelectProps['viewMode'];
  viewModeValue?: MSelectProps['viewModeValue'];
}

const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: undefined,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  behavior: undefined,
  name: undefined,
  label: undefined,
  required: undefined,
  hideRequired: undefined,
  rules: undefined,
  errors: undefined,
  modelValue: undefined,
  options: () => ([]),
  useInput: () => !0,
  emitValue: () => !0,
  mapOptions: () => !0,
  optionValue: undefined,
  optionLabel: undefined,
  search: undefined,
  timeout: () => 300,
  autoSearch: () => !1,
  loading: () => !1,
  noFilter: () => !1,
  viewMode: () => !1,
  viewModeValue: undefined
})
type Events = {
  (e: 'update:modelValue', value: any): void;
  (e: 'search', value: any): void;
}
const emit = defineEmits<Events>()
const veeFieldRef = ref()
const inputValue = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
const errorMessageField = ref<string | undefined>(undefined)
const { getRules, getLabel, getPlaceholder } = useInputProps(props)
const originalOptions = computed<any>(() => props.options)
const noFilterProp = computed<any>(() => props.noFilter !== !1)
const searchInput = ref('')
const getOptions = computed(() => {
  if (searchInput.value && searchInput.value.length > 0 && noFilterProp.value !== !0) {
    return originalOptions.value.filter((v: any) => v.label.toLowerCase().indexOf(searchInput.value) > -1)
  }
  return originalOptions.value
})
// const mounted = ref(!1)
const filterFn = (val: any, update: any) => {
  if (!val && searchInput.value === val) {
    update()
    return
  }
  update(() => {
    searchInput.value = val
  })
  // setTimeout(() => {
  // }, props.timeout || 60)
}
const updateFieldValue = (v?: any) => {
  inputValue.value = v
}
const useInputProp = computed(() => props.useInput)
const updateModelValue = (v?: any) => {
  inputValue.value = v
  if (useInputProp.value) {
    veeFieldRef.value.handleChange(v)
  }
}

// const createValue = (val: any, done: any) => {
//   if (val.length > 0) {
//     console.log(val)
//     // done(val, 'add-unique')
//   }
// }
watch(() => searchInput.value, v => {
  emit('search', v)
})
defineExpose({ searchInput })
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
