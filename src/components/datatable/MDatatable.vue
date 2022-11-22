<!--
  - MyTh Ahmed Faiz Copyright © 2016-2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts" setup>
import { AxiosResponse } from 'axios'
import { useQuasar } from 'quasar'
import { computed, defineEmits, onBeforeMount, onMounted, ref, useSlots, watch } from 'vue'
import { DatatableItem, MDatatableProps, PaginationOptionsProps, TableDialogsProps, TableMetaServerProps, TableOptionsProps } from './models'
import { initMetaServer, initPaginationOptions, initTableOptions, useDatatable } from './useMDatatable'

interface Props extends MDatatableProps {
  separator?: 'horizontal' | 'vertical' | 'cell' | 'none' | undefined;
  noMouse?: boolean | undefined;
  rowsPerPageOptions?: any[] | undefined;
  title?: string | undefined;
  search?: boolean | undefined;
  pdf?: boolean | undefined;
  excel?: boolean | undefined;
  exportToUrl?: boolean | undefined;
  hideSelection?: boolean | undefined;
  singleSelection?: boolean | undefined;
  headers: any[];
  items?: any[] | undefined;
  dense?: boolean | undefined;
  endReach?: boolean | undefined;
  hideAddBtn?: boolean | undefined;
  hideUpdateBtn?: boolean | undefined;
  hideShowBtn?: boolean | undefined;
  hideDestroyBtn?: boolean | undefined;
  defaultItem?: Partial<DatatableItem> | undefined;
  noAutoMessage?: boolean | undefined;
  searchDebounce?: string | number | undefined;
  withIndex?: string | string[] | undefined;
  withShow?: string | string[] | undefined;
  withUpdate?: string | string[] | undefined;
  serviceName: string | (() => Promise<AxiosResponse>);
  createRoute?: string | undefined;
  updateRoute?: string | undefined;
  showRoute?: string | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  separator: 'horizontal',
  noMouse: !0,
  rowsPerPageOptions: () => [10, 25, 50, 100, 250, 500, 0],
  title: undefined,
  search: !0,
  pdf: !1,
  excel: !1,
  exportToUrl: !0,
  hideSelection: !1,
  singleSelection: !1,
  headers: undefined,
  items: undefined,
  dense: !0,
  endReach: !1,
  hideAddBtn: undefined,
  hideUpdateBtn: undefined,
  hideShowBtn: undefined,
  hideDestroyBtn: undefined,
  defaultItem: undefined,
  noAutoMessage: !1,
  searchDebounce: 600,
  withIndex: undefined,
  withShow: undefined,
  withUpdate: undefined,
  serviceName: undefined,
  createRoute: undefined,
  updateRoute: undefined,
  showRoute: undefined
})

type Emits = {
  (e: 'update:rows', value: DatatableItem[]): void
  (e: 'refresh'): void
}

const emit = defineEmits<Emits>()
// const loaded = ref<boolean>(!1)

const metaServer = ref<TableMetaServerProps>({ ...initMetaServer })
const tableOptions = ref<TableOptionsProps>({ ...initTableOptions })
const paginationOptions = ref<PaginationOptionsProps>({ ...initPaginationOptions })
const rows = ref<DatatableItem[]>([])
const dialogs = ref<TableDialogsProps>({
  filter: !1,
  show: !1,
  form: !1,
  isUpdate: !1,
  item: null,
  index: undefined,
  errors: {}
})
const contextmenu = ref(!1)
const slots = useSlots()
const $q = useQuasar()

const getRowsPerPageOptions = props.endReach ? [0] : (props.rowsPerPageOptions ?? [0])
const bodySlots = computed<any>(() => {
  const slot = 'body-cell-'
  const _slots: any = {}
  for (const s in slots) {
    if (s.slice(0, slot.length) === slot) {
      _slots[s] = slots[s]
    }
  }
  return _slots
})

/**/
const datatable = useDatatable({
  props,
  emit,
  slots,
  rows,
  tableOptions,
  dialogs,
  metaServer,
  paginationOptions
})
const {
  getHeaders,
  hasAddBtn,
  hasUpdateBtn,
  hasShowBtn,
  hasDestroyBtn,
  hasFilterDialog,
  hasMenu,

  isUpdateMode,
  isSingleSelectedItem,
  hasSelectedItem,

  datatableItemsScope,

  onScroll,
  refresh,
  refreshNoUpdate,
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
  defaultSubmitItem,
  deleteItem,
  deleteSelectionItem,
  getShowTitle,
  getFormTitle,
  // rowDblclick,
  removeFilter
} = datatable
/**/

watch(() => tableOptions.value.loading, (v) => {
  (v ? $q.loading.show() : $q.loading.hide())
})
watch(() => tableOptions.value.filter, () => {
  fetchDatatableItems({
    pagination: paginationOptions.value,
    filter: tableOptions.value.search
  })
})
watch(rows, (v) => {
  emit('update:rows', v)
})

onBeforeMount(() => {
  if (props.items) {
    Object.assign(rows, props.items)
  }
})
onMounted(() => {
  refresh()
})
defineExpose(datatable)

const onRowContextmenu = (e: Event, row: DatatableItem, index: number) => {
  e.preventDefault()
  dialogs.value.item = row
  dialogs.value.index = index
  contextmenu.value = !0
}

</script>

<template>
  <div>
    <q-menu
      v-model="contextmenu"
      context-menu
      max-width="250px"
      touch-position
      transition-hide="fade"
      transition-show="fade"
    >
      <q-list
        v-show="Boolean(dialogs.item)"
        dense
        separator
      >
        <template v-if="hasDestroyBtn">
          <q-item
            clickable
            dense
            @click="deleteItem(dialogs.item,dialogs.index)"
          >
            <q-item-section>
              <q-item-label>
                <q-icon
                  color="negative"
                  left
                  name="delete"
                />
                {{ $myth.parseAttribute('destroy') }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
        <template v-if="hasShowBtn">
          <q-item
            clickable
            dense
            @click="openUpdateDialog(dialogs.item,dialogs.index)"
          >
            <q-item-section>
              <q-item-label>
                <q-icon
                  color="primary"
                  left
                  name="edit"
                />
                {{ $myth.parseAttribute('update') }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>

        <!--<template v-if="userHasPermission('show',modelPermission)">-->
        <!--  <m-dt-btn-->
        <!--    show-->
        <!--    @click="props.dt.openShowDialog(props.row,props.rowIndex)"-->
        <!--  />-->
        <!--</template>-->
        <!--<template v-if="userHasPermission('update',modelPermission)">-->
        <!--  <m-dt-btn-->
        <!--    update-->
        <!--    @click="props.dt.openUpdateDialog(props.row,props.rowIndex)"-->
        <!--  />-->
        <!--</template>-->
      </q-list>
    </q-menu>
    <q-pull-to-refresh
      :no-mouse="noMouse"
      @refresh="refresh"
    >
      <q-table
        ref="table"
        v-model:pagination="paginationOptions"
        v-model:selected="tableOptions.selected"
        :class="`m--datatable ` + ($q.screen.lt.md ? 'm--datatable-grid' : '')"
        :columns="getHeaders"
        :dense="dense"
        :filter="tableOptions.search"
        :grid="$q.screen.lt.md"
        :hide-pagination="endReach"
        :loading="tableOptions.loading"
        :rows="rows"
        :rows-per-page-options="getRowsPerPageOptions"
        :selection="hideSelection !== !0 ? (singleSelection ? 'single' : 'multiple') : 'none'"
        :separator="separator"
        :title="title"
        bordered
        card-container-class="m--datatable-container"
        flat
        square
        table-class="m--datatable-container"
        v-bind="$attrs"
        @request="fetchDatatableItems"
        @virtual-scroll="endReach ? onScroll : undefined"
        @row-contextmenu="onRowContextmenu"
      >
        <template #top-right>
          <m-row class="justify-between">
            <MInput
              v-if="search"
              v-model="tableOptions.search"
              :debounce="searchDebounce"
              autocomplete="none"
              class="self-start"
              clearable
              col="12"
              dense
              input-style="min-width: 220px"
              name="search"
              placeholder="datatable.search_input"
              sm="9"
              standout="bg-primary"
            >
              <template #prepend>
                <q-icon name="search" />
              </template>
            </MInput>
            <m-col
              col="12"
              sm="auto"
            >
              <m-btn
                v-if="hasMenu"
                color="blue-grey"
                flat
                icon="o_more_vert"
                round
              >
                <q-tooltip v-if="$q.screen.gt.sm">
                  {{ $t('more') }}
                </q-tooltip>
                <q-menu square>
                  <q-list
                    dense
                    style="min-width: 250px"
                  >
                    <template v-if="hasAddBtn">
                      <q-item
                        v-close-popup
                        clickable
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
                      <q-separator />
                    </template>
                    <template v-if="hasFilterDialog">
                      <q-item
                        v-close-popup
                        clickable
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
                              v-if="tableOptions.selected.length>0"
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
                              v-if="tableOptions.selected.length>0"
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
              </m-btn>
              <m-dt-btn
                :disable="tableOptions.loading"
                icon="o_refresh"
                @click="refreshNoUpdate()"
              />
            </m-col>
            <m-col
              v-show="Object.keys(tableOptions.filter).length > 0"
              col="12"
            >
              <m-row class="items-center">
                <m-col col="auto">
                  <span class="text-subtitle1 q-mr-sm">{{ $t('datatable.filtered_by') }}</span>
                </m-col>
                <m-col
                  v-for="(v,e) in tableOptions.filter"
                  :key="e"
                  col="auto"
                >
                  <q-chip
                    :label="$myth.parseAttribute(e)??e"
                    color="primary"
                    outline
                    removable
                    @remove="removeFilter(e,v)"
                  />
                </m-col>
              </m-row>
            </m-col>
            <slot
              name="top-right"
              v-bind="{tableOptions,paginationOptions}"
            />
          </m-row>
        </template>
        <template #top-selection>
          <m-container>
            <m-row class="items-center">
              <slot
                name="tools"
                v-bind="{dt:datatableItemsScope}"
              >
                <m-dt-btn
                  v-if="hasUpdateBtn"
                  :disable="!isSingleSelectedItem"
                  :tooltip="$t('update')"
                  icon="o_edit"
                  @click="openUpdateDialog(tableOptions.selected[0])"
                />
                <m-dt-btn
                  v-if="hasShowBtn"
                  :disable="!isSingleSelectedItem"
                  :tooltip="$t('show')"
                  icon="o_visibility"
                  @click="openShowDialog(tableOptions.selected[0])"
                />
                <m-dt-btn
                  v-if="hasDestroyBtn"
                  :disable="!hasSelectedItem"
                  :tooltip="$t('destroy')"
                  icon="delete_outline"
                  @click="deleteSelectionItem()"
                />
              </slot>
              <slot
                name="selection"
                v-bind="{dt:datatableItemsScope}"
              />
            </m-row>
          </m-container>
        </template>
        <template
          v-for="(i,slot) in bodySlots"
          #[slot]="SlotBinds"
        >
          <slot
            :name="slot"
            v-bind="{...SlotBinds,dt:datatableItemsScope}"
          />
        </template>
        <template
          v-if="endReach"
          #bottom
        >
          <q-space />
          <div>
            {{
              $t('replace.from_name', {
                from: paginationOptions.rowsNumber,
                name: rows.length
              })
            }}
          </div>
        </template>
        <!--<template #no-data>-->
        <!--  <div class="col-12 self-center">-->
        <!--    <div class="row justify-center">-->
        <!--      <div class="col-auto">-->
        <!--        <q-icon name="warning" />-->
        <!--        no DAta-->
        <!--      </div>-->
        <!--    </div>-->
        <!--  </div>-->
        <!--</template>-->
      </q-table>
      <slot />
    </q-pull-to-refresh>

    <q-dialog
      v-model="dialogs.filter"
      allow-focus-outside
      full-height
      full-width
      no-backdrop-dismiss
      persistent
      position="top"
      transition-hide="fade"
      transition-show="fade"
    >
      <q-card>
        <q-card-section>
          <p class="text-h6">
            {{ $t('filter') }}
          </p>
        </q-card-section>
        <q-card-section class="scroll">
          <slot
            name="filter"
            v-bind="{filter:tableOptions.tempFilter}"
          />
        </q-card-section>
        <q-separator />
        <m-container>
          <div class="row">
            <m-btn
              :label="$t('save')"
              color="positive"
              @click="saveFilterDialog"
            />
            <q-space />
            <m-btn
              :label="$t('cancel')"
              color="negative"
              @click="closeFilterDialog"
            />
          </div>
        </m-container>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="dialogs.show"
      allow-focus-outside
      full-width
      no-backdrop-dismiss
      persistent
      position="top"
      transition-hide="fade"
      transition-show="fade"
    >
      <q-card>
        <q-card-section>
          <q-toolbar>
            <q-toolbar-title>{{ getShowTitle }}</q-toolbar-title>
          </q-toolbar>
        </q-card-section>
        <q-card-section class="scroll">
          <slot
            name="show"
            v-bind="{item:dialogs.item,index:dialogs.index}"
          />
        </q-card-section>

        <m-container>
          <div class="row">
            <q-space />
            <m-btn
              :label="$t('close')"
              color="negative"
              @click="closeShowDialog"
            />
          </div>
        </m-container>
      </q-card>
    </q-dialog>

    <q-dialog
      v-model="dialogs.form"
      allow-focus-outside
      full-width
      no-backdrop-dismiss
      persistent
      position="top"
      square
      transition-hide="fade"
      transition-show="fade"
    >
      <q-card>
        <q-slide-transition>
          <m-form
            ref="dialogForm"
            v-slot="form"
            :errors="dialogs.errors"
            :form="dialogs.item"
            @submit="defaultSubmitItem"
          >
            <q-card-section>
              <q-toolbar>
                <q-toolbar-title>{{ getFormTitle }}</q-toolbar-title>
              </q-toolbar>
            </q-card-section>
            <q-separator />
            <q-card-section
              class="scroll"
              style="max-height: 500px"
            >
              <slot
                name="form"
                v-bind="{item:dialogs.item,index:dialogs.index,form,...datatableItemsScope}"
              />
            </q-card-section>
            <q-separator />
            <m-container>
              <div class="row">
                <slot
                  name="form-actions"
                  v-bind="{item:dialogs.item,index:dialogs.index,form,...datatableItemsScope}"
                >
                  <m-btn
                    :disable="$q.loading.isActive "
                    :label="$t(isUpdateMode ? 'save' : 'create')"
                    :loading="$q.loading.isActive"
                    color="positive"
                    type="submit"
                  />
                </slot>
                <q-space />
                <m-btn
                  :disable="$q.loading.isActive"
                  :label="$t('close')"
                  color="negative"
                  @click="closeFormDialog"
                />
              </div>
            </m-container>
          </m-form>
        </q-slide-transition>
      </q-card>
    </q-dialog>

    <q-slide-transition>
      <q-page-sticky
        v-if="hasAddBtn"
        :offset="[10, 10]"
        position="bottom-right"
      >
        <m-btn
          color="primary"
          fab
          icon="add"
          @click="openCreateDialog()"
        >
          <q-tooltip
            anchor="top start"
            class="m--datatable-fab-tooltip"
          >
            <span class="text-caption">{{ getFormTitle }}</span>
          </q-tooltip>
        </m-btn>
      </q-page-sticky>
    </q-slide-transition>
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
</style>