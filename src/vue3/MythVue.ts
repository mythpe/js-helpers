/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { Dates as dates } from '../utils/Dates'
import { Helpers as helpers } from '../utils/Helpers'
import { Str as str } from '../utils/Str'
import { MAlerts } from './MAlerts'
import { MHelpers } from './MHelpers'
import { reactive, ref, TransitionProps } from 'vue'
import { GlobalComponentConstructor } from 'quasar'
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
  MTransitionsSlots,
  MUploaderProps,
  MUploaderSlots
} from '../components'
import { MythApiAxiosType, MythApiServicesType, MythOptionsConfig, MythPluginOptionsType } from '../types'
import axios from 'axios'
import { I18n } from 'vue-i18n'

const _baseUrl = ref<string>()
const _axios = ref<MythApiAxiosType>(axios.create())
const _i18n = ref()
const _services = ref<MythApiServicesType>({})
const _options = ref({})
export const MythVue = reactive({
  str,
  dates,
  helpers,
  i18: reactive(_i18n),
  api: reactive({
    baseUrl: _baseUrl,
    axios: _axios,
    services: _services
  }),
  options: _options,
  ...MAlerts,
  ...MHelpers
})

export const createMyth = <I18nT extends I18n = I18n, Axios extends MythApiAxiosType = MythApiAxiosType, Services extends MythApiServicesType = MythApiServicesType> ({
  i18n,
  api: { baseUrl, axios, services },
  options = {}
}: MythPluginOptionsType<I18nT, Axios, Services>) => {
  _i18n.value = i18n
  _baseUrl.value = baseUrl
  _axios.value = axios
  _services.value = services
  _options.value = options || {}

  return reactive(MythVue)
}

export const getMythConfig = () => reactive(MythVue)
export const getMythI18n = () => reactive(MythVue.i18)
export const getMythApi = () => reactive(MythVue.api)
export const getMythOptions = (): MythOptionsConfig => reactive(MythVue.options)

export default MythVue

/** Global of plugin inside Vue app */
export const useMyth = () => MythVue

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
  }
}
