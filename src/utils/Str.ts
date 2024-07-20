/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import _ from 'lodash'

export const Str = {
  /**
   * String vue3
   * @param str
   * @param needle
   */
  strBefore (str: string, needle = '_to_string'): string {
    if (!str) {
      return ''
    }
    if (str.slice(-needle.length) === needle) {
      str = str.slice(0, str.length - needle.length)
    }
    return str
  },
  /**
   * String to number format
   * @param num
   * @param c
   */
  toNumberFormat (num = null, c: any) {
    if (!num) {
      // console.log(num)
      return num
    }
    const splitArray = Str.toNumber(num).split('.')
    const rgx = /(\d+)(\d{3})/
    while (rgx.test(splitArray[0])) {
      splitArray[0] = splitArray[0].replace(rgx, '$1' + ',' + '$2')
    }
    let t = splitArray.join('.')
    if (c) t = `${t} ${c}`
    return t
  },
  /**
   * Convert To string
   * @param value
   */
  fromArabicNumber (value: any): string {
    if (!value) return ''
    value = value?.toString().replace(/٠/g, 0).replace(/١/g, 1).replace(/٢/g, 2).replace(/٣/g, 3).replace(/٤/g, 4).replace(/٥/g, 5).replace(/٦/g,
      6).replace(/٧/g, 7).replace(/٨/g, 8).replace(/٩/g, 9)

    return '' + (value || '')
  },
  /**
   * String to number 'return string'
   * @param n
   */
  toNumber (n: string | null | undefined | number): string {
    if (!n) return ''
    n = '' + n
    n = Str.fromArabicNumber(n)
    n = n.replace(/,/g, '')
    return '' + n
  },
  isKsaMobile (mobile: string | null) {
    mobile = Str.fromArabicNumber(mobile) || ''
    if (!mobile) return !1
    const c1 = mobile.slice(0, 2)
    // const c2 = parseInt(mobile.substr(0, 1))
    return mobile && (mobile.length === 10 && (c1 === '05' || parseInt(c1) === 5))
    // return mobile && ((mobile.length === 10 && (c1 === '05' || parseInt(c1) === 5)) || (mobile.length === 9 && c2 === 5))
  },
  pascalCase (string?: string): string {
    if (!_.pascalCase) {
      _.mixin({ pascalCase: _.flow(_.camelCase, _.upperFirst) })
    }
    return _.pascalCase(string)
  },
  pluralize (string?: string): string {
    return _.pluralize(string)
  },
  singular (string?: string): string {
    return _.singularize(string)
  },
  flipChoice (data: Record<any, any>) {
    const f: Record<any, any> = {}
    for (const a in data) {
      let c
      c = data[a].split('|')
      c = [c[1], c[0]].join('|')
      f[a] = c
    }
    return f
  },
  /**
   *
   * Remove 'الـ' from words
   * Example: الغرب => غرب
   *
   * @param words
   * @param locale
   */
  wordsWithoutThe<T> (words: string | null, locale: string): string | null | T {
    if (words && locale === 'ar') {
      const e = words.split(' ')
      for (const i in e) {
        if (e[i].slice(0, 2) === 'ال') {
          e[i] = e[i].slice(2)
        }
      }
      words = e.join(' ')
    }
    return words
  },
  /**
   *
   * Add 'الـ' to words
   *
   * Example: غرب => الغرب
   *
   * @param words
   * @param locale
   */
  wordsWithThe<T> (words: string | null, locale: string): string | null | T {
    if (words && locale === 'ar') {
      let i
      const e = words.split(' ')
      if (e[e.length - 1].slice(0, 2) === 'ال') {
        return words
      }
      for (i in e) {
        if (e[i].slice(0, 2) !== 'ال') {
          e[i] = 'ال' + e[i]
        }
      }
      words = e.join(' ')
    }
    return words
  },
  /**
   * Example: غرب => 'الغربي'
   * @param words
   * @param locale
   */
  wordsToSingle<T> (words: string | null, locale: string): string | null | T {
    if (words && locale === 'ar') {
      let i
      const e = words.split(' ')
      for (i in e) {
        if (e[i].slice(0, 2) !== 'ال') {
          e[i] = 'ال' + e[i]
        }
        if (e[i].slice(-1) !== 'ي') {
          e[i] += 'ي'
        }
      }
      words = e.join(' ')
    }
    return words
  },
  /**
   * Custom helper
   * @param a
   * @param b
   */
  sortNumberFormatted (a: any, b: any) {
    const f = parseFloat(Str.toNumber(a).replace(/[^\d]/g, '')) || 0
    const s = parseFloat(Str.toNumber(b).replace(/[^\d]/g, '')) || 0
    return f - s
  },
  /**
   * Convert string new line to BR
   * @param str
   * @param isXhtml
   */
  nl2br (str: null | undefined | string | number, isXhtml: (boolean | null | undefined) = !1) {
    if (!str) {
      return ''
    }
    const breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br />' : '<br>'
    return str.toString().replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, `$1${breakTag}$2`)
  }
}

export default {}
