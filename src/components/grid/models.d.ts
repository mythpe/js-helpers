/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { VNode } from 'vue'
import { AxiosDataRow } from '../../types'
import { AxiosRequestConfig } from 'axios'
import { QCardProps } from 'quasar'

export type ColStyleType = 'auto' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | undefined

export type MContainerProps = {
  titleFromRoute: boolean;
  title?: string | (() => string);
  subtitle?: string | (() => string);
}

export type MContainerSlots = {
  default: () => VNode[];
}

export interface MCardProps extends QCardProps {
  // titleFromRoute?: boolean | undefined;
  // title?: string | (() => string) | undefined;
  // subtitle?: string | (() => string) | undefined;
  // backRoute?: boolean | undefined;
  readonly loading?: boolean | undefined;
  readonly title?: string | null | undefined;
  readonly center?: boolean | undefined;
  readonly color?: string | undefined;
  readonly padding?: string | boolean;
}

export interface MCardSlots {
  'card-title': () => VNode[];
  title: () => VNode[];
  'after-title': () => VNode[];
  loading: () => VNode[];
  default: () => VNode[];
}

export type MColumnProps = {
  //
}
export type MColumnSlots = {
  default: () => VNode[];
}

export type MRowProps = {
  defaultGutters?: string | undefined;
  gutters?: boolean | string | undefined;
  col?: boolean | string | undefined;
}
export type MRowSlots = {
  default: () => VNode[];
}

export type MColProps = {
  auto?: boolean | undefined
  col?: ColStyleType
  xs?: ColStyleType
  sm?: ColStyleType
  md?: ColStyleType
  lg?: ColStyleType
  xl?: ColStyleType
}
export type MColSlots = {
  default: () => VNode[];
}

export type MListProps = MColProps & {
  name: string;
  title?: string | undefined | null;
  options?: Record<string, any>;
  search?: string;
  filter?: Record<string | number, any>;
  axiosConfig?: AxiosRequestConfig;
  backRoute?: boolean | null | undefined;
}
type MListScopes = { models: AxiosDataRow[], filter: MListProps['filter'], search: MListProps['search'] }
export type MListSlots = {
  default: (scope: { item: AxiosDataRow, index: number } & MListScopes) => VNode[];
  top: (scope: MListScopes) => VNode[];
  noResult: (scope: MListScopes) => VNode[];
  noData: (scope: MListScopes) => VNode[];
  loading: (scope: MListScopes) => VNode[];
}

export type MDraggableProps = {
  modelValue: any;
  itemTag?: any;
  itemKey?: any;
  group?: string;
  handle?: string;
  ghostClass?: string;
}
export type MDraggableSlots = {
  default: () => VNode[];
}
