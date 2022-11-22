/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { Dialog, Notify, QNotifyCreateOptions } from 'quasar'
import { Vue3MAlertMessage, Vue3MAlertMessageOptions, Vue3MConfirmMessage } from '../types/MAlerts'
import { MyThVue3 } from '../vue3/MyThVue3'

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
  confirmMessage (message?: string, title?: string): Vue3MConfirmMessage {
    const { t } = MyThVue3.i18n.global
    title = title ?? t('messages.are_you_sure')
    title = title ?? ''
    message = message ?? ''
    return Dialog.create({
      title,
      message,
      focus: 'none',
      cancel: {
        color: 'positive'
      },
      ok: {
        color: 'negative',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        label: t('yes')
      },
      persistent: !0
    })
  }
}

export const useAlerts = (): typeof MAlerts => MAlerts
