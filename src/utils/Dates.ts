/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import moment from 'moment'
import { date as $date, DateUnitOptions } from 'quasar'

export const Dates = {
  hijriYear () {
    const l = moment().locale()
    moment.locale('en')
    const date = moment().format('iYYYY')
    moment.locale(l)
    return date
  },
  hijriMonth () {
    const l = moment().locale()
    moment.locale('en')
    const date = moment().format('iM')
    moment.locale(l)
    return date
  },
  hijriDay () {
    const l = moment().locale()
    moment.locale('en')
    const date = moment().format('iD')
    moment.locale(l)
    return date
  },
  todayDate () {
    const l = moment().locale()
    moment.locale('en')
    const date = moment().format('YYYY-MM-DD')
    moment.locale(l)
    return date
  },
  todayTime () {
    const l = moment().locale()
    moment.locale('en')
    const time = moment().format('HH:mm')
    moment.locale(l)
    return time
  },
  getYear () {
    return new Date().getFullYear()
  },
  ofDate (type: 'start' | 'end', option: DateUnitOptions | {
    format: string,
    unit: DateUnitOptions
  }, date?: Date | number | string | 'last-month' | 'last-quarter', utc?: boolean): string {
    const $now = new Date()
    const now = (date === 'last-month' || date === 'last-quarter')
      ? $date.subtractFromDate(new Date(), { month: date === 'last-month' ? 1 : 3 }) : (date ?? $now)
    const format = typeof option === 'object' ? option.format : 'YYYY/MM/DD'
    const unit = typeof option === 'object' ? option.unit : option
    const l = {
      start: $date.startOfDate,
      end: $date.endOfDate
    }
    const f = l[type](now, unit, utc)
    return $date.formatDate(f, format)
  }
}

export default {}
