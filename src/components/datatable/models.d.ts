/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { AxiosResponse } from 'axios'
import { QAvatarProps, QAvatarSlots, QInputProps, QPageStickyProps, QTableProps, QTableSlots } from 'quasar'
import { ComputedRef, Ref, SetupContext, VNode } from 'vue'
import { GenericFormValues, MBtnProps, MBtnSlots, VeeFieldFormScope } from '../form/models'

export type TableFilterOptionsProps = GenericFormValues

export type MDtItem = GenericFormValues & {
  id: string | number
}

export type MDtItemIndex = number | undefined

export type PaginationOptionsProps = {
  /**
   * Column name (from column definition)
   */
  sortBy?: string | undefined;
  /**
   * Is sorting in descending order?
   */
  descending?: boolean | undefined;
  /**
   * Page number (1-based)
   */
  page: number;
  /**
   * How many rows per page? 0 means Infinite
   */
  rowsPerPage?: number | undefined;
  /**
   * For server-side fetching only. How many total database rows are there to be added to the table.
   */
  rowsNumber: number;
}

export interface FetchDatatableOptions {
  filter?: string | null;
  pagination?: PaginationOptionsProps
}

export interface DatatableParams {
  filter: Record<string, any>;
  search: string | null;
  headers: string[];
  ids: number[];
  indexType: 'index' | 'pdf' | 'excel';
  requestWith: string | undefined;
  itemsPerPage: number;
  page: number;
  sortBy: string | undefined;
  sortDesc: number | undefined;

  [key: string]: any;
}

export type TableMetaServerProps = {
  current_page: number | null;
  last_page: number | null;
  total: number | null;
}

export type TableOptionsProps = {
  loading: boolean
  selected: MDtItem[]
  search: string | null
  filter: TableFilterOptionsProps
  tempFilter: TableFilterOptionsProps
}

export type TableDialogsProps = {
  filter: boolean,
  show: boolean,
  form: boolean,
  isUpdate: boolean,
  item: MDtItem | null,
  index?: MDtItemIndex,
  errors: Record<string | number, string[] | string> | object,
}

export interface UseDatatableOptions {
  props: any;
  slots: SetupContext['slots'];
  emit: {
    (e: 'update:rows', value: MDtItem[]): void
    (e: 'refresh'): void
  };
  rows: Ref<MDtItem[]>,
  dialogs: Ref<TableDialogsProps>,
  tableOptions: Ref<TableOptionsProps>,
  metaServer: Ref<TableMetaServerProps>,
  paginationOptions: Ref<PaginationOptionsProps>,
}

export type MDatatableScope = {
  openShowDialog: (item: MDtItem, index?: MDtItemIndex) => void;
  closeShowDialog: () => void;
  openUpdateDialog: (item: MDtItem, index?: MDtItemIndex) => void;
  openCreateDialog: (item?: MDtItem) => void;
  closeFormDialog: () => void;
  onDeleteItem: (item: MDtItem, index: number) => void;
  refresh: (done?: () => void) => void;
  refreshNoUpdate: (done?: () => void) => void;
  tableOptions: Ref<TableOptionsProps>;
  isSingleSelectedItem: ComputedRef<boolean>;
  firstSelectedItem: ComputedRef<MDtItem>;
  updateDatatableItem: (item: MDtItem, index?: MDtItemIndex) => void;
  updateSelectedItems: ((selected: MDtItem[]) => void);
}

export type GenericMDtBtn = Record<string, any> & {
  name: string;
  click: (item: MDtItem, index: number) => void;
  show: boolean | undefined;
  order?: number | undefined;
  attr?: Record<string, any> & { icon?: string; textColor?: string; color?: string; } | undefined;
}

export interface MDatatableSlots extends Omit<QTableSlots, 'top-right' | `body-cell-${string}`> {
  'top-right': ((scope: {
    tableOptions: TableOptionsProps,
    paginationOptions: PaginationOptionsProps
  }) => VNode[]);

  tools: ((scope: {
    dt: MDatatableScope,
  }) => VNode[]);

  selection: ((scope: {
    dt: MDatatableScope,
  }) => VNode[]);

  filter: ((scope: {
    filter: TableFilterOptionsProps,
  }) => VNode[]);

  show: ((scope: {
    item: MDtItem,
    index: MDtItemIndex,
  }) => VNode[]);

  form: ((scope: MDatatableScope & {
    item: MDtItem,
    index: MDtItemIndex,
    form: VeeFieldFormScope,
  }) => VNode[]);

  'form-actions': ((scope: MDatatableScope & {
    item: MDtItem,
    index: MDtItemIndex,
    form: VeeFieldFormScope,
  }) => VNode[]);

  /**
   * Slot to define how a specific column cell looks like; replace '[name]' with column name (from columns definition object)
   * @param scope
   */
  [key: `body-cell-${string}`]: ((scope: Parameters<QTableSlots['body-cell']>[0] & {
    dt: MDatatableScope,
  }) => VNode[]);
}

export interface MDatatableProps extends QTableProps {
  separator?: QTableProps['separator'];
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
  defaultItem?: Partial<MDtItem> | undefined;
  noAutoMessage?: boolean | undefined;
  searchDebounce?: string | number | undefined;
  withIndex?: string | string[] | undefined;
  withStore?: string | string[] | undefined;
  withShow?: string | string[] | undefined;
  withUpdate?: string | string[] | undefined;
  serviceName: string | (() => Record<string, (() => Promise<AxiosResponse>)>);
  createRoute?: string | undefined;
  updateRoute?: string | undefined;
  showRoute?: string | undefined;
  contextItems?: GenericMDtBtn[] | undefined;
  offsetAddBtn?: QPageStickyProps['offset'];
  positionAddBtn?: QPageStickyProps['position'];
  filterDialogProps?: Record<any, any>;
  showDialogProps?: Record<any, any>;
  formDialogProps?: Record<any, any>;
  searchInputProps?: QInputProps;
  excludedKeys?: string[] | ((from: any) => any);
  requestParams?: Record<string, any> | ((params: any) => any);
}

export interface MDtAvatarProps extends QAvatarProps {
  width?: string | undefined;
  src?: string | undefined;
  href?: string | undefined;
}

export interface MDtAvatarSlots extends QAvatarSlots {
  /**
   * Default slot can be used for captions. See examples
   */
  default: () => VNode[];
}

export interface MDtBtnProps extends MBtnProps {
  show?: boolean;
  update?: boolean;
  destroy?: boolean;
  tooltip?: string;
  color?: string | undefined;
  icon?: string | undefined;
  listItem?: boolean | undefined;
}

export interface MDtBtnSlots extends MBtnSlots {
  /**
   * Use for custom content, instead of relying on 'icon' and 'label' props
   */
  default: () => VNode[];
  /**
   * Override the default QSpinner when in 'loading' state
   */
  loading: () => VNode[];
}

export {}
