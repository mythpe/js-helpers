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
  MDtColumn,
  MDtHeadersParameter,
  ParseHeaderOptions,
  UseMythVue,
  Vue3MAlertMessage,
  Vue3MAlertMessageOptions,
  Vue3MConfirmMessage
} from '../types'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { INJECT_KEY, INJECT_KEY_MYTH } from './Const'
import { Dates, Helpers, Str } from '../utils'
import lodash from 'lodash'
import { copyToClipboard, Dialog, Notify, openURL, QDialogOptions, QNotifyCreateOptions, Screen } from 'quasar'
import { initComponents } from './Component'
import { VueI18n } from 'vue-i18n'

export const useStrTranslate = (i18n: any, string: string | { text: string; } | any, ...args: any[]) => {
  const defaultValue = ''
  if (!string) {
    return string
  }
  // const useI18nGlobal = useI18n({ useScope: 'global' })
  const { t, te } = i18n

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

export const useMyth = () => inject<UseMythVue>(INJECT_KEY, {} as UseMythVue) as UseMythVue

export function useAhmed () {
  return inject<UseMythVue>(INJECT_KEY_MYTH, {} as UseMythVue) as UseMythVue
}

export default async function installPlugin (app: App, pluginOptions: InstallPluginOptions) {
  const opts = reactive(pluginOptions)
  const { api, i18n, options } = toRefs(opts)
  // const componentsOptions = ref(pluginOptions.options ?? {})
  // const mi18 = ref(pluginOptions.i18n)
  function quasarNotifyOptions (opts: QNotifyCreateOptions | string): QNotifyCreateOptions {
    return {
      badgeColor: 'primary',
      progress: !0,
      ...options.value.notify as any,
      message: typeof opts === 'string' ? opts : opts.message,
      ...(typeof opts !== 'string' ? opts : {})
    }
  }

  function alertMessage (opts: Vue3MAlertMessageOptions): Vue3MAlertMessage {
    return Notify.create(helpers.quasarNotifyOptions(opts))
  }

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
    parseHeaders (headers: MDtHeadersParameter, options: ParseHeaderOptions = {}): MDtColumn[] {
      const defaultOptions: Partial<ParseHeaderOptions> = {
        controlKey: 'control',
        controlStyle: 'max-width: 150px',
        align: 'center'
        // sortable: !0
      }
      const opts = { ...defaultOptions, ...options }
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

      const result: MDtColumn[] = []
      const { t, te } = i18n.value?.global
      headers.forEach((elm: string | MDtColumn | undefined) => {
        if (typeof elm !== 'string' && !elm?.name) return elm
        // Todo: will do this
        let item: MDtColumn = typeof elm === 'string' ? {
          name: elm as string,
          label: elm as string,
          field: elm as string
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

        // if (opts.align && item.align) {
        //   opts.align = item.align
        // }

        if (name === control && controlStyle && !item.style) {
          item.style = controlStyle + item.style ? ` ${item.style}` : ''
        }
        if (name === control) {
          // console.log(control)
          item.sortable = !1
          if (!item.align) {
            item.align = 'right'
          }
          opts.classes = opts.classes || ''
          if (typeof opts.classes === 'function') {
            opts.classes = opts.classes()
          }
          opts.classes += (opts.classes ? ' ' : '') + 'm--control-cell'
        }

        item = { ...opts, ...item }
        if (item.sortable === undefined && (options?.noSort ?? []).length > 0 && options?.noSort?.includes(item.name)) {
          item.sortable = !1
        } else if (item.sortable === undefined) {
          item.sortable = !0
        }
        // console.log(item)
        result.push(item)
      })
      return lodash.uniqBy(result, (e: MDtColumn) => e.name)
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
    __: (string: string | { text: string; } | any, ...args: any[]) => useStrTranslate(i18n.value.global, string, ...args),
    /**
     * Copy text
     * @param text
     */
    async copyText (text: string | any): Promise<void> {
      return copyToClipboard(text)
    },
    quasarNotifyOptions,
    alertMessage,
    alertSuccess (message: string) {
      return alertMessage({ type: 'positive', message })
    },
    alertError (message: string) {
      return alertMessage({ type: 'negative', message })
    },
    confirmMessage (message?: string, title?: string, opts?: QDialogOptions): Vue3MConfirmMessage {
      const { t } = i18n.value?.global
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      title = title || t('messages.are_you_sure') || ''
      message = message || ''
      opts = opts || {}
      const buttonsProps = {
        ...(options.value.button || {}),
        ...(options.value.confirmDialogOptions?.buttons || {})
      }
      const okProps = options.value.confirmDialogOptions?.okProps || {}
      const cancelProps = options.value.confirmDialogOptions?.cancelProps || {}
      const dialogProps = options.value.confirmDialog || {} as any
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
  // const defHelpers = {
  //   str: Str,
  //   dates: Dates,
  //   helpers: Helpers
  // }
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

  // const quasarNotifyOptions = (opts: QNotifyCreateOptions | string): QNotifyCreateOptions => extend(!0, {
  //   badgeColor: 'primary',
  //   progress: !0,
  //   message: typeof opts === 'string' ? opts : opts.message
  // }, componentsOptions.value.notify, typeof opts !== 'string' ? opts : undefined)

  // const alertMessage = (opts: Vue3MAlertMessageOptions): Vue3MAlertMessage => Notify.create(quasarNotifyOptions(opts))

  // const ahmed = {
  //   __ (string: string | { text: string; } | any, ...args: any[]): string {
  //     const defaultValue = ''
  //     if (!string) {
  //       return string
  //     }
  //     const { t, te } = mi18.value.global
  //     const key = typeof string === 'object' ? (Str.strBefore(string.text) || '') : Str.strBefore(string)
  //     if (!key) {
  //       return defaultValue
  //     }
  //     let transKey: string
  //     if (te) {
  //       if (te((transKey = `attributes.${key}`)) && lodash.isString(t(transKey))) {
  //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //         // @ts-ignore
  //         return t(transKey, ...args)
  //       }
  //
  //       if (te((transKey = `choice.${key}`)) && lodash.isString(t(transKey))) {
  //         args = args || [2]
  //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //         // @ts-ignore
  //         return t(transKey, ...args)
  //       }
  //
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       // @ts-ignore
  //       if (te(key) && lodash.isString(t(key))) {
  //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //         // @ts-ignore
  //         return t(key, ...args)
  //       }
  //     }
  //     return string
  //   },
  //   getPageTitle (number?: number | string): string {
  //     const route = useRoute()
  //     number = parseInt((number || 2).toString())
  //     const defaultValue = ''
  //     // Not is route
  //     // No page title
  //     if (!route) {
  //       return defaultValue
  //     }
  //
  //     const routePath = route?.path?.toString() || null
  //     const routeName = route?.name?.toString() || null
  //
  //     // Not is route
  //     // No page title
  //     if (!routePath || !routeName) {
  //       return defaultValue
  //     }
  //
  //     let lastRouteName = routeName.split('.').pop() || ''
  //     if (lastRouteName === 'index') {
  //       const s = routeName.split('.')
  //       lastRouteName = s[s.length - 2] ?? lastRouteName
  //     }
  //     const pluralize = Str.pascalCase(lodash.pluralize(lastRouteName))
  //     const singular = Str.pascalCase(lodash.singularize(lastRouteName))
  //     const keys = lodash.filter(lodash.uniq([
  //       `${lastRouteName}Page.title`,
  //       `${lodash.camelCase(lastRouteName)}Page.title`,
  //       `choice.${pluralize}`,
  //       `choice.${singular}`,
  //       `replace.${lastRouteName}_details`,
  //       `replace.${lastRouteName}`,
  //       pluralize,
  //       lodash.snakeCase(pluralize),
  //       singular,
  //       lodash.snakeCase(singular)
  //     ]))
  //
  //     const { t, te } = i18n.value.global as VueI18n
  //     let str = null
  //     let k: string
  //
  //     if (te((k = `routes.${routeName}`)) && lodash.isString((str = t(k)))) {
  //       return str
  //     }
  //
  //     if (te((k = `routes.${routePath}`)) && lodash.isString((str = t(k)))) {
  //       return str
  //     }
  //
  //     for (const f in keys) {
  //       if (!(k = keys[f])) {
  //         continue
  //       }
  //       if (te && te(k) && lodash.isString(t(k))) {
  //         if (lodash.startsWith(k, 'choice.')) {
  //           const s = k.split('.')
  //           const n = routeName.split('.')
  //           if (s.length === 2 && n.length > 1) {
  //             const model = n[n.length - 2]
  //             const pluralizeModel = lodash.pluralize(lodash.pascalCase(model))
  //             const _modelChoiceKey = `choice.${pluralizeModel}`
  //             if (te(_modelChoiceKey)) {
  //               const l = t(_modelChoiceKey, number as any)
  //               const rep = lodash.singularize(n[n.length - 1]).toLocaleLowerCase()
  //               const e = `replace.${rep}`
  //               str = te(e) ? t(e, { name: l }) : null
  //             } else {
  //               const pop: string = k.split('.').pop() || ''
  //               str = te(k) ? t(k, number as any, { [pop]: number }) : null
  //             }
  //           } else {
  //             const pop: string = k.split('.').pop() || ''
  //             str = te(k) ? t(k, number as any, { [pop]: number }) : null
  //           }
  //         } else {
  //           const parents: string[] = routeName.split('.')
  //           if (parents.length > 1) {
  //             const e = `choice.${Str.pascalCase(lodash.pluralize(parents[parents.length - 2]))}`
  //             str = te(e) ? t(k, { name: t(e, '1') }) : null
  //           } else {
  //             str = te(k) ? t(k, { name: '' }) : null
  //           }
  //         }
  //         return str || defaultValue
  //       }
  //     }
  //     return defaultValue
  //   },
  //   parseHeaders (headers: MDtHeadersParameter, options: ParseHeaderOptions = {}): MDtColumn[] {
  //     const defaultOptions = {
  //       controlKey: 'control',
  //       controlStyle: 'max-width: 150px',
  //       align: 'center'
  //     }
  //     const opts = extend<ParseHeaderOptions>(!0, {}, defaultOptions, options)
  //     let control: string | undefined = defaultOptions.controlKey
  //     let controlStyle: string | undefined = defaultOptions.controlStyle
  //     if (opts.controlKey) {
  //       control = opts.controlKey
  //       delete opts.controlKey
  //     }
  //     if (opts.controlStyle) {
  //       controlStyle = opts.controlStyle
  //       delete opts.controlStyle
  //     }
  //
  //     const result: MDtColumn[] = []
  //     const { t, te } = useI18n({ useScope: 'global' })
  //     headers.forEach((elm: string | MDtColumn | undefined) => {
  //       if (typeof elm !== 'string' && !elm?.name) {
  //         return elm
  //       }
  //       // Todo: will do this
  //       let item: MDtColumn = typeof elm === 'string' ? {
  //         name: elm as string,
  //         label: elm as string,
  //         field: elm as string
  //       } : { ...elm }
  //       item.name = item.name ?? ''
  //       item.label = (item.label === undefined || item.label === null) ? item.name : item.label
  //       item.field = (item.field === undefined || item.field === null) ? item.name : item.field
  //       item = {
  //         ...item,
  //         name: Str.strBefore(Str.strBefore(item.name), 'ToString'),
  //         label: (item.label !== undefined && item.label !== null) ? Str.strBefore(Str.strBefore(item.label), 'ToString') : item.label
  //       }
  //       const name = item.name
  //       let k
  //       if (te) {
  //         if (te((k = `attributes.${item.label}`))) {
  //           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //           // @ts-ignore
  //           item.label = t(k)
  //         } else if (te((k = `attributes.${lodash.snakeCase(item.label)}`))) {
  //           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //           // @ts-ignore
  //           item.label = t(k)
  //         } else if (te((k = `attributes.${lodash.camelCase(item.label)}`))) {
  //           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //           // @ts-ignore
  //           item.label = t(k)
  //         } else if (te((k = `attributes.${Str.pascalCase(item.label)}`))) {
  //           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //           // @ts-ignore
  //           item.label = t(k)
  //         } else if (te((k = `choice.${lodash.pluralize(Str.pascalCase(item.label))}`))) {
  //           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //           // @ts-ignore
  //           item.label = t(k, 2)
  //         } else if (te((k = item.label))) {
  //           // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //           // @ts-ignore
  //           item.label = t(k)
  //         }
  //       }
  //
  //       if (opts.align && item.align) {
  //         opts.align = item.align
  //       }
  //
  //       if (name === control && controlStyle && !item.style) {
  //         item.style = controlStyle + item.style ? ` ${item.style}` : ''
  //       }
  //       if (name === control) {
  //         opts.sortable = !1
  //         if (!item.align) {
  //           opts.align = 'right'
  //         }
  //         opts.classes = opts.classes || ''
  //         if (typeof opts.classes === 'function') {
  //           opts.classes = opts.classes()
  //         }
  //         opts.classes += (opts.classes ? ' ' : '') + 'm--control-cell'
  //       }
  //
  //       item = { ...opts, ...item }
  //       if (item.sortable === undefined && (options?.noSort ?? []).length > 0 && options?.noSort?.includes(item.name)) {
  //         item.sortable = !1
  //       } else if (item.sortable === undefined) {
  //         item.sortable = !0
  //       }
  //       result.push(item)
  //     })
  //     return lodash.uniqBy(result, (e: MDtColumn) => e.name)
  //   },
  //   copyText: async (text: string | any): Promise<void> => copyToClipboard(text),
  //   alertMessage,
  //   alertSuccess: (message: string) => alertMessage({ type: 'positive', message }),
  //   alertError: (message: string) => alertMessage({ type: 'negative', message }),
  //   confirmMessage (message?: string, title?: string, opts?: QDialogOptions): Vue3MConfirmMessage {
  //     // const { t } = i18n.value?.global
  //     const { t } = useI18n({ useScope: 'global' })
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     title = title || t('messages.are_you_sure') || ''
  //     message = message || ''
  //     opts = opts || {}
  //     const buttonsProps = {
  //       ...(options.value.button || {}),
  //       ...(options.value.confirmDialogOptions?.buttons || {})
  //     }
  //     const okProps = options.value.confirmDialogOptions?.okProps || {}
  //     const cancelProps = options.value.confirmDialogOptions?.cancelProps || {}
  //     const dialogProps = options.value.confirmDialog || {} as any
  //     dialogProps.transitionShow = dialogProps.transitionShow || 'jump-down'
  //     dialogProps.transitionHide = dialogProps.transitionHide || 'jump-up'
  //     dialogProps.class = ('m--confirm ') + (dialogProps.class || '')
  //     return Dialog.create({
  //       title,
  //       message,
  //       focus: 'none',
  //       cancel: {
  //         color: cancelProps.color || 'positive',
  //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //         // @ts-ignore
  //         label: t(cancelProps?.label || 'no'),
  //         ...buttonsProps as any,
  //         flat: !0,
  //         unelevated: !0,
  //         ...cancelProps as any
  //       },
  //       ok: {
  //         color: okProps.color || 'negative',
  //         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //         // @ts-ignore
  //         label: t(okProps?.label || 'yes'),
  //         ...buttonsProps as any,
  //         flat: !0,
  //         unelevated: !0,
  //         ...okProps as any
  //       },
  //       persistent: !0,
  //       ...dialogProps as any,
  //       ...opts as any
  //     })
  //   }
  // }

  // app.provide(INJECT_KEY_MYTH, ahmed)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.config.globalProperties.$myth = r
  // app.config.globalProperties.$ahmed = ahmed
  app.config.globalProperties.openWindow = function <F extends (...args: any[]) => any> (
    url: string,
    reject?: F,
    windowFeatures?: object
  ) {
    return openURL(url, reject, windowFeatures)
  }
  app.config.globalProperties.__ = function (string: string | { text: string } | any, ...args: any): string {
    return useStrTranslate({ t: this.$t, te: this.$te }, string, ...args)
  }
  app.config.globalProperties.getPageTitle = function (number?: number | string, route?: RouteLocationNormalizedLoaded): string {
    return this.$myth.getPageTitle(route || this.$route, number)
  }

  initComponents(app)
}

export { installPlugin }
