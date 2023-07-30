<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <div class="m--datatable-component">
    <q-popup-proxy
      :v-model="contextmenu"
      context-menu
      max-width="300px"
      touch-position
      v-bind="$myth.options.dt?.contextmenu?.menu"
      @before-hide="resetDialogs()"
    >
      <q-list
        v-show="dialogs.item"
        v-bind="$myth.options.dt?.contextmenu?.list"
      >
        <template
          v-for="(contextmenuItem,i) in contextmenuItems"
          :key="i"
        >
          <MDtBtn
            v-if="contextmenuItem.showIf !== !1"
            :[contextmenuItem.name]="!0"
            :label="$t(contextmenuItem.name)"
            list-item
            v-bind="{...($myth.options.dt?.contextmenu?.btn||{}),...(contextmenuItem.attr||{})}"
            @click="contextmenuItem.click ? contextmenuItem.click(dialogs.item,dialogs.index) : undefined"
          />
        </template>
      </q-list>
    </q-popup-proxy>
    <q-pull-to-refresh
      :no-mouse="noMouse"
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
        :grid="grid === undefined ? $q.screen.lt.md : grid"
        :hide-pagination="endReach"
        :loading="tableOptions.loading"
        :rows="getRows"
        :rows-per-page-options="getRowsPerPageOptions"
        :selection="hideSelection !== !0 ? (singleSelection ? 'single' : 'multiple') : 'none'"
        :title="title"
        :visible-columns="visibleHeaders"
        card-container-class="m--datatable-container"
        table-class="m--datatable-container"
        v-bind="$myth.options.dt?.props"
        @request="fetchDatatableItems"
        @virtual-scroll="endReach ? onScroll : undefined"
        @row-contextmenu="onRowContextmenu"
      >
        <template #top>
          <div class="col-12">
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
            <MContainer>
              <div class="row q-col-gutter-sm items-center justify-between">
                <div
                  v-show="Boolean(title)"
                  :class="{'col-12':$q.screen.xs, 'col-auto': !$q.screen.xs,'self-start':!0}"
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
                  :placeholder="searchPlaceholder"
                  autocomplete="none"
                  autofocus
                  class="self-start"
                  col="12"
                  dense
                  dplaceholder="myth.datatable.searchInput"
                  lg="6"
                  md="6"
                  name="search"
                  outlined
                  sm="9"
                  v-bind="$myth.options.dt?.searchInput?.props"
                >
                  <template #prepend>
                    <q-icon
                      v-if="!tableOptions.search"
                      name="search"
                    >
                      <q-tooltip>
                        {{ $t('myth.datatable.searchInput') }}
                      </q-tooltip>
                    </q-icon>
                    <q-icon
                      v-else
                      class="cursor-pointer"
                      name="clear"
                      @click="tableOptions.search = ''"
                    >
                      <q-tooltip>
                        {{ $t('myth.datatable.searchInputClear') }}
                      </q-tooltip>
                    </q-icon>
                  </template>
                  <template #append>
                    <q-btn
                      aria-label="Menu"
                      dense
                      flat
                      icon="o_ballot"
                      round
                      v-bind="$myth.options.dt?.searchInput?.menuBtn"
                    >
                      <q-popup-proxy
                        anchor="bottom end"
                        self="top end"
                        v-bind="$myth.options.dt?.searchInput?.menuProps"
                      >
                        <q-card flat>
                          <div
                            class="q-pa-md"
                            style="max-width: 400px"
                          >
                            <div class="text-body2 q-mb-md">
                              {{ $t('myth.datatable.searchColumns') }}
                            </div>
                            <div class="row items-center">
                              <div class="col-12">
                                <template
                                  v-for="h in getHeaders"
                                  :key="h.name"
                                >
                                  <q-checkbox
                                    v-model="searchColumnsRef"
                                    :disable="searchColumnsRef.length < 2 && searchColumnsRef.indexOf(h.name) !== -1"
                                    :label="h.label"
                                    :val="h.name"
                                  />
                                </template>
                              </div>
                              <div class="col-12 q-pt-lg row justify-end">
                                <q-btn
                                  v-close-popup
                                  :label="$t('done')"
                                  dense
                                  flat
                                  no-caps
                                  size="md"
                                  style="min-width: 68px"
                                  @click="tableOptions.search ? refresh() : undefined"
                                />
                              </div>
                            </div>
                          </div>
                        </q-card>
                      </q-popup-proxy>
                      <q-tooltip>
                        {{ $t('myth.datatable.searchColumns') }}
                      </q-tooltip>
                    </q-btn>
                  </template>
                </MInput>
                <MCol
                  col="12"
                  sm="auto"
                >
                  <div class="row q-gutter-x-sm">
                    <MDtBtn
                      id="filter-table"
                      :disable="tableOptions.loading"
                      v-bind="$myth.options.dt?.buttons?.more"
                    >
                      <div class="column items-center">
                        <q-icon name="o_more_vert" />
                        <div v-text="$t('more')" />
                      </div>
                      <q-tooltip v-if="!tableOptions.loading">
                        {{ $t('myth.datatable.hints.more') }}
                      </q-tooltip>
                      <q-menu
                        v-bind="$myth.options.dt?.buttons?.moreMenu"
                      >
                        <q-list
                          style="min-width: 250px"
                          v-bind="$myth.options.dt?.buttons?.moreList"
                        >
                          <template v-if="hasAddBtn">
                            <q-item
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
                          </template>
                          <template v-if="hasFilterDialog">
                            <q-item
                              v-close-popup
                              clickable
                              v-bind="$myth.options.dt?.buttons?.moreItem"
                              @click="openFilterDialog()"
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
                                  {{ $t('export_pdf') }}
                                  <q-badge
                                    v-if="tableOptions.selected.length > 1"
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
                          <q-item
                            v-close-popup
                            clickable
                            v-bind="$myth.options.dt?.buttons?.moreItem"
                            @click="tableOptions.fullscreen = !tableOptions.fullscreen"
                          >
                            <q-item-section thumbnail>
                              <q-icon
                                :name="tableOptions.fullscreen ? 'fullscreen_exit' : 'fullscreen'"
                                right
                              />
                            </q-item-section>
                            <q-item-section>
                              <q-item-label>{{ $t('myth.datatable.' + (tableOptions.fullscreen ? 'exitFullscreen' : 'fullscreen')) }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </MDtBtn>
                    <MDtBtn
                      v-if="hasFilterDialog"
                      tooltip="myth.datatable.hints.filter"
                      v-bind="$myth.options.dt?.buttons?.filter"
                      @click="openFilterDialog()"
                    >
                      <div class="column items-center">
                        <q-icon name="o_filter_alt" />
                        <div v-text="$t('filter')" />
                      </div>

                      <!-- Filter dialog -->
                      <q-popup-proxy
                        :breakpoint="769"
                        allow-focus-outside
                        anchor="bottom end"
                        full-width
                        no-backdrop-dismiss
                        persistent
                        position="top"
                        self="top end"
                        transition-hide="fade"
                        transition-show="fade"
                        v-bind="$myth.options.dt?.filterDialogProps"
                      >
                        <q-card flat>
                          <MContainer class="q-pa-md">
                            <div
                              class="text-body1 q-mb-md"
                              v-text="$t('myth.datatable.filter.title')"
                            />
                            <div class="row items-center">
                              <div class="col-12">
                                <MContainer class="q-pa-md">
                                  <slot
                                    :filter="tableOptions.tempFilter"
                                    name="filter"
                                  />
                                </MContainer>
                              </div>
                              <div class="col-12 q-pt-lg">
                                <div class="row justify-between">
                                  <MBtn
                                    v-close-popup
                                    :label="$t('myth.datatable.filter.cancel')"
                                    color="negative"
                                    flat
                                    v-bind="$myth.options.dt?.dialogButtonsProps"
                                    @click="closeFilterDialog"
                                  />
                                  <MBtn
                                    v-close-popup
                                    :label="$t('myth.datatable.filter.save')"
                                    color="positive"
                                    flat
                                    v-bind="$myth.options.dt?.dialogButtonsProps"
                                    @click="saveFilterDialog"
                                  />
                                </div>
                              </div>
                            </div>
                          </MContainer>
                        </q-card>
                      </q-popup-proxy>
                    </MDtBtn>
                    <MDtBtn
                      :disabled="tableOptions.loading"
                      v-bind="$myth.options.dt?.buttons?.refresh"
                      @click="refreshNoUpdate()"
                    >
                      <div class="column items-center">
                        <q-icon name="o_refresh" />
                        <div v-text="$t('refresh')" />
                      </div>
                      <q-tooltip v-if="!tableOptions.loading">
                        {{ $t('myth.datatable.hints.refresh') }}
                      </q-tooltip>
                    </MDtBtn>
                  </div>
                </MCol>
              </div>
              <MFadeTransition>
                <MRow
                  v-if="noManageColumns !== !1"
                  class="items-center"
                >
                  <q-list
                    bordered
                    class="rounded-borders col-12"
                  >
                    <q-expansion-item
                      :caption="visibleHeaders.length.toString()"
                      :label="$t('myth.datatable.columnsToShow')"
                      expand-separator
                      icon="list"
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
              </MFadeTransition>

              <MFadeTransition>
                <MRow
                  v-if="Object.values(tableOptions.filter).filter(e => Boolean(e)).length > 0"
                  class="items-center"
                >
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
                        class="q-pr-md"
                        clickable
                        color="primary"
                        icon-remove="clear"
                        outline
                        removable
                        @click="openFilterDialog"
                        @remove="onRemoveFilter(filterKey)"
                      >
                        <span>{{ $t(`attributes.${filterKey}`) }}</span>
                        <span v-if="typeof filterValue === 'string'">: {{ filterValue }}</span>
                      </q-chip>
                    </MCol>
                  </template>
                </MRow>
              </MFadeTransition>
              <MFadeTransition>
                <MRow
                  v-if="hasSelectedItem"
                  class="items-center q-gutter-xs"
                >
                  <slot
                    :dt="datatableItemsScope"
                    name="tools"
                  >
                    <MDtBtn
                      v-if="hasUpdateBtn"
                      :disable="!isSingleSelectedItem || tableOptions.loading"
                      :loading="tableOptions.loading"
                      fab-mini
                      flat
                      icon="o_edit"
                      round
                      tooltip="update"
                      v-bind="$myth.options.dt?.topSelection?.btn"
                      @click="openUpdateDialog(tableOptions.selected[0])"
                    />
                    <MDtBtn
                      v-if="hasShowBtn"
                      :disable="!isSingleSelectedItem || tableOptions.loading"
                      :loading="tableOptions.loading"
                      fab-mini
                      flat
                      icon="o_visibility"
                      round
                      tooltip="show"
                      v-bind="$myth.options.dt?.topSelection?.btn"
                      @click="openShowDialog(tableOptions.selected[0])"
                    />
                    <MDtBtn
                      v-if="hasDestroyBtn"
                      :disable="!isSingleSelectedItem || tableOptions.loading"
                      :loading="tableOptions.loading"
                      fab-mini
                      flat
                      icon="delete_outline"
                      round
                      tooltip="destroy"
                      v-bind="$myth.options.dt?.topSelection?.btn"
                      @click="deleteSelectionItem()"
                    />
                    <template v-for="(contextBtn,i) in contextItems">
                      <MBtn
                        v-if="contextBtn.showIf !== !1 && ( (contextBtn.click && isSingleSelectedItem) || (contextBtn.multiClick && !isSingleSelectedItem) )"
                        :key="`top-s-${i.toString()}`"
                        v-bind="{...(contextBtn.attr||{}),...($myth.options.dt?.topSelection?.btn||{})}"
                        @click="contextBtn.click ? contextBtn.click(tableOptions.selected[0],0) : (contextBtn.multiClick ? contextBtn.multiClick(tableOptions.selected) : undefined)"
                      >
                        {{ $t(contextBtn.name) }}
                      </MBtn>
                    </template>
                  </slot>
                  <slot
                    :dt="datatableItemsScope"
                    name="selection"
                  />
                </MRow>
              </MFadeTransition>
            </MContainer>
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

    <!-- Show dialog -->
    <q-dialog
      v-model="dialogs.show"
      allow-focus-outside
      maximized
      no-backdrop-dismiss
      persistent
      transition-hide="slide-up"
      transition-show="slide-down"
      v-bind="$myth.options.dt?.showDialogProps"
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
            :index="dialogs.index"
            :item="dialogs.item"
            name="show"
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
            v-bind="$myth.options.dt?.dialogButtonsProps"
            @click="closeShowDialog"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Form dialog -->
    <q-dialog
      v-model="dialogs.form"
      allow-focus-outside
      maximized
      no-backdrop-dismiss
      persistent
      transition-hide="slide-up"
      transition-show="slide-down"
      v-bind="$myth.options.dt?.formDialogProps"
    >
      <q-card class="m--dialog-card">
        <MForm
          v-slot="form"
          :initial-errors="dialogs.errors"
          :initial-values="dialogs.item"
          @submit="defaultSubmitItem"
        >
          <q-card-section ref="formTitle">
            <q-toolbar>
              <q-toolbar-title>
                <q-btn
                  v-if="$myth.options.dt?.formDialogProps?.maximized"
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
            :style="`max-height: ${$q.screen.height - 10 - ($refs.formActions?.$el?.offsetHeight||0) - ($refs.formTitle?.$el.offsetHeight||0)}px`"
            class="scroll"
          >
            <slot
              :form="form"
              :index="dialogs.index"
              :item="dialogs.itemForm"
              :item-ref="dialogs.item"
              name="form"
              v-bind="datatableItemsScope"
            />
          </q-card-section>
          <q-separator />
          <q-card-actions
            ref="formActions"
            align="between"
            class="m--datatable-form-actions print-hide"
          >
            <MBtn
              :disable="tableOptions.loading"
              :label="$t('close')"
              color="negative"
              v-bind="$myth.options.dt?.dialogButtonsProps"
              @click="closeFormDialog"
            />
            <slot
              :form="form"
              :index="dialogs.index"
              :item="dialogs.item"
              name="form-actions"
              v-bind="datatableItemsScope"
            >
              <MBtn
                :disable="tableOptions.loading "
                :label="$t(isUpdateMode ? 'save' : 'create')"
                :loading="tableOptions.loading"
                color="positive"
                type="submit"
                v-bind="$myth.options.dt?.dialogButtonsProps"
              />
            </slot>
          </q-card-actions>
        </MForm>
      </q-card>
    </q-dialog>

    <MFadeTransition>
      <q-page-sticky
        v-if="hasAddBtn && $myth.options.dt?.fabBtn?.hide !== !1"
        :offset="$myth.options.dt?.fabBtn?.offset|| [25,25]"
        :position="$myth.options.dt?.fabBtn?.position || 'bottom-right'"
        v-bind="$myth.options.dt?.fabBtn?.pageStickyProps"
      >
        <q-btn
          color="primary"
          fab
          icon="add"
          v-bind="$myth.options.dt?.fabBtn?.buttonProps"
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

import { computed, defineComponent, nextTick, onMounted, PropType, reactive, ref, useSlots, watch } from 'vue'
import { useQuasar } from 'quasar'
import _ from 'lodash'
import { useRouter } from 'vue-router'
import {
  ApiServiceParams,
  FetchRowsArgs,
  MDatatableDialogsOptions,
  MDatatableFilterForm,
  MDatatableMetaServer,
  MDatatableOptions,
  MDatatablePagination,
  MDatatableProps,
  MDtApiServices,
  MDtExportOptions,
  MDtItem,
  MDtItemIndex
} from './models'
import { useMyth } from '../../vue3'
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

export default defineComponent({
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
      type: Array as PropType<MDatatableProps['headers'] | any[]>,
      required: !0,
      default: () => ([])
    },
    visibleColumns: {
      type: Array as PropType<MDatatableProps['visibleColumns']>,
      required: !1,
      default: () => undefined
    },
    searchColumns: {
      type: Array as PropType<MDatatableProps['searchColumns']>,
      required: !1,
      default: () => undefined
    },
    rows: {
      type: Array,
      default: () => ([])
    },
    serviceName: {
      type: [String, Function],
      required: !0,
      default: () => ''
    },
    requestParams: {
      type: [Function, Object],
      default: () => undefined
    },
    pdf: {
      type: Boolean,
      default: () => undefined
    },
    excel: {
      type: Boolean,
      default: () => undefined
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
      type: String as PropType<string | null | undefined>,
      default: () => undefined
    },
    noManageColumns: {
      type: Boolean,
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
    // Prevent user from back
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
    const resetDialogs = () => {
      dialogs.filter = !1
      dialogs.show = !1
      dialogs.form = !1
      dialogs.isUpdate = !1
      dialogs.item = null
      dialogs.itemForm = null
      dialogs.index = undefined
      dialogs.errors = {}
    }

    /** Table */

    /** --- */
    const headersProp = computed(() => props.headers)
    const getHeaders = computed<any[]>(() => myth.parseHeaders(headersProp.value) || [])
    const visibleHeaders = ref(myth.parseHeaders(props.visibleColumns || headersProp.value).map(e => e.name))
    /** --- */

    const selected = ref<MDtItem[]>([])
    const meta = ref<MDatatableMetaServer>({ ...initMetaServer })
    const pagination = ref<MDatatablePagination>({ ...initPaginationOptions })
    const search = ref<string | null>(null)
    const searchColumnsProp = computed(() => props.searchColumns)
    const searchColumnsRef = ref<string[]>(myth.parseHeaders(searchColumnsProp.value || headersProp.value).map(e => e.name))
    const searchPlaceholder = computed<string>(() => {
      if (searchColumnsRef.value.length > 0) {
        return t('myth.datatable.searchInputPlaceholder', { v: getHeaders.value.filter(e => e?.field !== 'control' && searchColumnsRef.value.indexOf(e.name) !== -1).map(e => e.label).join(', ') })
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
    const defaultItem = computed(() => props.defaultItem)
    /* Titles */

    /** Methods */
    const getApiServices = (): MDtApiServices => {
      if (typeof serviceName.value === 'function') {
        return serviceName.value()
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
    const getRequestWith = (type: 'withIndex' | 'withShow' | 'withUpdate' | 'withStore'): string | null => {
      let v: any = []
      const params: unknown = props[type]
      if (params) {
        if (typeof params === 'string') {
          v = params.split(',')
        }

        if (_.isArray(params)) {
          v = [...params]
        } else if (_.isObject(params) && typeof params !== 'function') {
          for (const k in params) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            v.push(`${k}=` + params[k])
          }
        } else if (_.isFunction(params)) {
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
        // headers: getHeaders.value.map((e: any) => e.name),
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
        params.filter = tableOptions.filter
      }
      if (searchColumnsRef.value.length > 0) {
        params.searchColumns = searchColumnsRef.value
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
      return { ...params, ...merge }
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const { _data, _meta } = await getApiServices().index({ params })
          pagination.value = {
            page: parseInt(_meta?.current_page) || 1,
            rowsPerPage: parseInt(_meta?.per_page) || 0,
            rowsNumber: parseInt(_meta?.total) || 0,
            sortBy: opts?.pagination?.sortBy || undefined,
            descending: opts?.pagination?.descending || undefined
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
        const data = getDatatableParams({
          pagination: tableOptions.pagination,
          filter: tableOptions.search
        }, {
          indexType: type,
          fdt: 'e',
          toUrl: props.exportToUrl,
          headerItems: getHeaders.value.filter(e => e?.field !== 'control' && visibleHeaders.value.indexOf(e.name) !== -1)
        })
        if (tableOptions.selected.length > 0) {
          data.ids = tableOptions.selected.map((e: any) => e.id)
        }
        try {
          const response = await getApiServices().export(data)
          await myth.helpers.downloadFromResponse(response)
        } catch (e: any) {
          if (e?.code === 'window_blocked') {
            myth.alertError(t('messages.window_blocked'))
          } else if (e?._message) {
            myth.alertError(e._message)
          } else if (e?.message) {
            myth.alertError(e.message)
          } else {
            myth.alertError(t('messages.error'))
          }
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
    }
    const updateFilterOptions = (data: Record<string, any>) => {
      filterForm.value = {
        ...tableOptions.filter,
        ...data
      }
    }
    /** Filter Dialog */

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
        const params: { requestWith?: string | null } = { requestWith: getRequestWith('withShow') }
        if (!params.requestWith) {
          delete params.requestWith
        }
        if (!index) {
          index = getRows.value.findIndex(e => e.id === item.id)
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
        const params: any = {}
        if (getRequestWith('withUpdate')) {
          params.requestWith = getRequestWith('withUpdate')
        }
        // if (!params.requestWith) {
        //   delete params.requestWith
        // }
        if (!index) {
          index = getRows.value.findIndex(e => e.id === item.id)
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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
        router.push({ name: props.createRoute })
        return
      }
      const item = { ...(defaultItem.value || {}), ...(dtItem || {}) }
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
      let form = { ..._form, ...(dialogs.itemForm || {}) }
      console.log(form)
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          for (const k in props.excludedKeys) {
            delete form[props.excludedKeys[k]]
          }
        }
      }
      const method = async () => isUpdateMode.value ? await api.update(dialogs.item?.id, form) : await api.store(form)
      try {
        const { _data, _message, _success }: any = await method()
        _message && myth.alertSuccess(_message)
        if (_success) {
          if (isUpdateMode.value) {
            _data && updateDatatableItem(_data, dialogs.index)
          } else {
            nextTick(() => refresh())
            // emit('itemCreated', { item: _data })
          }
          nextTick(() => closeFormDialog())
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
    const onDeleteItem = (item: MDtItem, index: number) => {
      if (loading.value || !item?.id) {
        return
      }
      tableOptions.hasAction = !0
      myth.confirmMessage(t('messages.confirm_delete')).onOk(async () => {
        loading.value = !0
        try {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const { _message, _success } = await getApiServices().destroyAll(tableOptions.selected.map((e: MDtItem) => e.id))
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
    const onRowContextmenu = (e: MouseEvent, row: MDtItem, index: number) => {
      // e.preventDefault()
      dialogs.item = row
      dialogs.index = index
      // contextmenu.value = !0
    }
    const contextmenuItems = computed(() => ([
      {
        name: 'update',
        click: (item: MDtItem, index: number) => openUpdateDialog(item, index),
        showIf: hasUpdateBtn.value,
        order: 1
      },
      {
        name: 'show',
        click: (item: MDtItem, index: number) => openShowDialog(item, index),
        showIf: hasShowBtn.value,
        order: 1
      },
      {
        name: 'destroy',
        click: (item: MDtItem, index: number) => onDeleteItem(item, index),
        showIf: hasDestroyBtn.value,
        order: 1
      },
      ...(props.contextItems || [])
    ].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))))
    const endReach = computed<boolean>(() => props.endReach)
    const rowsPerPageOptions = computed(() => props.rowsPerPageOptions)
    const getRowsPerPageOptions = computed<any[]>(() => endReach.value ? [0] : (rowsPerPageOptions.value || [0]))

    onMounted(() => {
      refresh()
    })

    watch(contextmenu, v => {
      console.log(v)
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
    watch(() => dialogs.item, (v) => {
      // console.log(dialogs.item)
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
      contextmenu,
      onRowContextmenu,
      getRowsPerPageOptions,
      dialogs,
      resetDialogs,

      searchPlaceholder,
      searchColumnsRef,

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
      getRows,
      visibleHeaders
    }
  }
})
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

</style>
