/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { AxiosResponse } from 'axios'
import { QAvatarProps, QAvatarSlots, QTableProps, QTableSlots } from 'quasar'
import { ComputedRef, Ref, UnwrapRef, VNode } from 'vue'
import { GenericFormValues, MBtnProps, MBtnSlots, VeeFieldFormScope } from '../form/models'
import { AxiosMetaResponse, StubSchema } from '../../types'

export interface MDtItem extends GenericFormValues {
  id: string | number;
}

export type MDtItemIndex = number;
export type MDtExportOptions = 'pdf' | 'excel';

export interface MDatatablePagination {
  /**
   * Column name (from column definition)
   */
  sortBy?: string;
  /**
   * Is sorting in descending order?
   */
  descending?: boolean;
  /**
   * Page number (1-based)
   */
  page: number;
  /**
   * How many rows per page? 0 means Infinite
   */
  rowsPerPage?: number;
  /**
   * For server-side fetching only. How many total database rows are there to be added to the table.
   */
  rowsNumber: number;
}

export type MDatatableFilterForm = Partial<GenericFormValues>

export interface FetchRowsArgs {
  filter?: string | null;
  pagination?: MDatatablePagination
}

export interface ApiServiceParams {
  filter?: Record<string, any>;
  search?: string | null;
  searchColumns?: string[];
  // headers: string[];
  headerItems?: Record<number, any>[];
  ids?: number[];
  indexType: 'index' | 'pdf' | 'excel';
  // For Datatable, index,export-pdf|excel,update,create,show,delete
  fdt: 'i' | 'e' | 'u' | 'c' | 's' | 'd';
  requestWith?: string;
  itemsPerPage: number;
  page: number;
  sortBy?: string;
  sortDesc?: number;
  toUrl?: boolean;

  [key: string]: any;
}

export type MDtMythApiServicesSchema = StubSchema;

export type MDatatableMetaServer = AxiosMetaResponse

export type MDatatableOptions = {
  // Table has action like : delete, update, etc...
  hasAction: Ref<boolean>;
  // Table is loading
  loading: Ref<boolean>;
  // Search input
  search: Ref<string | null>;
  // Table pagination
  pagination: Ref<MDatatablePagination>;
  // Server meta data
  meta: Ref<MDatatableMetaServer>;
  // Table filter form
  filter: Ref<MDatatableFilterForm>;
  // Temp of filter form
  tempFilter: Ref<MDatatableFilterForm>;
  // Selected rows
  selected: Ref<MDtItem[]>;
  // Fullscreen of datatable
  fullscreen: Ref<boolean>;
}

export type MDatatableDialogsOptions = {
  filter: Ref<boolean>;
  show: Ref<boolean>;
  form: Ref<boolean>;
  isUpdate: Ref<boolean>;
  item: Ref<MDtItem | undefined>;
  index: Ref<MDtItemIndex | undefined>;
  errors: Record<string | number | symbol, string[]>;
}

export interface MDtBtnProps extends MBtnProps {
  show?: boolean;
  update?: boolean;
  destroy?: boolean;
  tooltip?: string | undefined;
  color?: string;
  icon?: string;
  listItem?: boolean;
  fabMini?: boolean;
  flat?: boolean;
  round?: boolean;
  dense?: boolean;
  label?: string | undefined;
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

export type MDatatableScope = {
  openShowDialog: (item: MDtItem, index?: MDtItemIndex) => void;
  closeShowDialog: () => void;
  openUpdateDialog: (item: MDtItem, index?: MDtItemIndex) => void;
  openCreateDialog: (item?: MDtItem) => void;
  closeFormDialog: () => void;
  onDeleteItem: (item: MDtItem, index: number) => void;
  refresh: (done?: () => void) => void;
  refreshNoUpdate: (done?: () => void) => void;
  tableOptions: Ref<MDatatableOptions>;
  isSingleSelectedItem: ComputedRef<boolean>;
  firstSelectedItem: ComputedRef<MDtItem>;
  updateDatatableItem: (item: MDtItem, index?: MDtItemIndex) => void;
  updateSelectedItems: ((selected: MDtItem[]) => void);
}

export type GenericMDtBtn = Record<string, any> & {
  name: string;
  label?: string;
  tooltip?: string;
  click?: (item: UnwrapRef<MDatatableDialogsOptions['item']>, index: UnwrapRef<MDatatableDialogsOptions['index']>) => void;
  multiClick?: (items: MDtItem[]) => void;
  showIf?: boolean | ((item: UnwrapRef<MDatatableDialogsOptions['item']>, index: UnwrapRef<MDatatableDialogsOptions['index']>) => boolean);
  order?: number;
  attr?: Partial<MDtBtnProps> & Partial<{ icon?: string; textColor?: string; color?: string; }>;
}

export interface MDatatableSlots extends Omit<QTableSlots, 'top-right' | `body-cell-${string}`> {
  'top-right': ((scope: { tableOptions: MDatatableOptions, paginationOptions: MDatatablePagination }) => VNode[]);

  tools: ((scope: { dt: MDatatableScope, }) => VNode[]);

  selection: ((scope: { dt: MDatatableScope, }) => VNode[]);

  filter: ((scope: { filter: MDatatableFilterForm, }) => VNode[]);

  show: ((scope: { item: MDtItem, index: MDtItemIndex, }) => VNode[]);

  form: ((scope: MDatatableScope & { item: MDtItem, index: MDtItemIndex, form: VeeFieldFormScope, }) => VNode[]);

  'form-actions': ((scope: MDatatableScope & { item: MDtItem, index: MDtItemIndex, form: VeeFieldFormScope, }) => VNode[]);

  /**
   * Slot to define how a specific column cell looks like; replace '[name]' with column name (from columns definition object)
   * @param scope
   */
  [key: `body-cell-${string}`]: ((scope: Parameters<QTableSlots['body-cell']>[0] & { dt: MDatatableScope, }) => VNode[]);
}

export type MDtServiceNameCallbackProp = (() => Record<string, (() => Promise<AxiosResponse>)>)
export type MDtServiceNameStringProp = string
export type MDtRequestParamsCallbackProp = (params: ApiServiceParams) => Partial<GenericFormValues>
export type MDtRequestParamsObjectProp = Partial<GenericFormValues>

export interface MDatatableProps extends Omit<QTableProps, 'rows' | 'rowsPerPageOptions' | 'grid' | 'title' | 'visibleColumns'> {
  defaultItem?: Partial<MDtItem> & Record<string, any>;
  contextItems?: GenericMDtBtn[];
  hideAutoMessage?: boolean;
  headers: string[] | Partial<QTableProps['columns']>[] | any[];
  rows?: readonly any[] | undefined;
  serviceName: MDtServiceNameStringProp | MDtServiceNameCallbackProp;
  requestParams?: MDtRequestParamsObjectProp | MDtRequestParamsCallbackProp;
  pdf?: boolean;
  excel?: boolean;
  exportToUrl?: boolean;
  hideSearch?: boolean;
  searchDebounce?: string | number;
  withIndex?: string | string[];
  withStore?: string | string[];
  withShow?: string | string[];
  withUpdate?: string | string[];
  hideAddBtn?: boolean;
  hideUpdateBtn?: boolean;
  hideShowBtn?: boolean;
  hideDestroyBtn?: boolean;
  storeRoute?: string;
  updateRoute?: string;
  showRoute?: string;
  noMouse?: boolean;
  endReach?: boolean;
  showSelection?: boolean;
  multiSelection?: boolean;
  rowsPerPageOptions?: (string | number)[];
  ignoreKeys?: string[] | ((from: any) => any);
  grid?: boolean;
  title?: string | null | undefined;
  manageColumns?: boolean;
  visibleColumns?: string[];
  searchColumns?: string[];
  /**
   * Show Add btn top of table,
   */
  noAddBtnTop?: boolean;
  /**
   * Show Add btn inside more list
   */
  noAddBtnList?: boolean;
  /**
   * Show Fab Add btn
   */
  noAddBtnFab?: boolean;
  /**
   * make datatable fullscreen mode
   */
  noFullscreen?: boolean;
  /**
   * Auto actions body headers 'control'
   */
  noBodyControl?: boolean;
}

export interface MDtAvatarProps extends QAvatarProps {
  width?: string;
  src?: string;
  href?: string;
}

export interface MDtAvatarSlots extends QAvatarSlots {
  /**
   * Default slot can be used for captions. See examples
   */
  default: () => VNode[];
}

export {}
