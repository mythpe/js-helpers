/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { AxiosError, AxiosResponse } from 'axios'
import { DialogChainObject, QNotifyCreateOptions, QTableProps } from 'quasar'
import { QNotifyUpdateOptions } from 'quasar/dist/types/api'
import { MDatatableProps } from '../components'

export type ParseHeaderOptions = {
  controlKey?: 'control' | string
  controlStyle?: 'max-width: 150px' | string
  align?: 'left' | 'right' | 'center' | undefined
  sortable?: boolean | undefined;
  classes?: string | (() => string),
  noSort?: string[]
}

// export interface ParsedHeader {
//   /**
//    * Unique id, identifies column, (used by pagination.sortBy, 'body-cell-[name]' slot, ...)
//    */
//   name: string;
//   /**
//    * Label for header
//    */
//   label: string;
//   /**
//    * Row Object property to determine value for this column or function which maps to the required property
//    * @param row The current row being processed
//    * @returns Value for this column
//    */
//   field: string | ((row: any) => any);
//   /**
//    * If we use visible-columns, this col will always be visible
//    */
//   required?: boolean;
//   /**
//    * Horizontal alignment of cells in this column
//    * Default value: right
//    */
//   align?: 'left' | 'right' | 'center';
//   /**
//    * Tell QTable you want this column sortable
//    */
//   sortable?: boolean;
//   /**
//    * Compare function if you have some custom data or want a specific way to compare two rows
//    * @param a Value of the first comparison term
//    * @param b Value of the second comparison term
//    * @param rowA Full Row object in which is contained the first term
//    * @param rowB Full Row object in which is contained the second term
//    * @returns Comparison result of term 'a' with term 'b'. Less than 0 when 'a' should come first; greater than 0 if 'b' should come first; equal to 0 if their position must not be changed with respect to each other
//    */
//   sort?: (a: any, b: any, rowA: any, rowB: any) => number;
//   /**
//    * Set column sort order: 'ad' (ascending-descending) or 'da' (descending-ascending); Overrides the 'column-sort-order' prop
//    * Default value: ad
//    */
//   sortOrder?: 'ad' | 'da';
//   /**
//    * Function you can apply to format your data
//    * @param val Value of the cell
//    * @param row Full Row object in which the cell is contained
//    * @returns The resulting formatted value
//    */
//   format?: (val: any, row: any) => any;
//   /**
//    * Style to apply on normal cells of the column
//    * @param row The current row being processed
//    */
//   style?: string | ((row: any) => string);
//   /**
//    * Classes to add on normal cells of the column
//    * @param row The current row being processed
//    */
//   classes?: string | ((row: any) => string);
//   /**
//    * Style to apply on header cells of the column
//    */
//   headerStyle?: string;
//   /**
//    * Classes to add on header cells of the column
//    */
//   headerClasses?: string;
// }

export type MDtColumn = QTableProps['columns'][number]

export type MDtHeadersParameter = MDtColumn[] | (keyof MDatatableProps['defaultItem'])[]

// Axios
type Generic = Record<any, any>;

export type ApiMetaInterface = {
  // server current page
  current_page: number | null;
  // server last page
  last_page: number | null;
  // server total items
  total: number | null;
  [K: any]: any;
};
export type ApiErrorInterface = Record<string, string[]>;
export type ApiErrorsInterface = ApiErrorInterface[];

export type ApiModel<T extends Generic = Generic> = {
  id: string | number;
  value: string | number;
  label?: string;
  [K: keyof T]: any;
  [s: string]: any;
};

type ResponseAsMain = Generic & {
  success: boolean;
  errors: ApiErrorsInterface;
  message: string;
}

type ResponseAsModel<T extends Generic = Generic> = ResponseAsMain & {
  data: ApiModel<T>
}
type ResponseAsList<T extends Generic = Generic> = ResponseAsMain & {
  data: ResponseAsModel<T>[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  }
  meta: ApiMetaInterface;
}
type ResponseDataType = ResponseAsList | ResponseAsModel | Generic;
export type ApiFulfilledResponse = AxiosResponse<ResponseDataType>
export type ApiErrorResponse = AxiosError<ResponseDataType>;

export type ApiInterface = ApiFulfilledResponse & {
  _data: ResponseDataType;
  _message: ResponseAsMain['message'];
  _meta: ResponseAsList['meta'];
  _success: ResponseAsMain['success'];
  _errors: ResponseAsMain['errors'];
}

// Axios

export type Vue3MAlertMessageOptions = QNotifyCreateOptions | string

export type Vue3MAlertMessage = (props?: QNotifyUpdateOptions) => void;

export type Vue3MConfirmMessage = DialogChainObject

export type DownloadFromResponse = {
  status: boolean;
  response: AxiosResponse;
}

export type DownloadFromResponseCode = 'no_response' | 'no_file_name' | 'no_file_url' | 'unknown' | string
export type DownloadFromResponseError = {
  code: DownloadFromResponseCode
  status: boolean;
}
