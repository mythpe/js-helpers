/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { AxiosResponse } from 'axios'
import {
  QBtnProps,
  QCheckboxProps,
  QDateProps,
  QDialogOptions,
  QDialogProps, QEditorProps,
  QFileProps,
  QInputProps,
  QItemProps,
  QListProps,
  QMenuProps,
  QPageStickyProps,
  QPopupProxyProps, QRadioProps,
  QSelectProps,
  QTimeProps, QToggleProps, QUploaderProps
} from 'quasar'
import { GenericMDtBtn, MBtnProps, MDatatableProps, MDtBtnProps } from '../components'

type ServiceType = () => Promise<AxiosResponse>

export interface MythConfigOptions extends Record<string | number | symbol, any> {
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

export interface MythConfigServices {
  [key: string]: Record<string, ServiceType> | any;
}

export interface MythConfigApi<AT, ST extends MythConfigServices = MythConfigServices> {
  baseUrl: string;
  axios: AT;
  services: ST
}

export type MythConfigInterface<I, A> = {
  i18n: I;
  api: MythConfigApi<A>;
  options: MythConfigOptions
}

// declare global {
//   interface Window {
// push_token?: string | null | undefined;
// MythVue3Plugin: MythVue3InstallOptions
// }
// }
