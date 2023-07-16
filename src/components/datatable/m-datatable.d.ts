/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { Ref } from 'vue'

export type GenericFormValues = Record<any, unknown>;

export interface ApiServiceParams {
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

export interface MDataTableProps {
  serviceName: string;
  requestParams?: (params:ApiServiceParams) => Partial<GenericFormValues> | GenericFormValues;
}

export interface MDtApiService {
  index: ((opt:{params:ApiServiceParams}) => Promise<any>);
}

export interface MDtItem extends GenericFormValues {
  id: string | number;
}

export type MDatatableFilterForm = Partial<GenericFormValues>

export interface MDatatablePagination {
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

export interface MDatatableMetaServer {
  // server current page
  current_page: number | null;
  // server last page
  last_page: number | null;
  // server total items
  total: number | null;
}

export interface MDatatableOptions {
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
  //
  selected: Ref<MDtItem[]>
}

export interface FetchRowsArgs {
  filter?: string | null;
  pagination?: MDatatablePagination
}
