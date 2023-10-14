/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { App, computed, defineAsyncComponent, inject, reactive } from 'vue'
import { MythPluginOptionsType, ParseHeaderOptions, ParseHeadersHeaderAgr, ParseHeadersType, UseMythVue, Vue3MAlertMessage, Vue3MAlertMessageOptions, Vue3MConfirmMessage } from '../types'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { INJECT_KEY } from './Const'
import { Dates, Helpers, Str } from '../utils'
import _ from 'lodash'
import { copyToClipboard, Dialog, LocalStorage, Notify, QDialogOptions, QNotifyCreateOptions, Screen } from 'quasar'
import { WebStorageGetMethodReturnType } from 'quasar/dist/types/api/web-storage'

/**
 * Install Plugin
 * @param app
 * @param i18n
 * @param api
 * @param options
 */
export default async function installPlugin (app: App, { i18n, api, options = {} }: MythPluginOptionsType) {
  options = options || {}
  const apiBaseUrl = computed(() => api.baseUrl)
  const apiAxios = computed(() => api.axios)
  const apiServices = computed(() => api.services)
  const baseI18n = computed(() => i18n)
  const mythOptions = computed(() => options)
  const helpers = {
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
      const pluralize = Str.pascalCase(_.pluralize(lastRouteName))
      const singular = Str.pascalCase(_.singularize(lastRouteName))
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

      const { t, te } = baseI18n.value?.global
      let str = null
      let k: string
      for (const f in keys) {
        if (!(k = keys[f])) {
          continue
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (te && te(k) && _.isString(t(k))) {
          if (_.startsWith(k, 'choice.')) {
            const pop: string = k.split('.').pop() || ''
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            str = te(k) ? t(k, number, { [pop]: number }) : null
          } else {
            const parents: string[] = routeName.split('.')
            if (parents.length > 1) {
              // console.log(parents[parents.length - 2])
              const e = `choice.${Str.pascalCase(_.pluralize(parents[parents.length - 2]))}`
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              str = te(e) ? t(k, { name: t(e, '1') }) : null
            } else {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
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
        controlStyle: 'max-width: 100px',
        align: 'center',
        sortable: !0
      }
      const opts = options || { ...defaultOptions }
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
      const { t, te } = baseI18n.value?.global
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
        item.name = item.name || ''
        item.label = item.label || item.name
        item.field = item.field || item.name

        item = {
          ...item,
          name: Str.strBefore(Str.strBefore(item.name), 'ToString'),
          label: Str.strBefore(Str.strBefore(item.label || item.name), 'ToString')
        }
        const name = item.name
        let k
        if (te) {
          if (te((k = `attributes.${item.label}`))) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item.label = t(k)
          } else if (te((k = `attributes.${_.snakeCase(item.label)}`))) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item.label = t(k)
          } else if (te((k = `attributes.${_.camelCase(item.label)}`))) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item.label = t(k)
          } else if (te((k = `attributes.${Str.pascalCase(item.label)}`))) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            item.label = t(k)
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
            opts.align = 'left'
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
      // console.log(result)
      return result
    },
    /**
     * Customized helper to get attribute name
     *
     * @param string
     * @param args
     */
    parseAttribute (string: string | { text: string } | any, ...args: any): string {
      const defaultValue = ''
      if (!string) return string

      const { t, te } = baseI18n.value?.global
      const key = string && typeof string === 'object' ? (Str.strBefore(string.text) || '') : Str.strBefore(string)
      if (!key) {
        return defaultValue
      }
      let transKey: string
      if (te) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (te((transKey = `attributes.${key}`)) && _.isString(t(transKey))) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return t(transKey, ...args)
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (te((transKey = `choice.${key}`)) && _.isString(t(transKey))) {
          args = args || [2]
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return t(transKey, ...args)
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (te(key) && _.isString(t(key))) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return t(key, ...args)
        }
      }
      return string
    },
    __ (string: string | { text: string } | any, ...args: any) {
      return this.parseAttribute(string, ...args)
    },
    /**
     * Copy text
     * @param text
     */
    async copyText (text: string | any): Promise<void> {
      return copyToClipboard(text)
    },
    quasarNotifyOptions (opts: QNotifyCreateOptions | string): QNotifyCreateOptions {
      return {
        ...(mythOptions.value.notify || {}),
        message: typeof opts === 'string' ? opts : opts.message,
        ...(typeof opts !== 'string' ? opts : {})
      }
    },
    alertMessage: (opts: Vue3MAlertMessageOptions): Vue3MAlertMessage => Notify.create(helpers.quasarNotifyOptions(opts)),
    alertSuccess: (message: string) => helpers.alertMessage({ type: 'positive', message }),
    alertError: (message: string) => helpers.alertMessage({ type: 'negative', message }),
    confirmMessage (message?: string, title?: string, opts?: QDialogOptions): Vue3MConfirmMessage {
      const { t } = baseI18n.value?.global
      const options = mythOptions.value
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      title = title || t('messages.are_you_sure') || ''
      message = message || ''
      opts = opts || {}
      const buttonsProps = {
        ...(options?.button || {}),
        ...(options?.confirmDialog?.buttons || {})
      }
      const okProps = options?.confirmDialog?.okProps || {}
      const cancelProps = options?.confirmDialog?.cancelProps || {}
      const dialogProps = options?.confirmDialog?.props || {}
      return Dialog.create({
        title,
        message,
        focus: 'none',
        cancel: {
          ...buttonsProps,
          ...cancelProps,
          color: cancelProps.color || 'positive',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          label: t(cancelProps?.label || 'no')
        },
        ok: {
          ...buttonsProps,
          ...okProps,
          color: okProps.color || 'negative',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          label: t(okProps?.label || 'yes')
        },
        persistent: !0,
        ...dialogProps,
        ...opts
      })
    }
  }

  const isSmall = computed(() => Screen.lt.md)
  const popupBreakpoint = computed(() => isSmall.value ? 800 : 450)

  const r = reactive<UseMythVue>({
    i18n: baseI18n.value,
    baseUrl: apiBaseUrl.value,
    axios: apiAxios.value,
    services: apiServices.value,
    options: mythOptions.value,
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

  app.config.globalProperties.openWindow = function (...args: any) {
    return window.open(...args)
  }
  app.config.globalProperties.parseAttribute = function (string: string | { text: string } | any, ...args: any): string {
    return this.$myth.parseAttribute(string, ...args)
  }
  app.config.globalProperties.__ = function (string: string | { text: string } | any, ...args: any): string {
    return this.$myth.parseAttribute(string, ...args)
  }
  app.config.globalProperties.getPageTitle = function (number?: number | string, route?: RouteLocationNormalizedLoaded): string {
    return this.$myth.getPageTitle(route || this.$route, number)
  }

  // Datatable
  app.component('MDatatable', defineAsyncComponent(() => import('../components/datatable/MDatatable.vue')))
  app.component('MDtAvatar', defineAsyncComponent(() => import('../components/datatable/MDtAvatar.vue')))
  app.component('MDtBtn', defineAsyncComponent(() => import('../components/datatable/MDtBtn.vue')))

  // Form
  app.component('MAvatarViewer', defineAsyncComponent(() => import('../components/form/MAvatarViewer.vue')))
  app.component('MAxios', defineAsyncComponent(() => import('../components/form/MAxios.vue')))
  app.component('MBtn', defineAsyncComponent(() => import('../components/form/MBtn.vue')))
  app.component('MCheckbox', defineAsyncComponent(() => import('../components/form/MCheckbox.vue')))
  app.component('MRadio', defineAsyncComponent(() => import('../components/form/MRadio.vue')))
  app.component('MDate', defineAsyncComponent(() => import('../components/form/MDate.vue')))
  app.component('MEditor', defineAsyncComponent(() => import('../components/form/MEditor.vue')))
  app.component('MEmail', defineAsyncComponent(() => import('../components/form/MEmail.vue')))
  app.component('MFile', defineAsyncComponent(() => import('../components/form/MFile.vue')))
  app.component('MForm', defineAsyncComponent(() => import('../components/form/MForm.vue')))
  app.component('MInput', defineAsyncComponent(() => import('../components/form/MInput.vue')))
  app.component('MMobile', defineAsyncComponent(() => import('../components/form/MMobile.vue')))
  app.component('MOtp', defineAsyncComponent(() => import('../components/form/MOtp.vue')))
  app.component('MPassword', defineAsyncComponent(() => import('../components/form/MPassword.vue')))
  app.component('MPicker', defineAsyncComponent(() => import('../components/form/MPicker.vue')))
  app.component('MSelect', defineAsyncComponent(() => import('../components/form/MSelect.vue')))
  app.component('MTime', defineAsyncComponent(() => import('../components/form/MTime.vue')))
  app.component('MToggle', defineAsyncComponent(() => import('../components/form/MToggle.vue')))
  app.component('MUploader', defineAsyncComponent(() => import('../components/form/MUploader.vue')))

  // Google maps
  app.component('MGoogleMaps', defineAsyncComponent(() => import('../components/google/MGoogleMaps.vue')))

  // Grid
  app.component('MCard', defineAsyncComponent(() => import('../components/grid/MCard.vue')))
  app.component('MCol', defineAsyncComponent(() => import('../components/grid/MCol.vue')))
  app.component('MColumn', defineAsyncComponent(() => import('../components/grid/MColumn.vue')))
  app.component('MContainer', defineAsyncComponent(() => import('../components/grid/MContainer.vue')))
  app.component('MDraggable', defineAsyncComponent(() => import('../components/grid/MDraggable.vue')))
  app.component('MList', defineAsyncComponent(() => import('../components/grid/MList.vue')))
  app.component('MNoResultImg', defineAsyncComponent(() => import('../components/grid/MNoResultImg.vue')))
  app.component('MRow', defineAsyncComponent(() => import('../components/grid/MRow.vue')))

  // Modal
  app.component('MDialog', defineAsyncComponent(() => import('../components/modal/MDialog.vue')))
  app.component('MModalMenu', defineAsyncComponent(() => import('../components/modal/MModalMenu.vue')))
  app.component('MTooltip', defineAsyncComponent(() => import('../components/modal/MTooltip.vue')))

  // Transition
  app.component('MFadeTransition', defineAsyncComponent(() => import('../components/transition/MFadeTransition.vue')))
  app.component('MFadeXTransition', defineAsyncComponent(() => import('../components/transition/MFadeXTransition.vue')))
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const useMyth = <T extends UseMythVue = UseMythVue> (): T => inject<T>(INJECT_KEY)

export { installPlugin }
