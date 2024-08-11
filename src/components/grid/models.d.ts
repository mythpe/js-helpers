/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { VNode } from 'vue'
import { ApiModel } from '../../types'
import { AxiosRequestConfig } from 'axios'
import { QBtnProps, QCardProps, QImgProps, QImgSlots } from 'quasar'

export type ColStyleType =
  | boolean
  | (string & (
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12'
  ))
  | (number & (
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  ))
  | 'auto'
  | 'grow'
  | 'shrink'
  | null
  | undefined
export type ViewModeProps = {
  /**
   * Set input to vie mode use q-field
   */
  viewMode?: boolean;
  /**
   * View Mode value for input or modelValue.
   */
  viewModeValue?: any;
}

export type MContainerProps = {
  readonly dense?: boolean | undefined;
  readonly fluid?: boolean | undefined;
} & Record<string, any>;

export type MContainerSlots = {
  default?: () => VNode[];
}

export type MBlockProps = {
  /**
   * No padding block
   * */
  readonly dense?: boolean;
  /**
   * Size of the padding block. Default: 'md'
   * */
  readonly size?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Rounded block
   */
  readonly rounded?: boolean;
  /**
   * Shadow level
   */
  readonly shadow?: string | number | 'transition';
};

export type MBlockSlots = {
  default?: () => VNode[];
}

export interface MCardProps extends QCardProps {
  readonly loading?: boolean | undefined;
  readonly title?: string | null | undefined;
  readonly center?: boolean | undefined;
  readonly color?: string | undefined;
  readonly padding?: string | boolean;
  readonly backBtn?: boolean;
  readonly noBack?: boolean;
  readonly backBtnProps?: QBtnProps;
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
  /**
   * Default: 'md'
   */
  space?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  gutter?: boolean | undefined;
  col?: boolean | undefined;
}
export type MRowSlots = {
  default: () => VNode[];
}

export type MColProps = {
  auto?: boolean | undefined;
  col?: ColStyleType;
  xs?: ColStyleType;
  sm?: ColStyleType;
  md?: ColStyleType;
  lg?: ColStyleType;
  xl?: ColStyleType;
  name?: string;
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
type MListScopes = { models: ApiModel[], filter: MListProps['filter'], search: MListProps['search'] }
export type MListSlots = {
  default: (scope: { item: ApiModel, index: number } & MListScopes) => VNode[];
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

export type MNoResultImgProps = QImgProps;
export type MNoResultImgSlots = QImgSlots;
