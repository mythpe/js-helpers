/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { GlobalComponentConstructor, openURL } from 'quasar'
import {
  MAvatarViewerProps,
  MAvatarViewerSlots,
  MAxiosProps,
  MAxiosSlots,
  MBlockProps,
  MBlockSlots,
  MBtnProps,
  MBtnSlots,
  MCardProps,
  MCardSlots,
  MCheckboxProps,
  MCheckboxSlots,
  MColProps,
  MColSlots,
  MColumnProps,
  MColumnSlots,
  MContainerProps,
  MContainerSlots,
  MDatatableProps,
  MDatatableSlots,
  MDateProps,
  MDateSlots, MDialogProps, MDialogSlots,
  MDtAvatarProps,
  MDtAvatarSlots,
  MDtBtnProps,
  MDtBtnSlots,
  MEditorProps,
  MEditorSlots,
  MFileProps,
  MFileSlots,
  MFormProps,
  MFormSlots,
  MGoogleMapsProps,
  MGoogleMapsSlots, MInputLabelProps, MInputLabelSlots,
  MInputProps,
  MInputSlots,
  MListProps,
  MListSlots, MModalMenuProps, MModalMenuSlots,
  MNoResultImgProps,
  MNoResultImgSlots,
  MOtpProps,
  MOtpSlots,
  MPasswordProps,
  MPickerProps,
  MPickerSlots,
  MRadioProps,
  MRadioSlots,
  MRowProps,
  MRowSlots,
  MSelectProps,
  MSelectSlots,
  MTimeProps,
  MTimeSlots,
  MToggleProps,
  MToggleSlots, MTooltipProps, MTooltipSlots,
  MTransitionProps,
  MTransitionsSlots, MTypingStringProps, MTypingStringSlots,
  MUploaderProps,
  MUploaderSlots
} from 'app/src'
import { TransitionProps } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { UseMythVue } from 'src/types/myth-vue3'

export * from './api-helpers.d'
export * from './lodash.d'
export * from './m-geolocation.d'
export * from './m-helpers.d'
export * from './myth-vue3.d'
export * from '../composables'
export * from './../components'
export { InstallPluginOptions } from 'src/types/plugin'

declare module '@vue/runtime-core' {
  interface GlobalComponents {
    MDatatable: GlobalComponentConstructor<MDatatableProps, MDatatableSlots>;
    MDtAvatar: GlobalComponentConstructor<MDtAvatarProps, MDtAvatarSlots>;
    MDtBtn: GlobalComponentConstructor<MDtBtnProps, MDtBtnSlots>;
    MAvatarViewer: GlobalComponentConstructor<MAvatarViewerProps, MAvatarViewerSlots>;
    MUploader: GlobalComponentConstructor<MUploaderProps, MUploaderSlots>;
    MAxios: GlobalComponentConstructor<MAxiosProps, MAxiosSlots>;
    MBtn: GlobalComponentConstructor<MBtnProps, MBtnSlots>;
    MCheckbox: GlobalComponentConstructor<MCheckboxProps, MCheckboxSlots>;
    MRadio: GlobalComponentConstructor<MRadioProps, MRadioSlots>;
    MDate: GlobalComponentConstructor<MDateProps, MDateSlots>;
    MEditor: GlobalComponentConstructor<MEditorProps, MEditorSlots>;
    MEmail: GlobalComponentConstructor<MInputProps, MInputSlots>;
    MFile: GlobalComponentConstructor<MFileProps, MFileSlots>;
    MForm: GlobalComponentConstructor<MFormProps, MFormSlots>;
    MInput: GlobalComponentConstructor<MInputProps, MInputSlots>;
    MMobile: GlobalComponentConstructor<MInputProps, MInputSlots>;
    MOtp: GlobalComponentConstructor<MOtpProps, MOtpSlots>;
    MPassword: GlobalComponentConstructor<MPasswordProps, MInputSlots>;
    MPicker: GlobalComponentConstructor<MPickerProps, MPickerSlots>;
    MSelect: GlobalComponentConstructor<MSelectProps, MSelectSlots>;
    MTime: GlobalComponentConstructor<MTimeProps, MTimeSlots>;
    MToggle: GlobalComponentConstructor<MToggleProps, MToggleSlots>;
    MGoogleMaps: GlobalComponentConstructor<MGoogleMapsProps, MGoogleMapsSlots>;
    MBlock: GlobalComponentConstructor<MBlockProps, MBlockSlots>;
    MCard: GlobalComponentConstructor<MCardProps, MCardSlots>;
    MCol: GlobalComponentConstructor<MColProps, MColSlots>;
    MColumn: GlobalComponentConstructor<MColumnProps, MColumnSlots>;
    MContainer: GlobalComponentConstructor<MContainerProps, MContainerSlots>;
    // MDraggable: GlobalComponentConstructor<MDraggableProps, MDraggableSlots>;
    MList: GlobalComponentConstructor<MListProps, MListSlots>;
    MNoResultImg: GlobalComponentConstructor<MNoResultImgProps, MNoResultImgSlots>;
    MRow: GlobalComponentConstructor<MRowProps, MRowSlots>;
    MTransition: GlobalComponentConstructor<MTransitionProps, MTransitionsSlots>;
    MFadeTransition: GlobalComponentConstructor<TransitionProps, MTransitionsSlots>;
    MFadeXTransition: GlobalComponentConstructor<TransitionProps, MTransitionsSlots>;
    MModalMenu: GlobalComponentConstructor<MModalMenuProps, MModalMenuSlots>;
    MTooltip: GlobalComponentConstructor<MTooltipProps, MTooltipSlots>;
    MDialog: GlobalComponentConstructor<MDialogProps, MDialogSlots>;
    MTypingString: GlobalComponentConstructor<MTypingStringProps, MTypingStringSlots>;
    MInputLabel: GlobalComponentConstructor<MInputLabelProps, MInputLabelSlots>;
  }

  interface ComponentCustomProperties {
    $myth: UseMythVue;
    openWindow: InstanceType<typeof openURL>;
    __: UseMythVue['__']

    getPageTitle (number?: number | string, route?: RouteLocationNormalizedLoaded): string;
  }
}
