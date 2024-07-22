/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { App, computed, inject, reactive, toRefs } from 'vue'
import {
  InstallPluginOptions,
  ParseHeaderOptions,
  ParseHeadersHeaderAgr,
  ParseHeadersType,
  UseMythVue,
  Vue3MAlertMessage,
  Vue3MAlertMessageOptions,
  Vue3MConfirmMessage
} from '../types'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { INJECT_KEY } from './Const'
import { Dates, Helpers, Str } from '../utils'
import lodash from 'lodash'
import { copyToClipboard, Dialog, LocalStorage, Notify, QDialogOptions, QNotifyCreateOptions, Screen } from 'quasar'
import { WebStorageGetMethodReturnType } from 'quasar/dist/types/api/web-storage'
import { initComponents } from './Component'
import { useI18n, VueI18n } from 'vue-i18n'

export const useStrTranslate = (string: string | { text: string; } | any, ...args: any[]) => {
  const defaultValue = ''
  if (!string) {
    return string
  }
  const useI18nGlobal = useI18n({ useScope: 'global' })
  const { t, te } = useI18nGlobal

  const key = typeof string === 'object' ? (Str.strBefore(string.text) || '') : Str.strBefore(string)
  if (!key) {
    return defaultValue
  }
  let transKey: string
  if (te) {
    if (te((transKey = `attributes.${key}`)) && lodash.isString(t(transKey))) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return t(transKey, ...args)
    }

    if (te((transKey = `choice.${key}`)) && lodash.isString(t(transKey))) {
      args = args || [2]
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return t(transKey, ...args)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (te(key) && lodash.isString(t(key))) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return t(key, ...args)
    }
  }
  return string
}

export default async function installPlugin (app: App, pluginOptions: InstallPluginOptions) {
  const opts = reactive(pluginOptions)
  const { api, i18n, options } = toRefs(opts)
  const helpers = {
    getPageTitle (route: RouteLocationNormalizedLoaded, number?: number | string): string {
      number = number || 2
      number = parseInt(number.toString())
      const defaultValue = ''
      // Not is route
      // No page title
      if (!route) {
        return defaultValue
      }

      const routePath = route?.path?.toString() || null
      const routeName = route?.name?.toString() || null

      // Not is route
      // No page title
      if (!routePath || !routeName) {
        return defaultValue
      }

      let lastRouteName = routeName.split('.').pop() || ''
      if (lastRouteName === 'index') {
        const s = routeName.split('.')
        lastRouteName = s[s.length - 2] ?? lastRouteName
      }
      const pluralize = Str.pascalCase(lodash.pluralize(lastRouteName))
      const singular = Str.pascalCase(lodash.singularize(lastRouteName))
      const keys = lodash.filter(lodash.uniq([
        `${lastRouteName}Page.title`,
        `${lodash.camelCase(lastRouteName)}Page.title`,
        `choice.${pluralize}`,
        `choice.${singular}`,
        `replace.${lastRouteName}_details`,
        `replace.${lastRouteName}`,
        pluralize,
        lodash.snakeCase(pluralize),
        singular,
        lodash.snakeCase(singular)
      ]))

      const { t, te } = i18n.value.global as VueI18n
      let str = null
      let k: string

      if (te((k = `routes.${routeName}`)) && lodash.isString((str = t(k)))) {
        return str
      }

      if (te((k = `routes.${routePath}`)) && lodash.isString((str = t(k)))) {
        return str
      }

      for (const f in keys) {
        if (!(k = keys[f])) {
          continue
        }
        if (te && te(k) && lodash.isString(t(k))) {
          if (lodash.startsWith(k, 'choice.')) {
            const s = k.split('.')
            const n = routeName.split('.')
            if (s.length === 2 && n.length > 1) {
              const model = n[n.length - 2]
              const pluralizeModel = lodash.pluralize(lodash.pascalCase(model))
              const _modelChoiceKey = `choice.${pluralizeModel}`
              if (te(_modelChoiceKey)) {
                const l = t(_modelChoiceKey, number as any)
                const rep = lodash.singularize(n[n.length - 1]).toLocaleLowerCase()
                const e = `replace.${rep}`
                str = te(e) ? t(e, { name: l }) : null
              } else {
                const pop: string = k.split('.').pop() || ''
                str = te(k) ? t(k, number as any, { [pop]: number }) : null
              }
            } else {
              const pop: string = k.split('.').pop() || ''
              str = te(k) ? t(k, number as any, { [pop]: number }) : null
            }
          } else {
            const parents: string[] = routeName.split('.')
            if (parents.length > 1) {
              const e = `choice.${Str.pascalCase(lodash.pluralize(parents[parents.length - 2]))}`
              str = te(e) ? t(k, { name: t(e, '1') }) : null
            } else {
              str = te(k) ? t(k, { name: '' }) : null
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
     * @param options
     */
    parseHeaders (headers: ParseHeadersHeaderAgr, options?: ParseHeaderOptions): ParseHeadersType[] {
      const defaultOptions: Partial<ParseHeaderOptions> = {
        controlKey: 'control',
        controlStyle: 'max-width: 150px',
        align: 'center',
        sortable: !0
      }
      const opts = options || { ...defaultOptions }
      let control: string | undefined = defaultOptions.controlKey
      let controlStyle: string | undefined = defaultOptions.controlStyle
      if (opts.controlKey) {
        control = opts.controlKey
        delete opts.controlKey
      }
      if (opts.controlStyle) {
        controlStyle = opts.controlStyle
        delete opts.controlStyle
      }

      const result: ParseHeadersType[] = []
      const { t, te } = i18n.value?.global
      headers.forEach((elm: string | ParseHeadersType) => {
        if (typeof elm !== 'string' && !elm?.name) return elm
        const isString = typeof elm === 'string'

        // Todo: will do this
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        let item: ParseHeadersType = isString ? {
          name: elm,
          label: elm,
          field: elm
        } : { ...elm }
        item.name = item.name ?? ''
        item.label = (item.label === undefined || item.label === null) ? item.name : item.label
        item.field = (item.field === undefined || item.field === null) ? item.name : item.field

        item = {
          ...item,
          name: Str.strBefore(Str.strBefore(item.name), 'ToString'),
          label: (item.label !== undefined && item.label !== null) ? Str.strBefore(Str.strBefore(item.label), 'ToString') : item.label
        }
        const name = item.name
        let k
        if (te) {
          if (te((k = `attributes.${item.label}`))) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item.label = t(k)
          } else if (te((k = `attributes.${lodash.snakeCase(item.label)}`))) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item.label = t(k)
          } else if (te((k = `attributes.${lodash.camelCase(item.label)}`))) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item.label = t(k)
          } else if (te((k = `attributes.${Str.pascalCase(item.label)}`))) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item.label = t(k)
          } else if (te((k = `choice.${lodash.pluralize(Str.pascalCase(item.label))}`))) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item.label = t(k, 2)
          } else if (te((k = item.label))) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item.label = t(k)
          }
        }

        if (opts.align && item.align) {
          opts.align = item.align
        }

        if (name === control && controlStyle && !item.style) {
          item.style = controlStyle + item.style ? ` ${item.style}` : ''
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

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        item = { ...opts, ...item }
        result.push(item)
      })
      return result
    },
    /**
     * Customized helper to get attribute name
     *
     * @param string
     * @param args
     */
    // __ (string: string | { text: string } | any, ...args: any): string {
    //   const defaultValue = ''
    //   if (!string) return string
    //
    //   const { t, te } = i18n.value?.global
    //   const key = string && typeof string === 'object' ? (Str.strBefore(string.text) || '') : Str.strBefore(string)
    //   if (!key) {
    //     return defaultValue
    //   }
    //   let transKey: string
    //   if (te) {
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-ignore
    //     if (te((transKey = `attributes.${key}`)) && lodash.isString(t(transKey))) {
    //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //       // @ts-ignore
    //       return t(transKey, ...args)
    //     }
    //
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-ignore
    //     if (te((transKey = `choice.${key}`)) && lodash.isString(t(transKey))) {
    //       args = args || [2]
    //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //       // @ts-ignore
    //       return t(transKey, ...args)
    //     }
    //
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-ignore
    //     if (te(key) && lodash.isString(t(key))) {
    //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //       // @ts-ignore
    //       return t(key, ...args)
    //     }
    //   }
    //   return string
    // },
    __: useStrTranslate,
    /**
     * Copy text
     * @param text
     */
    async copyText (text: string | any): Promise<void> {
      return copyToClipboard(text)
    },
    quasarNotifyOptions (opts: QNotifyCreateOptions | string): QNotifyCreateOptions {
      return {
        badgeColor: 'primary',
        progress: !0,
        ...options.value.notify as any,
        message: typeof opts === 'string' ? opts : opts.message,
        ...(typeof opts !== 'string' ? opts : {})
      }
    },
    alertMessage: (opts: Vue3MAlertMessageOptions): Vue3MAlertMessage => Notify.create(helpers.quasarNotifyOptions(opts)),
    alertSuccess: (message: string) => helpers.alertMessage({ type: 'positive', message }),
    alertError: (message: string) => helpers.alertMessage({ type: 'negative', message }),
    confirmMessage (message?: string, title?: string, opts?: QDialogOptions): Vue3MConfirmMessage {
      const { t } = i18n.value?.global
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      title = title || t('messages.are_you_sure') || ''
      message = message || ''
      opts = opts || {}
      const buttonsProps = {
        ...(options.value.button || {}),
        ...(options.value.confirmDialog?.buttons || {})
      }
      const okProps = options.value.confirmDialog?.okProps || {}
      const cancelProps = options.value.confirmDialog?.cancelProps || {}
      const dialogProps = options.value.confirmDialog?.props || {} as any
      dialogProps.transitionShow = dialogProps.transitionShow || 'jump-down'
      dialogProps.transitionHide = dialogProps.transitionHide || 'jump-up'
      dialogProps.class = ('m--confirm ') + (dialogProps.class || '')
      return Dialog.create({
        title,
        message,
        focus: 'none',
        cancel: {
          color: cancelProps.color || 'positive',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          label: t(cancelProps?.label || 'no'),
          ...buttonsProps as any,
          flat: !0,
          unelevated: !0,
          ...cancelProps as any
        },
        ok: {
          color: okProps.color || 'negative',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          label: t(okProps?.label || 'yes'),
          ...buttonsProps as any,
          flat: !0,
          unelevated: !0,
          ...okProps as any
        },
        persistent: !0,
        ...dialogProps as any,
        ...opts as any
      })
    }
  }
  const isSmall = computed(() => Screen.lt.md)
  const popupBreakpoint = computed(() => isSmall.value ? 800 : 450)
  const r = reactive({
    i18n: i18n.value,
    baseUrl: api.value.baseUrl,
    axios: api.value.axios,
    services: api.value.services,
    options: options.value,
    str: Str,
    dates: Dates,
    helpers: Helpers,
    tools: {
      isSmall,
      popupBreakpoint,
      transitions: {
        slideLeftFade: {
          hide: computed(() => isSmall.value ? 'slide-left' : 'fade'),
          show: computed(() => isSmall.value ? 'slide-right' : 'fade')
        },
        slideRightFade: {
          hide: computed(() => isSmall.value ? 'slide-right' : 'fade'),
          show: computed(() => isSmall.value ? 'slide-left' : 'fade')
        },
        slideDownFade: {
          hide: computed(() => isSmall.value ? 'slide-down' : 'fade'),
          show: computed(() => isSmall.value ? 'slide-up' : 'fade')
        },
        slideUpFade: {
          hide: computed(() => isSmall.value ? 'slide-up' : 'fade'),
          show: computed(() => isSmall.value ? 'slide-down' : 'fade')
        }
      }
    },
    ...helpers
  })
  app.provide(INJECT_KEY, r)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.config.globalProperties.$myth = r
  app.config.globalProperties.openWindow = function (url?: string | URL, target?: string, features?: string): Window | null {
    return window.open(url, target, features)
  }
  app.config.globalProperties.__ = function (string: string | { text: string } | any, ...args: any): string {
    return this.$myth.__(string, ...args)
  }
  app.config.globalProperties.getPageTitle = function (number?: number | string, route?: RouteLocationNormalizedLoaded): string {
    return this.$myth.getPageTitle(route || this.$route, number)
  }
  initComponents(app)
}

export const useMyth = () => inject<UseMythVue>(INJECT_KEY) as UseMythVue

export { installPlugin }
