<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <MSelect
    v-model="model"
    :loading="loading"
    :readonly="loading"
    :name="name"
    :options="items"
    v-bind="$attrs"
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
const serviceProp = computed<MAxiosProps['service']>(() => props.service)
const model = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})
// const model = ref<any>(props.modelValue)

onBeforeMount(() => {
  items.value = props.options ?? []
})

watch(() => props.options, (v) => {
  items.value = v || []
})
const $myth = useMyth()
onMounted(async () => {
  const prepare = async () => {
    if (!serviceProp.value) {
      return
    }
    const method = typeof serviceProp.value === 'string' ? $myth.services[serviceProp.value].staticUtilities : serviceProp.value
    if (!method) {
      throw Error(`No service: ${serviceProp.value}`)
    }
    loading.value = !0
    try {
      const { _data } = await method({ params: { ...(props.params ?? {}), requestWith: props.requestWith, exclude: props.exclude } })
      items.value = _data || []
      emit('items', _data || [])
    } catch (e) {
      // console.log(e)
    } finally {
      nextTick(() => {
        loading.value = !1
      })
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
