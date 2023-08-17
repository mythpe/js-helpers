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
    :auto-search="autoSearch"
    :loading="loading"
    :multiple="multiple"
    :name="name"
    :no-filter="autoSearch"
    :options="items"
    :readonly="loading"
    :disable="loading"
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
      v-if="multiple"
      #before-options
    >
      <MContainer>
        <MRow class="items-center">
          <MBtn
            :label="$t('done')"
            flat
            @click="onDoneOptions()"
          />
        </MRow>
      </MContainer>
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
}

const props = withDefaults(defineProps<Props>(), {
  multiple: undefined,
  name: undefined,
  modelValue: undefined,
  requestWith: undefined,
  options: () => ([]),
  service: undefined,
  params: () => ({}),
  guest: undefined,
  autoSearch: () => !0,
  iniData: () => !0
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
const guestProps = computed(() => props.guest !== undefined && props.guest !== !1)
const isMounted = ref(!1)
const mSelect = ref<any>()
const searchInput = ref<any>()
const onDoneOptions = () => {
  // const r = ref(mSelect.value?.searchInput)
  // r.value = ''
  // console.log(mSelect.value)
  // mSelect.value?.searchInput?.value = ''
  mSelect.value.$refs?.selectRef?.updateInputValue('', !0)
  mSelect.value.$refs?.selectRef?.hidePopup()
}
const prepare = async () => {
  if (!serviceProp.value || loading.value) {
    return
  }
  const method = typeof serviceProp.value === 'string' ? (
    guestProps.value ? $myth.services[serviceProp.value].staticIndex : $myth.services[serviceProp.value].index
  ) : serviceProp.value
  if (!method) {
    throw Error(`No service: ${serviceProp.value}`)
  }
  loading.value = !0
  method({
    params: {
      ...(paramsProps.value || {}),
      requestWith: requestWithProps.value,
      search: searchInput.value,
      itemsPerPage: -1,
      page: 1
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
        if (autoProps.value && isMounted.value) {
          setTimeout(() => {
            console.log(3)
            mSelect.value.$refs?.selectRef?.showPopup()
          }, 90)
        }
        isMounted.value = !0
      })
    })
}
const onSearchInput = (v: any) => {
  searchInput.value = v
  if (!autoProps.value || loading.value) {
    return
  }
  if ((!v || v?.length < 2) && !props.iniData) {
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
  (props.iniData || !props.autoSearch) && prepare()
})
</script>
<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
