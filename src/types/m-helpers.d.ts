/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { QTableProps } from 'quasar'

export type ParseHeaderOptions = {
  controlKey?: 'control' | string
  controlStyle?: 'max-width: 150px' | string
  align?: 'left' | 'right' | 'center' | undefined
  sortable?: boolean | undefined;
  classes?: string | (() => string)
}
export interface ParsedHeader {
  /**
   * Unique id, identifies column, (used by pagination.sortBy, 'body-cell-[name]' slot, ...)
   */
  name: string;
  /**
   * Label for header
   */
  label: string;
  /**
   * Row Object property to determine value for this column or function which maps to the required property
   * @param row The current row being processed
   * @returns Value for this column
   */
  field: string | ((row: any) => any);
  /**
   * If we use visible-columns, this col will always be visible
   */
  required?: boolean;
  /**
   * Horizontal alignment of cells in this column
   * Default value: right
   */
  align?: 'left' | 'right' | 'center';
  /**
   * Tell QTable you want this column sortable
   */
  sortable?: boolean;
  /**
   * Compare function if you have some custom data or want a specific way to compare two rows
   * @param a Value of the first comparison term
   * @param b Value of the second comparison term
   * @param rowA Full Row object in which is contained the first term
   * @param rowB Full Row object in which is contained the second term
   * @returns Comparison result of term 'a' with term 'b'. Less than 0 when 'a' should come first; greater than 0 if 'b' should come first; equal to 0 if their position must not be changed with respect to each other
   */
  sort?: (a: any, b: any, rowA: any, rowB: any) => number;
  /**
   * Set column sort order: 'ad' (ascending-descending) or 'da' (descending-ascending); Overrides the 'column-sort-order' prop
   * Default value: ad
   */
  sortOrder?: 'ad' | 'da';
  /**
   * Function you can apply to format your data
   * @param val Value of the cell
   * @param row Full Row object in which the cell is contained
   * @returns The resulting formatted value
   */
  format?: (val: any, row: any) => any;
  /**
   * Style to apply on normal cells of the column
   * @param row The current row being processed
   */
  style?: string | ((row: any) => string);
  /**
   * Classes to add on normal cells of the column
   * @param row The current row being processed
   */
  classes?: string | ((row: any) => string);
  /**
   * Style to apply on header cells of the column
   */
  headerStyle?: string;
  /**
   * Classes to add on header cells of the column
   */
  headerClasses?: string;
}
export type ParseHeadersType = QTableProps['columns'] | ParsedHeader | undefined

export type UrlType = string | number | boolean | undefined | null

export type ParamsType = boolean | Record<string, any> | FormData | object

export type ConfigType = AxiosRequestConfig

export type GetType = (config?: ConfigType | boolean) => string | AxiosInstance['get'] | Promise<AxiosInstance['get']>

export type PostType = (data?: ParamsType, config?: ConfigType) => string | AxiosInstance['post'] | Promise<AxiosInstance['post']>

export interface StubSchema {
  index: GetType
  export: PostType
  store: PostType;
  show: ((id: UrlType, config?: ConfigType) => string | AxiosInstance['get'] | Promise<AxiosInstance['get']>);
  update: ((id: UrlType, data: ParamsType, config?: ConfigType) => string | AxiosInstance['post'] | Promise<AxiosInstance['post']>);
  destroy: ((id: UrlType, config?: ConfigType) => string | AxiosInstance['delete'] | Promise<AxiosInstance['delete']>);
  destroyAll: ((ids: UrlType[] | boolean, config?: ConfigType) => string | AxiosInstance['post'] | Promise<AxiosInstance['post']>);
  utilities: GetType
  staticUtilities: GetType;
  staticShow: ((id: UrlType, config?: ConfigType) => string | AxiosInstance['get'] | Promise<AxiosInstance['get']>);
  uploadAttachments: (id: UrlType, data: ParamsType, config?: ConfigType) => string | AxiosInstance['post'] | Promise<AxiosInstance['post']>;
  deleteAttachment: (id: UrlType, fileId: string | number, config?: ConfigType | boolean) => string | AxiosInstance['delete'] | Promise<AxiosInstance['delete']>;
}
