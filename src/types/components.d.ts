/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { GlobalComponentConstructor } from 'quasar'
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
  MCkeditorProps,
  MCkeditorSlots,
  MColProps,
  MColSlots,
  MColumnProps,
  MColumnSlots,
  MContainerProps,
  MContainerSlots,
  MDatatableProps,
  MDatatableSlots,
  MDateProps,
  MDateSlots,
  MDialogProps,
  MDialogSlots,
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
  MGoogleMapsSlots,
  MHelpRowProps,
  MHelpRowSlots,
  MHiddenInputProps,
  MHiddenInputSlots,
  MInputLabelProps,
  MInputLabelSlots,
  MInputProps,
  MInputSlots,
  MListProps,
  MListSlots,
  MModalMenuProps,
  MModalMenuSlots,
  MNoResultImgProps,
  MNoResultImgSlots,
  MOptionsProps,
  MOptionsSlots,
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
  MToggleSlots,
  MTooltipProps,
  MTooltipSlots,
  MTransitionProps,
  MTransitionsSlots,
  MTypingStringProps,
  MTypingStringSlots,
  MUploaderProps,
  MUploaderSlots,
  MSignaturePadProps,
  MSignaturePadSlots
} from '../components'
import { TransitionProps } from 'vue'

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
    MCkeditor: GlobalComponentConstructor<MCkeditorProps, MCkeditorSlots>;
    MRadio: GlobalComponentConstructor<MRadioProps, MRadioSlots>;
    MColor: GlobalComponentConstructor<MInputProps, MInputSlots>;
    MDate: GlobalComponentConstructor<MDateProps, MDateSlots>;
    MEditor: GlobalComponentConstructor<MEditorProps, MEditorSlots>;
    MEmail: GlobalComponentConstructor<MInputProps, MInputSlots>;
    MFile: GlobalComponentConstructor<MFileProps, MFileSlots>;
    MForm: GlobalComponentConstructor<MFormProps, MFormSlots>;
    MHiddenInput: GlobalComponentConstructor<MHiddenInputProps, MHiddenInputSlots>;
    MInput: GlobalComponentConstructor<MInputProps, MInputSlots>;
    MMobile: GlobalComponentConstructor<MInputProps, MInputSlots>;
    MOptions: GlobalComponentConstructor<MOptionsProps, MOptionsSlots>;
    MOtp: GlobalComponentConstructor<MOtpProps, MOtpSlots>;
    MPassword: GlobalComponentConstructor<MPasswordProps, MInputSlots>;
    MPicker: GlobalComponentConstructor<MPickerProps, MPickerSlots>;
    MSelect: GlobalComponentConstructor<MSelectProps, MSelectSlots>;
    MSignaturePad: GlobalComponentConstructor<MSignaturePadProps, MSignaturePadSlots>;
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
    MHelpRow: GlobalComponentConstructor<MHelpRowProps, MHelpRowSlots>;
  }
}
