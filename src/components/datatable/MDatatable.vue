<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <div class="m--datatable-component">
    <q-menu
      v-model="contextmenu"
      context-menu
      max-width="300px"
      touch-position
      v-bind="$myth.vueConfig.dt?.contextmenu?.menu"
    >
      <q-list
        v-bind="$myth.vueConfig.dt?.contextmenu?.list"
      >
        <template
          v-for="(contextmenuItem,i) in contextmenuItems"
          :key="i"
        >
          <MDtBtn
            v-if="contextmenuItem.showIf !== !1"
            list-item
            v-bind="{...($myth.vueConfig.dt?.contextmenu?.btn||{}),...(contextmenuItem.attr||{})}"
            @click="contextmenuItem.click ? contextmenuItem.click(dialogs.item,dialogs.index) : undefined"
            :[contextmenuItem.name]="!0"
          >
            {{ $t(contextmenuItem.name) }}
          </MDtBtn>
        </template>
      </q-list>
    </q-menu>
    <q-pull-to-refresh
      :no-mouse="noMouse"
      color="primary"
      @refresh="refresh"
    >
      <q-table
        ref="table"
        v-model:pagination="pagination"
        v-model:selected="selected"
        :class="`m--datatable ` + ($q.screen.lt.md ? 'm--datatable-grid' : '')"
        :columns="getHeaders"
        :filter="tableOptions.search"
        :grid="grid === undefined ? $q.screen.lt.md : grid"
        :hide-pagination="endReach"
        :loading="tableOptions.loading"
        :rows="getRows"
        :rows-per-page-options="getRowsPerPageOptions"
        :selection="hideSelection !== !0 ? (singleSelection ? 'single' : 'multiple') : 'none'"
        :title="title"
        card-container-class="m--datatable-container"
        table-class="m--datatable-container"
        v-bind="$myth.vueConfig.dt?.props"
        @request="fetchDatatableItems"
        @virtual-scroll="endReach ? onScroll : undefined"
        @row-contextmenu="onRowContextmenu"
      >
        <template #top>
          <div class="col-all">
            <!--<q-page-scroller
              :offset="[0,0]"
              :scroll-offset="50"
              position="top-left"
              style="z-index: 1001"
              expand
            >
              <div
                style="min-height: 76px;"
                class="bg-black"
              >
                asfsd
              </div>
            </q-page-scroller>-->
            <div>
              <div class="row q-col-gutter-sm items-center justify-between">
                <div
                  :class="{'col-12':$q.screen.xs, 'col-auto': !$q.screen.xs,'self-start':!0}"
                  v-show="Boolean(title)"
                >
                  <div
                    class="text-h5"
                    v-text="title"
                  />
                </div>
                <MInput
                  v-if="hideSearch !== !1"
                  v-model="tableOptions.search"
                  :debounce="searchDebounce"
                  autocomplete="none"
                  class="self-start"
                  col="12"
                  sm="9"
                  md="6"
                  lg="6"
                  dense
                  name="search"
                  outlined
                  placeholder="myth.datatable.searchInput"
                  v-bind="$myth.vueConfig.dt?.searchInputProps"
                >
                  <template #prepend>
                    <q-icon
                      v-if="!tableOptions.search"
                      name="search"
                    />
                    <q-icon
                      v-else
                      class="cursor-pointer"
                      name="clear"
                      @click="tableOptions.search = ''"
                    />
                  </template>
                </MInput>
                <MCol
                  col="12"
                  sm="auto"
                >
                  <div class="row q-gutter-x-sm">
                    <MDtBtn
                      v-if="hasFilterDialog"
                      icon="o_filter_alt"
                      @click="openFilterDialog()"
                      v-bind="$myth.vueConfig.dt?.buttons?.filter"
                    >
                      <q-tooltip class="touch-hide">
                        {{ $t('filter') }}
                      </q-tooltip>
                    </MDtBtn>
                    <MDtBtn
                      v-if="hasMenu"
                      icon="o_more_vert"
                      v-bind="$myth.vueConfig.dt?.buttons?.more"
                    >
                      <q-tooltip class="touch-hide">
                        {{ $t('more') }}
                      </q-tooltip>
                      <q-menu
                        v-bind="$myth.vueConfig.dt?.buttons?.moreMenu"
                      >
                        <q-list
                          style="min-width: 250px"
                          v-bind="$myth.vueConfig.dt?.buttons?.moreList"
                        >
                          <template v-if="hasAddBtn">
                            <q-item
                              v-close-popup
                              clickable
                              @click="openCreateDialog()"
                              v-bind="$myth.vueConfig.dt?.buttons?.moreItem"
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
                          </template>
                          <template v-if="hasFilterDialog">
                            <q-item
                              v-close-popup
                              clickable
                              @click="openFilterDialog()"
                              v-bind="$myth.vueConfig.dt?.buttons?.moreItem"
                            >
                              <q-item-section thumbnail>
                                <q-icon
                                  color="blue"
                                  name="filter_alt"
                                  right
                                  size="xs"
                                />
                              </q-item-section>
                              <q-item-section>
                                <span>
                                  {{ $t('filter') }}
                                </span>
                              </q-item-section>
                            </q-item>
                          </template>
                          <template v-if="pdf">
                            <q-item
                              v-close-popup
                              clickable
                              @click="exportData('pdf')"
                              v-bind="$myth.vueConfig.dt?.buttons?.moreItem"
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
                                  {{ $t('export_pdf') }}
                                  <q-badge
                                    v-if="tableOptions.selected.length>1"
                                    :label="tableOptions.selected.length"
                                    align="top"
                                    rounded
                                  />
                                </span>
                              </q-item-section>
                            </q-item>
                          </template>
                          <template v-if="excel">
                            <q-item
                              v-close-popup
                              clickable
                              @click="exportData('excel')"
                              v-bind="$myth.vueConfig.dt?.buttons?.moreItem"
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
                                  {{ $t('export_excel') }}
                                  <q-badge
                                    v-if="tableOptions.selected.length>1"
                                    :label="tableOptions.selected.length"
                                    align="top"
                                    rounded
                                  />
                                </span>
                              </q-item-section>
                            </q-item>
                          </template>
                        </q-list>
                      </q-menu>
                    </MDtBtn>
                    <MDtBtn
                      :disabled="tableOptions.loading"
                      icon="o_refresh"
                      @click="refreshNoUpdate()"
                      v-bind="$myth.vueConfig.dt?.buttons?.refresh"
                    >
                      <q-tooltip
                        v-if="!tableOptions.loading"
                        class="touch-hide"
                      >
                        {{ $t('refresh') }}
                      </q-tooltip>
                    </MDtBtn>
                  </div>
                </MCol>
                <MFadeTransition>
                  <MCol
                    v-if="Object.values(tableOptions.filter).filter(e => Boolean(e)).length > 0"
                    col="12"
                  >
                    <MRow class="items-center">
                      <MCol col="auto">
                        <span class="text-subtitle1 q-mr-sm">{{ $t('myth.datatable.filteredBy') }}</span>
                      </MCol>
                      <template
                        v-for="(filterValue,filterKey) in tableOptions.filter"
                        :key="`filter-${filterKey}`"
                      >
                        <MCol
                          v-if="Boolean(filterValue)"
                          col="auto"
                        >
                          <q-chip
                            clickable
                            color="primary"
                            icon-remove="clear"
                            outline
                            removable
                            @click="openFilterDialog"
                            @remove="onRemoveFilter(filterKey)"
                            class="q-pr-md"
                          >
                            <span>{{ $t(`attributes.${filterKey}`) }}</span>
                            <span v-if="typeof filterValue === 'string'">: {{ filterValue }}</span>
                          </q-chip>
                        </MCol>
                      </template>
                    </MRow>
                  </MCol>
                </MFadeTransition>
              </div>
              <div
                class="row items-center q-gutter-xs order-last order-sm-first"
                v-show="hasSelectedItem"
              >
                <div class="col-12">
                  <q-separator />
                </div>
                <slot
                  name="tools"
                  :dt="datatableItemsScope"
                >
                  <MDtBtn
                    v-if="hasUpdateBtn && isSingleSelectedItem"
                    :disable="!isSingleSelectedItem || tableOptions.loading"
                    :loading="tableOptions.loading"
                    fab-mini
                    flat
                    icon="o_edit"
                    round
                    tooltip="update"
                    @click="openUpdateDialog(tableOptions.selected[0])"
                    v-bind="$myth.vueConfig.dt?.topSelection?.btn"
                  />
                  <MDtBtn
                    v-if="hasShowBtn && isSingleSelectedItem"
                    :disable="!isSingleSelectedItem || tableOptions.loading"
                    :loading="tableOptions.loading"
                    fab-mini
                    flat
                    icon="o_visibility"
                    round
                    tooltip="show"
                    @click="openShowDialog(tableOptions.selected[0])"
                    v-bind="$myth.vueConfig.dt?.topSelection?.btn"
                  />
                  <MDtBtn
                    v-if="hasDestroyBtn && isSingleSelectedItem"
                    :disable="!hasSelectedItem || tableOptions.loading"
                    :loading="tableOptions.loading"
                    fab-mini
                    flat
                    icon="delete_outline"
                    round
                    tooltip="destroy"
                    @click="deleteSelectionItem()"
                    v-bind="$myth.vueConfig.dt?.topSelection?.btn"
                  />
                  <template v-for="(contextBtn,i) in contextItems">
                    <MBtn
                      v-if="contextBtn.showIf !== !1 && ( (contextBtn.click && isSingleSelectedItem) || (contextBtn.multiClick && !isSingleSelectedItem) )"
                      :key="`top-s-${i.toString()}`"
                      v-bind="{...(contextBtn.attr||{}),...($myth.vueConfig.dt?.topSelection?.btn||{})}"
                      @click="contextBtn.click ? contextBtn.click(tableOptions.selected[0],0) : (contextBtn.multiClick ? contextBtn.multiClick(tableOptions.selected) : undefined)"
                    >
                      {{ $t(contextBtn.name) }}
                    </MBtn>
                  </template>
                </slot>
                <slot
                  name="selection"
                  :dt="datatableItemsScope"
                />
              </div>
            </div>
          </div>
        </template>

        <template
          v-if="endReach"
          #bottom
        >
          <q-space />
          <div v-text="$t('replace.from_name', { from: pagination.rowsNumber, name: getRows.length })" />
        </template>
        <template
          v-for="(slotVal,slotName) in $slots"
          :key="slotName"
          #[slotName]="inputSlot"
        >
          <slot
            v-if="inputSlot"
            :dt="datatableItemsScope"
            :name="slotName"
            v-bind="inputSlot"
          />
          <slot
            v-else-if="slotName !== 'default'"
            :name="slotName"
          />
        </template>
      </q-table>
      <slot />
    </q-pull-to-refresh>

    <!-- Filter dialog -->
    <q-dialog
      v-model="dialogs.filter"
      allow-focus-outside
      full-width
      no-backdrop-dismiss
      persistent
      transition-show="slide-down"
      transition-hide="slide-up"
      position="top"
      v-bind="$myth.vueConfig.dt?.filterDialogProps"
    >
      <q-card class="m--dialog-card">
        <q-card-section>
          <p
            class="text-h6"
            v-text="$t('filter')"
          />
        </q-card-section>
        <q-separator />
        <q-card-section
          :style="`max-height: ${$q.screen.height-300}px`"
          class="scroll"
        >
          <slot
            name="filter"
            v-bind="{filter:tableOptions.tempFilter}"
          />
        </q-card-section>
        <q-separator />
        <q-card-actions
          align="between"
          class="print-hide"
        >
          <MBtn
            :label="$t('cancel')"
            color="negative"
            v-bind="$myth.vueConfig.dt?.dialogButtonsProps"
            @click="closeFilterDialog"
          />
          <MBtn
            :label="$t('save')"
            color="positive"
            v-bind="$myth.vueConfig.dt?.dialogButtonsProps"
            @click="saveFilterDialog"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Show dialog -->
    <q-dialog
      v-model="dialogs.show"
      allow-focus-outside
      no-backdrop-dismiss
      maximized
      persistent
      transition-show="slide-down"
      transition-hide="slide-up"
      v-bind="$myth.vueConfig.dt?.showDialogProps"
    >
      <q-card class="m--dialog-card">
        <q-card-section>
          <q-toolbar>
            <q-toolbar-title>{{ getShowTitle }}</q-toolbar-title>
          </q-toolbar>
        </q-card-section>
        <q-separator />
        <q-card-section class="scroll">
          <slot
            name="show"
            v-bind="{item:dialogs.item,index:dialogs.index}"
          />
        </q-card-section>
        <q-separator />
        <q-card-actions
          align="right"
          class="print-hide"
        >
          <MBtn
            :label="$t('close')"
            color="negative"
            v-bind="$myth.vueConfig.dt?.dialogButtonsProps"
            @click="closeShowDialog"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Form dialog -->
    <q-dialog
      v-model="dialogs.form"
      allow-focus-outside
      no-backdrop-dismiss
      maximized
      persistent
      transition-show="slide-down"
      transition-hide="slide-up"
      v-bind="$myth.vueConfig.dt?.formDialogProps"
    >
      <q-card class="m--dialog-card">
        <MForm
          v-slot="form"
          :initial-errors="dialogs.errors"
          :initial-values="dialogs.item"
          @submit="defaultSubmitItem"
        >
          <q-card-section>
            <q-toolbar>
              <q-toolbar-title>
                <q-btn
                  v-if="$myth.vueConfig.dt?.formDialogProps?.maximized"
                  :icon="!$q.lang.rtl ?'arrow_back_ios' : 'arrow_forward_ios'"
                  fab-mini
                  flat
                  @click="closeFormDialog"
                />
                {{ getFormTitle }}
              </q-toolbar-title>
            </q-toolbar>
          </q-card-section>
          <q-separator />
          <q-card-section
            :style="`max-height: ${$q.screen.height- ($myth.vueConfig.dt?.formDialogProps?.maximized ? 140 : 300)}px`"
            class="scroll"
          >
            <slot
              name="form"
              v-bind="datatableItemsScope"
              :item-ref="dialogs.item"
              :item="dialogs.itemForm"
              :index="dialogs.index"
              :form="form"
            />
          </q-card-section>
          <q-separator />
          <q-card-actions
            align="between"
            class="m--datatable-form-actions print-hide"
          >
            <MBtn
              :disable="tableOptions.loading"
              :label="$t('close')"
              color="negative"
              v-bind="$myth.vueConfig.dt?.dialogButtonsProps"
              @click="closeFormDialog"
            />
            <slot
              name="form-actions"
              v-bind="datatableItemsScope"
              :item="dialogs.item"
              :index="dialogs.index"
              :form="form"
            >
              <MBtn
                :disable="tableOptions.loading "
                :label="$t(isUpdateMode ? 'save' : 'create')"
                :loading="tableOptions.loading"
                color="positive"
                type="submit"
                v-bind="$myth.vueConfig.dt?.dialogButtonsProps"
              />
            </slot>
          </q-card-actions>
        </MForm>
      </q-card>
    </q-dialog>

    <MFadeTransition>
      <q-page-sticky
        v-if="hasAddBtn && $myth.vueConfig.dt?.fabBtn?.hide !== !1"
        :offset="$myth.vueConfig.dt?.fabBtn?.offset|| [25,25]"
        :position="$myth.vueConfig.dt?.fabBtn?.position || 'bottom-right'"
        v-bind="$myth.vueConfig.dt?.fabBtn?.pageStickyProps"
      >
        <q-btn
          color="primary"
          fab
          icon="add"
          v-bind="$myth.vueConfig.dt?.fabBtn?.buttonProps"
          @click="openCreateDialog()"
        >
          <q-tooltip
            anchor="top start"
            class="m--datatable-fab-tooltip"
          >
            <span class="text-caption">{{ getFormTitle }}</span>
          </q-tooltip>
        </q-btn>
      </q-page-sticky>
    </MFadeTransition>
  </div>
</template>

<script lang="ts">

import { useQuasar } from 'quasar'
import { computed, nextTick, onMounted, PropType, reactive, ref, useSlots, watch } from 'vue'
import { useMyth } from '../../vue3'
import _ from 'lodash'
import { useRouter } from 'vue-router'
import {
  ApiServiceParams,
  FetchRowsArgs,
  GenericMDtBtn,
  MDatatableDialogsOptions,
  MDatatableFilterForm,
  MDatatableMetaServer,
  MDatatableOptions,
  MDatatablePagination,
  MDatatableProps,
  MDtApiServices,
  MDtExportOptions,
  MDtItem,
  MDtItemIndex,
  MDtRequestParamsCallbackProp,
  MDtRequestParamsObjectProp,
  MDtServiceNameCallbackProp
} from './models'
import { useI18n } from 'vue-i18n'

export const initPaginationOptions: MDatatablePagination = {
  sortBy: undefined,
  descending: undefined,
  page: 1,
  rowsPerPage: 50,
  rowsNumber: 0
}
export const initMetaServer: MDatatableMetaServer = {
  current_page: null,
  last_page: null,
  total: null
}

export default {
  name: 'MDatatable',
  inheritAttrs: !1,
  props: {
    defaultItem: {
      // type: Object as PropType<Partial<(MDtItem & Record<string | number | symbol, unknown>)>>,
      type: Object as PropType<Partial<MDatatableProps['defaultItem']>>,
      default: () => undefined
    },
    contextItems: {
      type: Array as PropType<MDatatableProps['contextItems']>,
      default: () => undefined
    },
    hideAutoMessage: {
      type: Boolean as PropType<MDatatableProps['hideAutoMessage']>,
      default: () => !1
    },
    headers: {
      type: Array as PropType<MDatatableProps['headers']>,
      required: !0,
      default: () => ([])
    },
    rows: {
      type: Array,
      default: () => ([])
    },
    serviceName: {
      type: [String, Function as PropType<MDtServiceNameCallbackProp>],
      default: () => undefined
    },
    requestParams: {
      type: [Function as PropType<MDtRequestParamsCallbackProp>, Object as PropType<MDtRequestParamsObjectProp>],
      default: () => undefined
    },
    pdf: {
      type: Boolean,
      default: () => !0
    },
    excel: {
      type: Boolean,
      default: () => !0
    },
    exportToUrl: {
      type: Boolean,
      default: () => !0
    },
    hideSearch: {
      type: Boolean as PropType<MDatatableProps['hideSearch']>,
      default: () => undefined
    },
    searchDebounce: {
      type: [String, Number],
      default: () => 600
    },
    withIndex: {
      type: [String, Array],
      default: () => undefined
    },
    withStore: {
      type: [String, Array],
      default: () => undefined
    },
    withShow: {
      type: [String, Array],
      default: () => undefined
    },
    withUpdate: {
      type: [String, Array],
      default: () => undefined
    },
    hideAddBtn: {
      type: Boolean,
      default: () => undefined
    },
    hideUpdateBtn: {
      type: Boolean,
      default: () => undefined
    },
    hideShowBtn: {
      type: Boolean,
      default: () => undefined
    },
    hideDestroyBtn: {
      type: Boolean,
      default: () => undefined
    },
    createRoute: {
      type: String,
      default: () => undefined
    },
    updateRoute: {
      type: String,
      default: () => undefined
    },
    showRoute: {
      type: String,
      default: () => undefined
    },
    noMouse: {
      type: Boolean,
      default: () => !0
    },
    endReach: {
      type: Boolean,
      default: () => !1
    },
    hideSelection: {
      type: Boolean,
      default: () => !1
    },
    singleSelection: {
      type: Boolean,
      default: () => !0
    },
    rowsPerPageOptions: {
      type: Array as PropType<MDatatableProps['rowsPerPageOptions']>,
      default: () => [50, 250, 500, 0]
    },
    excludedKeys: {
      type: [String, Function],
      default: () => undefined
    },
    // Style
    grid: {
      type: Boolean,
      default: () => undefined
    },
    title: {
      type: String,
      default: () => undefined
    }
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  setup (props) {
    const myth = useMyth()
    const slots = useSlots()
    const router = useRouter()
    const $q = useQuasar()
    const serviceName = computed(() => props.serviceName)
    const { t } = useI18n({ useScope: 'global' })
    router.beforeResolve(() => {
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
      // console.log(dialogs.filter, dialogs.show, dialogs.form)
      return !hasAction.value
    })
    const getRows = ref<MDtItem[]>([])
    const filterDialogModel = ref(!1)
    const showDialogModel = ref(!1)
    const formDialogModel = ref(!1)
    const isUpdateDialog = ref(!1)
    const itemDialog = ref<MDtItem | null>(null)
    const itemIndexDialog = ref<MDtItemIndex>()
    const errorsDialog = ref<Record<string | number | symbol, any>>({})
    const dialogs = reactive<MDatatableDialogsOptions>({
      filter: filterDialogModel,
      show: showDialogModel,
      form: formDialogModel,
      isUpdate: isUpdateDialog,
      item: itemDialog,
      itemForm: null,
      index: itemIndexDialog,
      errors: errorsDialog
    })

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
    const hasAction = ref<boolean>(!1)

    const tableOptions = reactive<MDatatableOptions>({
      search,
      loading,
      pagination,
      meta,
      filter: filterForm,
      tempFilter: tempFilterForm,
      selected,
      hasAction
    })

    /** --- */
    const headersProp = computed(() => props.headers)
    // const getHeaders = computed<QTableProps['columns'][]>(() => myth.parseHeaders(headersProp.value) ?? [])
    const getHeaders = computed<any[]>(() => myth.parseHeaders(headersProp.value) ?? [])

    const hasAddBtn = computed<boolean>(() => {
      if (props.hideAddBtn) {
        return !1
      }
      return Boolean(slots.form) || Boolean(props.createRoute)
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
    const formMode = computed<'update' | 'create'>(() => isUpdateMode.value ? 'update' : 'create')
    const isSingleSelectedItem = computed<boolean>(() => tableOptions.selected.length === 1)
    const firstSelectedItem = computed<MDtItem>(() => tableOptions.selected[0])
    const hasSelectedItem = computed<boolean>(() => tableOptions.selected.length > 0)

    /* Titles */
    const getShowTitle = computed(() => {
      if (serviceName.value && typeof serviceName.value !== 'function') {
        const c = myth.str.pascalCase(myth.str.pluralize(serviceName.value.split('/').pop()))
        return t('replace.show_details', { name: t(`choice.${c}`, 1) })
      }
      return t('show_details')
    })
    const getFormTitle = computed(() => {
      const name = serviceName.value && typeof serviceName.value !== 'function' ? t(`choice.${myth.str.pascalCase(myth.str.pluralize(serviceName.value.split('/').pop()))}`, 1) : ''
      return t(`replace.${formMode.value}`, { name })
    })
    /* Titles */

    /** Methods */
    const getApiServices = (): MDtApiServices => {
      if (typeof serviceName.value === 'function') {
        return serviceName.value()
      }
      const c = myth.api.services[serviceName.value]
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
    const refreshNoUpdate = async (done?: () => void) => {
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
    }
    const refresh = (done?: () => void) => {
      return refreshNoUpdate(done)
    }
    const getRequestWith = (type: 'withIndex' | 'withShow' | 'withUpdate' | 'withStore') => {
      let v: any = []
      const params: Record<string | symbol | number, unknown> | string | (() => (string[] | string)) | undefined = props[type]
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

    const getDatatableParams = ({ pagination, filter }: FetchRowsArgs = {}): ApiServiceParams => {
      let params: ApiServiceParams = {
        filter: tableOptions.filter,
        search: filter || null,
        headers: getHeaders.value.map((e: any) => e.name),
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
    const fetchDatatableItems = async (opts: FetchRowsArgs = {}) => {
      if (props.endReach && tableOptions.meta.last_page && tableOptions.pagination.page >= tableOptions.meta.last_page) {
        return
      }
      if (tableOptions.loading || !serviceName.value) return
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
          console.log(e)
          if (e?.response?.status === 401) {
            logoutDatatable()
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
    const exportData = (type: MDtExportOptions) => {
      if (loading.value) {
        return
      }
      const ex = async () => {
        loading.value = !0
        const data = {
          ...getDatatableParams({
            pagination: tableOptions.pagination,
            filter: tableOptions.search
          }),
          indexType: type,
          toUrl: props.exportToUrl,
          headerItems: getHeaders.value.filter((e) => e?.field !== 'control')
        }
        try {
          const response = await getApiServices().export(data)
          myth.helpers.downloadFromResponse(response)
        } catch (e: any) {
          e?._message && myth.alertError(e._message)
        } finally {
          loading.value = !1
        }
      }
      if (!tableOptions.selected.length) {
        myth.confirmMessage(t('messages.export_all')).onOk(() => {
          ex()
        })
        // if (confirm(t('messages.export_all'))) {
        //   ex()
        // }
      } else {
        ex()
      }
    }

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
    }
    const updateFilterOptions = (data: Record<string, any>) => {
      filterForm.value = {
        ...tableOptions.filter,
        ...data
      }
    }
    /** Show Dialog */
    const openShowDialog = async (item: MDtItem, index?: MDtItemIndex) => {
      if (props.showRoute) {
        router.push({
          name: props.showRoute,
          params: { id: item.id }
        })
        return
      }
      if (loading.value) {
        return
      }
      loading.value = !0
      try {
        const params = { requestWith: getRequestWith('withShow') }
        if (!params.requestWith) {
          delete params.requestWith
        }
        if (!index) {
          index = getRows.value.findIndex(e => e.id === item.id)
        }
        const { _data } = await getApiServices().show(item.id, { params })
        dialogs.item = _data
        dialogs.index = index
        dialogs.show = !0
        if (index !== undefined) {
          getRows.value[index] = _data
        }
      } catch (e: any) {
        const message = e?._message || e?.message
        message && myth.alertError(message)
      } finally {
        loading.value = !1
      }
    }
    const closeShowDialog = () => {
      dialogs.show = !1
      dialogs.item = null
      dialogs.index = undefined
    }
    /** Show Dialog */

    /** Form Dialog */
    const openUpdateDialog = async (item: MDtItem, index?: MDtItemIndex) => {
      if (props.updateRoute) {
        router.push({
          name: props.updateRoute,
          params: { id: item.id }
        })
        return
      }
      if (loading.value) {
        return
      }
      loading.value = !0
      try {
        isUpdateMode.value = !0
        const params = { requestWith: getRequestWith('withUpdate') }
        if (!params.requestWith) {
          delete params.requestWith
        }
        if (!index) {
          index = getRows.value.findIndex(e => e.id === item.id)
        }
        const { _data } = await getApiServices().show(item.id, { params })
        dialogs.item = _data
        dialogs.index = index
        dialogs.form = !0
        if (index !== undefined) {
          getRows.value[index] = _data
        }
      } catch (e: any) {
        // console.log(e)
        const message = e?._message || e?.message
        message && myth.alertError(message)
      } finally {
        loading.value = !1
      }
    }
    const openCreateDialog = (dtItem?: MDtItem) => {
      if (props.createRoute) {
        router.push({
          name: props.createRoute
        })
        return
      }
      const item = { ...(props.defaultItem ?? {}), ...(dtItem ?? {}) }
      isUpdateMode.value = !1
      dialogs.item = Object.create(item)
      dialogs.index = undefined
      dialogs.form = !0
    }
    const closeFormDialog = () => {
      dialogs.form = !1
      nextTick(() => {
        isUpdateMode.value = !1
        dialogs.item = null
        dialogs.index = undefined
      })
    }
    /** Form Dialog */

    const updateDatatableItem = (item: MDtItem, index?: MDtItemIndex) => {
      if (item && index) {
        getRows.value[index] = item
      }
      if (item && !index) {
        const findIndex = getRows.value.findIndex(e => parseInt(e.id?.toString()) === parseInt(item.id.toString()))
        getRows.value[findIndex] = item
        // const r = [...getRows.value]
        // r[parseInt(findIndex.toString())] = item
        // getRows.value = []
        // nextTick(() => {
        //   getRows.value = [...r]
        // })
      }
    }
    const removeDtItem = (e: MDtItem | number) => {
      const byIndex = typeof e !== 'object'
      const id: string | number = byIndex ? e : e.id
      if (byIndex) {
        getRows.value = getRows.value.filter((e, i) => i !== id)
      } else {
        getRows.value = getRows.value.filter((e) => parseInt(e.id?.toString()) !== parseInt(id.toString()))
      }
    }
    const defaultSubmitItem = async (_form: Record<string, any>) => {
      let form = { ..._form }
      if (loading.value) {
        return
      }
      loading.value = !0
      const api = getApiServices()
      // console.log(form)
      form.requestWith = getRequestWith(isUpdateMode.value ? 'withUpdate' : 'withIndex')
      if (!form.requestWith) {
        delete form.requestWith
      }
      if (props.excludedKeys) {
        if (typeof props.excludedKeys === 'function') {
          form = props.excludedKeys(form)
        } else {
          for (const k in props.excludedKeys) {
            delete form[props.excludedKeys[k]]
          }
        }
      }
      const method = async () => isUpdateMode.value ? await api.update(dialogs.item?.id, form) : await api.store(form)
      try {
        const {
          _data,
          _message,
          _success
        }: any = await method()
        _message && myth.alertSuccess(_message)
        if (_success) {
          if (isUpdateMode.value) {
            // console.log(_data, this.dialogs.index)
            _data && updateDatatableItem(_data, dialogs.index)
            // emit('itemUpdated', {
            //   item: _data,
            //   index: dialogs.index
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
        _errors && (dialogs.errors = _errors)
        _message && myth.alertError(_message)
      } finally {
        loading.value = !1
      }
      // console.log('defaultSubmitItem: ', form)
    }
    const hideAutoMessage = computed(() => props.hideAutoMessage)
    const onDeleteItem = (item: MDtItem, index: number) => {
      if (loading.value || !item?.id) {
        return
      }
      tableOptions.hasAction = !0
      myth.confirmMessage(t('messages.confirm_delete')).onOk(async () => {
        loading.value = !0
        try {
          const { _message, _success } = await getApiServices().destroy(item.id)
          if (!hideAutoMessage.value && _success && _message) {
            _message && myth.alertSuccess(_message)
          }
          if (_success) {
            --tableOptions.pagination.rowsNumber
            removeDtItem(index)
          }
        } catch (e: any) {
          e?._message && myth.alertError(e._message)
        } finally {
          loading.value = !1
          nextTick(() => {
            selected.value = []
          })
        }
      }).onDismiss(() => {
        tableOptions.hasAction = !1
      })
    }
    const deleteSelectionItem = () => {
      if (!tableOptions.selected.length) return
      if (tableOptions.selected.length === 1) {
        const dtItem: MDtItem = tableOptions.selected[0]
        const index = getRows.value.findIndex((e: any) => parseInt(e.id) === parseInt(dtItem.id.toString()))
        return onDeleteItem(dtItem, index)
      }
      if (loading.value || !tableOptions.selected.length) {
        return
      }

      tableOptions.hasAction = !0
      myth.confirmMessage(t('messages.confirm_delete')).onOk(async () => {
        loading.value = !0
        try {
          const {
            _message,
            _success
          } = await getApiServices().destroyAll(tableOptions.selected.map((e: MDtItem) => e.id))
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
          nextTick(() => {
            selected.value = []
          })
        }
        // console.log(item)
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
    const onRowContextmenu = (e: Event, row: MDtItem, index: number) => {
      e.preventDefault()
      dialogs.item = row
      dialogs.index = index
      nextTick(() => {
        contextmenu.value = !0
      })
    }
    const contextmenuItems = computed<GenericMDtBtn[]>(() => ([
      {
        name: 'update',
        click: (item: MDtItem, index: number) => openUpdateDialog(item, index),
        showIf: hasUpdateBtn.value
      },
      {
        name: 'show',
        click: (item: MDtItem, index: number) => openShowDialog(item, index),
        showIf: hasShowBtn.value
      },
      {
        name: 'destroy',
        click: (item: MDtItem, index: number) => onDeleteItem(item, index),
        showIf: hasDestroyBtn.value
      },
      ...(props.contextItems || [])
    ].sort((a: GenericMDtBtn, b: GenericMDtBtn) => (a.order ?? 0) - (b.order ?? 0))))
    const endReach = computed<boolean>(() => props.endReach)
    const rowsPerPageOptions = computed<any[]>(() => props.rowsPerPageOptions)
    const getRowsPerPageOptions = computed<any[]>(() => endReach.value ? [0] : (rowsPerPageOptions.value || [0]))

    onMounted(() => {
      refresh()
    })

    watch(loading, v => {
      if (v) {
        $q.loading.show()
      } else {
        $q.loading.hide()
      }
      tableOptions.hasAction = Boolean(v)
    })
    watch(filterForm, () => refreshNoUpdate())
    watch(() => $q.lang.nativeName, () => {
      refreshNoUpdate()
    })

    // Watch on Form dialog
    watch(() => dialogs.item, (v, o) => {
      dialogs.itemForm = v ? { ...v } : v
    })
    const datatableItemsScope = computed(() => ({
      openShowDialog,
      closeShowDialog,
      openUpdateDialog,
      openCreateDialog,
      closeFormDialog,
      onDeleteItem,
      refresh,
      refreshNoUpdate,
      tableOptions,
      isSingleSelectedItem,
      firstSelectedItem,
      updateDatatableItem,
      updateSelectedItems
    }))

    return {
      contextmenuItems,
      dialogs,
      contextmenu,
      onRowContextmenu,
      getRowsPerPageOptions,

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
      removeDtItem,
      defaultSubmitItem,
      onDeleteItem,
      deleteSelectionItem,
      getShowTitle,
      getFormTitle,
      // rowDblclick,
      onRemoveFilter,
      updateFilterOptions,
      logoutDatatable,

      selected,
      pagination,
      tableOptions,
      getRows
    }
  }
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
    top: 49px

.m--dialog-card
  .q-card__actions
    .q-btn
      padding: 4px 16px !important

.m--datatable-component

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

</style>
