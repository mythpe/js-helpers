/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { AxiosInstance } from 'axios'
import {
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
  MBlockProps,
  MBtnProps,
  MCardProps,
  MCheckboxProps,
  MColProps,
  MColumnProps,
  MContainerProps,
  MDatatableProps,
  MDateProps,
  MDraggableProps,
  MDtBtnProps,
  MEditorProps,
  MFileProps,
  MHelpRowProps,
  MInputProps,
  MModalMenuProps,
  MNoResultImgProps,
  MOptionsProps,
  MOtpProps,
  MRadioProps,
  MRowProps,
  MSelectProps,
  MTimeProps,
  MToggleProps,
  MTypingStringProps,
  MUploaderProps
} from '../components'
import { I18n } from 'vue-i18n'
import { ComputedRef } from 'vue'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { MDtColumn, MDtHeadersParameter, ParseHeaderOptions, Vue3MAlertMessage, Vue3MAlertMessageOptions, Vue3MConfirmMessage } from './m-helpers'
import { Dates, Helpers, Str } from '../utils'
import { MythApiServicesSchema } from './api-helpers'

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
  datatable?: Partial<MDatatableProps>;
  dt?: {
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
      menu?: Partial<MModalMenuProps>;
      list?: Partial<QListProps>;
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
  avatarViewer?: Partial<MAvatarViewerProps>;
  options?: Partial<MOptionsProps>;
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
  uploader?: Partial<MUploaderProps>;
  uploaderOptions?: {
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
  helpRow?: Partial<Omit<MHelpRowProps, 'text'>>;
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
  parseHeaders (headers: MDtHeadersParameter, options?: ParseHeaderOptions): MDtColumn[];
  __ (string: string | { text: string } | any, ...args: any[]): string;
  copyText (text: string | any): Promise<void>;
  quasarNotifyOptions (opts: QNotifyCreateOptions | string): QNotifyCreateOptions;
  alertMessage (opts: Vue3MAlertMessageOptions): Vue3MAlertMessage;
  alertSuccess (message: string): Vue3MAlertMessage;
  alertError (message: string): Vue3MAlertMessage;
  confirmMessage (message?: string, title?: string, opts?: QDialogOptions): Vue3MConfirmMessage;
  [key: string]: any;
}

export type InstallPluginOptions = {
  i18n: MythI18nType;
  api: MythApiConfig;
  options: MythOptionsConfig;
}
