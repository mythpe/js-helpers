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
import { reactive, ref } from 'vue'
import { MythApiAxiosType, MythApiServicesType, MythOptionsConfig, MythPluginOptionsType } from '../types'
import axios from 'axios'
import { I18n } from 'vue-i18n'

const _baseUrl = ref<string>()
const _axios = ref<MythApiAxiosType>(axios.create())
const _i18n = ref()
const _services = ref<MythApiServicesType>({})
// const _options = ref<MythOptionsConfig>({})
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
  options: {},
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
  MythVue.options = options

  return MythVue
}

export const getMythConfig = () => MythVue
export const getMythI18n = () => MythVue.i18
export const getMythApi = () => MythVue.api
export const getMythOptions = (): MythOptionsConfig => MythVue.options

export default MythVue

/** Global of plugin inside Vue app */
export const useMyth = () => MythVue
