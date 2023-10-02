<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <div class="m--datatable-component">
    <MModalMenu
      v-model="contextmenu"
      class="shadow-1"
      context-menu
      touch-position
      v-bind="$myth.options.dt?.contextmenu?.menu"
      @before-hide="resetDialogs()"
    >
      <q-list
        v-if="dialogs.item"
        :separator="!$myth.tools.isSmall"
        v-bind="$myth.options.dt?.contextmenu?.list"
      >
        <template
          v-for="(contextmenuItem,i) in contextmenuItems"
          :key="i"
        >
          <MDtBtn
            v-if="typeof contextmenuItem.showIf === 'function' ? contextmenuItem.showIf(dialogs.item,dialogs.index) : contextmenuItem.showIf"
            :[contextmenuItem.name]="!0"
            :dense="dense"
            :label="$t(contextmenuItem.label || contextmenuItem.name)"
            list-item
            v-bind="{...($myth.options.dt?.contextmenu?.btn||{}),...(contextmenuItem.attr||{})}"
            @click="contextmenuItem.click ? contextmenuItem.click(dialogs.item,dialogs.index) : undefined"
          />
        </template>
      </q-list>
    </MModalMenu>
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
        :bordered="bordered"
        :class="`m--datatable ` + ($q.screen.lt.md ? 'm--datatable-grid' : '')"
        :columns="getHeaders"
        :dense="dense"
        :filter="tableOptions.search"
        :flat="flat"
        :grid="isGrid"
        :hide-pagination="endReach"
        :loading="tableOptions.loading"
        :rows="getRows"
        :rows-per-page-options="getRowsPerPageOptions"
        :selection="getShowSelection ? (multiSelection ? 'multiple' : 'single') : 'none'"
        :title="title||undefined"
        :visible-columns="visibleHeaders"
        card-container-class="m--datatable-container"
        table-class="m--datatable-container"
        v-bind="$myth.options.dt?.props"
        @request="fetchDatatableItems"
        @virtual-scroll="endReach ? onScroll : undefined"
        @row-contextmenu="onRowContextmenu"
      >
        <template #item="props">
          <slot
            :dt="datatableItemsScope"
            name="item"
            v-bind="props"
          >
            <div
              :style="props.selected ? 'transform: scale(0.95);' : ''"
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
            >
              <q-card
                :class="props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''"
              >
                <template v-if="getShowSelection || props.colsMap[controlKey] !== undefined">
                  <q-card-section>
                    <MRow class="items-center justify-between">
                      <q-checkbox
                        v-if="getShowSelection"
                        v-model="props.selected"
                        dense
                      />
                      <MDtBtn
                        icon="ion-ios-more"
                        @click="onRowContextmenu($event,props.row,props.rowIndex)"
                      />
                    </MRow>
                  </q-card-section>
                  <q-separator />
                </template>
                <MContainer>
                  <template
                    v-for="col in props.cols"
                    :key="col.name"
                  >
                    <MRow
                      class="justify-between q-col-gutter-x-sm "
                    >
                      <MCol auto>
                        {{ col.label }}
                      </MCol>
                      <MCol
                        auto
                        class="overflow-hidden"
                      >
                        <template v-if="col.field.slice(-4) === '_url'">
                          <MDtBtn
                            :src="col.value"
                            icon="ion-ios-eye"
                            @click="openImageDialog(col.value)"
                          />
                        </template>
                        <template v-else>
                          <div class="text-caption">
                            {{ col.value }}
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
              </div>
            </q-page-scroller>-->
            <MContainer>
              <MRow
                class="items-center"
                col
              >
                <MFadeXTransition>
                  <MCol
                    v-if="Boolean(title)"
                    col="12"
                  >
                    <div
                      class="text-h5"
                      v-text="title"
                    />
                  </MCol>
                </MFadeXTransition>
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
                      name="ion-ios-search"
                    >
                      <q-tooltip>
                        {{ $t('myth.datatable.searchInput') }}
                      </q-tooltip>
                    </q-icon>
                    <q-icon
                      v-else
                      class="cursor-pointer"
                      name="ion-ios-close"
                      @click="tableOptions.search = ''"
                    >
                      <q-tooltip>
                        {{ $t('myth.datatable.searchInputClear') }}
                      </q-tooltip>
                    </q-icon>
                  </template>
                  <template #after>
                    <q-btn
                      :aria-label="parseAttribute('menu')"
                      :icon="$myth.options.dt?.searchInput?.optionsIcon || 'ion-ios-options'"
                      dense
                      flat
                      round
                      v-bind="$myth.options.dt?.searchInput?.menuBtn"
                    >
                      <!--anchor="bottom end"-->
                      <!--self="top end"-->
                      <MModalMenu
                        no-close-btn
                        v-bind="$myth.options.dt?.searchInput?.menuProps"
                      >
                        <q-toolbar class="bg-grey text-white">
                          <q-toolbar-title>
                            {{ $t('myth.datatable.searchColumns') }}
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
                            :label="$t('myth.titles.done')"
                            flat
                            no-caps
                            size="md"
                            style="min-width: 68px"
                            unelevated
                            @click="tableOptions.search ? refresh() : undefined"
                          />
                        </MRow>
                      </MModalMenu>
                      <MTooltip>
                        {{ $t('myth.datatable.searchColumns') }}
                      </MTooltip>
                    </q-btn>
                  </template>
                </MInput>
              </MRow>

              <!--Buttons-->
              <MRow class="row q-gutter-x-sm q-gutter-xs-y-sm items-center justify-between">
                <TransitionGroup
                  name="m__transition__fade"
                >
                  <template v-if="hasSelectedItem">
                    <MDtBtn
                      v-if="hasUpdateBtn"
                      key="update-selection-btn"
                      :disable="!isSingleSelectedItem || tableOptions.loading"
                      :loading="tableOptions.loading"
                      icon="ion-ios-create"
                      update
                      v-bind="$myth.options.dt?.topSelection?.btn"
                      @click="openUpdateDialogNoIndex(tableOptions.selected[0])"
                    />
                    <MDtBtn
                      v-if="hasShowBtn"
                      key="show-selection-btn"
                      :disable="!isSingleSelectedItem || tableOptions.loading"
                      :loading="tableOptions.loading"
                      icon="ion-ios-eye"
                      show
                      v-bind="$myth.options.dt?.topSelection?.btn"
                      @click="openShowDialogNoIndex(tableOptions.selected[0])"
                    />
                    <MDtBtn
                      v-if="hasDestroyBtn"
                      key="destroy-selection-btn"
                      :disable="!hasSelectedItem || tableOptions.loading"
                      :loading="tableOptions.loading"
                      destroy
                      icon="ion-ios-trash"
                      v-bind="$myth.options.dt?.topSelection?.btn"
                      @click="deleteSelectionItem()"
                    />
                    <template
                      v-for="(contextBtn,i) in contextItems"
                      :key="`top-s-${i}`"
                    >
                      <MDtBtn
                        v-if="(typeof contextBtn.showIf === 'function' ? contextBtn.showIf(tableOptions.selected[0],0) : contextBtn.showIf) && ( (contextBtn.click && isSingleSelectedItem) || (contextBtn.multiClick && !isSingleSelectedItem) )"
                        :tooltip="parseAttribute(contextBtn.tooltip || contextBtn.name)"
                        v-bind="{...($myth.options.dt?.topSelection?.btn||{}),...(contextBtn.attr||{})}"
                        @click="contextBtn.click ? contextBtn.click(tableOptions.selected[0],0) : (contextBtn.multiClick ? contextBtn.multiClick(tableOptions.selected) : undefined)"
                      />
                    </template>
                  </template>

                  <!--More Menu-->
                  <MDtBtn
                    v-if="hasMenu"
                    key="more-selection-btn"
                    :disable="tableOptions.loading"
                    icon="ion-ios-options"
                    tooltip="myth.datatable.hints.more"
                    v-bind="$myth.options.dt?.buttons?.more"
                  >
                    <MModalMenu
                      v-bind="$myth.options.dt?.buttons?.moreMenu"
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
                              {{ $t('myth.titles.exportPdf') }}
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
                              {{ $t('myth.titles.exportExcel') }}
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
                            <q-item-label>{{ $t('myth.datatable.' + (tableOptions.fullscreen ? 'exitFullscreen' : 'fullscreen')) }}</q-item-label>
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
                    v-bind="$myth.options.dt?.buttons?.filter"
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
                          <!--<div-->
                          <!--  class="text-body1 q-mb-md"-->
                          <!--  v-text="$t('myth.datatable.filter.title')"-->
                          <!--/>-->
                          <q-toolbar :class="{'q-pa-none': $q.screen.lt.md}">
                            <q-toolbar-title>
                              {{ $t('myth.datatable.filter.title') }}
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
                              </MRow>
                            </MCol>
                          </MRow>
                        </MContainer>
                      </q-card>
                    </MModalMenu>
                  </MDtBtn>
                  <!--Refresh-->
                  <MDtBtn
                    key="refresh-selection-btn"
                    :disabled="tableOptions.loading"
                    icon="ion-ios-refresh"
                    tooltip="myth.datatable.hints.refresh"
                    v-bind="$myth.options.dt?.buttons?.refresh"
                    @click="refreshNoUpdate()"
                  />
                  <!--Fullscreen-->
                  <MDtBtn
                    v-if="!noFullscreen"
                    key="fullscreen-selection-btn"
                    :disabled="tableOptions.loading"
                    :icon="tableOptions.fullscreen ? 'ion-ios-contract' : 'ion-ios-desktop'"
                    :tooltip="`myth.datatable.${tableOptions.fullscreen ? 'exitFullscreen' : 'fullscreen'}`"
                    v-bind="$myth.options.dt?.buttons?.fullscreen"
                    @click="tableOptions.fullscreen = !tableOptions.fullscreen"
                  />
                </TransitionGroup>

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
              <MFadeTransition>
                <MRow
                  v-if="manageColumns"
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

              <!-- Filter Row -->
              <MFadeTransition>
                <MRow
                  v-if="Object.values(tableOptions.filter).filter(e => e !== undefined && e !== null).length > 0"
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
                        @click="openFilterDialog"
                        @remove="onRemoveFilter(filterKey)"
                      >
                        <span>{{ getHeaders.find(e => e.name === filterKey)?.label || $t(`attributes.${filterKey}`) }}</span>
                        <span v-if="typeof filterValue === 'boolean'">:
                          <template v-if="filterKey === 'active'">{{ parseAttribute(filterValue ? 'active' : 'inactive') }}</template>
                          <template v-else>{{ $t(filterValue ? 'yes' : 'no') }}</template></span>
                        <span v-else-if="typeof filterValue === 'string'">: {{ filterValue }}</span>
                      </q-chip>
                    </MCol>
                  </template>
                </MRow>
              </MFadeTransition>

              <!-- Selection Row -->
              <MFadeTransition>
                <MRow
                  class="items-center q-gutter-xs"
                  style="min-height: 38px"
                >
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
          <div v-text="parseAttribute('replace.from_name', { from: pagination.rowsNumber, name: getRows.length })" />
        </template>

        <template
          v-if="!noBodyControl"
          #[`body-cell-${controlKey}`]="props"
        >
          <slot
            :dt="datatableItemsScope"
            :name="`body-cell-${controlKey}`"
            v-bind="props"
          >
            <q-td :props="props">
              <MDtContextmenuItems
                :index="props.rowIndex"
                :item="props.row"
                :items="contextmenuItems"
              />
            </q-td>
          </slot>
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
                <q-tooltip>{{ $t('myth.titles.back') }}</q-tooltip>
              </q-btn>
              {{ getShowTitle }}
            </q-toolbar-title>
          </q-toolbar>
        </q-card-section>
        <q-separator />
        <q-card-section
          :style="`height: ${($q.screen.height || 100) - 3 - ($refs.showActionsRef?.$el?.offsetHeight || 60) - ($refs.showTitleRef?.$el?.offsetHeight || 80)}px`"
          class="scroll"
        >
          <MFadeTransition>
            <slot
              :index="dialogs.index"
              :item="dialogs.item"
              name="show"
            />
          </MFadeTransition>
        </q-card-section>
        <q-separator />
        <q-card-actions
          ref="showActionsRef"
          align="left"
          class="print-hide"
        >
          <MBtn
            :label="$t('myth.titles.close')"
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
              <q-toolbar-title>
                <q-btn
                  :icon="`ion-ios-arrow-${$q.lang.rtl ? 'forward' : 'back'}`"
                  fab-mini
                  flat
                  @click="closeFormDialog"
                >
                  <q-tooltip>{{ $t('myth.titles.back') }}</q-tooltip>
                </q-btn>
                {{ getFormTitle }}
              </q-toolbar-title>
            </q-toolbar>
          </q-card-section>
          <q-separator />
          <q-card-section
            :style="`height: ${($q.screen.height || 100) - 3 - ($refs.formActions?.$el?.offsetHeight || 60) - ($refs.formTitle?.$el?.offsetHeight || 80)}px`"
            class="scroll"
          >
            <MFadeTransition>
              <slot
                :form="form"
                :index="dialogs.index"
                :item="dialogs.item"
                name="form"
                v-bind="datatableItemsScope"
              />
            </MFadeTransition>
          </q-card-section>
          <q-separator />
          <q-card-actions
            ref="formActions"
            align="between"
            class="m--datatable-form-actions print-hide"
          >
            <MBtn
              v-if="$q.screen.gt.sm"
              :disable="tableOptions.loading"
              :label="$t('myth.titles.close')"
              color="negative"
              no-caps
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
                :class="{'full-width': $q.screen.lt.sm}"
                :disable="tableOptions.loading "
                :label="$t('myth.titles.' + (isUpdateMode ? 'save' : 'store'))"
                :loading="tableOptions.loading"
                color="positive"
                no-caps
                type="submit"
                v-bind="$myth.options.dt?.dialogButtonsProps"
              />
            </slot>
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
                :label="$t('myth.titles.download')"
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
              v-if="imageDialog.src"
              :height="`${$q.screen.height - 70}px`"
              :src="imageDialog.src"
              class="self-center"
              fit="contain"
            />
          </MCol>
        </div>
      </q-card>
    </MDialog>
    <MFadeTransition>
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
          icon="add"
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
    </MFadeTransition>
  </div>
</template>

<script lang="ts">

import { computed, nextTick, onMounted, PropType, reactive, ref, useSlots, watch } from 'vue'
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
  MDtExportOptions,
  MDtItem,
  MDtItemIndex,
  MDtMythApiServicesSchema
} from './models'
import { useMyth } from '../../vue3'
import { useI18n } from 'vue-i18n'
import MDtContextmenuItems from './MDtContextmenuItems.vue'
import MDtBtn from './MDtBtn.vue'
import MFadeTransition from '../transition/MFadeTransition.vue'

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
  components: { MFadeTransition, MDtBtn, MDtContextmenuItems },
  inheritAttrs: !1,
  props: {
    controlKey: {
      type: String,
      default: () => 'control'
    },
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
    storeRoute: {
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
    showSelection: {
      type: Boolean,
      default: () => !1
    },
    hideSelection: {
      type: Boolean,
      default: () => !1
    },
    multiSelection: {
      type: Boolean,
      default: () => !1
    },
    rowsPerPageOptions: {
      type: Array as PropType<MDatatableProps['rowsPerPageOptions']>,
      default: () => [50, 250, 500, 0]
    },
    ignoreKeys: {
      type: [Array as PropType<MDatatableProps['ignoreKeys']>, Function],
      default: () => undefined
    },
    // Style
    flat: {
      type: Boolean,
      default: () => !0
    },
    bordered: {
      type: Boolean,
      default: () => !0
    },
    dense: {
      type: Boolean,
      default: () => !0
    },
    grid: {
      type: Boolean,
      default: () => undefined
    },
    title: {
      type: String as PropType<string | null | undefined>,
      default: () => undefined
    },
    manageColumns: {
      type: Boolean,
      default: () => undefined
    },
    noAddBtnTop: {
      type: Boolean,
      default: () => undefined
    },
    noAddBtnList: {
      type: Boolean,
      default: () => undefined
    },
    noAddBtnFab: {
      type: Boolean,
      default: () => undefined
    },
    noFullscreen: {
      type: Boolean,
      default: () => !1
    },
    noBodyControl: {
      type: Boolean,
      default: () => !1
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
    const itemDialog = ref<MDtItem | undefined>(undefined)
    const itemIndexDialog = ref<MDtItemIndex | undefined>()
    const errorsDialog = ref<any>({})
    const dialogs = reactive<MDatatableDialogsOptions>({
      filter: filterDialogModel,
      show: showDialogModel,
      form: formDialogModel,
      isUpdate: isUpdateDialog,
      item: itemDialog,
      index: itemIndexDialog,
      errors: errorsDialog
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
    const getHeaders = computed<any[]>(() => myth.parseHeaders(headersProp.value) || [])
    const visibleColumnsProp = computed(() => props.visibleColumns)
    const visibleHeaders = ref(myth.parseHeaders(visibleColumnsProp.value || headersProp.value).map(e => e.name))
    /** --- */

    const selected = ref<MDtItem[]>([])
    const meta = ref<MDatatableMetaServer>({ ...initMetaServer })
    const pagination = ref<MDatatablePagination>({ ...initPaginationOptions })
    const search = ref<string | null>(null)
    const searchColumnsProp = computed(() => props.searchColumns)
    const searchColumnsRef = ref<string[]>(myth.parseHeaders(searchColumnsProp.value || headersProp.value).filter(e => e?.field !== 'control').map(e => e.name))
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
        return t('replace.show_details', { name: t(`choice.${c}`, 1) })
      }
      return t('show_details')
    })
    const getFormTitle = computed(() => {
      const name = serviceName.value && typeof serviceName.value !== 'function' ? t(`choice.${myth.str.pascalCase(myth.str.pluralize(serviceName.value.split('/').pop()))}`, 1) : ''
      return t(`replace.${formMode.value}`, { name })
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
      const params: { [k: string]: string } & string | (() => string | object) = props[type]
      if (params) {
        if (typeof params === 'string') {
          v = params.split(',')
        }

        if (_.isArray(params)) {
          v = [...params]
        } else if (_.isObject(params) && typeof params !== 'function') {
          let e
          for (const k in params) {
            e = params[k]
            v.push(`${k}=${e}`)
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
        // console.log(JSON.stringify(tableOptions.filter))
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
          const { _data, _meta } = await getMythApiServicesSchema().index({ params })
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
          const response = await getMythApiServicesSchema().export(data)
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
    const openDialogTimeout = 100
    /** Show Dialog */
    const openShowDialogNoIndex = async (item: MDtItem) => {
      const index = getRows.value.findIndex(e => e.id === item.id)
      return await openShowDialog(item, index)
    }
    const openShowDialog = async (item: MDtItem, index: MDtItemIndex) => {
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
      const params: any = { fdt: 's' }
      if (getRequestWith('withShow')) {
        params.requestWith = getRequestWith('withShow')
      }

      getMythApiServicesSchema().show(item.id, { params })
        .then(({ _data }) => {
          dialogs.item = _data
          dialogs.index = index
          getRows.value[index] = _data
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
    const openUpdateDialogNoIndex = (item: MDtItem) => {
      const index = getRows.value.findIndex(e => e.id === item.id)
      return openUpdateDialog(item, index)
    }
    const openUpdateDialog = (item: MDtItem, index: MDtItemIndex) => {
      if (updateRouteProp.value) {
        router.push({
          name: updateRouteProp.value,
          params: { id: item.id }
        })
        return
      }
      if (loading.value) {
        return
      }
      loading.value = !0
      isUpdateMode.value = !0
      const params: any = { fdt: 'u' }
      if (getRequestWith('withUpdate')) {
        params.requestWith = getRequestWith('withUpdate')
      }
      getMythApiServicesSchema().show(item.id, { params })
        .then(({ _data }) => {
          dialogs.item = _data
          dialogs.index = index
          if (index || index === 0) {
            getRows.value[index] = _data
          }
          setTimeout(() => (dialogs.form = !0), openDialogTimeout)
        })
        .catch((e) => {
          const message = e?._message || e?.message
          message && myth.alertError(message)
        })
        .finally(() => (loading.value = !1))
    }
    const openCreateDialog = (dtItem?: MDtItem) => {
      if (props.storeRoute) {
        router.push({ name: props.storeRoute })
        return
      }
      const item = { ...(defaultItem.value || {}), ...(dtItem || {}) }
      // console.log(item)
      isUpdateMode.value = !1
      dialogs.item = Object.create(item)
      dialogs.index = undefined
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
    const ignoreKeysProps = computed(() => props.ignoreKeys)
    const defaultSubmitItem = async (_form: Record<string, any>) => {
      // let form = { ..._form, ...(dialogs.itemForm || {}) }
      let form = { ..._form }
      // console.log(form)
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
          const { _message, _success } = await getMythApiServicesSchema().destroy(item.id)
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
      dialogs.item = row
      dialogs.index = index
      nextTick(() => {
        setTimeout(() => {
          if (isGrid.value) {
            contextmenu.value = !0
          }
        }, 90)
      })
    }
    const contextmenuItemsProp = computed(() => props.contextItems)
    const contextmenuItems = computed(() => ([
      {
        name: 'show',
        click: (item: MDtItem, index: MDtItemIndex) => openShowDialog(item, index),
        showIf: hasShowBtn.value,
        order: 1
      },
      {
        name: 'update',
        click: (item: MDtItem, index: MDtItemIndex) => openUpdateDialog(item, index),
        showIf: hasUpdateBtn.value,
        order: 1
      },
      {
        name: 'destroy',
        click: (item: MDtItem, index: MDtItemIndex) => onDeleteItem(item, index),
        showIf: hasDestroyBtn.value,
        order: 1
      },
      ...(contextmenuItemsProp.value || [])
    ].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))))
    const endReach = computed<boolean>(() => props.endReach)
    const rowsPerPageOptions = computed(() => props.rowsPerPageOptions)
    const getRowsPerPageOptions = computed<any[]>(() => endReach.value ? [0] : (rowsPerPageOptions.value || [0]))

    const imageDialog = reactive<{ value: boolean, src?: string }>({
      value: !1,
      src: undefined
    })
    const openImageDialog = (src: string) => {
      imageDialog.src = src
      nextTick(() => {
        imageDialog.value = !0
      })
    }
    const closeImageDialog = () => {
      imageDialog.value = !1
      nextTick(() => {
        imageDialog.src = undefined
      })
    }

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
    // watch(() => dialogs.item, (v) => {
    //   dialogs.itemForm = v ? { ...v } : v
    // })
    watch(() => dialogs.form, (v) => {
      if (!v) {
        dialogs.errors = {}
      }
    })
    const datatableItemsScope = computed(() => ({
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
    }))

    return {
      contextmenu,
      contextmenuItems,
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

      getMythApiServicesSchema,
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
      openShowDialogNoIndex,
      closeShowDialog,
      openUpdateDialog,
      openUpdateDialogNoIndex,
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
      visibleHeaders,
      imageDialog,
      openImageDialog,
      closeImageDialog,

      isGrid
    }
  },
  computed: {
    getShowSelection (): boolean | undefined {
      if (this.hideSelection) {
        return !1
      }
      return this.showSelection
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

.grid-style-transition
  transition: transform .28s, background-color .28s

</style>
