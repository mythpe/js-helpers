/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { DialogChainObject, QNotifyCreateOptions, QTableProps } from 'quasar'
import { QNotifyUpdateOptions } from 'quasar/dist/types/api'
import { ApiServiceParams } from '../components'

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

export type ParseHeadersType = QTableProps['columns'] & ParsedHeader

export type ParseHeadersHeaderAgr = ParseHeadersType[] | string[] | any[]

// Axios
type Generic = Record<string | number | symbol, any>;
export type AxiosMetaResponse = {
  // server current page
  current_page: number | null;
  // server last page
  last_page: number | null;
  // server total items
  total: number | null;
  [key: string | number]: any;
};
export type AxiosDataRow = {
  id: string | number;
  value: string | number;
  label?: string;
  [key: string | number]: any;
};
export type AxiosDataResponse = AxiosDataRow | AxiosDataRow[];
export type AxiosErrorResponse = Record<string, string[]>;
export type AxiosErrorsResponse = AxiosErrorResponse[];
export type MainAxiosAppResponse = {
  _data: AxiosDataResponse;
  _message: string | null;
  _meta: AxiosMetaResponse;
  _success: boolean;
  _errors: AxiosErrorsResponse;
}
export type AppApiResponse = AxiosResponse<AxiosDataResponse> & MainAxiosAppResponse
export type UrlType = string | number | any;
export type ParamsType = Record<string, any> | FormData | object
export type ConfigType = AxiosRequestConfig<AppApiResponse> & Partial<{
  params: Partial<ApiServiceParams> & Generic
}>
export type HelpersStubSchema = {

  index (config?: ConfigType): Promise<AppApiResponse>;

  staticIndex (config?: ConfigType): Promise<AppApiResponse>;

  export (data?: ParamsType, config?: AxiosRequestConfig): Promise<AppApiResponse>;

  store (data?: ParamsType, config?: AxiosRequestConfig): Promise<AppApiResponse>;

  show (id: UrlType, config?: AxiosRequestConfig): Promise<AppApiResponse>;

  staticShow (id: UrlType, config?: AxiosRequestConfig): Promise<AppApiResponse>;

  update (id: UrlType, data?: ParamsType, config?: AxiosRequestConfig): Promise<AppApiResponse>;

  destroy (id: UrlType, config?: AxiosRequestConfig): Promise<AppApiResponse>;

  destroyAll (ids?: UrlType[], config?: AxiosRequestConfig): Promise<AppApiResponse>;

  getUploadAttachmentsUrl (id: UrlType): string;

  uploadAttachments (id: UrlType, data: Generic, config?: AxiosRequestConfig): Promise<AppApiResponse>;

  deleteAttachment (id: UrlType, fileId: string | number, config?: AxiosRequestConfig): Promise<AppApiResponse>;
};

export type StubSchemaContext = HelpersStubSchema
  & Record<string, ((...args: any) => Promise<AppApiResponse>)>
  & Record<string, Record<string, ((...args: any) => Promise<AppApiResponse>)>>
  & Record<string, Record<string, Record<string, ((...args: any) => Promise<AppApiResponse>)>>>

export type StubSchema = StubSchemaContext
  & ((...args: any) => Promise<AppApiResponse>)
  & string
  & Record<string, StubSchemaContext>

export type MythApiServicesSchema = { [key: string | symbol | number]: StubSchema }
// Axios

export type Vue3MAlertMessageOptions = QNotifyCreateOptions | string

export type Vue3MAlertMessage = (props?: QNotifyUpdateOptions) => void;

export type Vue3MConfirmMessage = DialogChainObject

export type DownloadFromResponse = {
  status: boolean;
  response: AxiosResponse;
}
