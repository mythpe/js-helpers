/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */
import axios, { AxiosStatic } from 'axios'
import { reactive, Ref, ref } from 'vue'
import { I18n } from 'vue-i18n'
import { MythConfigInterface, MythConfigOptions, MythConfigServices } from '../types'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const _i18n: Ref<Required<I18n>> = ref<Required<I18n>>()
const _baseUrl = ref()
const _axios = ref(axios)
const _services = ref<MythConfigServices>({})
const _options = ref({})
export const MythVueConfig = reactive({
  i18n: _i18n,
  api: reactive({
    baseUrl: _baseUrl,
    axios: _axios,
    services: _services
  }),
  options: _options
})

export const setupConfig = <I extends I18n, A extends AxiosStatic> ({ i18n, api: { baseUrl, axios, services }, options = {} }: MythConfigInterface<I, A>) => {
  MythVueConfig.i18n = i18n
  MythVueConfig.api.axios = axios
  MythVueConfig.api.baseUrl = baseUrl
  MythVueConfig.api.services = services
  MythVueConfig.options = options || {}
}

export const getMythConfig = () => MythVueConfig
export const getMythI18n = () => MythVueConfig.i18n.global
export const getMythApi = () => MythVueConfig.api
export const getMythOptions = (): MythConfigOptions => MythVueConfig.options

export default MythVueConfig
