<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <MSelect
    ref="mSelectRef"
    v-model="model"
    :auto-search="autoSearch"
    :loading="loading"
    :multiple="multiple"
    :name="name"
    :no-filter="autoSearch"
    :options="items"
    :readonly="loading"
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
  </MSelect>
</template>

<script
  lang="ts"
  setup
>

import { computed, defineEmits, defineProps, nextTick, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useMyth } from '../../vue3'
import { MAxiosProps } from './models'

interface Props {
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
}

const props = withDefaults(defineProps<Props>(), {
  multiple: () => !1,
  name: undefined,
  modelValue: undefined,
  requestWith: undefined,
  options: () => ([]),
  service: undefined,
  params: () => ({}),
  guest: () => !1,
  autoSearch: () => !0,
  iniData: () => !0,
  viewMode: () => !1,
  viewModeValue: undefined
})

interface Emits {
  (e: 'update:modelValue', value: any): void;

  (e: 'update:items', value: any[]): void
}

const emit = defineEmits<Emits>()

const loading = ref<boolean>(!1)
const items = ref<any[]>([])
const serviceProp = computed<MAxiosProps['service']>(() => props.service)
const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
const $myth = useMyth()
const autoProps = computed(() => props.autoSearch)
const paramsProps = computed(() => props.params)
const requestWithProps = computed(() => props.requestWith)
const guestProps = computed(() => props.guest !== !1)
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
    ...(paramsProps.value || {}),
    requestWith: requestWithProps.value,
    search: searchInput.value,
    itemsPerPage: -1,
    page: 1
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
const viewModeProp = computed(() => props.viewMode)
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
</script>
<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
