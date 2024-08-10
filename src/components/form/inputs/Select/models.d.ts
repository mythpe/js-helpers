/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */
import { QFieldSlots, QInputSlots, QSelectProps } from 'quasar'
import { ComponentPublicInstance } from 'vue'
import { BaseInputsProps, BaseInputsSlots } from 'src'

export type MySelectProps = Omit<QSelectProps, 'rules' | 'name'> & BaseInputsProps & {
  // behavior?: 'default' | 'menu' | 'dialog' | undefined;
  // emitValue?: boolean | undefined;
  // mapOptions?: boolean | undefined;
  // useInput?: boolean | undefined;
  // label?: string | undefined;
  // placeholder?: any;
  // required?: boolean | undefined;
  // hideRequired?: boolean | undefined;
  // rules?: InputRulesContext;
  // errors?: Record<string, string[]>;
  // modelValue: any;
  /**
   * Input search functionality. useInput prop for this feature.
   */
  search?: string | null | undefined;
  /**
   * Set input to vie mode use q-field
   */
  hideEmptyList?: boolean | undefined;
  /**
   * The options using ajax request to filter
   */
  noFilter?: boolean | undefined;
  /**
   * Enable auto search functionality. with filterFn.
   */
  autoSearch?: boolean | undefined;
  // timeout?: number;
  /**
   * Fetch Data on mounted
   */
  // iniData?: boolean;
}

export type MySelectSlots = QInputSlots & QFieldSlots & BaseInputsSlots

export interface MySelect extends ComponentPublicInstance<MySelectProps> {
  $slots: MySelectSlots
}
