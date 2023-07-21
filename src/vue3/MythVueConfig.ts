/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */
import { I18n } from 'vue-i18n'
import { AxiosInstance } from 'axios'
import { ServiceType } from '../types'
import { QBtnProps, QCheckboxProps, QDateProps, QDialogOptions, QEditorProps, QFileProps, QInputProps, QRadioProps, QSelectProps, QTimeProps, QToggleProps, QUploaderProps } from 'quasar'

interface MythConfigOptions extends Record<string | number | symbol, any> {
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
    searchInputProps?: Partial<QInputProps>;
    dialogsBtnsProps?: Partial<QBtnProps>;
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
  uploader?: Partial<QUploaderProps>;
}

interface MythConfigServices {
  [key: string]: Record<string, ServiceType> | any;
}

interface MythConfigApi {
  baseUrl: string;
  axios: AxiosInstance;
  services: MythConfigServices
}

export type MythConfigInterface = {
  i18n: I18n;
  api: MythConfigApi;
  options: MythConfigOptions
}

export const setupConfig = ({ i18n, api, options = {} }: MythConfigInterface) => {
  MythVueConfig.i18n = i18n || {}
  MythVueConfig.api = {
    baseUrl: api?.baseUrl,
    axios: api?.axios || null,
    services: api?.services || {}
  }
  MythVueConfig.options = options || {}
}

export const getMythConfig = () => MythVueConfig
export const getMythI18n = () => MythVueConfig.i18n.global
export const getMythApi = (): MythConfigApi => MythVueConfig.api
export const getMythOptions = (): MythConfigOptions => MythVueConfig.options

export const MythVueConfig: MythConfigInterface = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  i18n: undefined,
  api: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    baseUrl: undefined,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    axios: undefined,
    services: {}
  },
  options: {}
}
export default MythVueConfig
