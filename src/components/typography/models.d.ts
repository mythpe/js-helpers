/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { VNode } from 'vue'
import { TypedOptions } from 'typed.js'

export type MTypingStringProps = {
  name: number | string;
  string: string | string[];
  loop?: TypedOptions['loop'];
  typeSpeed?: TypedOptions['typeSpeed'];
  options?: Omit<TypedOptions, 'loop' | 'typeSpeed'>;
}

export type MTypingStringSlots = {
  default: () => VNode[];
}
