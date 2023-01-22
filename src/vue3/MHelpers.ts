/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import _ from 'lodash'
import { copyToClipboard, Dark, LocalStorage } from 'quasar'
import { WebStorageGetMethodReturnType } from 'quasar/dist/types/api/web-storage'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { ParseHeaderOptions, ParseHeadersType } from '../types'
import { Str } from '../utils'

export const MHelpers = {
  storage: {
    /**
     * Set item in storage
     * @param key Entry key
     * @param value Entry value
     */
    set: (key: string, value: | Date | RegExp | number | boolean | ((...params: readonly any[]) => any) | any | readonly any[] | string | null) => {
      LocalStorage.set(key, value)
    },
    get<T extends WebStorageGetMethodReturnType = WebStorageGetMethodReturnType> (key: string) {
      return LocalStorage.getItem<T>(key)
    },
    remove (key: string) {
      return LocalStorage.remove(key)
    }
  },
  /**
   *
   * Customized helper to get page title
   *
   * @param number
   * @param route
   */
  getPageTitle (number: number | string | any, route?: RouteLocationNormalizedLoaded): string | undefined {
    number = number ?? 2
    number = parseInt(number.toString())
    const defaultValue = undefined
    const { t, te } = window.MyThVue3Plugin.i18n

    // Not is route
    // No page title
    if (!route) {
      return defaultValue
    }

    const routePath = route?.path?.toString() || ''
    const routeName = route?.name?.toString() || ''

    let str = null

    // Not is route
    // No page title
    if (!routePath || !routeName) {
      return defaultValue
    }

    let lastRouteName = routeName.split('.').pop()
    if (lastRouteName === 'index') {
      const s = routeName.split('.')
      lastRouteName = s[s.length - 2] ?? lastRouteName
    }
    const pluralize = Str.pascalCase(_.pluralize(lastRouteName))
    const singular = Str.pascalCase(_.singularize(lastRouteName))
    // console.log(t(`replace.${lastRouteName}_details`, { name: 123 }))
    // console.log(t('choice.Orders', { name: 123, number: 5 }))
    const keys = _.filter(_.uniq([
      `routes.${routeName}`,
      `routes.${routePath}`,
      `${lastRouteName}Page.title`,
      `${_.camelCase(lastRouteName)}Page.title`,
      `choice.${pluralize}`,
      `choice.${singular}`,
      `replace.${lastRouteName}_details`,
      `replace.${lastRouteName}`,
      pluralize,
      _.snakeCase(pluralize),
      singular,
      _.snakeCase(singular)
    ]))

    let k
    for (const f in keys) {
      if (!(k = keys[f])) {
        continue
      }
      if (te(k) && _.isString(t(k))) {
        if (_.startsWith(k, 'choice.')) {
          const pop: string = k.split('.').pop() ?? ''
          str = t(k, number, { [pop]: number })
        } else {
          const parents: string[] = routeName.split('.')
          if (parents.length > 1) {
            // console.log(parents[parents.length - 2])
            str = t(k, { name: t(`choice.${Str.pascalCase(_.pluralize(parents[parents.length - 2]))}`, '1') })
          } else {
            str = t(k, { name: '' })
          }
        }
        return str || defaultValue
      }
    }
    return defaultValue
  },
  /**
   * Custom transformer
   * @param headers
   * @param opts
   */
  parseHeaders (headers: ParseHeadersType[] | string[] | any[], opts: ParseHeaderOptions = {
    controlKey: 'control',
    controlStyle: 'max-width: 100px',
    align: 'center',
    sortable: !0
  }): ParseHeadersType[] {
    if (!headers) {
      return []
    }
    opts = opts || {}
    let control: string | undefined = 'control'
    let controlStyle: string | undefined = 'max-width: 150px'

    if (opts.controlKey) {
      control = opts.controlKey
      delete opts.controlKey
    }
    if (opts.controlStyle) {
      controlStyle = opts.controlStyle
      delete opts.controlStyle
    }

    const result: ParseHeadersType[] = []
    const { t, te } = window.MyThVue3Plugin.i18n
    headers.forEach((elm: string | ParseHeadersType) => {
      if (typeof elm !== 'string' && !elm?.name) return elm
      const isString = typeof elm === 'string'

      let item: ParseHeadersType | any = isString ? {
        name: elm,
        label: elm,
        field: elm
      } : { ...elm }
      item = {
        ...item,
        name: Str.strBefore(Str.strBefore(item.name), 'ToString'),
        label: Str.strBefore(Str.strBefore(item.label ?? item.name), 'ToString')
      }
      const name = item.name
      let k
      if (te((k = `attributes.${item.label}`))) {
        item.label = t(k)
      } else if (te((k = `attributes.${_.snakeCase(item.label)}`))) {
        item.label = t(k)
      } else if (te((k = `attributes.${_.camelCase(item.label)}`))) {
        item.label = t(k)
      } else if (te((k = `attributes.${Str.pascalCase(item.label)}`))) {
        item.label = t(k)
      } else if (te((k = item.label))) {
        item.label = t(k)
      }

      if (opts.align && item.align) {
        opts.align = item.align
      }

      if (name === control && controlStyle) {
        item.style = (item.style ?? '') + ` ${controlStyle}`
      }
      if (name === control) {
        opts.sortable = !1
        if (!item.align) {
          opts.align = 'right'
        }
        opts.classes = opts.classes || ''
        if (typeof opts.classes === 'function') {
          opts.classes = opts.classes()
        }
        opts.classes += (opts.classes ? ' ' : '') + 'm--control-cell'
      }

      item = { ...opts, ...item }
      result.push(item)
    })
    // console.log(result)
    return result
  },
  /**
   * Customized helper to get attribute name
   *
   * @param string
   * @param args
   */
  parseAttribute (string: string | { text: string } | any, ...args: []): string | undefined | any {
    const defaultValue = undefined
    if (!string) return string

    const { t, te } = window.MyThVue3Plugin.i18n
    const key = string && typeof string === 'object' ? (Str.strBefore(string.text) || '') : Str.strBefore(string)

    if (!key) {
      return defaultValue
    }

    let transKey: string
    if (te((transKey = `attributes.${key}`)) && _.isString(t(transKey))) {
      return t(transKey, ...args)
    }

    if (te((transKey = `choice.${key}`)) && _.isString(t(transKey))) {
      args = args || [2]
      return t(transKey, ...args)
    }

    if (te(key) && _.isString(t(key))) {
      return t(key, ...args)
    }

    return string
  },
  /**
   * Set Quasar dark mode
   */
  setAppDarkMode (status: 'auto' | boolean): void {
    Dark.set(status)
  },
  /**
   * Toggle Quasar Dark Mode
   */
  toggleAppDarkMode (): void {
    Dark.toggle()
  },
  /**
   * Copy text
   * @param text
   */
  copyText (text: string | any): Promise<void> {
    return copyToClipboard(text)
  },
  /**
   * Customized helper to download blob from axios response
   * @param response
   * @param callback
   */
  downloadFromResponse (response: any, callback?: ((url: string, response: any) => void)) {
    try {
      if (response?.data?.data?.url) {
        const url = response?.data?.data?.url
        if (callback) {
          callback(url, response)
        } else {
          window.open(url, 'AppWindow')
        }
        return
      }

      if (!response) return

      let name = response.headers['content-disposition'] || ''
      // console.log(response.headers['Content-Disposition'])
      // name = name.split('filename=').pop().replace(/^\"+|\"+$/g, '');
      name = name.split('filename=').pop().replace(/^"+|"+$/g, '')
      // console.log(response)
      // name = name ||
      if (!name) {
        alert('No file name')
        console.log(response.headers)
        return
      }

      const file = new Blob([response.data])
      // console.log(file.type)
      const fileURL = window.URL.createObjectURL(file)
      const fileLink = document.createElement('a')
      if (!fileLink || !fileURL) return

      fileLink.href = fileURL
      fileLink.setAttribute('download', name)
      document.body.appendChild(fileLink)
      fileLink.click()
      setTimeout(() => {
        try {
          document.body.removeChild(fileLink)
          URL.revokeObjectURL(fileURL)
        } catch (e) {

        }
      }, 3000)
    } catch (e) {
      // console.log(e)
    }
  },
  /**
   * Open unique window popup of application
   *
   * @param url
   * @param name
   * @param args
   */
  openWindow (url: string | null, name = 'AppWindow', ...args: []) {
    return url ? window.open(url, name, ...args) : null
  }
}
