<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <q-pull-to-refresh
    v-bind="$attrs"
    @refresh="onRefresh"
  >
    <MRow class="items-center justify-between">
      <div
        class="text-h4"
      >
        <q-skeleton
          v-if="fetching && searchValue"
          width="250px"
        />
        <span v-else>
          {{ title }}
        </span>
      </div>
      <MInput
        v-model="searchValue"
        autocomplete="none"
        autofocus
        dense
        clearable
        outlined

        clear-icon="clear"
        col="12"
        debounce="600"
        md="6"
        name="search"
        placeholder="myth.datatable.searchInput"
        v-bind="$myth.options.dt?.searchInput"
      >
        <template #prepend>
          <q-icon
            v-if="!searchValue"
            name="search"
            color="primary"
          >
            <q-tooltip>
              {{ $t('myth.datatable.searchInput') }}
            </q-tooltip>
          </q-icon>
          <q-icon
            v-else
            color="primary"
            class="cursor-pointer"
            name="clear"
            @click="searchValue = ''"
          >
            <q-tooltip>
              {{ $t('myth.datatable.searchInputClear') }}
            </q-tooltip>
          </q-icon>
        </template>
      </MInput>
    </MRow>
    <slot
      name="top"
      :models="models"
      :filter="filter"
      :search="search"
    />
    <q-infinite-scroll
      :disable="!canLoadMore"
      :offset="250"
      class="q-mt-sm"
      @load="onLoad"
    >
      <MRow>
        <MCol
          v-for="(item, index) in models"
          :key="`item-list-${index}`"
          :auto="auto"
          :col="col"
          :xl="xl"
          :lg="lg"
          :md="md"
          :sm="sm"
          :xs="xs"
        >
          <slot
            name="item"
            :item="item"
            :index="index"
            :models="models"
            :filter="filter"
            :search="search"
          >
            <q-item>
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </slot>
        </MCol>
      </MRow>
      <template #loading>
        <slot
          name="loading"
          :models="models"
          :filter="filter"
          :search="search"
        >
          <MRow class="q-my-md justify-center">
            <q-spinner-dots
              color="primary"
              size="40px"
            />
          </MRow>
        </slot>
      </template>
    </q-infinite-scroll>
    <MRow
      v-if="!fetching && models.length < 1"
      class="q-mt-lg"
    >
      <MCol
        v-if="searchValue && searchValue?.length > 0"
        col="12"
      >
        <div class="text-h6 text-center q-gutter-md">
          <slot
            name="noResult"
            :models="models"
            :filter="filter"
            :search="search"
          >
            <div v-text="parseAttribute('myth.select.noResult')" />
            <MNoResultImg />
          </slot>
        </div>
      </MCol>
      <MCol
        v-else
        col="12"
      >
        <slot
          name="noData"
          :models="models"
          :filter="filter"
          :search="search"
        >
          <div class="text-h6 text-center q-gutter-md">
            <div v-text="$t('myth.select.noData')" />
            <MNoResultImg />
          </div>
        </slot>
      </MCol>
    </MRow>
  </q-pull-to-refresh>
</template>

<script lang="ts" setup>

import { computed, defineEmits, nextTick, ref, watch } from 'vue'
import { useModels } from '../../composition'
import { AxiosDataRow } from '../../types'
import MNoResultImg from './MNoResultImg.vue'
import { MListProps } from './models'

interface Props {
  auto?: MListProps['auto'];
  col?: MListProps['col'];
  xs?: MListProps['xs'];
  sm?: MListProps['sm'];
  md?: MListProps['md'];
  lg?: MListProps['lg'];
  xl?: MListProps['xl'];
  name: MListProps['name'];
  title?: MListProps['title'];
  options?: MListProps['options'];
  search?: MListProps['search'];
  filter?: MListProps['filter'];
  axiosConfig?: MListProps['axiosConfig'];
  backRoute?: boolean | null | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  auto: undefined,
  col: () => '12',
  xl: undefined,
  lg: undefined,
  md: () => '4',
  sm: () => '6',
  xs: undefined,
  name: undefined,
  title: undefined,
  backRoute: undefined,
  options: () => ({}),
  search: undefined,
  filter: undefined,
  axiosConfig: undefined
})

interface Emits {
  (e: 'update:models', value: AxiosDataRow[]): void;

  (e: 'update:search', value: string | null): void;
}

const emit = defineEmits<Emits>()
const searchModel = ref('')
const searchValue = computed({
  get: () => searchModel.value,
  set: v => {
    searchModel.value = v
    nextTick(() => {
      emit('update:search', v)
    })
  }
})

const getFilter = computed(() => props.filter)
const getOptions = computed(() => props.options)
const axiosConfigProps = computed<MListProps['axiosConfig']>(() => props.axiosConfig)
const nameProp = computed(() => props.name)
const {
  models,
  meta,
  fetch,
  beginningFetch,
  fetching,
  fetched,
  canLoadMore,
  reset,
  nextPage,
  prevPage,
  onRefresh,
  onSearch,
  onLoad,
  removeItem
} = useModels<AxiosDataRow>(nameProp.value, getOptions.value, searchModel, getFilter, axiosConfigProps.value)

watch(() => models.value, v => {
  emit('update:models', v)
})
watch(() => searchValue.value, v => {
  onSearch()
  nextTick(() => {
    emit('update:search', v)
  })
})

defineExpose({
  models,
  meta,
  fetch,
  beginningFetch,
  fetching,
  fetched,
  canLoadMore,
  reset,
  nextPage,
  prevPage,
  onRefresh,
  onSearch,
  onLoad,
  removeItem
})
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>

<style lang="sass">

</style>
