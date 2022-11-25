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
/* eslint-disable no-undef */

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
  return Object.assign({
    i18n: MyThVue3Plugin.i18n,
    api: MyThVue3Plugin.api,
    options: MyThVue3Plugin.options
  }, GlobalsMyThVue3, MAlerts, MHelpers)
}
