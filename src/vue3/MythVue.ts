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
import { MythConfigInterface, MythVueConfig } from './MythVueConfig'

/**
 * Global of plugin inside Vue app
 */
export const MythVue = {
  str,
  dates,
  helpers
  // geolocation: useGeolocation
  // translate: useTranslate
}

export type LegacyMythType = typeof MythVue & typeof MAlerts & typeof MHelpers & {
  options: MythConfigInterface['options']
}

export type UseMythType = typeof MythVue & typeof MAlerts & typeof MHelpers & {
  geolocation: typeof useGeolocation
  translate: typeof useTranslate
  options: MythConfigInterface['options']
}

/**
 * Helper to use plugin
 */
const options = MythVueConfig.options
export const useMyth = (): UseMythType => Object.assign({}, MythVue, MAlerts, MHelpers, {
  options,
  geolocation: useGeolocation,
  translate: useTranslate
})
export const createMyth = (): LegacyMythType => Object.assign({}, MythVue, MAlerts, MHelpers, { options })

export default {}
