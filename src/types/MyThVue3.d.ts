/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { AxiosInstance, AxiosResponse } from 'axios'
import { GlobalComponentConstructor } from 'quasar'
import { I18n } from 'vue-i18n'
import { MDatatableProps, MDatatableSlots, MDtAvatarProps, MDtAvatarSlots, MDtBtnProps, MDtBtnSlots } from '../components/datatable/models'
import {
  MAvatarViewerProps,
  MAvatarViewerSlots,
  MAxiosProps,
  MAxiosSlots,
  MBtnProps,
  MBtnSlots,
  MCheckboxProps,
  MCheckboxSlots,
  MDateProps,
  MDateSlots,
  MFileProps,
  MFileSlots,
  MFormProps,
  MFormSlots,
  MInputProps,
  MInputSlots,
  MPickerProps,
  MPickerSlots,
  MSelectProps,
  MSelectSlots,
  MTimeProps,
  MTimeSlots,
  MToggleProps,
  MToggleSlots,
  MUploaderProps,
  MUploaderSlots
} from '../components/form/models'
import { MGoogleMapsProps, MGoogleMapsSlots } from '../components/google/models'
import { MCardProps, MCardSlots, MColProps, MColSlots, MColumnProps, MColumnSlots, MContainerProps, MContainerSlots, MRowProps, MRowSlots } from '../components/grid/models'
import { MAlerts } from '../vue3/MAlerts'
import { MHelpers } from '../vue3/MHelpers'
import { GlobalsMyThVue3 } from '../vue3/MyThVue3'

export type MyThVue3InstallOptions = {
  i18n: I18n;
  api: {
    axios: AxiosInstance;
    services: {
      [key: string]: Record<string, (() => Promise<AxiosResponse>) | any> | any
    };
  },
  options?: {
    google?: {
      apiKey: string,
      mapsOptions?: Record<string, any>
    }
  }
}

type Vue3MGlobals = typeof GlobalsMyThVue3 & typeof MAlerts & typeof MHelpers

export type MyThPlugin = {
  readonly version: string;
  i18n: I18n | Record<string, any>;
  api: MyThVue3InstallOptions['api'] | Record<string, any>;
  options: MyThVue3InstallOptions['options'];
}

export type UseMyThVue3 = Vue3MGlobals & MyThPlugin

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
    MDate: GlobalComponentConstructor<MDateProps, MDateSlots>;
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
    $myth: UseMyThVue3
  }
}
