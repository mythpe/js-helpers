/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { AxiosResponse } from 'axios'
import { QImgProps, QImgSlots, QTableProps, QTableSlots } from 'quasar'
import { ComputedRef, Ref, VNode } from 'vue'
import { GenericFormValues, MBtnProps, MBtnSlots, VeeFieldFormScope } from '../form/models'

export type TableFilterOptionsProps = GenericFormValues

export type DatatableItem = GenericFormValues & {
  id: string | number
}

export type PaginationOptionsProps = {
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
}

export type MDatatableDialogItem = DatatableItem

export type MDatatableDialogIndex = number | undefined

export type TableMetaServerProps = {
  current_page: number | null;
  last_page: number | null;
  total: number | null;
}

export type TableOptionsProps = {
  loading: boolean
  selected: DatatableItem[]
  search: string | null
  filter: TableFilterOptionsProps
  tempFilter: TableFilterOptionsProps
}

export type TableDialogsProps = {
  filter: boolean,
  show: boolean,
  form: boolean,
  isUpdate: boolean,
  item: DatatableItem | null,
  index?: MDatatableDialogIndex,
  errors: Record<string | number, string[] | string> | object,
}

export type MDatatableScope = {
  openShowDialog: (item: DatatableItem, index?: MDatatableDialogIndex) => void;
  closeShowDialog: () => void;
  openUpdateDialog: (item: DatatableItem, index?: MDatatableDialogIndex) => void;
  openCreateDialog: (item?: DatatableItem) => void;
  closeFormDialog: () => void;
  deleteItem: (item: DatatableItem, index: number) => void;
  refresh: (done?: () => void) => void;
  refreshNoUpdate: (done?: () => void) => void;
  tableOptions: Ref<TableOptionsProps>;
  isSingleSelectedItem: ComputedRef<boolean>;
  firstSelectedItem: ComputedRef<DatatableItem>;
  updateDatatableItem: (item: DatatableItem, index?: MDatatableDialogIndex) => void;
  updateSelectedItems: ((selected: DatatableItem[]) => void);
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
    item: MDatatableDialogItem,
    index: MDatatableDialogIndex,
  }) => VNode[]);

  form: ((scope: MDatatableScope & {
    item: MDatatableDialogItem,
    index: MDatatableDialogIndex,
    form: VeeFieldFormScope,
  }) => VNode[]);

  'form-actions': ((scope: MDatatableScope & {
    item: MDatatableDialogItem,
    index: MDatatableDialogIndex,
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

export interface MDtAvatarProps extends QImgProps {
  width?: string | undefined;
  src?: string | undefined;
}

export interface MDtAvatarSlots extends QImgSlots {
  /**
   * Default slot can be used for captions. See examples
   */
  default: () => VNode[];
  /**
   * While image is loading, this slot is being displayed on top of the component; Suggestions: a spinner or text
   */
  loading: () => VNode[];
  /**
   * Optional slot to be used when image could not be loaded; make sure you assign a min-height and min-width to the component through CSS
   */
  error: () => VNode[];
}

export interface MDtBtnProps extends MBtnProps {
  show?: boolean;
  update?: boolean;
  destroy?: boolean;
  tooltip?: string;
  color?: string | undefined;
  icon?: string | undefined;
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
