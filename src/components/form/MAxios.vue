<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script
  lang="ts"
  setup
>

import { AxiosInstance } from 'axios'
import { defineEmits, defineProps, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useMyTh } from '../../vue3'
import { MAxiosProps } from './models'

interface Props extends MAxiosProps {
  modelValue?: any | undefined;
  requestWith?: string | undefined;
  options?: any[];
  service: string | (() => Promise<AxiosInstance>);
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  requestWith: undefined,
  options: () => ([]),
  service: undefined
})

interface Emits {
  (e: 'items', value: any[]): void
}

const emit = defineEmits<Emits>()

const loading = ref<boolean>(!1)
const items = ref<any[]>([])
const model = ref<any>(props.modelValue)

onBeforeMount(() => {
  items.value = props.options ?? []
})

watch(() => props.options, (v) => {
  items.value = v ?? []
})
const $myth = useMyTh()
onMounted(async () => {
  const prepare = async () => {
    if (!props.service) return
    const method = typeof props.service === 'string' ? $myth.api.services[props.service].staticUtilities : props.service

    loading.value = !0
    try {
      const { _data } = await method({ requestWith: props.requestWith })
      items.value = _data || []
      emit('items', _data || [])
    } catch (e) {
      // console.log(e)
    } finally {
      loading.value = !1
    }
  }

  await prepare()
})
</script>

<template>
  <MSelect
    v-model="model"
    :loading="loading"
    :options="items"
    v-bind="$attrs"
  />
</template>
