/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import lodash from 'lodash'
import { patterns } from 'quasar'

const { testPattern } = patterns

export const VeeRules = {
  float: (v: any) => lodash.isNumber(parseInt(v)) && !isNaN(parseInt(v)) && v?.toString().split('.')?.length <= 2 && (/(\d)+/g.test(v) && !/[a-zA-Z]/.test(
    v)),
  date: (v: any) => /^-?[\d]+-[0-1]\d-[0-3]\d$/.test(v),
  time: (v: any) => testPattern.time(v),
  fulltime: (v: any) => testPattern.fulltime(v),
  timeOrFulltime: (v: any) => testPattern.timeOrFulltime(v),
  hexColor: (v: any) => testPattern.hexColor(v),
  hexaColor: (v: any) => testPattern.hexaColor(v),
  hexOrHexaColor: (v: any) => testPattern.hexOrHexaColor(v),
  rgbColor: (v: any) => testPattern.rgbColor(v),
  rgbaColor: (v: any) => testPattern.rgbaColor(v),
  rgbOrRgbaColor: (v: any) => testPattern.rgbOrRgbaColor(v),
  hexOrRgbColor: (v: any) => testPattern.hexOrRgbColor(v),
  hexaOrRgbaColor: (v: any) => testPattern.hexaOrRgbaColor(v),
  color: (v: any) => !v ? !0 : testPattern.anyColor(v),
  requiredColor: (v: any) => testPattern.anyColor(v)
}

export default {}
