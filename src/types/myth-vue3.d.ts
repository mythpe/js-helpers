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
  QCheckboxProps,
  QDateProps,
  QDialogOptions,
  QDialogProps,
  QEditorProps,
  QFileProps,
  QImgProps,
  QImgSlots,
  QInputProps,
  QItemProps,
  QListProps,
  QMenuProps,
  QNotifyCreateOptions,
  QPageStickyProps,
  QPopupProxyProps,
  QRadioProps,
  QSelectProps,
  QTimeProps,
  QToggleProps,
  QUploaderProps
} from 'quasar'
import {
  GenericMDtBtn,
  MAvatarViewerProps,
  MAvatarViewerSlots,
  MAxiosProps,
  MAxiosSlots,
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
  MTransitionsSlots,
  MUploaderProps,
  MUploaderSlots
} from '../components'
import { I18n } from 'vue-i18n'
import { TransitionProps } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { MythApiServicesSchema, ParseHeaderOptions, ParseHeadersHeaderAgr, ParseHeadersType, Vue3MAlertMessage, Vue3MAlertMessageOptions, Vue3MConfirmMessage } from './m-helpers'
import { Dates, Helpers, Str } from '../utils'

export interface MythOptionsConfig extends Record<string | number | symbol, any> {
  google?: {
    apiKey: string;
    mapsOptions?: Record<string | number | symbol, any>;
  };
  dialog?: {
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
      menu?: Partial<QPopupProxyProps>;
      list?: Partial<QListProps>;
      btn?: Partial<GenericMDtBtn>;
    },
    buttons?: {
      filter?: Partial<MDtBtnProps>;
      refresh?: Partial<MDtBtnProps>;
      more?: Partial<MDtBtnProps>;
      moreMenu?: Partial<QMenuProps>;
      moreList?: Partial<QListProps>;
      moreItem?: Partial<QItemProps>;
    },
    topSelection?: {
      btn?: Partial<MDtBtnProps>;
    },
    searchInput?: {
      props: Partial<QInputProps>;
      menuProps: Partial<QMenuProps>;
      menuBtn: Partial<QBtnProps>;
    };
    dialogButtonsProps?: Partial<MBtnProps>;
  };
  button?: Partial<QBtnProps>;
  input?: Partial<QInputProps>;
  file?: Partial<QFileProps>;
  date?: Partial<QDateProps>;
  time?: Partial<QTimeProps>;
  select?: Partial<QSelectProps>;
  checkbox?: Partial<QCheckboxProps>;
  editor?: Partial<QEditorProps>;
  radio?: Partial<QRadioProps>;
  toggle?: Partial<QToggleProps>;
  uploader?: {
    props?: Partial<QUploaderProps>;
    downloadBtnProps?: Partial<MBtnProps>;
    removeBtnProps?: Partial<QBtnProps>;
  };
  container?: Partial<MContainerProps>;
  row?: Partial<MRowProps>;
  col?: Partial<MColProps>;
}

export type MythApiAxiosType = Partial<AxiosInstance>

export interface MythApiConfig {
  baseUrl: string;
  axios: MythApiAxiosType;
  services: MythApiServicesSchema
}

export type MythI18nType = I18n;

export type MythPluginOptionsType = {
  i18n: MythI18nType;
  api: MythApiConfig;
  options: MythOptionsConfig;
}

export type UseMythVue = {
  i18n: MythI18nType;
  baseUrl: string;
  axios: MythApiAxiosType;
  services: MythApiServicesSchema;
  options: MythOptionsConfig;
  str: typeof Str,
  dates: typeof Dates,
  helpers: typeof Helpers,
  getPageTitle (route: RouteLocationNormalizedLoaded, number?: number | string): string;
  parseHeaders (headers: ParseHeadersHeaderAgr, options?: ParseHeaderOptions): ParseHeadersType[];
  parseAttribute (string: string | { text: string } | any, ...args: []): string;
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
    MPassword: GlobalComponentConstructor<MInputProps, MInputSlots>;
    MPicker: GlobalComponentConstructor<MPickerProps, MPickerSlots>;
    MSelect: GlobalComponentConstructor<MSelectProps, MSelectSlots>;
    MTime: GlobalComponentConstructor<MTimeProps, MTimeSlots>;
    MToggle: GlobalComponentConstructor<MToggleProps, MToggleSlots>;
    MGoogleMaps: GlobalComponentConstructor<MGoogleMapsProps, MGoogleMapsSlots>;
    MCard: GlobalComponentConstructor<MCardProps, MCardSlots>;
    MCol: GlobalComponentConstructor<MColProps, MColSlots>;
    MColumn: GlobalComponentConstructor<MColumnProps, MColumnSlots>;
    MContainer: GlobalComponentConstructor<MContainerProps, MContainerSlots>;
    MList: GlobalComponentConstructor<MListProps, MListSlots>;
    MNoResultImg: GlobalComponentConstructor<QImgProps, QImgSlots>;
    MRow: GlobalComponentConstructor<MRowProps, MRowSlots>;
    MFadeTransition: GlobalComponentConstructor<TransitionProps, MTransitionsSlots>;
  }

  interface ComponentCustomProperties {
    $myth: UseMythVue;
    openWindow: typeof window.open;

    parseAttribute (string: string | { text: string } | any, ...args: []): string;

    getPageTitle (number?: number | string, route?: RouteLocationNormalizedLoaded): string;
  }
}
