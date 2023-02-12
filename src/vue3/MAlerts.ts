/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { Dialog, Notify, QDialogOptions, QNotifyCreateOptions } from 'quasar'
import { Vue3MAlertMessage, Vue3MAlertMessageOptions, Vue3MConfirmMessage } from '../types'

export const MAlerts = {
  quasarNotifyOptions: (opts: QNotifyCreateOptions | string): QNotifyCreateOptions => ({
    // position: 'top-right',
    // timeout: 1500,
    message: typeof opts === 'string' ? opts : opts.message,
    ...(typeof opts !== 'string' ? opts : {})
  }),
  alertMessage: (opts: Vue3MAlertMessageOptions): Vue3MAlertMessage => Notify.create(MAlerts.quasarNotifyOptions(opts)),
  alertSuccess: (message: string) => MAlerts.alertMessage({ type: 'positive', message }),
  alertError: (message: string) => MAlerts.alertMessage({ type: 'negative', message }),
  confirmMessage (message?: string, title?: string, opts?: QDialogOptions): Vue3MConfirmMessage {
    const { t } = window.MyThVue3Plugin.i18n
    title = title || t('messages.are_you_sure') || ''
    message = message || ''
    opts = opts || {}
    const btnsProps = window.MyThVue3Plugin.options?.dialog?.btnsProps || {}
    const okProps = window.MyThVue3Plugin.options?.dialog?.okProps || {}
    const cancelProps = window.MyThVue3Plugin.options?.dialog?.cancelProps || {}
    const dialogProps = window.MyThVue3Plugin.options?.dialog?.props || {}
    return Dialog.create({
      title,
      message,
      focus: 'none',
      cancel: {
        color: 'positive',
        ...btnsProps,
        ...cancelProps
      },
      ok: {
        color: 'negative',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        label: t('yes'),
        ...btnsProps,
        ...okProps
      },
      persistent: !0,
      ...dialogProps,
      ...opts
    })
  }
}

export const useAlerts = (): typeof MAlerts => MAlerts
