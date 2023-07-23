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

import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { computed, defineEmits, defineProps, onBeforeMount, onMounted, ref, watch } from 'vue'
import { useMyth } from '../../vue3'
import { MAxiosProps } from './models'

interface Props extends MAxiosProps {
  modelValue?: any | undefined;
  requestWith?: string | undefined;
  options?: any[];
  service: string | ((config?: AxiosRequestConfig) => Promise<AxiosInstance>);
  params?: Record<string, any> | undefined;
  exclude?: string | number | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  requestWith: undefined,
  options: () => ([]),
  service: undefined,
  params: () => ({}),
  exclude: 1,
  name: undefined
})

interface Emits {
  (e: 'update:modelValue', value: any): void;

  (e: 'items', value: any[]): void
}

const emit = defineEmits<Emits>()

const loading = ref<boolean>(!1)
const items = ref<any[]>([])
const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
// const model = ref<any>(props.modelValue)

onBeforeMount(() => {
  items.value = props.options ?? []
})

watch(() => props.options, (v) => {
  items.value = v ?? []
})
const $myth = useMyth()
onMounted(async () => {
  const prepare = async () => {
    if (!props.service) return
    const method = typeof props.service === 'string' ? $myth.api.services[props.service].staticUtilities : props.service

    loading.value = !0
    try {
      const { _data } = await method({ params: { ...(props.params ?? {}), requestWith: props.requestWith, exclude: props.exclude } })
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
<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>

<template>
  <MSelect
    v-model="model"
    :loading="loading"
    :name="name"
    :options="items"
    v-bind="$attrs"
  >
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
