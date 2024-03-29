/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { VNode } from 'vue'

export type ColStyleType = 'auto' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | undefined

export type MContainerProps = {
  titleFromRoute: boolean;
  title?: string | (() => string);
  subtitle?: string | (() => string);
}

export type MContainerSlots = {
  default: () => VNode[];
}

export interface MCardProps {
  titleFromRoute?: boolean | undefined;
  title?: string | (() => string) | undefined;
  subtitle?: string | (() => string) | undefined;
  backRoute?: boolean | undefined;
}

export interface MCardSlots {
  title: () => VNode[];
  actions: () => VNode[];
  default: () => VNode[];
}

export type MColumnProps = {
  //
}
export type MColumnSlots = {
  default: () => VNode[];
}

export type MRowProps = {
  //
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

export {}
