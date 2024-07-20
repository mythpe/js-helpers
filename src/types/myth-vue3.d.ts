/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { AxiosInstance } from 'axios'
import {
  GlobalComponentConstructor,
  QBtnProps,
  QCardProps,
  QDialogOptions,
  QDialogProps,
  QFieldProps,
  QIconProps,
  QItemLabelProps,
  QItemProps,
  QItemSectionProps,
  QListProps,
  QMenuProps,
  QNotifyCreateOptions,
  QPageStickyProps,
  QPopupProxyProps,
  QTooltipProps
} from 'quasar'
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
  MDateSlots,
  MDialogProps,
  MDialogSlots,
  MDraggableProps,
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
  MInputProps,
  MInputSlots,
  MListProps,
  MListSlots,
  MModalMenuProps,
  MModalMenuSlots,
  MNoResultImgProps,
  MNoResultImgSlots,
  MOtpProps,
  MOtpSlots,
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
  MTransitionsSlots,
  MUploaderProps,
  MUploaderSlots
} from '../components'
import { I18n } from 'vue-i18n'
import { ComputedRef, TransitionProps } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import {
  MythApiServicesSchema,
  ParseHeaderOptions,
  ParseHeadersHeaderAgr,
  ParseHeadersType,
  Vue3MAlertMessage,
  Vue3MAlertMessageOptions,
  Vue3MConfirmMessage
} from './m-helpers'
import { Dates, Helpers, Str } from '../utils'
import MDtContextmenuItems from 'components/datatable/MDtContextmenuItems.vue'
import { MTypingStringProps, MTypingStringSlots } from 'app/src'
import { MTransitionProps } from 'components/transition/models'

export type MythOptionsConfig = {
  google?: {
    apiKey: string;
    // eslint-disable-next-line no-undef
    mapsOptions?: google.maps.MapOptions;
  };
  notify?: Partial<QNotifyCreateOptions>;
  dialog?: Partial<QDialogOptions>;
  confirmDialog?: {
    props?: Partial<QDialogOptions>;
    buttons?: Partial<QBtnProps>;
    okProps?: Partial<QBtnProps>;
    cancelProps?: Partial<QBtnProps>;
  };
  dt?: {
    props?: Partial<MDatatableProps>;
    filterDialogProps?: Partial<QDialogProps> & Partial<QMenuProps> & Partial<QPopupProxyProps>;
    showDialogProps?: Partial<QDialogProps>;
    formDialogProps?: Partial<QDialogProps>;
    fabBtn?: {
      pageStickyProps?: Partial<QPageStickyProps>;
      offset?: QPageStickyProps['offset'];
      position?: QPageStickyProps['position'];
      buttonProps?: Partial<QBtnProps>;
    },
    addBtn?: {
      noTop?: boolean;
      noList?: boolean;
      noFab?: boolean;
    },
    contextmenu?: {
      props?: Partial<MDtContextmenuItems>;
      menu?: Partial<QPopupProxyProps>;
      list?: Partial<QListProps>;
      listItem?: Partial<QItemProps>;
      btn?: Partial<MDtBtnProps>;
      btnStyle?: {
        showLabel?: boolean;
        updateColor?: string;
        showColor?: string;
        destroyColor?: string;
      }
    },
    buttons?: {
      filter?: Partial<MDtBtnProps>;
      refresh?: Partial<MDtBtnProps>;
      more?: Partial<MDtBtnProps>;
      fullscreen?: Partial<MDtBtnProps>;
      moreMenu?: Partial<QMenuProps>;
      moreList?: Partial<QListProps>;
      moreItem?: Partial<QItemProps>;
    },
    topSelection?: {
      btn?: Partial<MDtBtnProps>;
    },
    searchInput?: {
      props?: Partial<MInputProps>;
      optionsIcon?: string;
      menuProps?: Partial<QMenuProps>;
      menuBtn?: Partial<QBtnProps>;
    };
    dialogButtonsProps?: Partial<MBtnProps>;
    noQuasarLoading?: boolean;
    listItem?: {
      item?: Partial<QItemProps>;
      avatarSection?: Partial<QItemSectionProps>;
      icon?: Partial<QIconProps>;
      labelSection?: Partial<QItemSectionProps>;
      labelItem?: Partial<QItemLabelProps>;
    };
    btn?: Partial<MDtBtnProps>;
  };
  button?: Partial<QBtnProps>;
  loadingButtons?: {
    elm?: undefined | 'audio' | 'ball' | 'bars' | 'box' | 'clock' | 'comment' | 'cube' | 'dots' | 'facebook' | 'gears' | 'grid' | 'hearts' | 'hourglass' | 'infinity' | 'ios' | 'orbit' | 'oval' | 'pie' | 'puff' | 'radio' | 'rings' | 'tail'
    color?: string | undefined;
    size?: string | undefined;
  };
  input?: Partial<MInputProps>;
  mobile?: Partial<MInputProps>;
  field?: Partial<QFieldProps>;
  file?: Partial<MFileProps>;
  date?: Partial<MDateProps>;
  time?: Partial<MTimeProps>;
  pickerBtn?: Partial<MBtnProps>;
  select?: Partial<MSelectProps>;
  checkbox?: Partial<MCheckboxProps>;
  editor?: Partial<MEditorProps>;
  radio?: Partial<MRadioProps>;
  toggle?: Partial<MToggleProps>;
  uploader?: {
    props?: Partial<MUploaderProps>;
    downloadBtnProps?: Partial<MBtnProps>;
    removeBtnProps?: Partial<QBtnProps>;
    iconsSize?: MUploaderProps['iconsSize'];
  };
  container?: Partial<MContainerProps>;
  row?: Partial<MRowProps>;
  col?: Partial<MColProps>;
  column?: Partial<MColumnProps>;
  draggable?: Partial<MDraggableProps>;
  noResultImg?: Partial<MNoResultImgProps>;
  modalMenu?: {
    props?: Partial<MModalMenuProps>;
    card?: Partial<QCardProps>;
    closeBtn?: Partial<QItemProps>;
  };
  tooltip?: Partial<QTooltipProps>;
  otp?: Partial<MOtpProps>;
  card?: Partial<MCardProps>;
  block?: Partial<MBlockProps>;
  typingString?: Partial<Omit<MTypingStringProps, 'string'>>;
}

export type MythApiAxiosType = Partial<AxiosInstance>

export type MythApiConfig = {
  baseUrl: string;
  axios: MythApiAxiosType;
  services: MythApiServicesSchema
}

export type MythI18nType = I18n;

export type UseMythVue = {
  i18n: MythI18nType;
  baseUrl: string;
  axios: MythApiAxiosType;
  services: MythApiServicesSchema;
  options: MythOptionsConfig;
  str: typeof Str,
  dates: typeof Dates,
  helpers: typeof Helpers,
  tools: {
    isSmall: ComputedRef<boolean>;
    popupBreakpoint: ComputedRef<string | number | undefined>;
    transitions: {
      slideLeftFade: {
        hide: ComputedRef<string>;
        show: ComputedRef<string>;
      },
      slideRightFade: {
        hide: ComputedRef<string>;
        show: ComputedRef<string>;
      },
      slideDownFade: {
        hide: ComputedRef<string>;
        show: ComputedRef<string>;
      },
      slideUpFade: {
        hide: ComputedRef<string>;
        show: ComputedRef<string>;
      },
    }
  },
  getPageTitle (route: RouteLocationNormalizedLoaded, number?: number | string): string;
  parseHeaders (headers: ParseHeadersHeaderAgr, options?: ParseHeaderOptions): ParseHeadersType[];
  __ (string: string | { text: string } | any, ...args: any[]): string;
  copyText (text: string | any): Promise<void>;
  quasarNotifyOptions (opts: QNotifyCreateOptions | string): QNotifyCreateOptions;
  alertMessage (opts: Vue3MAlertMessageOptions): Vue3MAlertMessage;
  alertSuccess (message: string): Vue3MAlertMessage;
  alertError (message: string): Vue3MAlertMessage;
  confirmMessage (message?: string, title?: string, opts?: QDialogOptions): Vue3MConfirmMessage;
  [key: string]: any;
}

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
    MPassword: GlobalComponentConstructor<MInputProps, MInputSlots>;
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
  }

  interface ComponentCustomProperties {
    $myth: UseMythVue;
    openWindow: typeof window.open;
    __: UseMythVue['__']

    getPageTitle (number?: number | string, route?: RouteLocationNormalizedLoaded): string;
  }
}
