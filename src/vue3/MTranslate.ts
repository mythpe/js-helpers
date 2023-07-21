/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { useI18n } from 'vue-i18n'
import { UseTranslateOptions } from '../types'

export function useTranslate (options?: UseTranslateOptions) {
  Object.assign(options || {}, { useScope: 'global' })
  return useI18n(options)
}

export default {}
