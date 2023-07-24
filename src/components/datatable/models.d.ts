/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { AxiosResponse } from 'axios'
import { QAvatarProps, QAvatarSlots, QTableProps, QTableSlots } from 'quasar'
import { ComputedRef, Ref, SetupContext, UnwrapRef, VNode } from 'vue'
import { GenericFormValues, MBtnProps, MBtnSlots, VeeFieldFormScope } from '../form/models'

export interface MDtItem extends GenericFormValues {
  id: string | number;
}

export type MDtItemIndex = number | undefined
export type MDtExportOptions = 'pdf' | 'excel'

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
  filter: Record<string, any>;
  search: string | null;
  headers: string[];
  ids: number[];
  indexType: 'index' | 'pdf' | 'excel';
  requestWith?: string | any;
  itemsPerPage: number;
  page: number;
  sortBy: string | undefined;
  sortDesc: number | undefined;

  [key: string]: any;
}

export interface MDtApiServices {
  index: ((opt: { params: Partial<ApiServiceParams>, [index: string | number | symbol]: any }) => Promise<any>);
  show: (id: number | string, opt: {
    params: Partial<ApiServiceParams>,
    [index: string | number | symbol]: any
  }) => Promise<any>;
  store: (opt: Record<string, any>) => Promise<any>;
  update: (id: (number | string | undefined), opt: Record<string, any>) => Promise<any>;
  destroy: (id: (number | string)) => Promise<any>;
  destroyAll: (id: (number | string)[]) => Promise<any>;
  export: ((opt: Record<string, any>) => Promise<any>);
}

export interface MDatatableMetaServer {
  // server current page
  current_page: number | null;
  // server last page
  last_page: number | null;
  // server total items
  total: number | null;
}

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
  selected: Ref<MDtItem[]>
}

export type MDatatableDialogsOptions = {
  filter: Ref<boolean>,
  show: Ref<boolean>,
  form: Ref<boolean>,
  isUpdate: Ref<boolean>,
  item: Ref<MDtItem | null>,
  itemForm: MDtItem | null,
  index?: Ref<MDtItemIndex>,
  errors: Record<string | number, string[] | string> | object,
}

export interface MDtBtnProps extends MBtnProps {
  show?: boolean;
  update?: boolean;
  destroy?: boolean;
  tooltip?: string;
  color?: string;
  icon?: string;
  listItem?: boolean;
  fabMini?: boolean;
  flat?: boolean;
  round?: boolean;
  dense?: boolean;
  label?: string;
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

export interface UseDatatableOptions {
  props: any;
  slots: SetupContext['slots'];
  emit: {
    (e: 'update:rows', value: MDtItem[]): void
    (e: 'refresh'): void
  };
  rows: Ref<MDtItem[]>,
  dialogs: Ref<MDatatableDialogsOptions>,
  tableOptions: Ref<MDatatableOptions>,
  metaServer: Ref<MDatatableMetaServer>,
  paginationOptions: Ref<MDatatablePagination>,
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
  click?: (item: UnwrapRef<MDatatableDialogsOptions['item']>, index: UnwrapRef<MDatatableDialogsOptions['index']>) => void;
  multiClick?: (items: MDtItem[]) => void;
  showIf?: boolean;
  order?: number;
  attr?: Partial<MDtBtnProps> & Partial<{ icon?: string; textColor?: string; color?: string; }>;
}

export interface MDatatableSlots extends Omit<QTableSlots, 'top-right' | `body-cell-${string}`> {
  'top-right': ((scope: {
    tableOptions: MDatatableOptions,
    paginationOptions: MDatatablePagination
  }) => VNode[]);

  tools: ((scope: {
    dt: MDatatableScope,
  }) => VNode[]);

  selection: ((scope: {
    dt: MDatatableScope,
  }) => VNode[]);

  filter: ((scope: {
    filter: MDatatableFilterForm,
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

export type MDtServiceNameCallbackProp = (() => Record<string, (() => Promise<AxiosResponse>)>)
export type MDtServiceNameStringProp = string
export type MDtRequestParamsCallbackProp = (params: ApiServiceParams) => Partial<GenericFormValues>
export type MDtRequestParamsObjectProp = Partial<GenericFormValues>

export interface MDatatableProps extends Omit<QTableProps, 'rows' | 'rowsPerPageOptions' | 'grid' | 'title' | 'visibleColumns'> {
  defaultItem?: Partial<MDtItem>;
  contextItems?: GenericMDtBtn[];
  hideAutoMessage?: boolean;
  headers: string[] | Partial<QTableProps['columns'][]>;
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
  createRoute?: string;
  updateRoute?: string;
  showRoute?: string;
  noMouse?: boolean;
  endReach?: boolean;
  hideSelection?: boolean;
  singleSelection?: boolean;
  rowsPerPageOptions?: (string | number)[];
  excludedKeys?: string[] | ((from: any) => any);
  grid?: boolean;
  title?: string;
  noManageColumns?: boolean;
  visibleColumns?: string[];
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
