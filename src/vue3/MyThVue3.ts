/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { MyThVue3PluginType } from '../types'
import { Dates as dates } from '../utils/Dates'
import { Helpers as helpers } from '../utils/Helpers'
import { Str as str } from '../utils/Str'
import { MAlerts } from './MAlerts'
import { useGeolocation } from './MGeolocation'
import { MHelpers } from './MHelpers'
import { useTranslate } from './MTranslate'

/**
 * Global of plugin inside Vue app
 */
export const GlobalsMyThVue3 = {
  str,
  dates,
  helpers,
  geolocation: useGeolocation,
  translate: useTranslate
}

/**
 * Helper to use plugin
 */
export const useMyTh = (): MyThVue3PluginType => {
  const opts: any = typeof window !== 'undefined' ? window.MyThVue3Plugin : {}
  return Object.assign({
    i18n: opts.i18n,
    api: opts.api,
    options: opts.options
  }, GlobalsMyThVue3, MAlerts, MHelpers)
}
