/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */
import { QInputProps, QInputSlots } from 'quasar'
import { ComponentPublicInstance, VNode } from 'vue'
import { BaseInputsProps } from '../../../../components'

export type InputsRules = any;
export type InputsErrors = any;

export type MyInputProps = Omit<QInputProps, 'rules' | 'modelValue' | 'errors'> & BaseInputsProps & {
  placeholder?: string | undefined;
  hidePlaceholder?: boolean | undefined;
  required?: boolean | undefined;
  hideRequired?: boolean | undefined;
  email?: boolean | undefined;
  mobile?: boolean | string | number | undefined;
  rules?: InputsRules;
  errors?: string[];
  modelValue?: any;
  autocomplete?: boolean | string | undefined;
  topLabel?: boolean;
  caption?: string | null | undefined;
}

export type MyInputSlots = QInputSlots & {
  default: () => VNode[];
  'top-label': () => VNode[];
  caption: () => VNode[];
}

export interface MyInput extends ComponentPublicInstance<MyInputProps> {
  /**
   * Sets the Radio's v-model to equal the val
   */
  set: () => void;
  $slots: MyInputSlots
}
