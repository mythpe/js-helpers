<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts">

import { QTable, QTableProps } from 'quasar'
import { computed, nextTick, onMounted, PropType, reactive, ref } from 'vue'
import { ApiServiceParams, FetchRowsArgs, MDatatableFilterForm, MDatatableMetaServer, MDatatableOptions, MDatatablePagination, MDtApiService, MDtItem } from './m-datatable'
import { useMyTh } from '../../vue3'
import _ from 'lodash'

export const initPaginationOptions: MDatatablePagination = {
  sortBy: undefined,
  descending: undefined,
  page: 1,
  rowsPerPage: 50,
  rowsNumber: 0
}
export const initTableOptions = {
  loading: !1,
  selected: [],
  search: null,
  filter: {},
  tempFilter: {}
}
export const initMetaServer: MDatatableMetaServer = {
  current_page: null,
  last_page: null,
  total: null
}

const p = QTable.props
// const _p : MDataTableProps = {
//
// }
export default {
  name: 'MDatatable',
  inheritAttrs: !1,
  props: {
    ...p,
    headers: {
      type: Array as PropType<string[] | Partial<QTableProps['columns']>[] | (string & QTableProps['columns'])[]>,
      default: undefined
    },
    rows: {
      type: Array,
      default: undefined
    },
    serviceName: {
      type: [String, Function as PropType<() => Record<string, any>>],
      default: () => ''
    },
    requestParams: {
      type: [Function, Object],
      default: () => undefined
    },
    withIndex: {
      type: [String, Array],
      default: undefined
    },
    withStore: {
      type: [String, Array],
      default: undefined
    },
    withShow: {
      type: [String, Array],
      default: undefined
    },
    withUpdate: {
      type: [String, Array],
      default: undefined
    }
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setup (props) {
    const myth = useMyTh()
    const headersProp = computed(() => props.headers)
    const getColumns = computed<QTableProps['columns'][]>(() => myth.parseHeaders(headersProp.value) ?? [])
    // const getColumns = ref([])
    const getRows = ref<MDtItem[]>([])

    /**
     * Table
     */
    const selected = ref<MDtItem[]>([])
    const meta = ref<MDatatableMetaServer>({ ...initMetaServer })
    const pagination = ref<MDatatablePagination>({ ...initPaginationOptions })
    const search = ref<string | null>(null)
    const loading = ref<boolean>(!1)
    const filterForm = ref<MDatatableFilterForm>({})
    const tempFilterForm = ref<MDatatableFilterForm>({})

    const tableOptions = reactive<MDatatableOptions>({
      search,
      loading,
      pagination,
      meta,
      filter: filterForm,
      tempFilter: tempFilterForm,
      selected
    })
    /**
     * Helpers
     */
    const getApiServices = (): MDtApiService => {
      if (typeof props.serviceName === 'function') {
        return props.serviceName()
      }
      return myth.api.services[props.serviceName]
    }
    const getDatatableParams = ({ pagination, filter }: FetchRowsArgs = {}): ApiServiceParams => {
      let params: ApiServiceParams = {
        filter: tableOptions.filter,
        search: filter || null,
        headers: getColumns.value.map((e: any) => e.name),
        ids: tableOptions.selected.map((e: any) => e.id),
        indexType: 'index',
        requestWith: undefined,
        itemsPerPage: pagination?.rowsPerPage === 0 ? -1 : (pagination?.rowsPerPage !== undefined ? pagination?.rowsPerPage : 0),
        page: pagination?.page !== undefined ? pagination.page : 0,
        sortBy: pagination?.sortBy !== undefined ? pagination.sortBy : undefined,
        sortDesc: !pagination?.sortBy ? undefined : (pagination?.descending === !0 ? 1 : (pagination?.descending === !1 ? 0 : undefined))
      }
      if (props.requestParams) {
        if (typeof props.requestParams === 'function') {
          params = props.requestParams(params)
        } else {
          params = {
            ...params,
            ...props.requestParams
          }
        }
      }
      return params
    }
    const getRequestWith = (type: 'withIndex' | 'withShow' | 'withUpdate' | 'withStore') => {
      let v: any = []
      const params: { [k: number | string]: number } | (() => (string[] | string)) | string | undefined = props[type]
      if (params) {
        if (typeof params === 'string') {
          v = params.split(',')
        }

        if (_.isArray(params)) {
          v = [...params]
        } else if (_.isObject(params) && typeof params !== 'function') {
          for (const k in params) {
            v.push(`${k}=${params[k]}`)
          }
        } else if (_.isFunction(params)) {
          const f = params()
          v = typeof f === 'string' ? f.split(',') : f
        }
      }
      return v.join(',') ?? null
    }

    /**
     * Methods
     */
    const tableErrorNotAuth = () => {
      //
    }
    const refreshNoUpdate = (done?: () => void) => {
      (async () => {
        meta.value = { ...initMetaServer }
        pagination.value.page = 1
        pagination.value.rowsNumber = 0
        getRows.value = []
        // if (dialogs.value.filter) {
        //   dialogs.value.filter = !1
        // }
        nextTick(() => {
          fetchDatatableItems({
            pagination: pagination.value,
            filter: tableOptions.search
          })
          if (done) {
            done()
          }
          // emit('refresh')
        })
      })()
    }
    const refresh = (done?: () => void) => {
      return refreshNoUpdate(done)
    }
    const fetchDatatableItems = async (opts: FetchRowsArgs = {}) => {
      if (props.endReach && tableOptions.meta.last_page && tableOptions.pagination.page >= tableOptions.meta.last_page) {
        return
      }
      if (tableOptions.loading || !props.serviceName) return
      tableOptions.loading = !0
      nextTick(async () => {
        const params = getDatatableParams(opts)
        const requestWith = getRequestWith('withIndex')
        if (requestWith) {
          params.requestWith = requestWith
        }
        try {
          const { _data, _meta } = await getApiServices().index({ params })
          pagination.value = {
            page: parseInt(_meta?.current_page) || 1,
            rowsPerPage: parseInt(_meta?.per_page) || 0,
            rowsNumber: parseInt(_meta?.total) || 0,
            sortBy: opts?.pagination?.sortBy,
            descending: opts?.pagination?.descending
          }
          _meta && (meta.value = _meta)
          if (props.endReach) {
            getRows.value = [...getRows.value, ...(_data || [])]
          } else {
            getRows.value = _data || []
          }
        } catch (e: any) {
          // console.log(e)
          if (e?.response?.status === 401) {
            tableErrorNotAuth()
            return e
          }
          if (e?._message) {
            myth.alertError(e._message)
          } else if (e?.message) {
            myth.alertError(e.message)
          }
        } finally {
          tableOptions.loading = !1
        }
      })
    }
    onMounted(() => {
      refresh()
    })
    return {
      selected,
      fetchDatatableItems,
      tableOptions,
      getColumns,
      getRows
    }
  }
}
</script>

<template>
  <div class="m--datatable-component">
    <q-pull-to-refresh>
      <q-table
        ref="table"
        selection="multiple"
        v-model:pagination="tableOptions.pagination"
        v-model:selected="tableOptions.selected"
        :class="{'m--datatable': !0,'m--datatable-grid' : $q.screen.lt.md}"
        card-container-class="m--datatable-container"
        table-class="m--datatable-container"
        v-bind="$attrs"
        :loading="tableOptions.loading"
        :columns="getColumns"
        :rows="getRows"
        :filter="tableOptions.search"
        @request="fetchDatatableItems"
      >
        <!--<template #top-right>-->
        <!--  <MRow-->
        <!--    :style="`min-width: ${$q.screen.lt.md ? '100%' : parseInt($q.screen.width/2) + 'px'}`"-->
        <!--    class="justify-between"-->
        <!--  >-->
        <!--    <MInput-->
        <!--      v-if="search"-->
        <!--      v-model="tableOptions.search"-->
        <!--      :debounce="searchDebounce"-->
        <!--      autocomplete="none"-->
        <!--      class="self-start"-->
        <!--      clearable-->
        <!--      clear-icon="clear"-->
        <!--      col="12"-->
        <!--      dense-->
        <!--      input-style="min-width: 220px"-->
        <!--      name="search"-->
        <!--      placeholder="datatable.search_input"-->
        <!--      sm="9"-->
        <!--      standout="bg-primary"-->
        <!--      v-bind="{...(defSearchInputProps||{}),...(searchInputProps||{})}"-->
        <!--    >-->
        <!--      <template #prepend>-->
        <!--        <q-icon name="search" />-->
        <!--      </template>-->
        <!--    </MInput>-->
        <!--    <MCol-->
        <!--      col="12"-->
        <!--      sm="auto"-->
        <!--    >-->
        <!--      <MBtn-->
        <!--        v-if="hasMenu"-->
        <!--        color="blue-grey"-->
        <!--        flat-->
        <!--        icon="o_more_vert"-->
        <!--        round-->
        <!--      >-->
        <!--        <q-tooltip v-if="$q.screen.gt.sm">-->
        <!--          {{ $t('more') }}-->
        <!--        </q-tooltip>-->
        <!--        <q-menu square>-->
        <!--          <q-list style="min-width: 250px">-->
        <!--            <template v-if="hasAddBtn">-->
        <!--              <q-item-->
        <!--                v-close-popup-->
        <!--                clickable-->
        <!--                @click="openCreateDialog()"-->
        <!--              >-->
        <!--                <q-item-section thumbnail>-->
        <!--                  <q-icon-->
        <!--                    color="primary"-->
        <!--                    name="add"-->
        <!--                    right-->
        <!--                    size="xs"-->
        <!--                  />-->
        <!--                </q-item-section>-->
        <!--                <q-item-section>-->
        <!--                  <span> {{ getFormTitle }}</span>-->
        <!--                </q-item-section>-->
        <!--              </q-item>-->
        <!--              <q-separator />-->
        <!--            </template>-->
        <!--            <template v-if="hasFilterDialog">-->
        <!--              <q-item-->
        <!--                v-close-popup-->
        <!--                clickable-->
        <!--                @click="openFilterDialog()"-->
        <!--              >-->
        <!--                <q-item-section thumbnail>-->
        <!--                  <q-icon-->
        <!--                    color="blue"-->
        <!--                    name="filter_alt"-->
        <!--                    right-->
        <!--                    size="xs"-->
        <!--                  />-->
        <!--                </q-item-section>-->
        <!--                <q-item-section>-->
        <!--                  <span>-->
        <!--                    {{ $t('filter') }}-->
        <!--                  </span>-->
        <!--                </q-item-section>-->
        <!--              </q-item>-->
        <!--            </template>-->
        <!--            <template v-if="pdf">-->
        <!--              <q-item-->
        <!--                v-close-popup-->
        <!--                clickable-->
        <!--                @click="exportData('pdf')"-->
        <!--              >-->
        <!--                <q-item-section thumbnail>-->
        <!--                  <q-icon-->
        <!--                    color="red"-->
        <!--                    name="fa-solid fa-file-pdf"-->
        <!--                    right-->
        <!--                    size="xs"-->
        <!--                  />-->
        <!--                </q-item-section>-->
        <!--                <q-item-section>-->
        <!--                  <span>-->
        <!--                    {{ $t('export_pdf') }}-->
        <!--                    <q-badge-->
        <!--                      v-if="tableOptions.selected.length>0"-->
        <!--                      :label="tableOptions.selected.length"-->
        <!--                      align="top"-->
        <!--                      rounded-->
        <!--                    />-->
        <!--                  </span>-->
        <!--                </q-item-section>-->
        <!--              </q-item>-->
        <!--            </template>-->
        <!--            <template v-if="excel">-->
        <!--              <q-item-->
        <!--                v-close-popup-->
        <!--                clickable-->
        <!--                @click="exportData('excel')"-->
        <!--              >-->
        <!--                <q-item-section thumbnail>-->
        <!--                  <q-icon-->
        <!--                    color="green"-->
        <!--                    name="fa-solid fa-file-excel"-->
        <!--                    right-->
        <!--                    size="xs"-->
        <!--                  />-->
        <!--                </q-item-section>-->
        <!--                <q-item-section>-->
        <!--                  <span>-->
        <!--                    {{ $t('export_excel') }}-->
        <!--                    <q-badge-->
        <!--                      v-if="tableOptions.selected.length>0"-->
        <!--                      :label="tableOptions.selected.length"-->
        <!--                      align="top"-->
        <!--                      rounded-->
        <!--                    />-->
        <!--                  </span>-->
        <!--                </q-item-section>-->
        <!--              </q-item>-->
        <!--            </template>-->
        <!--          </q-list>-->
        <!--        </q-menu>-->
        <!--      </MBtn>-->
        <!--      <MDtBtn-->
        <!--        :disable="tableOptions.loading"-->
        <!--        flat-->
        <!--        round-->
        <!--        icon="o_refresh"-->
        <!--        @click="refreshNoUpdate()"-->
        <!--      />-->
        <!--    </MCol>-->
        <!--    <q-slide-transition>-->
        <!--      <MCol-->
        <!--        v-if="Object.values(tableOptions.filter).filter(e => Boolean(e)).length > 0"-->
        <!--        col="12"-->
        <!--      >-->
        <!--        <MRow class="items-center">-->
        <!--          <MCol col="auto">-->
        <!--            <span class="text-subtitle1 q-mr-sm">{{ $t('datatable.filtered_by') }}</span>-->
        <!--          </MCol>-->
        <!--          <template-->
        <!--            v-for="(filterValue,filterKey) in tableOptions.filter"-->
        <!--            :key="`filter-${filterKey}`"-->
        <!--          >-->
        <!--            <MCol-->
        <!--              v-if="Boolean(filterValue)"-->
        <!--              col="auto"-->
        <!--            >-->
        <!--              <q-chip-->
        <!--                :label="$t(`attributes.${filterKey}`) ?? filterKey"-->
        <!--                clickable-->
        <!--                color="primary"-->
        <!--                outline-->
        <!--                removable-->
        <!--                @click="openFilterDialog"-->
        <!--                @remove="onRemoveFilter(filterKey)"-->
        <!--              >-->
        <!--                <span-->
        <!--                  v-if="typeof filterValue === 'string'"-->
        <!--                  class="q-ml-sm"-->
        <!--                >{{ filterValue }}</span>-->
        <!--              </q-chip>-->
        <!--            </MCol>-->
        <!--          </template>-->
        <!--        </MRow>-->
        <!--      </MCol>-->
        <!--    </q-slide-transition>-->
        <!--    <MCol-->
        <!--      v-if="$slots['top-right']"-->
        <!--      col="12"-->
        <!--    >-->
        <!--      <slot-->
        <!--        name="top-right"-->
        <!--        v-bind="{tableOptions,paginationOptions}"-->
        <!--      />-->
        <!--    </MCol>-->
        <!--  </MRow>-->
        <!--</template>-->
        <!--<template #top-selection>-->
        <!--  <div class="row items-center q-gutter-xs order-last order-sm-first">-->
        <!--    <slot-->
        <!--      name="tools"-->
        <!--      v-bind="{dt:datatableItemsScope}"-->
        <!--    >-->
        <!--      <MDtBtn-->
        <!--        v-if="hasUpdateBtn"-->
        <!--        :disable="!isSingleSelectedItem || tableOptions.loading"-->
        <!--        :loading="tableOptions.loading"-->
        <!--        :tooltip="$t('update')"-->
        <!--        icon="o_edit"-->
        <!--        flat-->
        <!--        round-->
        <!--        fab-mini-->
        <!--        @click="openUpdateDialog(tableOptions.selected[0])"-->
        <!--      />-->
        <!--      <MDtBtn-->
        <!--        v-if="hasShowBtn"-->
        <!--        :disable="!isSingleSelectedItem || tableOptions.loading"-->
        <!--        :loading="tableOptions.loading"-->
        <!--        :tooltip="$t('show')"-->
        <!--        icon="o_visibility"-->
        <!--        flat-->
        <!--        round-->
        <!--        fab-mini-->
        <!--        @click="openShowDialog(tableOptions.selected[0])"-->
        <!--      />-->
        <!--      <MDtBtn-->
        <!--        v-if="hasDestroyBtn"-->
        <!--        :disable="!hasSelectedItem || tableOptions.loading"-->
        <!--        :loading="tableOptions.loading"-->
        <!--        :tooltip="$t('destroy')"-->
        <!--        icon="delete_outline"-->
        <!--        flat-->
        <!--        round-->
        <!--        fab-mini-->
        <!--        @click="deleteSelectionItem()"-->
        <!--      />-->
        <!--    </slot>-->
        <!--    <slot-->
        <!--      name="selection"-->
        <!--      v-bind="{dt:datatableItemsScope}"-->
        <!--    />-->
        <!--  </div>-->
        <!--</template>-->
        <!--<template-->
        <!--  v-if="endReach"-->
        <!--  #bottom-->
        <!--&gt;-->
        <!--  <q-space />-->
        <!--  <div v-text="$t('replace.from_name', { from: paginationOptions.rowsNumber, name: rows.length })" />-->
        <!--</template>-->
        <!--<template-->
        <!--  v-for="(slotVal,slotName) in $slots"-->
        <!--  :key="slotName"-->
        <!--  #[slotName]="inputSlot"-->
        <!--&gt;-->
        <!--  <slot-->
        <!--    v-if="inputSlot"-->
        <!--    :name="slotName"-->
        <!--    v-bind="{...inputSlot,dt:datatableItemsScope}"-->
        <!--  />-->
        <!--  <slot-->
        <!--    v-else-if="slotName !== 'default'"-->
        <!--    :name="slotName"-->
        <!--  />-->
        <!--</template>-->
      </q-table>
      <slot />
    </q-pull-to-refresh>
  </div>
</template>

<style lang="sass">
.touch
  .m--datatable-fab-tooltip
    display: none

.body--light
  .m--datatable
    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th
      background: #fff

.body--dark
  .m--datatable
    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th
      background: var(--q-dark-page)

.m--datatable:not(.m--datatable-grid)
  max-height: 700px

  thead tr th
    position: sticky
    z-index: 1

  thead tr:first-child th
    top: 0

.m--datatable:not(.m--datatable-grid).q-table--dense
  &.q-table--loading thead tr:last-child th
    top: 26px

.m--datatable:not(.m--datatable-grid):not(.q-table--dense)
  &.q-table--loading thead tr:last-child th
    top: 49px

.m--dialog-card
  .q-card__actions
    .q-btn
      padding: 4px 16px !important

</style>
