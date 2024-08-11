/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { TransitionGroupProps, VNode } from 'vue'

export type MTransitionProps = TransitionGroupProps & {
  enterIn?: string;
  enterOut?: string;
  slow?: boolean;
}

export type MTransitionsSlots = {
  default: () => VNode[];
}
