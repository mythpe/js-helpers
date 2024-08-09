/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { QFieldSlots } from 'quasar'
import { VNode } from 'vue'

export type MFieldViewProps = {
  name: string;
  value?: any;
  label?: string | any;
  placeholder?: string | undefined;
  hidePlaceholder?: boolean | undefined;
  topLabel?: boolean | undefined;
  caption?: string | null | undefined;
  hint?: string | null | undefined;
}

export interface MFieldViewSlots extends QFieldSlots {
  /**
   * Field main content
   */
  default: () => VNode[];
  'top-label': () => VNode[];
  caption: () => VNode[];
}
