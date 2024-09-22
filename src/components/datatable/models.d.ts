/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { AxiosResponse } from 'axios'
import { QAvatarProps, QAvatarSlots, QTableProps, QTableSlots } from 'quasar'
import { ComputedRef, MaybeRef, Ref, UnwrapNestedRefs, UnwrapRef, VNode } from 'vue'
import { GenericFormValues, MBtnProps, MBtnSlots, MFormSlots } from '../form/models'
import { ApiMetaInterface, Generic, StubSchema } from '../../types'
import { RouteLocationRaw } from 'vue-router'

export type MDtItem<T extends object = Record<keyof T, any>> = T & {
  id: string | number;
  [K: keyof T]: any;
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
  rowsNumber?: number;
}

export type MDatatableFilterForm = Partial<GenericFormValues>

export interface FetchRowsArgs {
  filter?: string | null;
  pagination?: MDatatablePagination
}

export interface ApiServiceParams {
  filter?: Record<string, any>;
  search?: string | null;
  searchColumns?: string[] | string;
  // headers: string[];
  headerItems?: any[] | string[] | string;
  ids?: number[];
  indexType: 'index' | 'pdf' | 'excel';
  // For Datatable, index,export-pdf|excel,update,create,show,delete
  fdt: 'i' | 'e' | 'u' | 'c' | 's' | 'd';
  requestWith?: string;
  itemsPerPage: number;
  page: number;
  sortBy?: string;
  sortDesc?: number;
  toUrl?: MDtExportOptions | boolean;

  [key: string]: any;
}

export type MDtMythApiServicesSchema = StubSchema;

export type MDatatableMetaServer = ApiMetaInterface

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
  // Datatable headers
  getHeaders: ComputedRef<string[] | Partial<QTableProps['columns']> | any[]>;
}
type MDDIP<T extends Generic = Generic | any> = Partial<MDtItem> & Record<string, any> | T;
export type MDatatableDialogsOptions<T extends MDDIP = MDDIP> = {
  filter: Ref<boolean>;
  show: Ref<boolean>;
  form: Ref<boolean>;
  isUpdate: Ref<boolean>;
  item: T | MaybeRef<MDDIP<T>> | UnwrapRef<MDDIP<T>> | Record<string, any> | undefined;
  index: Ref<MDtItemIndex | undefined>;
  errors: Record<string | number | symbol, string[]> | any;
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

type UnwrapNestedTableOptionsType = UnwrapNestedRefs<MDatatableOptions>;
export type MDatatableScope = {
  openShowDialog: (item: MDtItem, index?: MDtItemIndex) => void;
  openShowDialogNoIndex: (item: MDtItem) => void;
  closeShowDialog: () => void;
  openUpdateDialog: (item: MDtItem, index?: MDtItemIndex) => void;
  openUpdateDialogNoIndex: (item: MDtItem) => void;
  openCreateDialog: (item?: MDtItem) => void;
  closeFormDialog: () => void;
  onDeleteItem: (item: MDtItem, index: number) => void;
  refresh: (done?: () => void) => void;
  refreshNoUpdate: (done?: () => void) => void;
  tableOptions: UnwrapNestedTableOptionsType;
  isSingleSelectedItem: ComputedRef<boolean>;
  firstSelectedItem: ComputedRef<MDtItem>;
  updateDatatableItem: (item: MDtItem, index?: MDtItemIndex) => void;
  updateSelectedItems: ((selected: MDtItem[]) => void);
  imageDialog: UnwrapNestedRefs<{ value: boolean, src?: string, asAttachment?: boolean }>;
  openImageDialog: (src: string, opts?: { asAttachment?: boolean }) => void;
  closeImageDialog: () => void;
}
type E = MDatatableDialogsOptions['item'];
export type GenericMDtBtn<T extends E = E> = Record<string, any> & {
  name: string;
  label?: string;
  contextLabel?: string | null;
  tooltip?: string;
  click?: (item: UnwrapRef<T> | Ref<T> | T, index: UnwrapRef<MDatatableDialogsOptions['index']>) => void;
  multiClick?: (items: T[]) => void;
  showIf?: boolean | ((item: UnwrapRef<MDatatableDialogsOptions['item']>, index: UnwrapRef<MDatatableDialogsOptions['index']>) => boolean);
  order?: number;
  attr?: Partial<MDtBtnProps> & Partial<{ icon?: string; textColor?: string; color?: string; }>;
}

type MDatatableFormScope = Parameters<MFormSlots['default']>[0]

type MDatatableMainScope = {
  dt: MDatatableScope,
  item: MDtItem,
  index: MDtItemIndex,
  form: MDatatableFormScope,
}

export interface MDatatableSlots extends Omit<QTableSlots, `body-cell-${string}` | 'top'> {
  tools: ((scope: { dt: MDatatableScope, }) => VNode[]);

  selection: ((scope: { dt: MDatatableScope, }) => VNode[]);

  filter: ((scope: { filter: MDatatableFilterForm } & MDatatableMainScope) => VNode[]);

  show: ((scope: MDatatableMainScope) => VNode[]);

  form: ((scope: MDatatableMainScope) => VNode[]);

  'form-actions': ((scope: MDatatableMainScope) => VNode[]);

  title: ((scope: MDatatableMainScope) => VNode[]);
  'top-search': ((scope: MDatatableMainScope) => VNode[]);
  'bottom-search': ((scope: MDatatableMainScope) => VNode[]);

  [K: `body-cell-${string}`]: ((scope: Parameters<QTableSlots['body-cell']>[0] & { dt: MDatatableScope }) => VNode[]);
}

export type MDtServiceNameCallbackProp = (() => Record<string, (() => Promise<AxiosResponse>)>)
export type MDtServiceNameStringProp = string
export type MDtRequestParamsCallbackProp = (params: ApiServiceParams) => Partial<GenericFormValues>
export type MDtRequestParamsObjectProp = Partial<GenericFormValues>

export type MDatatableProps<I extends GenericFormValues = GenericFormValues> = Omit<QTableProps, 'rows' | 'rowsPerPageOptions' | 'visibleColumns'> & {
  rows?: any[];
  controlKey?: string;
  defaultItem?: Partial<MDtItem<I>>
  contextItems?: GenericMDtBtn[];
  hideAutoMessage?: boolean;
  headers: string[] | Partial<QTableProps['columns']> | any[];
  serviceName?: MDtServiceNameStringProp | MDtServiceNameCallbackProp;
  requestParams?: MDtRequestParamsObjectProp | MDtRequestParamsCallbackProp;
  pdf?: boolean;
  excel?: boolean;
  exportUrl?: MDtExportOptions | boolean;
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
  storeRoute?: string | RouteLocationRaw;
  storeQueryParams?: boolean;
  updateRoute?: string | RouteLocationRaw;
  updateQueryParams?: boolean;
  showRoute?: string | RouteLocationRaw;
  showQueryParams?: boolean;
  mouse?: boolean;
  noRefreshBtn?: boolean;
  endReach?: boolean;
  showSelection?: boolean;
  hideSelection?: boolean;
  multiSelection?: boolean;
  multiDestroy?: boolean;
  rowsPerPageOptions?: (string | number)[];
  ignoreKeys?: string[] | ((form: Record<string, any>) => string[]) | any[];
  manageColumns?: boolean;
  visibleColumns?: (string | null | undefined)[] | any[];
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
  /**
   * Auto actions card 'control'
   */
  showCardControlHeader?: boolean;
  /**
   * Set datatable to fixed view
   */
  fixed?: boolean;
  /**
   * Names of image columns in the table.
   */
  imageColumns?: string[] | any[];
  /**
   * How to display image button in table.
   */
  imageMode?: 'icon' | 'image';
  /**
   * Image size in display
   */
  imageSize?: string;

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
