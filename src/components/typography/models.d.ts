/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { TypedOptions } from 'typed.js'
import { VNode } from 'vue'

export type MTypingStringProps = {
  name: number | string;
  string: string | string[];
  loop?: TypedOptions['loop'];
  typeSpeed?: TypedOptions['typeSpeed'];
  backDelay?: TypedOptions['backDelay'];
  fadeOut?: TypedOptions['fadeOut'];
  options?: Omit<TypedOptions, 'loop' | 'typeSpeed' | 'backDelay' | 'fadeOut'>;
}

export type MTypingStringSlots = {
  //
}

export type MHelpRowProps = {
  text?: string | null | undefined;
  icon?: string;
}

export type MHelpRowSlots = {
  /**
   * Field main content
   */
  default: () => VNode[];
}
