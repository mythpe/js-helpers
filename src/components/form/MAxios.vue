<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->
<script
  lang="ts"
  setup
>

import { computed, defineEmits, defineProps, nextTick, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useMyth } from '../../vue3'
import { MAxiosProps, MSelectSlots } from './models'
import { useQuasar } from 'quasar'

interface Props {
  stackLabel?: MAxiosProps['stackLabel'];
  label?: MAxiosProps['label'];
  placeholder?: MAxiosProps['placeholder'];
  multiple?: MAxiosProps['multiple'];
  name: MAxiosProps['name'];
  modelValue?: MAxiosProps['modelValue'];
  requestWith?: MAxiosProps['requestWith'];
  options?: MAxiosProps['options'];
  service: MAxiosProps['service'];
  params?: MAxiosProps['params'];
  guest?: MAxiosProps['guest'];
  autoSearch?: MAxiosProps['autoSearch'];
  iniData?: MAxiosProps['iniData'];
  viewMode?: MAxiosProps['viewMode'];
  viewModeValue?: MAxiosProps['viewModeValue'];
  optionLabel?: MAxiosProps['optionLabel'];
  optionValue?: MAxiosProps['optionValue'];
  attributeName?: MAxiosProps['attributeName'];
}

const props = withDefaults(defineProps<Props>(), {
  stackLabel: undefined,
  label: undefined,
  placeholder: undefined,
  multiple: () => !1,
  name: () => '',
  modelValue: undefined,
  requestWith: undefined,
  options: () => ([]),
  service: undefined,
  params: () => ({}),
  guest: () => !1,
  autoSearch: () => !0,
  iniData: () => !0,
  viewMode: () => !1,
  viewModeValue: undefined,
  optionLabel: undefined,
  optionValue: undefined,
  attributeName: () => 'name'
})

interface Emits {
  (e: 'update:modelValue', value: any): void;

  (e: 'update:items', value: any[]): void
}

const emit = defineEmits<Emits>()
const q = useQuasar()
const loading = ref<boolean>(!1)
const items = ref<any[]>([])
const serviceProp = computed<MAxiosProps['service']>(() => props.service)
const getOptionLabel = computed<MAxiosProps['optionLabel']>(() => {
  if (!props.optionLabel) {
    const qLocale = q.lang.isoName.slice(0, 2)?.toLowerCase() || 'ar'
    return qLocale ? `${props.attributeName}_${qLocale}` : props.optionLabel
  }
  return props.optionLabel
})
const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
const $myth = useMyth()
const autoProps = computed(() => props.autoSearch)
const paramsProps = computed(() => props.params)
const requestWithProps = computed(() => props.requestWith)
const guestProps = computed(() => props.guest !== !1)
const viewModeProp = computed(() => props.viewMode)

const mSelectRef = ref<any>()
const searchInput = ref<any>()
const prepare = async () => {
  if (!serviceProp.value || loading.value) {
    return
  }
  const method = typeof serviceProp.value === 'string' ? (guestProps.value ? $myth.services[serviceProp.value].staticIndex : $myth.services[serviceProp.value].index) : serviceProp.value

  if (!method) {
    throw Error(`No service: ${serviceProp.value}`)
  }
  // console.log(method)
  const params = {
    requestWith: requestWithProps.value,
    search: searchInput.value,
    itemsPerPage: -1,
    page: 1,
    staticRequest: 1,
    ...(paramsProps.value || {})
  }
  loading.value = !0
  method({ params })
    .then(({ _data }: any) => {
      items.value = _data || []
      emit('update:items', _data || [])
    })
    .catch((e: any) => {
      console.log(e)
    })
    .finally(() => {
      loading.value = !1
    })
}
const onSearchInput = (v: any) => {
  if (loading.value) {
    return
  }
  searchInput.value = v
  nextTick(() => {
    if (!autoProps.value || loading.value) {
      return
    }
    if ((!v || v?.length < 2) && !props.iniData) {
      items.value = []
      emit('update:items', [])
      return
    }
    prepare()
  })
}
const currentItem = computed(() => {
  if (!props.modelValue) {
    return null
  }
  const v = typeof props.modelValue === 'object' ? props.modelValue[props.optionValue as any || 'value'] : props.modelValue
  return items.value.find((e: any) => parseInt(e[props.optionValue as any || 'value'] as any) === parseInt(v))
})

onBeforeMount(() => {
  if (viewModeProp.value) {
    return
  }
  items.value = props.options || []
})
watch(() => props.options, (v) => {
  items.value = v || []
})
onMounted(() => {
  if (viewModeProp.value) {
    return
  }
  (props.iniData || !props.autoSearch) && prepare()
})

defineExpose({
  items,
  mSelectRef,
  searchInput,
  prepare,
  onSearchInput,
  currentItem

})
</script>

<template>
  <MSelect
    ref="mSelectRef"
    v-model="model"
    :auto-search="autoSearch"
    :label="label"
    :loading="loading"
    :multiple="multiple"
    :name="name"
    :no-filter="autoSearch"
    :option-label="getOptionLabel"
    :option-value="optionValue"
    :options="items"
    :placeholder="placeholder"
    :readonly="loading"
    :stack-label="stackLabel"
    :view-mode="viewMode"
    :view-mode-value="viewModeValue"
    v-bind="$attrs"
    @search="onSearchInput"
  >
    <template
      v-if="loading"
      #selected-item
    >
      <div>
        <q-spinner />
      </div>
    </template>
    <template
      v-for="(_,slot) in ($slots as Readonly<MSelectSlots>)"
      :key="slot"
      #[slot]="inputSlot"
    >
      <slot
        :name="slot"
        v-bind="inputSlot || {}"
      />
    </template>
  </MSelect>
</template>

<script lang="ts">
export default {
  name: 'MAxios',
  inheritAttrs: !1
}
</script>
