/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { MColProps } from '@mythpe/js-helpers'
import { QRadioProps, QRadioSlots } from 'quasar'
import { ComponentPublicInstance, VNode } from 'vue'

export type MyRadioRules = Record<string, any>;
export type MyBaseRadioProps = Omit<QRadioProps, 'name' | 'modelValue' | 'val' | 'label'> & {
  name: string;
  modelValue: any;
  val: any;
  label?: string | null | undefined;
  noLabel?: boolean;
  required?: boolean;
  rules?: MyRadioRules;
  hideRequired?: boolean;
  viewMode?: boolean;
  placeholder?: any;
  colProps?: MColProps;
}

export type MyRadioProps = MyBaseRadioProps & MColProps;

export type MyRadioSlots = QRadioSlots & {
  default: () => VNode[];
  top: () => VNode[];
  before: () => VNode[];
  after: () => VNode[];
  bottom: () => VNode[];
}

export interface MyRadio extends ComponentPublicInstance<QRadioProps> {
  /**
   * Sets the Radio's v-model to equal the val
   */
  set: () => void;
}
