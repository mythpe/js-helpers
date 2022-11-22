/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { DialogChainObject, QNotifyCreateOptions } from 'quasar'
import { QNotifyUpdateOptions } from 'quasar/dist/types/api'

export type Vue3MAlertMessageOptions = QNotifyCreateOptions | string

export type Vue3MAlertMessage = (props?: QNotifyUpdateOptions) => void;

export type Vue3MConfirmMessage = DialogChainObject

export {}
