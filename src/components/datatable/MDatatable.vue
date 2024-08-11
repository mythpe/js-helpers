<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { computed, defineEmits, nextTick, onMounted, reactive, ref, toRef, useSlots, watch } from 'vue'
import { is as quasarHelpers, QTable, QTableSlots, useQuasar } from 'quasar'
import lodash from 'lodash'
import { useRoute, useRouter } from 'vue-router'
import {
  ApiServiceParams,
  FetchRowsArgs,
  MDatatableDialogsOptions,
  MDatatableFilterForm,
  MDatatableMetaServer,
  MDatatableOptions,
  MDatatablePagination,
  MDatatableProps,
  MDatatableScope,
  MDtExportOptions,
  MDtItem,
  MDtItemIndex,
  MDtMythApiServicesSchema
} from './models'
import { useMyth } from '../../vue3'
import MDtContextmenuItems from './MDtContextmenuItems.vue'
import MDtBtn from './MDtBtn.vue'
import { AxiosRequestConfig } from 'axios'

const initPaginationOptions: MDatatablePagination = {
  sortBy: undefined,
  descending: undefined,
  page: 1,
  rowsPerPage: 50,
  rowsNumber: 0
}
const initMetaServer: MDatatableMetaServer = {
  current_page: null,
  last_page: null,
  total: null
}

interface Props {
  controlKey?: MDatatableProps['controlKey'];
  defaultItem?: MDatatableProps['defaultItem'];
  contextItems?: MDatatableProps['contextItems'];
  hideAutoMessage?: MDatatableProps['hideAutoMessage'];
  headers: MDatatableProps['headers'];
  serviceName?: MDatatableProps['serviceName'];
  requestParams?: MDatatableProps['requestParams'];
  pdf?: MDatatableProps['pdf'];
  excel?: MDatatableProps['excel'];
  exportUrl?: MDatatableProps['exportUrl'];
  hideSearch?: MDatatableProps['hideSearch'];
  searchDebounce?: MDatatableProps['searchDebounce'];
  withIndex?: MDatatableProps['withIndex'];
  withStore?: MDatatableProps['withStore'];
  withShow?: MDatatableProps['withShow'];
  withUpdate?: MDatatableProps['withUpdate'];
  hideAddBtn?: MDatatableProps['hideAddBtn'];
  hideUpdateBtn?: MDatatableProps['hideUpdateBtn'];
  hideShowBtn?: MDatatableProps['hideShowBtn'];
  hideDestroyBtn?: MDatatableProps['hideDestroyBtn'];
  storeRoute?: MDatatableProps['storeRoute'];
  storeQueryParams?: MDatatableProps['storeQueryParams'];
  updateRoute?: MDatatableProps['updateRoute'];
  updateQueryParams?: MDatatableProps['updateQueryParams'];
  showRoute?: MDatatableProps['showRoute'];
  showQueryParams?: MDatatableProps['showQueryParams'];
  mouse?: MDatatableProps['mouse'];
  noRefreshBtn?: MDatatableProps['noRefreshBtn'];
  endReach?: MDatatableProps['endReach'];
  showSelection?: MDatatableProps['showSelection'];
  hideSelection?: MDatatableProps['hideSelection'];
  multiSelection?: MDatatableProps['multiSelection'];
  multiDestroy?: MDatatableProps['multiDestroy'];
  rowsPerPageOptions?: MDatatableProps['rowsPerPageOptions'];
  ignoreKeys?: MDatatableProps['ignoreKeys'];
  grid?: MDatatableProps['grid'];
  title?: MDatatableProps['title'];
  manageColumns?: MDatatableProps['manageColumns'];
  visibleColumns?: MDatatableProps['visibleColumns'];
  searchColumns?: MDatatableProps['searchColumns'];
  noAddBtnTop?: MDatatableProps['noAddBtnTop'];
  noAddBtnList?: MDatatableProps['noAddBtnList'];
  noAddBtnFab?: MDatatableProps['noAddBtnFab'];
  noFullscreen?: MDatatableProps['noFullscreen'];
  noBodyControl?: MDatatableProps['noBodyControl'];
  formModel?: MDatatableProps['formModel'];
  showCardControlHeader?: MDatatableProps['showCardControlHeader'];
  dense?: MDatatableProps['dense'];
  bordered?: MDatatableProps['bordered'];
  flat?: MDatatableProps['flat'];
  rows?: MDatatableProps['rows'];
  fixed?: MDatatableProps['fixed'];
  imageColumns?: MDatatableProps['imageColumns'];
  imageMode?: MDatatableProps['imageMode'];
  imageSize?: MDatatableProps['imageSize'];
}

const props = withDefaults(defineProps<Props>(), {
  rows: undefined,
  controlKey: () => 'control',
  defaultItem: undefined,
  contextItems: undefined,
  hideAutoMessage: undefined,
  headers: () => ([]),
  serviceName: () => '',
  requestParams: undefined,
  pdf: undefined,
  excel: undefined,
  exportUrl: undefined,
  hideSearch: undefined,
  searchDebounce: () => 600,
  withIndex: undefined,
  withStore: undefined,
  withShow: undefined,
  withUpdate: undefined,
  hideAddBtn: undefined,
  hideUpdateBtn: undefined,
  hideShowBtn: undefined,
  hideDestroyBtn: undefined,
  storeRoute: undefined,
  storeQueryParams: undefined,
  updateRoute: undefined,
  updateQueryParams: undefined,
  showRoute: undefined,
  showQueryParams: undefined,
  mouse: undefined,
  noRefreshBtn: undefined,
  endReach: undefined,
  showSelection: undefined,
  hideSelection: undefined,
  multiSelection: undefined,
  multiDestroy: undefined,
  rowsPerPageOptions: () => [50, 250, 500, 0],
  ignoreKeys: undefined,
  grid: undefined,
  title: undefined,
  manageColumns: undefined,
  visibleColumns: undefined,
  searchColumns: undefined,
  noAddBtnTop: undefined,
  noAddBtnList: undefined,
  noAddBtnFab: undefined,
  noFullscreen: undefined,
  noBodyControl: undefined,
  formModel: undefined,
  showCardControlHeader: undefined,
  dense: undefined,
  bordered: undefined,
  flat: undefined,
  fixed: undefined,
  imageColumns: () => ([]),
  imageMode: () => 'image',
  imageSize: () => '35px'
})

interface Emits {
  (e: 'update:rows', value: any): void
}

const emit = defineEmits<Emits>()

const myth = useMyth()
const { __ } = myth
const slots = useSlots()
const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const serviceName = computed(() => props.serviceName)
const exportToBlob = computed(() => {
  if (props.exportUrl === undefined && myth.options.dt?.props?.exportUrl === undefined) {
    return !0
  }
  const t = props.exportUrl === undefined ? myth.options.dt?.props?.exportUrl : props.exportUrl
  if (t !== undefined) {
    if (t.toString() === 'true' || t.toString() === '') {
      return !1
    }
    if (t.toString() === 'pdf') {
      return 'excel'
    }
    if (t.toString() === 'excel') {
      return 'pdf'
    }
  }
  return !0
})
// Prevent user from back
/* router.beforeResolve(() => {
  if (dialogs.filter) {
    closeFilterDialog()
    return !1
  } else if (dialogs.show) {
    closeShowDialog()
    return !1
  } else if (dialogs.form) {
    closeFormDialog()
    return !1
  }
  return !hasAction.value
}) */
const getRows = ref<MDtItem[]>([])
watch(() => getRows.value, (v) => emit('update:rows', v))
const filterDialogModel = ref(!1)
const showDialogModel = ref(!1)
const formDialogModel = ref(!1)
const isUpdateDialog = ref(!1)
const dialogItem = ref<MDtItem | undefined>(undefined)
const dialogItemIndex = ref<MDtItemIndex | undefined>()
const dialogErrors = ref<any>({})
const dialogs = reactive<MDatatableDialogsOptions>({
  filter: filterDialogModel,
  show: showDialogModel,
  form: formDialogModel,
  isUpdate: isUpdateDialog,
  item: dialogItem,
  index: dialogItemIndex,
  errors: dialogErrors
})
const resetDialogs = () => {
  dialogs.filter = !1
  dialogs.show = !1
  dialogs.form = !1
  dialogs.isUpdate = !1
  dialogs.item = undefined
  dialogs.index = undefined
  dialogs.errors = {}
}

/** Table */

/** --- */
const headersProp = computed(() => props.headers)
const getHeaders = computed<any[]>(() => myth.parseHeaders(headersProp.value, reactive({ noSort: props.imageColumns })) || [])
const visibleColumnsProp = computed(() => props.visibleColumns)
const visibleHeaders = ref(myth.parseHeaders(visibleColumnsProp.value || headersProp.value).map(e => e.name))
/** --- */

const selected = ref<MDtItem[]>([])
const meta = ref<MDatatableMetaServer>({ ...initMetaServer })
const pagination = ref<MDatatablePagination>({ ...initPaginationOptions })
const search = ref<string | null>(null)
const searchColumnsProp = computed(() => props.searchColumns)
const searchColumnsRef = ref<string[]>(myth.parseHeaders(searchColumnsProp.value || headersProp.value).filter(e => e?.field !== props.controlKey).map(
  e => e.name))
const searchPlaceholder = computed<string>(() => {
  if (searchColumnsRef.value.length > 0) {
    return __('myth.datatable.searchInputPlaceholder',
      { v: getHeaders.value.filter(e => e?.field !== props.controlKey && searchColumnsRef.value.indexOf(e.name) !== -1).map(e => e.label).join(', ') })
  }
  return 'myth.datatable.searchInput'
})
const loading = ref<boolean>(!1)
const filterForm = ref<MDatatableFilterForm>({})
const tempFilterForm = ref<MDatatableFilterForm>({})
const hasAction = ref<boolean>(!1)
const fullscreen = ref(!1)
const tableOptions = reactive<MDatatableOptions>({
  search,
  loading,
  pagination,
  meta,
  filter: filterForm,
  tempFilter: tempFilterForm,
  selected,
  hasAction,
  fullscreen
})
/** Table */

/** --- */

const hasAddBtn = computed<boolean>(() => {
  if (props.hideAddBtn) {
    return !1
  }
  return Boolean(slots.form) || Boolean(props.storeRoute)
})
const hasUpdateBtn = computed<boolean>(() => {
  if (props.hideUpdateBtn) {
    return !1
  }
  return Boolean(slots.form) || Boolean(props.updateRoute)
})
const hasShowBtn = computed<boolean>(() => {
  if (props.hideShowBtn) {
    return !1
  }
  return Boolean(slots.show) || Boolean(props.showRoute)
})
const hasDestroyBtn = computed<boolean>(() => !props.hideDestroyBtn)
const hasFilterDialog = computed<boolean>(() => slots.filter !== undefined)
const hasMenu = computed<boolean>(() => (Boolean(props.pdf) || Boolean(props.excel) || hasFilterDialog.value || hasAddBtn.value))

const isUpdateMode = ref<boolean>(!1)
const formMode = computed<'update' | 'store'>(() => isUpdateMode.value ? 'update' : 'store')
const isSingleSelectedItem = computed<boolean>(() => tableOptions.selected.length === 1)
const firstSelectedItem = computed<MDtItem>(() => tableOptions.selected[0])
const hasSelectedItem = computed<boolean>(() => tableOptions.selected.length > 0)

/* Titles */
const getShowTitle = computed(() => {
  if (serviceName.value && typeof serviceName.value !== 'function') {
    const c = myth.str.pascalCase(myth.str.pluralize(serviceName.value.split('/').pop()))
    return __('replace.show_details', { name: __(`choice.${c}`, 1) })
  }
  return __('show_details')
})
const getFormTitle = computed(() => {
  const name = serviceName.value && typeof serviceName.value !== 'function' ? __(`choice.${myth.str.pascalCase(myth.str.pluralize(serviceName.value.split(
    '/').pop()))}`, 1) : ''
  return __(`replace.${formMode.value}`, { name })
})
const defaultItem = computed(() => props.defaultItem)
const isGrid = computed(() => {
  if (props.grid !== undefined) {
    return props.grid
  }
  return $q.screen.lt.md
})
/* Titles */

/** Methods */
const getMythApiServicesSchema = (): MDtMythApiServicesSchema => {
  if (typeof serviceName.value === 'function') {
    return serviceName.value() as MDtMythApiServicesSchema
  }
  const c = myth.services[serviceName.value]
  if (!c) {
    throw Error(`No Service: ${serviceName.value}`)
  }
  return c
}
const updateSelectedItems = (selected: MDtItem[]) => {
  tableOptions.selected = selected
}
const onScroll = ({ index, to }: any) => {
  if (index && to && index === to) {
    loadMore()
  }
}
const loadMore = () => {
  nextTick(() => {
    fetchDatatableItems({
      pagination: {
        ...tableOptions.pagination,
        page: (tableOptions.pagination.page ?? 0) + 1
      },
      filter: tableOptions.search
    })
  })
}
const refreshNoUpdate = (done?: () => void) => {
  if (contextmenu.value) {
    contextmenu.value = !1
  }
  meta.value = { ...initMetaServer }
  pagination.value.page = 1
  pagination.value.rowsNumber = 0
  getRows.value = []
  nextTick(() => {
    fetchDatatableItems({
      pagination: pagination.value,
      filter: tableOptions.search
    })
    if (done) {
      done()
    }
  })
}
const refresh = (done?: () => void) => {
  return refreshNoUpdate(done)
}
const getRequestWith = (type: 'withIndex' | 'withShow' | 'withUpdate' | 'withStore'): string | null => {
  let v: any = []
  const params: { [k: string]: string } & string | (() => string | object) = props[type] as any
  if (params) {
    if (typeof params === 'string') {
      v = params.split(',')
    }

    if (lodash.isArray(params)) {
      v = [...params]
    } else if (lodash.isObject(params) && typeof params !== 'function') {
      let e
      for (const k in params) {
        e = params[k]
        v.push(`${k}=${e}`)
      }
    } else if (lodash.isFunction(params)) {
      const f = params()
      v = typeof f === 'string' ? f.split(',') : f
    }
  }
  return v.join(',') ?? null
}
const getDatatableParams = ({ pagination, filter }: FetchRowsArgs = {}, merge: Partial<ApiServiceParams> = {}): ApiServiceParams => {
  let params: ApiServiceParams = {
    // filter: tableOptions.filter,
    // search: filter || undefined,
    headerItems: getHeaders.value.map((e: any) => e.name).join(','),
    // headers: ['name'],
    // ids: tableOptions.selected.map((e: any) => e.id),
    indexType: 'index',
    fdt: 'i',
    itemsPerPage: pagination?.rowsPerPage === 0 ? -1 : (pagination?.rowsPerPage !== undefined ? pagination?.rowsPerPage : 0),
    page: pagination?.page !== undefined ? pagination.page : 0,
    sortBy: pagination?.sortBy !== undefined ? pagination.sortBy : undefined,
    sortDesc: !pagination?.sortBy ? undefined : (pagination?.descending === !0 ? 1 : (pagination?.descending === !1 ? 0 : undefined))
  }
  if (filter) {
    params.search = filter
  }
  if (Object.keys(tableOptions.filter).length > 0) {
    const TempFilter = { ...tableOptions.filter } as any
    for (const fKey in TempFilter) {
      if (lodash.isArray(TempFilter[fKey])) {
        TempFilter[fKey] = TempFilter[fKey].map((elm: any) => {
          if (elm.id) {
            return elm.id
          } else if (elm.value) {
            return elm.value
          }
          return elm
        })
      } else if (lodash.isPlainObject(TempFilter[fKey])) {
        if (TempFilter[fKey].id) {
          TempFilter[fKey] = TempFilter[fKey].id
        } else if (TempFilter[fKey].value) {
          TempFilter[fKey] = TempFilter[fKey].value
        }
      }
    }
    // console.log(JSON.stringify(tableOptions.filter))
    // params.filter = tableOptions.filter
    // console.log(TempFilter)
    params.filter = TempFilter
  }
  if (searchColumnsRef.value.length > 0) {
    params.searchColumns = searchColumnsRef.value.join(',')
  }
  if (props.requestParams) {
    if (typeof props.requestParams === 'function') {
      params = props.requestParams(params) as ApiServiceParams
    } else {
      params = {
        ...params,
        ...props.requestParams
      }
    }
  }
  return { ...params, ...merge }
}
const fetchDatatableItems = (opts: FetchRowsArgs = {}) => {
  if (props.endReach && tableOptions.meta.last_page && tableOptions.pagination.page >= tableOptions.meta.last_page) {
    return
  }
  if (tableOptions.loading || !serviceName.value) return
  tableOptions.loading = !0
  tableOptions.selected = []
  nextTick(() => {
    const params = getDatatableParams(opts)
    const requestWith = getRequestWith('withIndex')
    if (requestWith) {
      params.requestWith = requestWith
    }
    // console.log({ params })
    getMythApiServicesSchema().index({ params })
      .then((result: any) => {
        const { _data, _meta } = result
        pagination.value = {
          page: parseInt((_meta?.current_page || 1).toString()) || 1,
          rowsPerPage: parseInt(_meta?.per_page) || 0,
          rowsNumber: parseInt((_meta?.total || 0).toString()) || 0,
          sortBy: opts?.pagination?.sortBy || undefined,
          descending: opts?.pagination?.descending || undefined
        }
        _meta && (meta.value = _meta)
        if (props.endReach) {
          getRows.value = [...getRows.value, ...(_data || [])]
        } else {
          getRows.value = _data || []
        }
      })
      .catch((e) => {
        // console.log(e)
        if (e?.response?.status === 401) {
          logoutDatatable()
          return e
        }
        if (e?._message) {
          myth.alertError(e._message)
        } else if (e?.message) {
          myth.alertError(e.message)
        }
      })
      .finally(() => {
        tableOptions.loading = !1
      })
  })
}
const exportData = (type: MDtExportOptions) => {
  if (loading.value) {
    return
  }
  const ex = async () => {
    loading.value = !0
    const toBLob = exportToBlob.value === !0 || exportToBlob.value === type
    const data = getDatatableParams({
      pagination: tableOptions.pagination,
      filter: tableOptions.search
    }, {
      indexType: type,
      fdt: 'e',
      toUrl: toBLob === !0 ? !1 : exportToBlob.value !== type,
      headerItems: getHeaders.value.filter(e => e?.field !== props.controlKey && visibleHeaders.value.indexOf(e.name) !== -1)
    })
    if (tableOptions.selected.length > 0) {
      data.ids = tableOptions.selected.map((e: any) => e.id)
    }
    // console.log(3)
    const config: AxiosRequestConfig = {}
    if (toBLob) {
      config.responseType = 'blob'
    }
    getMythApiServicesSchema().export(data, config)
      .then(async (response) => {
        const { _message } = response || {}
        _message && (myth.alertSuccess(_message))
        try {
          await myth.helpers.downloadFromResponse(response)
        } catch (e: any) {
          if (response.status === 200 && response.headers['content-type'] === 'application/json') {
            return response
          }
          if (e?.code) {
            myth.alertError(__(`messages.${e.code}`))
          } else if (e?.message) {
            myth.alertError(e.message)
          }
          console.log(e)
        }
        return response
      })
      .catch((e) => {
        myth.alertError(e?._message || e?.message || 'Error')
      })
      .finally(() => {
        loading.value = !1
      })
  }
  if (!tableOptions.selected.length) {
    myth.confirmMessage(__('messages.export_all')).onOk(() => ex())
  } else {
    ex()
  }
}
/** Methods */

/** Filter Dialog */
const openFilterDialog = () => {
  dialogs.filter = !0
  tempFilterForm.value = { ...tableOptions.filter }
}
const saveFilterDialog = () => {
  filterForm.value = { ...tableOptions.tempFilter }
  nextTick(() => {
    dialogs.filter = !1
  })
}
const closeFilterDialog = () => {
  dialogs.filter = !1
  tempFilterForm.value = { ...tableOptions.filter }
}
const onRemoveFilter = (key: string | number) => {
  const filter = filterForm.value
  delete filter[key]
  filterForm.value = { ...filter }
  if (route.query[key]) {
    const query = { ...route.query }
    delete query[key]
    router.push({ query })
  }
}
const updateFilterOptions = (data: Record<string, any>) => {
  filterForm.value = {
    ...tableOptions.filter,
    ...data
  }
}
/** Filter Dialog */
const openDialogTimeout = 100
/** Show Dialog */
const openShowDialogNoIndex = async (i: MDtItem) => {
  const item = toRef(i)
  const index = getRows.value.findIndex(e => e.id === item.value.id)
  return await openShowDialog(item.value, index)
}
const openShowDialog = async (i: MDtItem, index: MDtItemIndex) => {
  const fdt = 's'
  const item = toRef(i)
  if (props.showQueryParams) {
    await router.push({ query: { ...route.query, id: item.value.id, fdt } })
    return
  }
  if (props.showRoute) {
    if (typeof props.showRoute === 'string') {
      await router.push({ name: props.showRoute, params: { id: item.value.id }, query: route.query })
    } else {
      await router.push(props.showRoute)
    }
    return
  }
  if (loading.value) {
    return
  }
  loading.value = !0
  const params: any = { fdt }
  if (getRequestWith('withShow')) {
    params.requestWith = getRequestWith('withShow')
  }

  getMythApiServicesSchema().show(item.value.id, { params })
    .then(({ _data }) => {
      dialogs.item = _data
      dialogs.index = index
      getRows.value[index as any] = _data
      setTimeout(() => (dialogs.show = !0), openDialogTimeout)
    })
    .catch((e: any) => {
      const message = e?._message || e?.message
      message && myth.alertError(message)
    })
    .finally(() => (loading.value = !1))
}
const closeShowDialog = () => {
  dialogs.show = !1
  dialogs.item = undefined
  dialogs.index = undefined
}
/** Show Dialog */

/** Form Dialog */
const updateRouteProp = computed(() => props.updateRoute)
const openUpdateDialogNoIndex = (i: MDtItem) => {
  const item = toRef(i)
  const index = getRows.value.findIndex(e => e.id === item.value.id)
  return openUpdateDialog(item.value, index)
}
const openUpdateDialog = async (i: MDtItem, index: MDtItemIndex) => {
  const fdt = 'u'
  const item = toRef(i)
  if (props.updateQueryParams) {
    await router.push({ query: { ...route.query, id: item.value.id, fdt } })
    return
  }
  if (updateRouteProp.value) {
    if (typeof updateRouteProp.value === 'string') {
      await router.push({ name: updateRouteProp.value, params: { id: item.value.id }, query: route.query })
    } else {
      await router.push(updateRouteProp.value)
    }
    return
  }
  if (loading.value) {
    return
  }
  loading.value = !0
  isUpdateMode.value = !0
  const params: any = { fdt }
  if (getRequestWith('withUpdate')) {
    params.requestWith = getRequestWith('withUpdate')
  }
  getMythApiServicesSchema().show(item.value.id, { params })
    .then(({ _data }) => {
      dialogs.item = _data
      dialogs.index = index
      if (_data && (index || index === 0)) {
        getRows.value[index] = { ..._data } as any
      }
      setTimeout(() => (dialogs.form = !0), openDialogTimeout)
    })
    .catch((e) => {
      const message = e?._message || e?.message
      message && myth.alertError(message)
    })
    .finally(() => (loading.value = !1))
}
const openCreateDialog = async (dtItem?: MDtItem) => {
  const fdt = 'c'
  if (props.storeQueryParams) {
    await router.push({ query: { ...route.query, id: undefined, fdt } })
    return
  }
  if (props.storeRoute) {
    if (typeof props.storeRoute === 'string') {
      await router.push({ name: props.storeRoute, query: route.query })
    } else {
      await router.push(props.storeRoute)
    }
    return
  }
  const item = { ...defaultItem.value, ...dtItem }
  isUpdateMode.value = !1
  dialogs.item = { ...item } as MDtItem
  dialogs.index = undefined
  await nextTick()
  setTimeout(() => (dialogs.form = !0), openDialogTimeout)
}
const closeFormDialog = () => {
  dialogs.form = !1
  nextTick(() => {
    isUpdateMode.value = !1
    dialogs.item = undefined
    dialogs.index = undefined
  })
}
/** Form Dialog */

const updateDatatableItem = (i: MDtItem, index?: MDtItemIndex) => {
  const item = toRef(i)
  if (item.value && index) {
    getRows.value[index] = item.value
  }
  if (item.value && !index) {
    const findIndex = getRows.value.findIndex(e => parseInt(e.id?.toString?.() ?? '') === parseInt(item.value?.id?.toString?.() ?? ''))
    getRows.value[findIndex] = item.value
  }
}
const removeDtItem = (i: MDtItem | number) => {
  const item = toRef<MDtItem | number>(i)
  const id: string | number = typeof item.value !== 'object' ? item.value : item.value.id as string
  if (typeof item.value !== 'object') {
    getRows.value = getRows.value.filter((e, i) => i !== id)
  } else {
    getRows.value = getRows.value.filter((e) => parseInt(e.id?.toString() ?? '') !== parseInt(id.toString()))
  }
}
const ignoreKeysProps = computed(() => props.ignoreKeys)
const defaultSubmitItem = async (_form: Record<string, any>) => {
  // let form = { ..._form, ...(dialogs.itemForm || {}) }
  let form = { ...(props.formModel ? props.formModel : _form) }
  if (loading.value) {
    return
  }
  loading.value = !0
  const api = getMythApiServicesSchema()
  form.requestWith = getRequestWith(isUpdateMode.value ? 'withUpdate' : 'withStore')
  if (!form.requestWith) {
    delete form.requestWith
  }
  const fdt = isUpdateMode.value ? 'u' : 'c'
  form.fdt = fdt
  if (ignoreKeysProps.value) {
    if (typeof ignoreKeysProps.value === 'function') {
      form = ignoreKeysProps.value(form)
    } else {
      for (const k in ignoreKeysProps.value) {
        delete form[ignoreKeysProps.value[k]]
      }
    }
  }

  const ignoreKeys = [
    '_to_string',
    '_to_number_format',
    '_to_date_format',
    'toString',
    'toNumberFormat',
    'toDateFormat'
  ]

  for (const i in ignoreKeys) {
    for (const k in form) {
      if (k.slice(-ignoreKeys[i].length) === ignoreKeys[i]) {
        delete form[k]
      }
    }
  }
  const _conf: any = { params: { fdt } }
  const method = async () => isUpdateMode.value ? await api.update(dialogs.item?.id || '', form, _conf) : await api.store(form, _conf)
  try {
    const { _data, _message, _success }: any = await method()
    _message && myth.alertSuccess(_message)
    if (_success) {
      if (isUpdateMode.value) {
        _data && updateDatatableItem(_data, dialogs.index)
      } else {
        await nextTick()
        refresh()
      }
      await nextTick()
      closeFormDialog()
    }
  } catch (e: any) {
    const { _message, _errors } = e || {}
    dialogs.errors = _errors || {}
    _message && myth.alertError(_message)
  } finally {
    loading.value = !1
  }
}
const hideAutoMessage = computed(() => props.hideAutoMessage)
const onDeleteItem = (i: MDtItem, index: number) => {
  const item = toRef(i)
  if (loading.value || !item.value?.id) {
    return
  }
  tableOptions.hasAction = !0
  myth.confirmMessage(__('messages.confirm_delete')).onOk(async () => {
    loading.value = !0
    try {
      const { _message, _success } = await getMythApiServicesSchema().destroy(item.value.id)
      if (!hideAutoMessage.value && _success && _message) {
        _message && myth.alertSuccess(_message)
      }
      if (_success) {
        if (tableOptions.pagination.rowsNumber !== undefined) {
          --tableOptions.pagination.rowsNumber
        }
        removeDtItem(index)
      }
    } catch (e: any) {
      e?._message && myth.alertError(e._message)
    } finally {
      loading.value = !1
      await nextTick()
      selected.value = []
    }
  }).onDismiss(() => {
    tableOptions.hasAction = !1
  })
}
const deleteSelectionItem = () => {
  if (!tableOptions.selected.length) return
  if (loading.value || !tableOptions.selected.length) {
    return
  }
  if (tableOptions.selected.length === 1) {
    const dtItem = tableOptions.selected[0] as MDtItem
    const index = getRows.value.findIndex((e: any) => parseInt(e.id) === parseInt(dtItem?.id?.toString() || ''))
    return onDeleteItem(dtItem, index)
  }
  if (!props.multiDestroy) {
    return
  }
  tableOptions.hasAction = !0
  myth.confirmMessage(__('messages.confirm_delete')).onOk(async () => {
    loading.value = !0
    try {
      const { _message, _success } = await getMythApiServicesSchema().destroyAll(tableOptions.selected.map((e: MDtItem) => e.id))
      if (!hideAutoMessage.value && _success && _message) {
        _message && myth.alertSuccess(_message)
      }
      if (_success) {
        refresh()
      }
    } catch (e: any) {
      e?._message && myth.alertError(e._message)
    } finally {
      loading.value = !1
      await nextTick()
      selected.value = []
    }
  }).onDismiss(() => {
    tableOptions.hasAction = !1
  })
}
const logoutDatatable = () => {
  // const { logout, removeStorage } = myth.store.state.
  // removeStorage()
  // logout(window.push_token)
  // const name = this.$routes.auth.login
  // if (this.$route.name !== name) {
  //   this.$router.replace({ name })
  // }
}
/** --- */

/**
 * Dom
 */
const contextmenu = ref(!1)
const onRowContextmenu = (e: MouseEvent | Event, row: MDtItem, index: number) => {
  e.preventDefault?.()
  // e.stopImmediatePropagation?.()
  dialogs.item = row
  dialogs.index = index
  if (isGrid.value) {
    contextmenu.value = !0
  }
}
const contextmenuItemsProp = computed(() => props.contextItems)
const contextmenuItems = computed<any>(() => ([
  ...(contextmenuItemsProp.value || []).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
  {
    name: 'show',
    label: myth?.options?.dt?.contextmenu?.btnStyle?.showLabel ? 'labels.show' : undefined,
    click: (item: MDtItem, index: MDtItemIndex) => {
      tableOptions.selected = [item]
      openShowDialog(item, index)
    },
    showIf: hasShowBtn.value,
    attr: {
      color: 'secondary'
    }
  },
  {
    name: 'update',
    label: myth?.options?.dt?.contextmenu?.btnStyle?.showLabel ? 'labels.update' : undefined,
    click: (item: MDtItem, index: MDtItemIndex) => {
      tableOptions.selected = [item]
      openUpdateDialog(item, index)
    },
    showIf: hasUpdateBtn.value,
    attr: {
      color: 'secondary'
    }
  },
  {
    name: 'destroy',
    label: myth?.options?.dt?.contextmenu?.btnStyle?.showLabel ? 'labels.destroy' : undefined,
    click: (item: MDtItem, index: MDtItemIndex) => {
      tableOptions.selected = [item]
      onDeleteItem(item, index)
    },
    showIf: hasDestroyBtn.value,
    attr: {
      color: 'negative'
    }
  }
]))
const endReach = computed<boolean>(() => Boolean(props.endReach))
const rowsPerPageOptions = computed(() => props.rowsPerPageOptions)
const getRowsPerPageOptions = computed<any[]>(() => endReach.value ? [0] : (rowsPerPageOptions.value || [0]))

const imageDialog = reactive<MDatatableScope['imageDialog']>({
  value: !1,
  src: undefined,
  asAttachment: undefined
})
const openImageDialog = (src: string, opts?: { asAttachment?: boolean }) => {
  imageDialog.src = src
  imageDialog.asAttachment = opts?.asAttachment
  nextTick(() => {
    imageDialog.value = !0
  })
}
const closeImageDialog = () => {
  imageDialog.value = !1
  nextTick(() => {
    imageDialog.src = undefined
    imageDialog.asAttachment = undefined
  })
}

onMounted(() => {
  refresh()
})
watch(loading, v => {
  if (!myth.options?.dt?.noQuasarLoading) {
    if (v) {
      $q.loading.show()
    } else {
      $q.loading.hide()
    }
  }
  tableOptions.hasAction = Boolean(v)
})
watch(filterForm, () => refreshNoUpdate())
watch(() => $q.lang.nativeName, () => {
  refreshNoUpdate()
})

// Watch on Form dialog
// watch(() => dialogs.item, (v) => {
//   dialogs.itemForm = v ? { ...v } : v
// })
watch(formDialogModel, (v) => {
  if (!v) {
    dialogs.errors = {}
  }
})
const datatableItemsScope = reactive({
  openShowDialog,
  openShowDialogNoIndex,
  closeShowDialog,
  openUpdateDialog,
  openUpdateDialogNoIndex,
  openCreateDialog,
  closeFormDialog,
  onDeleteItem,
  refresh,
  refreshNoUpdate,
  tableOptions,
  isSingleSelectedItem,
  firstSelectedItem,
  updateDatatableItem,
  updateSelectedItems,
  imageDialog,
  openImageDialog,
  closeImageDialog
})

const getShowSelection = computed<boolean | undefined>(() => {
  if (props.hideSelection) {
    return !1
  }
  return props.showSelection
})
const defaultTopBtnProps: any = {
  dense: !0,
  flat: !0,
  fabMini: !0
}
const table = ref<InstanceType<typeof QTable>>()
defineExpose({
  resetDialogs,
  tableOptions,
  getMythApiServicesSchema,
  updateSelectedItems,
  onScroll,
  loadMore,
  refreshNoUpdate,
  refresh,
  getRequestWith,
  getDatatableParams,
  fetchDatatableItems,
  exportData,
  openFilterDialog,
  saveFilterDialog,
  closeFilterDialog,
  onRemoveFilter,
  updateFilterOptions,
  openShowDialogNoIndex,
  openShowDialog,
  closeShowDialog,
  openUpdateDialogNoIndex,
  openUpdateDialog,
  openCreateDialog,
  closeFormDialog,
  updateDatatableItem,
  removeDtItem,
  onDeleteItem,
  deleteSelectionItem,
  logoutDatatable,
  openImageDialog,
  closeImageDialog
})

const getProp = computed(() => (k: keyof Props) => {
  if (props[k] !== undefined) {
    return props[k]
  }
  if (myth.options.dt?.props?.[k] !== undefined) {
    return myth.options.dt?.props?.[k]
  }
  return props[k]
})
</script>

<template>
  <div
    :class="{
      'm--datatable-component': !0,
      'm--datatable-component__fixed': fixed === undefined ? ( $myth.options.dt?.props?.fixed === undefined ? undefined : $myth.options.dt?.props?.fixed) : fixed,
      'm--datatable-component__too_small': $q.screen.height < 900,
      'm--datatable-component__fab': hasAddBtn && (noAddBtnFab ? !1 : $myth.options.dt?.addBtn?.noFab !== !0)
    }"
  >
    <!-- Context Menu -->
    <MModalMenu
      v-model="contextmenu"
      class="shadow-6 relative-position"
      context-menu
      touch-position
      v-bind="$myth.options.dt?.contextmenu?.menu"
      @before-hide="resetDialogs()"
    >
      <q-list
        v-if="dialogs.item"
        :separator="!$myth.tools.isSmall"
        style="min-width: 280px;"
        v-bind="$myth.options.dt?.contextmenu?.list"
      >
        <template
          v-for="(contextmenuItem,i) in contextmenuItems"
          :key="i"
        >
          <MDtBtn
            v-if="typeof contextmenuItem.showIf === 'function' ? contextmenuItem.showIf(dialogs.item,dialogs.index) : contextmenuItem.showIf"
            :[contextmenuItem.name]="!0"
            :dense="dense === undefined ? $myth.options.dt?.props?.dense : dense"
            :label="contextmenuItem.contextLabel !== undefined ? (contextmenuItem.contextLabel === null ? undefined : __(contextmenuItem.contextLabel)) : __(contextmenuItem.label || contextmenuItem.name) "
            list-item
            v-bind="contextmenuItem.attr"
            @click="contextmenuItem.click ? contextmenuItem.click(dialogs.item,dialogs.index) : undefined"
          />
        </template>
      </q-list>
    </MModalMenu>

    <q-pull-to-refresh
      :no-mouse="mouse"
      color="primary"
      @refresh="refresh"
    >
      <q-table
        ref="table"
        v-model:fullscreen="tableOptions.fullscreen"
        v-model:pagination="pagination"
        v-model:selected="selected"
        :class="`m--datatable ` + ($q.screen.lt.md ? 'm--datatable-grid' : '')"
        :columns="getHeaders"
        :filter="tableOptions.search"
        :grid="isGrid"
        :hide-pagination="endReach"
        :loading="tableOptions.loading"
        :rows="getRows"
        :rows-per-page-options="getRowsPerPageOptions"
        :selection="getShowSelection ? (multiSelection ? 'multiple' : 'single') : 'none'"
        :title="title"
        :visible-columns="visibleHeaders"
        card-container-class="m--datatable-container"
        table-class="m--datatable-container"
        v-bind="{
          virtualScroll: !0,
          wrapCells:!0,
          ...$myth.options.dt?.props,
          ...$attrs,
          bordered: bordered === undefined ? $myth.options.dt?.props?.bordered : bordered,
          dense: dense === undefined ? $myth.options.dt?.props?.dense : dense,
          flat: flat === undefined ? $myth.options.dt?.props?.flat : flat,
        }"
        @request="fetchDatatableItems"
        @virtual-scroll="endReach ? onScroll : undefined"
        @row-contextmenu="onRowContextmenu"
      >
        <template #item="iTempProps">
          <slot
            :dt="datatableItemsScope"
            name="item"
            v-bind="iTempProps"
          >
            <div
              :style="iTempProps.selected ? 'transform: scale(0.95);' : ''"
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            >
              <q-card
                :class="iTempProps.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''"
              >
                <template v-if="getShowSelection || iTempProps.colsMap[controlKey] !== undefined">
                  <div class="m--datatable-card-control-header">
                    <MRow class="items-center justify-between">
                      <div class="q-px-md">
                        <q-checkbox
                          v-if="getShowSelection"
                          v-model="iTempProps.selected"
                          dense
                        />
                      </div>
                      <div>
                        <MDtBtn
                          flat
                          icon="ion-ios-more"
                          @click="onRowContextmenu($event,iTempProps.row,iTempProps.rowIndex)"
                        />
                      </div>
                    </MRow>
                  </div>
                  <q-separator />
                </template>
                <MContainer>
                  <template
                    v-for="col in iTempProps.cols"
                    :key="col.name"
                  >
                    <MRow
                      v-if="col.name !== controlKey || (col.name === controlKey && ( showCardControlHeader === undefined ? $myth.options.dt?.props?.showCardControlHeader : showCardControlHeader ))"
                      class="justify-between"
                    >
                      <MCol
                        v-if="col.name !== controlKey"
                        auto
                      >
                        {{ col.label }}
                      </MCol>
                      <MCol
                        :auto="col.name !== controlKey"
                        :class="`overflow-hidden ${col.name === controlKey ? 'text-right col-12 q-pb-xs' : ''}`"
                      >
                        <template v-if="imageColumns?.indexOf(col.name) !== -1">
                          <template v-if="getProp('imageMode') === 'icon'">
                            <q-btn
                              v-if="!!col.value"
                              dense
                              fab-mini
                              flat
                              icon="ion-ios-eye"
                              @click="openImageDialog(col.value)"
                            >
                              <q-tooltip class="m--dt-btn-tooltip">
                                {{ __('myth.titles.show') }}
                              </q-tooltip>
                            </q-btn>
                          </template>
                          <template v-else-if="getProp('imageMode') === 'image'">
                            <q-img
                              v-if="col.value"
                              :src="col.value"
                              :style="`width: ${getProp('imageSize')}; height: ${getProp('imageSize')}`"
                              class="cursor-pointer"
                              fit="contain"
                              no-spinner
                              @click="openImageDialog(col.value)"
                            >
                              <q-tooltip class="m--dt-btn-tooltip">
                                {{ __('myth.titles.show') }}
                              </q-tooltip>
                            </q-img>
                          </template>
                          <!--<q-btn-->
                          <!--  :src="col.value"-->
                          <!--  fab-mini-->
                          <!--  flat-->
                          <!--  icon="ion-ios-eye"-->
                          <!--  @click="openImageDialog(col.value)"-->
                          <!--/>-->
                        </template>
                        <template v-else-if="col.name === controlKey">
                          <div class="row q-gutter-xs">
                            <MDtContextmenuItems
                              :index="iTempProps.rowIndex"
                              :item="iTempProps.row"
                              :items="contextmenuItems"
                            />
                          </div>
                        </template>
                        <template v-else>
                          <div class="m--datatable-card-value">
                            <slot
                              :name="`card-cell-${col.name}`"
                              v-bind="iTempProps"
                            >
                              {{ col.value }}
                            </slot>
                          </div>
                        </template>
                      </MCol>
                    </MRow>
                  </template>
                </MContainer>
              </q-card>
            </div>
          </slot>
        </template>

        <template #top="topSlotProps">
          <MCol col="12">
            <MContainer class="no-padding">
              <slot
                :dt="datatableItemsScope"
                :index="dialogItemIndex"
                :item="dialogItem"
                name="top"
                v-bind="topSlotProps"
              />
              <MRow
                class="items-center"
                col
              >
                <slot
                  :dt="datatableItemsScope"
                  :index="dialogItemIndex"
                  :item="dialogItem"
                  name="title"
                >
                  <MCol
                    v-if="!!title"
                    col="12"
                  >
                    <div
                      class="text-h5 bordered-bottom"
                      v-text="title"
                    />
                  </MCol>
                </slot>
                <MInput
                  v-if="!hideSearch"
                  v-model="tableOptions.search"
                  :debounce="searchDebounce"
                  :dense="dense === undefined ? ($myth.options.dt?.props?.dense !== undefined ? $myth.options.dt?.props?.dense : !0) : dense"
                  :placeholder="searchPlaceholder"
                  autocomplete="none"
                  col="12"
                  name="search"
                  outlined
                  v-bind="$myth.options.dt?.searchInput?.props"
                >
                  <template #prepend>
                    <q-icon
                      v-if="!tableOptions.search"
                      name="ion-ios-search"
                    >
                      <q-tooltip class="m--dt-btn-tooltip">
                        {{ __('myth.datatable.searchInput') }}
                      </q-tooltip>
                    </q-icon>
                    <q-icon
                      v-else
                      class="cursor-pointer"
                      name="ion-ios-close"
                      @click="tableOptions.search = ''"
                    >
                      <q-tooltip class="m--dt-btn-tooltip">
                        {{ __('myth.datatable.searchInputClear') }}
                      </q-tooltip>
                    </q-icon>
                  </template>
                  <template #after>
                    <q-btn
                      :aria-label="__('menu')"
                      :icon="$myth.options.dt?.searchInput?.optionsIcon || 'ion-ios-options'"
                      dense
                      flat
                      round
                      v-bind="$myth.options.dt?.searchInput?.menuBtn"
                    >
                      <MModalMenu
                        :offset="[10,10]"
                        no-close-btn
                        v-bind="$myth.options.dt?.searchInput?.menuProps as any"
                      >
                        <q-toolbar>
                          <q-toolbar-title>
                            {{ __('myth.datatable.searchColumns') }}
                          </q-toolbar-title>
                        </q-toolbar>
                        <q-separator />
                        <MContainer style="min-width: 250px; max-width: 450px">
                          <MRow class="items-center">
                            <MCol col="12">
                              <template
                                v-for="h in getHeaders.filter( e => e.field !== controlKey)"
                                :key="h.name"
                              >
                                <q-checkbox
                                  v-model="searchColumnsRef"
                                  :disable="searchColumnsRef.length < 2 && searchColumnsRef.indexOf(h.name) !== -1"
                                  :label="h.label"
                                  :val="h.name"
                                />
                              </template>
                            </MCol>
                          </MRow>
                        </MContainer>
                        <MRow>
                          <q-btn
                            v-close-popup
                            :class="{'full-width': $q.screen.lt.md}"
                            :label="__('myth.titles.done')"
                            :size="$q.screen.lt.md ? 'lg' : 'md'"
                            flat
                            no-caps
                            style="min-width: 68px"
                            unelevated
                            @click="tableOptions.search ? refresh() : undefined"
                          />
                        </MRow>
                      </MModalMenu>
                      <MTooltip>
                        {{ __('myth.datatable.searchColumns') }}
                      </MTooltip>
                    </q-btn>
                  </template>
                </MInput>
              </MRow>

              <!--Buttons-->
              <MRow class="row q-gutter-x-sm q-gutter-xs-y-sm items-center justify-between">
                <!--More Menu-->
                <MDtBtn
                  v-if="hasMenu"
                  key="more-selection-btn"
                  :disable="tableOptions.loading"
                  icon="ion-ios-options"
                  tooltip="myth.datatable.hints.more"
                  v-bind="{...defaultTopBtnProps,...$myth.options.dt?.buttons?.more}"
                >
                  <MModalMenu
                    :offset="[10,10]"
                    v-bind="$myth.options.dt?.buttons?.moreMenu as any"
                  >
                    <q-list
                      style="min-width: 250px"
                      v-bind="$myth.options.dt?.buttons?.moreList"
                    >
                      <!-- Add Btn -->
                      <q-item
                        v-if="hasAddBtn && (noAddBtnList ? !1 : $myth.options.dt?.addBtn?.noList !== !0)"
                        v-close-popup
                        clickable
                        v-bind="$myth.options.dt?.buttons?.moreItem"
                        @click="openCreateDialog()"
                      >
                        <q-item-section thumbnail>
                          <q-icon
                            color="primary"
                            name="add"
                            right
                            size="xs"
                          />
                        </q-item-section>
                        <q-item-section>
                          <span> {{ getFormTitle }}</span>
                        </q-item-section>
                      </q-item>
                      <q-item
                        v-if="pdf"
                        v-close-popup
                        clickable
                        v-bind="$myth.options.dt?.buttons?.moreItem"
                        @click="exportData('pdf')"
                      >
                        <q-item-section thumbnail>
                          <q-icon
                            color="red"
                            name="fa-solid fa-file-pdf"
                            right
                            size="xs"
                          />
                        </q-item-section>
                        <q-item-section>
                          <span>
                            {{ __('myth.titles.exportPdf') }}
                            <q-badge
                              v-if="tableOptions.selected.length > 1"
                              :label="tableOptions.selected.length"
                              align="top"
                              rounded
                            />
                          </span>
                        </q-item-section>
                      </q-item>
                      <q-item
                        v-if="excel"
                        v-close-popup
                        clickable
                        v-bind="$myth.options.dt?.buttons?.moreItem"
                        @click="exportData('excel')"
                      >
                        <q-item-section thumbnail>
                          <q-icon
                            color="green"
                            name="fa-solid fa-file-excel"
                            right
                            size="xs"
                          />
                        </q-item-section>
                        <q-item-section>
                          <span>
                            {{ __('myth.titles.exportExcel') }}
                            <q-badge
                              v-if="tableOptions.selected.length>1"
                              :label="tableOptions.selected.length"
                              align="top"
                              rounded
                            />
                          </span>
                        </q-item-section>
                      </q-item>
                      <q-item
                        v-if="!noFullscreen"
                        v-close-popup
                        clickable
                        v-bind="$myth.options.dt?.buttons?.moreItem"
                        @click="tableOptions.fullscreen = !tableOptions.fullscreen"
                      >
                        <q-item-section thumbnail>
                          <q-icon
                            :name="tableOptions.fullscreen ? 'ion-ios-contract' : 'ion-ios-desktop'"
                            right
                          />
                        </q-item-section>
                        <q-item-section>
                          <q-item-label>{{ __('myth.datatable.' + (tableOptions.fullscreen ? 'exitFullscreen' : 'fullscreen')) }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </MModalMenu>
                </MDtBtn>

                <!-- Filter dialog -->
                <MDtBtn
                  v-if="hasFilterDialog"
                  key="filter-selection-btn"
                  icon="o_filter_alt"
                  tooltip="myth.datatable.hints.filter"
                  v-bind="{...defaultTopBtnProps,...$myth.options.dt?.buttons?.filter}"
                  @click="openFilterDialog()"
                >
                  <MModalMenu
                    no-close-btn
                    position="top"
                    v-bind="$myth.options.dt?.filterDialogProps"
                  >
                    <q-card
                      :style="$q.screen.gt.sm?`width: ${Math.ceil($q.screen.width/2)}px` : undefined"
                      flat
                      square
                    >
                      <MContainer class="q-pa-md">
                        <q-toolbar :class="{'q-pa-none': $q.screen.lt.md}">
                          <q-toolbar-title>
                            {{ __('myth.datatable.filter.title') }}
                          </q-toolbar-title>
                        </q-toolbar>
                        <q-separator />
                        <MRow class="items-center">
                          <MCol col="12">
                            <MContainer class="q-pa-md">
                              <slot
                                :filter="tableOptions.tempFilter"
                                name="filter"
                              />
                            </MContainer>
                          </MCol>
                          <MCol
                            class="q-pt-lg"
                            col="12"
                          >
                            <MRow class="justify-between">
                              <MBtn
                                v-close-popup
                                :label="__('myth.datatable.filter.cancel')"
                                color="negative"
                                flat
                                v-bind="$myth.options.dt?.dialogButtonsProps"
                                @click="closeFilterDialog"
                              />
                              <MBtn
                                v-close-popup
                                :label="__('myth.datatable.filter.save')"
                                color="positive"
                                flat
                                v-bind="$myth.options.dt?.dialogButtonsProps"
                                @click="saveFilterDialog"
                              />
                            </MRow>
                          </MCol>
                        </MRow>
                      </MContainer>
                    </q-card>
                  </MModalMenu>
                </MDtBtn>
                <!--Refresh-->
                <MDtBtn
                  v-if="!noRefreshBtn"
                  key="refresh-selection-btn"
                  :disable="tableOptions.loading"
                  icon="ion-ios-refresh"
                  tooltip="myth.datatable.hints.refresh"
                  v-bind="{...defaultTopBtnProps,...$myth.options.dt?.buttons?.refresh}"
                  @click="refreshNoUpdate()"
                />
                <!--Fullscreen-->
                <MDtBtn
                  v-if="!noFullscreen"
                  key="fullscreen-selection-btn"
                  :disable="tableOptions.loading"
                  :icon="tableOptions.fullscreen ? 'ion-ios-contract' : 'ion-ios-desktop'"
                  :tooltip="`myth.datatable.${tableOptions.fullscreen ? 'exitFullscreen' : 'fullscreen'}`"
                  v-bind="{...defaultTopBtnProps,...$myth.options.dt?.buttons?.fullscreen}"
                  @click="tableOptions.fullscreen = !tableOptions.fullscreen"
                />

                <template v-if="hasSelectedItem">
                  <MDtBtn
                    v-if="hasUpdateBtn && isSingleSelectedItem"
                    key="update-dt-selection-btn"
                    :disable="tableOptions.loading"
                    icon="ion-ios-create"
                    update
                    v-bind="{...defaultTopBtnProps,...$myth.options.dt?.topSelection?.btn}"
                    @click="openUpdateDialogNoIndex(tableOptions.selected[0])"
                  />
                  <MDtBtn
                    v-if="hasShowBtn && isSingleSelectedItem"
                    key="show-dt-selection-btn"
                    :disable="tableOptions.loading"
                    icon="ion-ios-eye"
                    show
                    v-bind="{...defaultTopBtnProps,...$myth.options.dt?.topSelection?.btn}"
                    @click="openShowDialogNoIndex(tableOptions.selected[0])"
                  />
                  <MDtBtn
                    v-if="tableOptions.selected.length > 1 ? (hasDestroyBtn && multiDestroy) : hasDestroyBtn"
                    key="destroy-dt-selection-btn"
                    :disable="!hasSelectedItem || tableOptions.loading"
                    color="negative"
                    destroy
                    icon="ion-ios-trash"
                    v-bind="{...defaultTopBtnProps,...$myth.options.dt?.topSelection?.btn}"
                    @click="deleteSelectionItem()"
                  />
                  <template
                    v-for="(contextBtn,i) in contextItems"
                    :key="`top-s-${i}`"
                  >
                    <MDtBtn
                      v-if="(typeof contextBtn.showIf === 'function' ? contextBtn.showIf(tableOptions.selected[0],0) : contextBtn.showIf) && ( (contextBtn.click && isSingleSelectedItem) || (contextBtn.multiClick && !isSingleSelectedItem) )"
                      :tooltip="__(contextBtn.tooltip || contextBtn.name)"
                      v-bind="{...defaultTopBtnProps,...$myth.options.dt?.topSelection?.btn,...contextBtn,...contextBtn.attr}"
                      @click="contextBtn.click ? contextBtn.click(tableOptions.selected[0],0) : (contextBtn.multiClick ? contextBtn.multiClick(tableOptions.selected) : undefined)"
                    />
                  </template>
                </template>

                <q-space />
                <!-- Add Btn -->
                <template v-if="hasAddBtn && (noAddBtnTop ? !1 : $myth.options.dt?.addBtn?.noTop !== !0)">
                  <MBtn
                    :label="getFormTitle"
                    icon="ion-ios-add"
                    @click="openCreateDialog()"
                  />
                </template>
              </MRow>

              <!-- Manage Columns -->
              <MRow
                v-if="manageColumns"
                class="items-center"
              >
                <q-list
                  bordered
                  class="rounded-borders col-12"
                >
                  <q-expansion-item
                    :caption="__('myth.datatable.columnsToShowCaption')"
                    :label="__('myth.datatable.columnsToShow')"
                    expand-separator
                    icon="ion-ios-list"
                  >
                    <q-card>
                      <q-card-section>
                        <template
                          v-for="h in getHeaders"
                          :key="h.name"
                        >
                          <q-checkbox
                            v-model="visibleHeaders"
                            :disable="visibleHeaders.length < 2 && visibleHeaders.indexOf(h.name) !== -1"
                            :label="h.label"
                            :val="h.name"
                          />
                        </template>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>
              </MRow>

              <!-- Filter Row -->
              <MRow
                v-if="Object.values(tableOptions.filter).filter(e => e !== undefined && e !== null).length > 0"
                class="items-center"
              >
                <MCol col="auto">
                  <span class="text-subtitle1 q-mr-sm">{{ __('myth.datatable.filteredBy') }}</span>
                </MCol>
                <template
                  v-for="(filterValue,filterKey) in tableOptions.filter"
                  :key="`filter-${filterKey}`"
                >
                  <MCol
                    v-if="filterValue !== null && filterValue !== undefined"
                    col="auto"
                  >
                    <q-chip
                      class="q-pr-md"
                      clickable
                      color="primary"
                      icon-remove="clear"
                      outline
                      removable
                      @click="openFilterDialog()"
                      @remove="onRemoveFilter(filterKey)"
                    >
                      <span>{{ getHeaders.find(e => e.name === filterKey)?.label || __(`attributes.${filterKey}`) }}</span>
                      <span v-if="typeof filterValue === 'boolean'">: {{ __(filterValue ? 'yes' : 'no') }}</span>
                      <span v-else-if="typeof filterValue === 'string'">: {{ filterValue }}</span>
                      <span v-else-if="lodash.isArray(filterValue) && !quasarHelpers.object(filterValue[0])">: {{ filterValue.join(', ') }}</span>
                      <span v-else-if="lodash.isArray(filterValue) && quasarHelpers.object(filterValue[0])">: {{
                        filterValue.map(e => e.label).join(', ')
                      }}</span>
                      <span v-else-if="quasarHelpers.object(filterValue) && filterValue.label">: {{ filterValue.label }}</span>
                    </q-chip>
                  </MCol>
                </template>
              </MRow>

              <!-- Selection Row -->
              <MRow
                v-if="!!$slots.selection"
                class="items-center q-gutter-xs"
                style="min-height: 38px"
              >
                <slot
                  :dt="datatableItemsScope"
                  name="selection"
                />
              </MRow>
            </MContainer>
          </MCol>
        </template>

        <template
          v-if="endReach"
          #bottom
        >
          <q-space />
          <div v-text="__('replace.from_to', { from: pagination.rowsNumber, to: getRows.length })" />
        </template>

        <template
          v-if="!noBodyControl"
          #[`body-cell-${controlKey}`]="noBodyProps"
        >
          <slot
            :dt="datatableItemsScope"
            :name="`body-cell-${controlKey}`"
            v-bind="noBodyProps"
          >
            <q-td :props="noBodyProps">
              <MDtContextmenuItems
                :index="noBodyProps.rowIndex"
                :item="noBodyProps.row"
                :items="contextmenuItems"
              />
            </q-td>
          </slot>
        </template>
        <template
          v-for="c in imageColumns"
          :key="`a-c-${c}`"
          #[`body-cell-${c}`]="colProps"
        >
          <q-td :props="colProps">
            <template v-if="getProp('imageMode') === 'icon'">
              <q-btn
                v-if="colProps.row[c]"
                :src="colProps.row[c]"
                dense
                fab-mini
                flat
                icon="ion-ios-eye"
                @click="openImageDialog(colProps.row[c])"
              >
                <q-tooltip class="m--dt-btn-tooltip">
                  {{ __('myth.titles.show') }}
                </q-tooltip>
              </q-btn>
            </template>
            <template v-else-if="getProp('imageMode') === 'image'">
              <q-img
                v-if="colProps.row[c]"
                :src="colProps.row[c]"
                :style="`width: ${getProp('imageSize')}; height: ${getProp('imageSize')}`"
                class="cursor-pointer"
                fit="contain"
                no-spinner
                @click="openImageDialog(colProps.row[c])"
              >
                <q-tooltip class="m--dt-btn-tooltip">
                  {{ __('myth.titles.show') }}
                </q-tooltip>
              </q-img>
            </template>
          </q-td>
        </template>

        <template
          v-for="(slotVal,slotName) in ($slots as Readonly<QTableSlots>)"
          :key="slotName"
          #[slotName]="inputSlot"
        >
          <slot
            v-if="inputSlot && (slotName as any) !== 'default'"
            :dt="datatableItemsScope"
            :name="slotName"
            v-bind="inputSlot || {}"
          />
        </template>
      </q-table>
      <slot
        :dt="datatableItemsScope"
        name="default"
      />
    </q-pull-to-refresh>

    <!-- Show Dialog -->
    <MDialog
      v-model="dialogs.show"
      v-bind="$myth.options.dt?.showDialogProps"
    >
      <q-card class="m--dialog-card">
        <q-card-section ref="showTitleRef">
          <q-toolbar>
            <q-toolbar-title>
              <q-btn
                :icon="`ion-ios-arrow-${$q.lang.rtl ? 'forward' : 'back'}`"
                fab-mini
                flat
                @click="closeShowDialog()"
              >
                <q-tooltip class="m--dt-btn-tooltip">
                  {{ __('myth.titles.back') }}
                </q-tooltip>
              </q-btn>
              {{ getShowTitle }}
            </q-toolbar-title>
          </q-toolbar>
        </q-card-section>
        <q-separator />
        <q-card-section
          :style="`height: ${($q.screen.height || 100) - 3 - (($refs.showActionsRef as any)?.$el?.offsetHeight || 60) - (($refs.showTitleRef as any)?.$el?.offsetHeight || 80)}px`"
          class="scroll"
        >
          <slot
            :index="dialogs.index"
            :item="dialogs.item"
            name="show"
          />
        </q-card-section>
        <q-separator />
        <q-card-actions
          ref="showActionsRef"
          align="left"
          class="print-hide"
        >
          <MBtn
            :label="__('myth.titles.close')"
            color="negative"
            v-bind="$myth.options.dt?.dialogButtonsProps"
            @click="closeShowDialog"
          />
        </q-card-actions>
      </q-card>
    </MDialog>

    <!-- Form Dialog -->
    <MDialog
      v-model="dialogs.form"
      v-bind="$myth.options.dt?.formDialogProps"
    >
      <MForm
        ref="formDialogRef"
        v-slot="form"
        :errors="dialogs.errors"
        :form="dialogs.item"
        :form-props="{class: 'column full-height justify-between no-wrap'}"
        class="full-height no-wrap"
        @submit="defaultSubmitItem"
      >
        <q-card class="m--dialog-card">
          <q-card-section ref="formTitle">
            <q-toolbar :class="{'q-pa-none': $q.screen.lt.md}">
              <slot
                :dt="datatableItemsScope"
                :index="dialogItemIndex"
                :item="dialogItem"
                name="form-title-left"
              />
              <slot
                :dt="datatableItemsScope"
                :index="dialogItemIndex"
                :item="dialogItem"
                name="form-title"
              >
                <q-toolbar-title>
                  <template v-if="tableOptions.loading && !dialogs.item">
                    <q-skeleton width="200px" />
                  </template>
                  <template v-else>
                    <q-btn
                      :icon="`ion-ios-arrow-${$q.lang.rtl ? 'forward' : 'back'}`"
                      fab-mini
                      flat
                      @click="closeFormDialog"
                    >
                      <q-tooltip class="m--dt-btn-tooltip">
                        {{ __('myth.titles.back') }}
                      </q-tooltip>
                    </q-btn>
                    {{ getFormTitle }}
                  </template>
                </q-toolbar-title>
              </slot>
              <slot
                :dt="datatableItemsScope"
                :index="dialogItemIndex"
                :item="dialogItem"
                name="form-title-right"
              />
            </q-toolbar>
          </q-card-section>
          <q-separator />
          <q-card-section
            :style="`height: ${($q.screen.height || 100) - 3 - (($refs.formActions as any)?.$el?.offsetHeight || 60) - (($refs.formTitle as any)?.$el?.offsetHeight || 80)}px`"
            class="scroll"
          >
            <MContainer v-if="tableOptions.loading && !dialogs.item">
              <MRow
                v-if="tableOptions.loading"
                col
              >
                <template
                  v-for="ai in 15"
                  :key="`form-skeleton-${ai}`"
                >
                  <MCol
                    col="12"
                    md="6"
                  >
                    <q-skeleton type="QInput" />
                  </MCol>
                </template>
              </MRow>
            </MContainer>
            <slot
              v-else
              :form="form"
              :index="dialogs.index"
              :item="dialogs.item"
              name="form"
              v-bind="datatableItemsScope"
            />
          </q-card-section>
          <q-separator />
          <q-card-actions
            ref="formActions"
            class="m--datatable-form-actions print-hide"
          >
            <slot
              :form="form"
              :index="dialogs.index"
              :item="dialogs.item"
              name="form-actions"
              v-bind="datatableItemsScope"
            >
              <MBtn
                :class="{'full-width': $q.screen.lt.sm}"
                :label="__('myth.titles.' + (isUpdateMode ? 'save' : 'store'))"
                :loading="tableOptions.loading"
                color="positive"
                no-caps
                type="submit"
                v-bind="$myth.options.dt?.dialogButtonsProps"
              />
            </slot>
            <MBtn
              v-if="$q.screen.gt.sm"
              :disable="tableOptions.loading"
              :label="__('myth.titles.close')"
              color="negative"
              no-caps
              v-bind="$myth.options.dt?.dialogButtonsProps"
              @click="closeFormDialog"
            />
          </q-card-actions>
        </q-card>
      </MForm>
    </MDialog>

    <!-- Image Dialog -->
    <MDialog v-model="imageDialog.value">
      <q-card>
        <div class="row full-height">
          <MCol col="12">
            <MRow class="q-pa-sm justify-between items-center">
              <q-btn
                :href="imageDialog.src"
                :label="__('myth.titles.download')"
                flat
                icon="ion-ios-cloud-download"
                target="_blank"
              />
              <q-btn
                fab-mini
                flat
                icon="ion-ios-close"
                round
                @click="closeImageDialog()"
              />
            </MRow>
            <q-separator />
          </MCol>
          <MCol
            class="text-center"
            col="12"
          >
            <q-img
              v-if="imageDialog.src && !imageDialog.asAttachment"
              :height="`${$q.screen.height - 70}px`"
              :src="imageDialog.src"
              class="self-center"
              fit="contain"
            />
            <iframe
              v-if="imageDialog.src && imageDialog.asAttachment"
              :height="`${$q.screen.height - 70}px`"
              :src="imageDialog.src"
              allowfullscreen
              class="full-width"
              frameborder="0"
              scrolling="no"
            />
          </MCol>
        </div>
      </q-card>
    </MDialog>

    <!-- Add Btn -->
    <q-page-sticky
      v-if="hasAddBtn && (noAddBtnFab ? !1 : $myth.options.dt?.addBtn?.noFab !== !0)"
      :offset="$myth.options.dt?.fabBtn?.offset|| [25,25]"
      :position="$myth.options.dt?.fabBtn?.position || 'bottom-right'"
      v-bind="$myth.options.dt?.fabBtn?.pageStickyProps"
    >
      <q-btn
        color="primary"
        fab
        icon="ion-ios-add"
        v-bind="$myth.options.dt?.fabBtn?.buttonProps"
        @click="openCreateDialog()"
      >
        <MTooltip
          anchor="top middle"
          class="m--datatable-fab-tooltip"
          self="bottom start"
        >
          <span class="text-caption">{{ getFormTitle }}</span>
        </MTooltip>
      </q-btn>
    </q-page-sticky>
  </div>
</template>

<script lang="ts">

export default {
  name: 'MDatatable',
  inheritAttrs: !1
}
</script>

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

.m--datatable-component
  .m--datatable.m--datatable-grid
    .q-table__top
      padding-left: 0
      padding-right: 0

  &__fab
    margin-bottom: 12rem

  &__fixed
    margin-bottom: 10rem

    .m--datatable:not(.m--datatable-grid)
      max-height: 80vh

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
          top: 55px

  .q-table__bottom
    justify-content: start !important

    .q-table__separator.col
      display: none !important

  .q-table__top
    align-items: center

    .q-table__separator.col
      display: none !important

    .q-table__control:last-child
      padding-left: 8px
      display: block
      flex: 10000 1 0
      width: auto
      min-width: 0
      max-width: 100%

.m--dialog-card
  .q-card__actions
    .q-btn
      padding: 4px 16px !important

.grid-style-transition
  transition: transform .28s, background-color .28s

</style>
