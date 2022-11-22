/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { AxiosResponse } from 'axios'
import _ from 'lodash'
import { useQuasar } from 'quasar'
import { computed, nextTick, ref, Ref, SetupContext } from 'vue'
import { useRouter } from 'vue-router'
import { ParseHeadersType } from '../../types'
import { useMyTh } from '../../vue3/MyThVue3'
import {
  DatatableItem,
  DatatableParams,
  FetchDatatableOptions,
  MDatatableDialogIndex,
  MDatatableScope,
  PaginationOptionsProps,
  TableDialogsProps,
  TableMetaServerProps,
  TableOptionsProps
} from './models'

export const initPaginationOptions: PaginationOptionsProps = {
  sortBy: undefined,
  descending: undefined,
  page: 1,
  rowsPerPage: 25,
  rowsNumber: 0
}
export const initTableOptions: TableOptionsProps = {
  loading: !1,
  selected: [],
  search: null,
  filter: {},
  tempFilter: {}
}
export const initMetaServer: TableMetaServerProps = {
  current_page: null,
  last_page: null,
  total: null
}

interface UseDatatableOptions {
  props: any;
  slots: SetupContext['slots'];
  emit: {
    (e: 'update:rows', value: DatatableItem[]): void
    (e: 'refresh'): void
  };
  rows: Ref<DatatableItem[]>,
  dialogs: Ref<TableDialogsProps>,
  tableOptions: Ref<TableOptionsProps>,
  metaServer: Ref<TableMetaServerProps>,
  paginationOptions: Ref<PaginationOptionsProps>,
}

export function useDatatable ({
  props,
  emit,
  slots,
  rows,
  dialogs,
  tableOptions,
  metaServer,
  paginationOptions
}: UseDatatableOptions) {
  const $myth = useMyTh()
  const $q = useQuasar()
  const { t } = $myth.translate()

  const getHeaders = computed<ParseHeadersType[] | any[]>(() => $myth.parseHeaders(props.headers) ?? [])

  const hasAddBtn = computed<boolean>(() => {
    if (props.hideAddBtn) {
      return !1
    }
    return slots.form !== undefined || props.createRoute !== undefined
  })
  const hasUpdateBtn = computed<boolean>(() => {
    if (props.hideUpdateBtn) {
      return !1
    }
    return slots.form !== undefined || props.updateRoute !== undefined
  })
  const hasShowBtn = computed<boolean>(() => {
    if (props.hideShowBtn) {
      return !1
    }
    return slots.show !== undefined || props.showRoute !== undefined
  })
  const hasDestroyBtn = computed<boolean>(() => !props.hideDestroyBtn)
  const hasFilterDialog = computed<boolean>(() => slots.filter !== undefined)
  const hasMenu = computed<boolean>(() => (Boolean(props.pdf) || Boolean(props.excel) || hasFilterDialog.value || hasAddBtn.value))

  const isUpdateMode = ref<boolean>(!1)
  const formMode = computed<'update' | 'create'>(() => isUpdateMode.value ? 'update' : 'create')
  const isSingleSelectedItem = computed<boolean>(() => tableOptions.value.selected.length === 1)
  const firstSelectedItem = computed<DatatableItem>(() => tableOptions.value.selected[0])
  const hasSelectedItem = computed<boolean>(() => tableOptions.value.selected.length > 0)

  const datatableItemsScope = computed<MDatatableScope>(() => ({
    openShowDialog,
    closeShowDialog,
    openUpdateDialog,
    openCreateDialog,
    closeFormDialog,
    deleteItem,
    refresh,
    refreshNoUpdate,
    tableOptions,
    isSingleSelectedItem,
    firstSelectedItem,
    updateDatatableItem,
    updateSelectedItems
  }))

  /* Titles */
  const getShowTitle = computed(() => {
    if (props.serviceName && typeof props.serviceName !== 'function') {
      const c = $myth.str.pascalCase($myth.str.pluralize(props.serviceName))
      return t('replace.show_details', { name: t(`choice.${c}`, 1) })
    }
    return t('show_details')
  })
  const getFormTitle = computed(() => {
    console.log(formMode.value)
    const name = props.serviceName && typeof props.serviceName !== 'function' ? t(`choice.${$myth.str.pascalCase($myth.str.pluralize(props.serviceName))}`, 1) : ''
    return t(`replace.${formMode.value}`, { name })
  })
  /* Titles */

  /** Methods */
  const getApiServices = (): Promise<AxiosResponse> | any => {
    if (typeof props.serviceName === 'function') {
      return props.serviceName()
    }
    return $myth.api.services[props.serviceName]
  }
  const updateSelectedItems = (selected: DatatableItem[]) => {
    Object.assign(tableOptions, { selected })
  }
  const onScroll = ({
    index,
    to
  }: any) => {
    if (index && to && index === to) {
      loadMore()
    }
  }
  const loadMore = () => {
    nextTick(() => {
      fetchDatatableItems({
        pagination: {
          ...paginationOptions.value,
          page: (paginationOptions.value.page ?? 0) + 1
        },
        filter: tableOptions.value.search
      })
    })
  }
  const refresh = (done?: () => void) => {
    return refreshNoUpdate(done)
    // (async () => {
    //   this.metaServer = reactive({ ...initMetaServer })
    //   tableOptions = reactive({ ...initTableOptions })
    //   this.paginationOptions = reactive({ ...initPaginationOptions })
    //   this.rows = reactive([])
    //   if (this.dialogs.value.filter) {
    //     this.dialogs.value.filter = !1
    //   }
    //   nextTick(() => {
    //     this.fetchDatatableItems({
    //       pagination: this.paginationOptions,
    //       filter: tableOptions.value.search
    //     })
    //     if (done) {
    //       done()
    //     }
    //     this.$emit('refresh')
    //   })
    // })()
  }
  const refreshNoUpdate = (done?: () => void) => {
    (async () => {
      Object.assign(metaServer, { ...initMetaServer })
      // tableOptions = reactive({ ...initTableOptions })
      Object.assign(paginationOptions, {
        page: 1,
        rowsNumber: 0
      })
      // paginationOptions = reactive({ ...this.paginationOptions, page: 1, rowsNumber: 0 })
      rows.value = []
      if (dialogs.value.filter) {
        dialogs.value.filter = !1
      }
      nextTick(() => {
        fetchDatatableItems({
          pagination: paginationOptions.value,
          filter: tableOptions.value.search
        })
        if (done) {
          done()
        }
        emit('refresh')
      })
    })()
  }
  const getRequestWith = (type: 'withIndex' | 'withShow' | 'withUpdate') => {
    let v = []
    const params: Record<string | number, any> | ((dt: any) => string[] | string) | string | undefined = props[type]
    if (params) {
      if (typeof params === 'string') {
        v = params.split(',')
      }

      if (_.isArray(params)) {
        v = [...params]
      } else if (_.isObject(params)) {
        v = [...Object.values(params)]
      } else if (_.isFunction(params)) {
        const f = params()
        v = typeof f === 'string' ? f.split(',') : f
      }
    }
    return v.join(',') ?? null
  }
  const getDatatableParams = ({
    pagination,
    filter
  }: FetchDatatableOptions = {}): DatatableParams => {
    return {
      filter: tableOptions.value.filter,
      search: filter || null,
      headers: getHeaders.value.map(e => e.name),
      ids: tableOptions.value.selected.map((e: any) => e.id),
      indexType: 'index',
      requestWith: undefined,
      itemsPerPage: pagination?.rowsPerPage === 0 ? -1 : (pagination?.rowsPerPage ?? 0),
      page: pagination?.page ?? 0,
      sortBy: pagination?.sortBy ?? undefined,
      sortDesc: pagination?.descending === !0 ? 1 : (pagination?.descending === !1 ? 0 : undefined)
      // sortBy: pagination?.sortBy ? [pagination?.sortBy] : undefined,
      // sortDesc: pagination?.sortBy ? [pagination?.descending] : undefined,
    }
  }
  const fetchDatatableItems = async (opts: FetchDatatableOptions = {}) => {
    // console.log(opts)
    if (props.endReach && metaServer.value.last_page && paginationOptions.value.page >= metaServer.value.last_page) {
      return
    }
    if (tableOptions.value.loading || !props.serviceName) return
    tableOptions.value.loading = !0
    nextTick(async () => {
      const params = getDatatableParams(opts)
      const requestWith = getRequestWith('withIndex')
      if (requestWith) {
        params.requestWith = requestWith
      }
      try {
        const {
          _data,
          _meta
        } = await getApiServices().index(params)
        paginationOptions.value.page = parseInt(_meta?.current_page) || 1
        paginationOptions.value.rowsPerPage = parseInt(_meta?.per_page) || 0
        paginationOptions.value.rowsNumber = parseInt(_meta?.total) || 0
        metaServer.value = _meta || {}
        if (props.endReach) {
          rows.value = [...rows.value, ...(_data || [])]
        } else {
          rows.value = _data || []
        }
      } catch (e: any) {
        if (e.response.status === 401) {
          logoutDatatable()
          return e
        }
        e?._message && $myth.alertError(e._message)
      } finally {
        tableOptions.value.loading = !1
      }
    })
  }
  const exportData = (type: 'pdf' | 'excel') => {
    if ($q.loading.isActive) {
      return
    }
    const ex = async () => {
      $q.loading.show()
      const data = {
        ...getDatatableParams({
          pagination: paginationOptions.value,
          filter: tableOptions.value.search
        }),
        indexType: type,
        toUrl: props.exportToUrl,
        headerItems: getHeaders.value.filter(e => e.field !== 'control')
      }
      try {
        const response = await getApiServices().export(data)
        $myth.downloadFromResponse(response)
      } catch (e: any) {
        e?._message && $myth.alertError(e._message)
      } finally {
        $q.loading.hide()
      }
    }
    if (!tableOptions.value.selected.length) {
      if (confirm(t('messages.export_all'))) {
        ex()
      }
    } else {
      ex()
    }
  }

  const openFilterDialog = () => {
    dialogs.value.filter = !0
    tableOptions.value.tempFilter = { ...tableOptions.value.filter }
  }
  const saveFilterDialog = () => {
    tableOptions.value.filter = { ...tableOptions.value.tempFilter }
    nextTick(() => {
      dialogs.value.filter = !1
    })
  }
  const closeFilterDialog = () => {
    dialogs.value.filter = !1
    tableOptions.value.tempFilter = { ...tableOptions.value.filter }
  }
  const removeFilter = (key: string /*, value:any */) => {
    const filter = tableOptions.value.filter
    delete filter[key]
    tableOptions.value.filter = { ...filter }
  }
  const router = useRouter()
  /** Show Dialog */
  const openShowDialog = async (item: DatatableItem, index?: MDatatableDialogIndex) => {
    if (props.showRoute) {
      router.push({
        name: props.showRoute,
        params: { id: item.id }
      })
      return
    }
    if ($q.loading.isActive) return
    $q.loading.show()
    try {
      const params = { requestWith: getRequestWith('withShow') }
      if (!params.requestWith) {
        delete params.requestWith
      }
      const { _data } = await getApiServices().show(item.id, { params })
      dialogs.value.item = _data
      dialogs.value.index = index
      dialogs.value.show = !0
      if (index !== undefined) {
        rows.value[index] = _data
      }
    } catch (e: any) {
      const message = e?._message || e?.message
      message && $myth.alertError(message)
    } finally {
      $q.loading.hide()
    }
  }
  const closeShowDialog = () => {
    dialogs.value.show = !1
    dialogs.value.item = null
    dialogs.value.index = undefined
  }
  /** Show Dialog */

  /** Form Dialog */
  const openUpdateDialog = async (item: DatatableItem, index?: MDatatableDialogIndex) => {
    if (props.updateRoute) {
      router.push({
        name: props.updateRoute,
        params: { id: item.id }
      })
      return
    }
    if ($q.loading.isActive) return
    $q.loading.show()
    try {
      isUpdateMode.value = !0
      const params = { requestWith: getRequestWith('withUpdate') }
      if (!params.requestWith) {
        delete params.requestWith
      }
      const { _data } = await getApiServices().show(item.id, { params })
      dialogs.value.item = _data
      dialogs.value.index = index
      dialogs.value.form = !0
      if (index !== undefined) {
        rows.value[index] = _data
      }
    } catch (e: any) {
      // console.log(e)
      const message = e?._message || e?.message
      message && $myth.alertError(message)
    } finally {
      $q.loading.hide()
    }
  }
  const openCreateDialog = (dtItem?: DatatableItem) => {
    if (props.createRoute) {
      router.push({
        name: props.createRoute
      })
      return
    }
    const item = { ...(props.defaultItem ?? {}), ...(dtItem ?? {}) }
    isUpdateMode.value = !1
    dialogs.value.item = Object.create(item)
    dialogs.value.index = undefined
    dialogs.value.form = !0
  }
  const closeFormDialog = () => {
    dialogs.value.form = !1
    nextTick(() => {
      isUpdateMode.value = !1
      dialogs.value.item = null
      dialogs.value.index = undefined
    })
  }
  /** Form Dialog */

  const updateDatatableItem = (item: DatatableItem, index?: MDatatableDialogIndex) => {
    if (item && index) {
      rows.value[index] = item
    }
    if (item && !index) {
      const findIndex = rows.value.findIndex(e => parseInt(e.id?.toString()) === parseInt(item.id.toString()))
      rows.value[findIndex] = item
      // const r = [...rows.value]
      // r[parseInt(findIndex.toString())] = item
      // rows.value = []
      // nextTick(() => {
      //   rows.value = [...r]
      // })
    }
  }
  const deleteDatatableItem = (e: DatatableItem | number) => {
    const byIndex = typeof e !== 'object'
    const id = byIndex ? e : e.id
    if (byIndex) {
      // rows.value = rows.value.filter((v, i) => i !== parseInt(id.toString()))
      delete rows.value[e]
    } else {
      rows.value = rows.value.filter((e) => parseInt(e.id?.toString()) !== parseInt(id.toString()))
    }
  }
  const defaultSubmitItem = async (form: Record<string, any>) => {
    if ($q.loading.isActive) return
    const api = getApiServices()
    // const isUpdate = isUpdateMode
    $q.loading.show()
    // console.log(form)
    form.requestWith = getRequestWith('withIndex')
    if (!form.requestWith) {
      delete form.requestWith
    }
    const method = async () => isUpdateMode.value ? await api.update(dialogs.value.item?.id, form) : await api.store(form)
    try {
      const {
        _data,
        _message,
        _success
      }: any = await method()
      _message && $myth.alertSuccess(_message)
      if (_success) {
        if (isUpdateMode.value) {
          // console.log(_data, this.dialogs.value.index)
          _data && updateDatatableItem(_data, dialogs.value.index)
          // emit('itemUpdated', {
          //   item: _data,
          //   index: dialogs.value.index
          // })
        } else {
          nextTick(() => refresh())
          // emit('itemCreated', { item: _data })
        }
        nextTick(() => closeFormDialog())
      }
    } catch (e: any) {
      const {
        _message,
        _errors
      } = e || {}
      _errors && (dialogs.value.errors = _errors)
      _message && $myth.alertError(_message)
    } finally {
      $q.loading.hide()
    }
    // console.log('defaultSubmitItem: ', form)
  }
  const deleteItem = (item: DatatableItem, index: number) => {
    if ($q.loading.isActive || !item?.id) return
    $myth.confirmMessage(t('messages.are_you_sure')).onOk(async () => {
      $q.loading.show()
      try {
        const {
          _message,
          _success
        } = await getApiServices().destroy(item.id)
        if (!props.noAutoMessage && _success && _message) {
          _message && $myth.alertSuccess(_message)
        }
        if (_success) {
          --paginationOptions.value.rowsNumber
          // emit('deletedItem', {
          //   item,
          //   index
          // })
          deleteDatatableItem(index)
        }
      } catch (e: any) {
        e?._message && $myth.alertError(e._message)
      } finally {
        $q.loading.hide()
        nextTick(() => {
          tableOptions.value.selected = []
        })
      }
      // console.log(item)
    })
  }
  const deleteSelectionItem = () => {
    if (!tableOptions.value.selected.length) return
    if (tableOptions.value.selected.length === 1) {
      const dtItem: DatatableItem = tableOptions.value.selected[0]
      const index = tableOptions.value.selected.findIndex((e: any) => parseInt(e.id) === parseInt(dtItem.id.toString()))
      return deleteItem(tableOptions.value.selected[0], index)
    }
    if ($q.loading.isActive || !tableOptions.value.selected.length) return
    $myth.confirmMessage(t('messages.are_you_sure')).onOk(async () => {
      $q.loading.show()
      try {
        const {
          _message,
          _success
        } = await getApiServices().destroyAll(tableOptions.value.selected.map((e: DatatableItem) => e.id))
        if (!props.noAutoMessage && _success && _message) {
          _message && $myth.alertSuccess(_message)
        }
        if (_success) {
          refresh()
        }
      } catch (e: any) {
        e?._message && $myth.alertError(e._message)
      } finally {
        $q.loading.hide()
        nextTick(() => {
          tableOptions.value.selected = []
        })
      }
      // console.log(item)
    })
  }
  // const rowDblclick = (e: Event, item: DatatableItem, index: number) => {
  //   e.preventDefault()
  //   openShowDialog(item, index)
  // }
  const logoutDatatable = () => {
    // const { logout, removeStorage } = $myth.store.state.
    // removeStorage()
    // logout(window.push_token)
    // const name = this.$routes.auth.login
    // if (this.$route.name !== name) {
    //   this.$router.replace({ name })
    // }
  }

  return {
    getHeaders,
    hasAddBtn,
    hasUpdateBtn,
    hasShowBtn,
    hasDestroyBtn,
    hasFilterDialog,
    hasMenu,

    isUpdateMode,
    formMode,
    isSingleSelectedItem,
    firstSelectedItem,
    hasSelectedItem,

    datatableItemsScope,

    getApiServices,
    updateSelectedItems,
    onScroll,
    loadMore,
    refresh,
    refreshNoUpdate,
    getRequestWith,
    getDatatableParams,
    fetchDatatableItems,
    exportData,
    openFilterDialog,
    saveFilterDialog,
    closeFilterDialog,
    openShowDialog,
    closeShowDialog,
    openUpdateDialog,
    openCreateDialog,
    closeFormDialog,
    updateDatatableItem,
    deleteDatatableItem,
    defaultSubmitItem,
    deleteItem,
    deleteSelectionItem,
    getShowTitle,
    getFormTitle,
    // rowDblclick,
    removeFilter,
    logoutDatatable
  }
}
