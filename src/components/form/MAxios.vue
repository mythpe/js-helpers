<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { MAxiosProps as Props, MSelectModelEmit } from './models.d'
import { onMounted, ref, toValue } from 'vue'
import { useMyth } from '../../vue3'
import { QSelectSlots } from 'quasar'
import MSelect from './MSelect.vue'

type P = {
  name: Props['name'];
  label?: Props['label'];
  placeholder?: Props['placeholder'];
  viewMode?: Props['viewMode'];
  viewModeValue?: Props['viewModeValue'];
  service?: Props['service'];
  guest?: Props['guest'];
  requestWith?: Props['requestWith'];
  params?: Props['params'];
  lazy?: Props['lazy'];
}

const props = withDefaults(defineProps<P>(), {
  name: () => '',
  label: undefined,
  placeholder: undefined,
  viewMode: () => !1,
  viewModeValue: undefined,
  service: undefined,
  guest: () => !1,
  requestWith: undefined,
  params: () => ({}),
  lazy: undefined
})
const modelValue = defineModel<Props['modelValue']>({ required: !1, default: undefined })
type Emits = {
  (e: 'model', value: MSelectModelEmit): void;
}
const emit = defineEmits<Emits>()
const search = defineModel<string>('search', { required: !1, default: '' })
const myth = useMyth()
const loading = defineModel<Props['loading']>('loading', { required: !1, default: !1 })
const items = defineModel<Props['items']>('items', { required: !1, default: [] })
const prepare = async () => {
  if (!props.service || loading.value) {
    return
  }
  const method = typeof props.service === 'string' ? (props.guest ? myth.services[props.service].staticIndex : myth.services[props.service].index) : props.service
  if (!method) {
    throw Error(`No service: ${props.service}`)
  }
  // console.log(method)
  const params: any = {
    requestWith: toValue(props.requestWith),
    search: search.value,
    itemsPerPage: -1,
    page: 1,
    staticRequest: 1,
    ...(toValue(props.params) || {})
  }
  loading.value = !0
  items.value = []
  method({ params })
    .then(({ _data }: any) => {
      items.value = _data || []
      // if (!mounted.value) {
      //   mounted.value = !0
      //   cached.value = _data || []
      // }
    })
    .catch((e: any) => {
      console.log(e)
      myth.alertError(e?.message || 'An error occurred')
    })
    .finally(() => {
      loading.value = !1
    })
}
const listeners = {
  'update:search': prepare,
  model: (v: MSelectModelEmit) => emit('model', v)
}
onMounted(() => {
  if (props.lazy) {
    // console.log(props.lazy)
  } else {
    prepare()
  }
})

const input = ref<InstanceType<typeof MSelect> | null>(null)
defineExpose<{ input: typeof input }>({ input })
defineOptions({ name: 'MAxios' })
</script>

<template>
  <MSelect
    ref="input"
    v-model="modelValue"
    v-model:loading="loading"
    v-model:search="search"
    :label="label"
    :name="name"
    :options="items"
    :placeholder="placeholder"
    :view-mode="viewMode"
    :view-mode-value="viewModeValue"
    axios-mode
    no-filter
    v-bind="$attrs"
    v-on="listeners"
  >
    <template
      v-for="(_,slot) in $slots as Readonly<QSelectSlots>"
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
