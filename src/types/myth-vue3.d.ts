/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { AxiosInstance, AxiosResponse } from 'axios'
import { GlobalComponentConstructor, QBtnProps, QCheckboxProps, QDateProps, QDialogOptions, QEditorProps, QFileProps, QInputProps, QRadioProps, QSelectProps, QTimeProps, QToggleProps, QUploaderProps } from 'quasar'
import { VueI18n } from 'vue-i18n'
import {
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
  MUploaderProps,
  MUploaderSlots
} from '../components'
import { MAlerts, MHelpers } from '../vue3'
import { GlobalsMyThVue3 } from '../vue3/MyThVue3'

export {}

export type MyThVue3InstallOptions = {
  i18n: VueI18n;
  api: {
    baseUrl: string;
    axios: AxiosInstance;
    services: {
      [key: string]: Record<string, (() => Promise<AxiosResponse>) | any> | any;
    };
  },
  options: Record<string, any> & {
    google?: {
      apiKey: string;
      mapsOptions?: Record<string, any>;
    };
    dialog?: {
      props?: QDialogOptions;
      btnsProps?: QBtnProps;
      okProps?: QBtnProps;
      cancelProps?: QBtnProps;
    };
    dt?: {
      searchInputProps?: QInputProps;
      dialogsBtnsProps?: QBtnProps;
    };
    button?: QBtnProps;
    input?: QInputProps
    file?: QFileProps;
    date?: QDateProps;
    time?: QTimeProps;
    select?: QSelectProps;
    checkbox?: QCheckboxProps;
    editor?: QEditorProps;
    radio?: QRadioProps;
    toggle?: QToggleProps;
    uploader?: QUploaderProps;
  }
}

type Vue3MGlobals = typeof GlobalsMyThVue3 & typeof MAlerts & typeof MHelpers

export type MyThVue3PluginType = Vue3MGlobals & MyThVue3InstallOptions

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
  }

  interface ComponentCustomProperties {
    $myth: MyThVue3PluginType
  }
}

declare global {
  interface Window {
    push_token?: string | null | undefined;
    MyThVue3Plugin: MyThVue3InstallOptions
  }
}
