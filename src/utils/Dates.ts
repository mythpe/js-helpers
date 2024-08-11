/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import moment from 'moment'

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
  }
}

export default {}
