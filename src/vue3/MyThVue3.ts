/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { MyThPlugin, UseMyThVue3 } from '../types'
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
export const useMyTh = (): UseMyThVue3 => {
  return Object.assign({
    version: MyThVue3.version,
    i18n: MyThVue3.i18n,
    api: MyThVue3.api,
    options: MyThVue3.options
  }, GlobalsMyThVue3, MAlerts, MHelpers)
}

export const MyThVue3: MyThPlugin = {
  /**
   * Version of plugin
   */
  get version () {
    return '2.0.0'
  },
  i18n: {},
  api: {
    axios: {},
    services: {}
  },
  options: {}
}
