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
import { useGeolocation } from './MGeolocation'
import { MHelpers } from './MHelpers'
import { useTranslate } from './MTranslate'
import { reactive } from 'vue'
import { MythConfigApi, MythConfigInterface, MythVueConfig } from './MythVueConfig'
import { I18n } from 'vue-i18n'

/**
 * Global of plugin inside Vue app
 */
export const MythVue = {
  str,
  dates,
  helpers
}
export type LegacyMythType = typeof MythVue & typeof MAlerts & typeof MHelpers

export type UseMythType<I extends I18n, A extends MythConfigApi<A>> = LegacyMythType & {
  geolocation: typeof useGeolocation
  translate: typeof useTranslate,
  i18n: I,
  api: A,
  options: MythConfigInterface<I, A>['options']
}

/**
 * Helper to use plugin
 */
export const useMyth = <I extends I18n, A extends MythConfigApi<A>>(): UseMythType<I, A> => {
  const legacy = Object.assign(MythVue, MAlerts, MHelpers)
  return Object.assign<object, UseMythType<I, A>, typeof legacy>({}, {
    geolocation: useGeolocation,
    translate: useTranslate,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    i18n: reactive(MythVueConfig.i18n),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    api: reactive(MythVueConfig.api),
    options: reactive(MythVueConfig.options)
  }, legacy)
}
export const createMyth = (): LegacyMythType => Object.assign({}, MythVue, MAlerts, MHelpers)

export default {}
