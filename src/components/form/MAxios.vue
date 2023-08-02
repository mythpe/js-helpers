<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <MSelect
    ref="mSelect"
    v-model="model"
    :loading="loading"
    :readonly="loading"
    :name="name"
    :options="items"
    :auto-search="autoSearch"
    v-bind="$attrs"
    @search="onSearchInput"
  >
    <template
      #selected-item
      v-if="loading"
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
  name: MAxiosProps['name'];
  modelValue?: MAxiosProps['modelValue'];
  requestWith?: MAxiosProps['requestWith'];
  options?: MAxiosProps['options'];
  service: MAxiosProps['service'];
  params?: MAxiosProps['params'];
  exclude?: MAxiosProps['exclude'];
  autoSearch?: MAxiosProps['autoSearch'];
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  requestWith: undefined,
  options: () => ([]),
  service: undefined,
  params: () => ({}),
  exclude: 1,
  name: undefined,
  autoSearch: () => !0
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
const excludeProps = computed(() => props.exclude)
const mSelect = ref<any>()
const searchInput = ref<any>()

const prepare = async () => {
  if (!serviceProp.value || loading.value) {
    return
  }
  const method = typeof serviceProp.value === 'string' ? $myth.services[serviceProp.value].staticUtilities : serviceProp.value
  if (!method) {
    throw Error(`No service: ${serviceProp.value}`)
  }
  loading.value = !0
  method({
    params: {
      ...(paramsProps.value || {}),
      requestWith: requestWithProps.value,
      exclude: excludeProps.value || undefined,
      search: searchInput.value
    }
  })
    .then(({ _data }: any) => {
      items.value = _data || []
      emit('update:items', _data || [])
    }).catch((e: any) => {
    // console.log(e)
    })
    .finally(() => {
      loading.value = !1
      nextTick(() => {
        if (autoProps.value) {
          setTimeout(() => {
            mSelect.value.$refs?.selectRef?.showPopup()
          }, 90)
        }
      })
    })
}
const onSearchInput = (v: any) => {
  searchInput.value = v
  if (!autoProps.value || loading.value) {
    return
  }

  if (!v || v?.length < 2) {
    items.value = []
    emit('update:items', [])
    return
  }
  prepare()
  // console.log('search: ', v)
}
onBeforeMount(() => {
  items.value = props.options || []
})
watch(() => props.options, (v) => {
  items.value = v || []
})
onMounted(() => {
  !props.autoSearch && prepare()
})
</script>
<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
