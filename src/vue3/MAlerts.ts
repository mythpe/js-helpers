/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { Dialog, Notify, QDialogOptions, QNotifyCreateOptions } from 'quasar'
import { getMyThPluginOptions } from '../utils/Const'
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
    const { t } = getMyThPluginOptions().i18n
    const { options } = getMyThPluginOptions()
    title = title || t('messages.are_you_sure') || ''
    message = message || ''
    opts = opts || {}
    const btnsProps = {
      ...(options?.button || {}),
      ...(options?.dialog?.btnsProps || {})
    }
    const okProps = options?.dialog?.okProps || {}
    const cancelProps = options?.dialog?.cancelProps || {}
    const dialogProps = options?.dialog?.props || {}
    return Dialog.create({
      title,
      message,
      focus: 'none',
      cancel: {
        ...btnsProps,
        ...cancelProps,
        color: cancelProps.color || 'positive'
      },
      ok: {
        label: t('yes'),
        ...btnsProps,
        ...okProps,
        color: okProps.color || 'negative'
      },
      persistent: !0,
      ...dialogProps,
      ...opts
    })
  }
}

export const useAlerts = (): typeof MAlerts => MAlerts
