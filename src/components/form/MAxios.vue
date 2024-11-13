<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { MAxiosProps as Props, MSelectModelEmit } from './models.d'
import { computed, onMounted, ref, toValue, watch } from 'vue'
import { useMyth } from '../../vue3'
import { QSelectSlots } from 'quasar'
import MSelect from './MSelect.vue'
import { useSetFieldValue } from 'vee-validate'

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
  guest: undefined,
  requestWith: undefined,
  params: () => () => ({}),
  lazy: () => !1
})
const modelValue = defineModel<Props['modelValue']>({ required: !1, default: undefined })
type Emits = {
  (e: 'model', value: MSelectModelEmit): void;
}
const emit = defineEmits<Emits>()
const search = defineModel<string>('search', { required: !1, default: '' })
const setFieldValue = useSetFieldValue(() => props.name)
const myth = useMyth()
const loading = defineModel<Props['loading']>('loading', { required: !1, default: !1 })
const items = defineModel<Props['items']>('items', { required: !1, default: [] })
const isGuest = computed(() => {
  const v = toValue(props.guest)
  return v !== undefined && v !== null && v !== !1
})
const prepare = async (fromWatch = !1) => {
  if (!props.service || loading.value) {
    return
  }
  const method = typeof props.service === 'string'
    ? (isGuest.value ? myth.services[props.service].staticIndex : myth.services[props.service].index)
    : props.service
  if (!method) {
    throw Error(`No service: ${props.service}`)
  }
  const params: any = {
    requestWith: undefined,
    search: search.value,
    itemsPerPage: -1,
    page: 1,
    staticRequest: 1,
    ...(toValue(props.params) || {})
  }
  if (props.requestWith) {
    params.requestWith = toValue(props.requestWith)
  }
  loading.value = !0
  items.value = []
  method({ params })
    .then(({ _data }: any) => {
      items.value = _data || []
    })
    .catch((e: any) => {
      myth.alertError(e?.message || 'An error occurred')
    })
    .finally(() => {
      loading.value = !1
      if (fromWatch) {
        if (modelValue.value !== null && modelValue.value !== undefined) {
          setFieldValue(undefined)
        }
      }
    })
}
const listeners = {
  'update:search': prepare,
  model: (v: MSelectModelEmit) => emit('model', v)
}
onMounted(() => {
  if (!props.lazy) {
    prepare()
  }
})
watch(props.params, () => prepare(!0), { deep: !0 })
const input = ref<InstanceType<typeof MSelect> | null>(null)
defineExpose<{ input: typeof input }>({ input })
defineOptions({ name: 'MAxios', inheritAttrs: !1 })
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
