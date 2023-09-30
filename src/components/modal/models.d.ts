/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { VNode } from 'vue'
import { QDialogProps, QMenuProps, QPopupProxyProps, QTooltipProps } from 'quasar'

export type MModalMenuProps = Partial<QDialogProps> & Partial<QMenuProps> & Partial<QPopupProxyProps> & {
  noCloseBtn?: boolean;
}

export type MModalMenuSlots = {
  default: () => VNode[];
}

export type MTooltipProps = Partial<QTooltipProps> & {
  /**
   * One of Quasar's embedded transitions
   * Default value: jump-down
   */
  transitionShow?: string | undefined;
  /**
   * One of Quasar's embedded transitions
   * Default value: jump-up
   */
  transitionHide?: string | undefined;
  /**
   * Transition duration (in milliseconds, without unit)
   * Default value: 300
   */
  transitionDuration?: string | number | undefined;
  /**
   * Model of the component defining shown/hidden state; Either use this property (along with a listener for 'update:model-value' event) OR use v-model directive
   */
  modelValue?: boolean;
  /**
   * The maximum height of the Tooltip; Size in CSS units, including unit name
   */
  maxHeight?: string | undefined;
  /**
   * The maximum width of the Tooltip; Size in CSS units, including unit name
   */
  maxWidth?: string | undefined;
  /**
   * Two values setting the starting position or anchor point of the Tooltip relative to its target
   * Default value: bottom middle
   */
  anchor?:
   | 'top left'
   | 'top middle'
   | 'top right'
   | 'top start'
   | 'top end'
   | 'center left'
   | 'center middle'
   | 'center right'
   | 'center start'
   | 'center end'
   | 'bottom left'
   | 'bottom middle'
   | 'bottom right'
   | 'bottom start'
   | 'bottom end'
   | undefined;
  /**
   * Two values setting the Tooltip's own position relative to its target
   * Default value: top middle
   */
  self?:
   | 'top left'
   | 'top middle'
   | 'top right'
   | 'top start'
   | 'top end'
   | 'center left'
   | 'center middle'
   | 'center right'
   | 'center start'
   | 'center end'
   | 'bottom left'
   | 'bottom middle'
   | 'bottom right'
   | 'bottom start'
   | 'bottom end'
   | undefined;
  /**
   * An array of two numbers to offset the Tooltip horizontally and vertically in pixels
   * Default value: [14, 14]
   */
  offset?: readonly any[] | undefined;
  /**
   * CSS selector or DOM element to be used as a custom scroll container instead of the auto detected one
   */
  scrollTarget?: Element | string | undefined;
  /**
   * Configure a target element to trigger Tooltip toggle; 'true' means it enables the parent DOM element, 'false' means it disables attaching events to any DOM elements; By using a String (CSS selector) it attaches the events to the specified DOM element (if it exists)
   * Default value: true
   */
  target?: boolean | string | undefined;
  /**
   * Skips attaching events to the target DOM element (that trigger the element to get shown)
   */
  noParentEvent?: boolean | undefined;
  /**
   * Configure Tooltip to appear with delay
   */
  delay?: number | undefined;
  /**
   * Configure Tooltip to disappear with delay
   */
  hideDelay?: number | undefined;
  /**
   * Emitted when showing/hidden state changes; Is also used by v-model
   * @param value New state (showing/hidden)
   */
  'onUpdate:modelValue'?: (value: boolean) => void;
  /**
   * Emitted after component has triggered show()
   * @param evt JS event object
   */
  onShow?: (evt: Event) => void;
  /**
   * Emitted when component triggers show() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeShow?: (evt: Event) => void;
  /**
   * Emitted after component has triggered hide()
   * @param evt JS event object
   */
  onHide?: (evt: Event) => void;
  /**
   * Emitted when component triggers hide() but before it finishes doing it
   * @param evt JS event object
   */
  onBeforeHide?: (evt: Event) => void;
}

export type MTooltipSlots = {
  default: () => VNode[];
}

export type MDialogProps = Partial<QDialogProps> & {
  slide?: boolean | undefined;
  from?: 'up' | 'down' | 'left' | 'right';
}

export type MDialogSlots = {
  default: () => VNode[];
}
