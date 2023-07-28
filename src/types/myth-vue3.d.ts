/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { AxiosInstance, AxiosResponse } from 'axios'
import {
  GlobalComponentConstructor,
  QBtnProps,
  QCheckboxProps,
  QDateProps,
  QDialogOptions,
  QDialogProps,
  QEditorProps,
  QFileProps,
  QInputProps,
  QItemProps,
  QListProps,
  QMenuProps,
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
import { MythVue } from '../vue3'

type ServiceType = () => Promise<AxiosResponse>

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
      hide?: boolean;
      offset?: QPageStickyProps['offset'];
      position?: QPageStickyProps['position'];
      buttonProps?: Partial<QBtnProps>;
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

export type MythApiAxiosType = AxiosInstance
export type MythApiServicesType = {
  [key: string]: Record<string, ServiceType> | any;
}

export interface MythApiConfig<AxiosType extends MythApiAxiosType = MythApiAxiosType, ServicesType extends MythApiServicesType = MythApiServicesType> {
  baseUrl: string;
  axios: AxiosType;
  services: ServicesType
}

export type MythPluginOptionsType<I18nT extends I18n = I18n, AxiosType extends MythApiAxiosType = MythApiAxiosType, Services extends MythApiServicesType = MythApiServicesType> = {
  i18n: I18nT;
  api: MythApiConfig<AxiosType, Services>;
  options: MythOptionsConfig;
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
    MRow: GlobalComponentConstructor<MRowProps, MRowSlots>;
    MFadeTransition: GlobalComponentConstructor<TransitionProps, MTransitionsSlots>;
  }

  interface ComponentCustomProperties {
    $myth: typeof MythVue
    openWindow: typeof window.open;
    parseAttribute: typeof MythVue.parseAttribute;
    getPageTitle: typeof MythVue.getPageTitle;
  }
}
