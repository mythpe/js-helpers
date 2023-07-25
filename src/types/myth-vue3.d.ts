/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { AxiosInstance, AxiosResponse } from 'axios'
import {
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
import { GenericMDtBtn, MBtnProps, MDatatableProps, MDtBtnProps } from '../components'
import { I18n } from 'vue-i18n'

type ServiceType = () => Promise<AxiosResponse>

export interface MythOptionsConfig extends Record<string | number | symbol, any> {
  google?: {
    apiKey: string;
    mapsOptions?: Record<string | number | symbol, any>;
  };
  dialog?: {
    props?: Partial<QDialogOptions>;
    btnsProps?: Partial<QBtnProps>;
    okProps?: Partial<QBtnProps>;
    cancelProps?: Partial<QBtnProps>;
  };
  dt?: {
    props?: Partial<MDatatableProps>;
    filterDialogProps?: Partial<QDialogProps>;
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
    searchInputProps?: Partial<QInputProps>;
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
  }
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

// declare global {
//   interface Window {
// push_token?: string | null | undefined;
// MythVue3Plugin: MythVue3InstallOptions
// }
// }
