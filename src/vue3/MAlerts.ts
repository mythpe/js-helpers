/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { Dialog, Notify, QDialogOptions, QNotifyCreateOptions } from 'quasar'
import { Vue3MAlertMessage, Vue3MAlertMessageOptions, Vue3MConfirmMessage } from '../types'
import { getMythI18n, getMythOptions } from './MythVueConfig'

export const MAlerts = {
  quasarNotifyOptions: (opts: QNotifyCreateOptions | string): QNotifyCreateOptions => ({
    message: typeof opts === 'string' ? opts : opts.message,
    ...(typeof opts !== 'string' ? opts : {})
  }),
  alertMessage: (opts: Vue3MAlertMessageOptions): Vue3MAlertMessage => Notify.create(MAlerts.quasarNotifyOptions(opts)),
  alertSuccess: (message: string) => MAlerts.alertMessage({ type: 'positive', message }),
  alertError: (message: string) => MAlerts.alertMessage({ type: 'negative', message }),
  confirmMessage (message?: string, title?: string, opts?: QDialogOptions): Vue3MConfirmMessage {
    const { t } = getMythI18n()
    const { options } = getMythOptions()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
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

export default {}
