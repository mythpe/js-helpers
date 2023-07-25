/*
 * MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { App, defineAsyncComponent, reactive } from 'vue'
import { MythApiAxiosType, MythApiServicesType, MythPluginOptionsType } from '../types'
import { I18n } from 'vue-i18n'
import MythVue, { createMyth } from './MythVue'

/**
 * Install Plugin
 * @param app
 * @param api
 * @param options
 */
export default async function install<I18nT extends I18n = I18n, AxiosType extends MythApiAxiosType = MythApiAxiosType, Services extends MythApiServicesType = MythApiServicesType> (app: App, {
  i18n,
  api,
  options = {}
}: MythPluginOptionsType) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  createMyth<I18nT, AxiosType, Services>({ i18n, api, options })
  app.config.globalProperties.$myth = reactive(MythVue)

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
  app.component('MRow', defineAsyncComponent(() => import('../components/grid/MRow.vue')))

  // Transition
  app.component('MFadeTransition', defineAsyncComponent(() => import('../components/transition/MFadeTransition.vue')))
}
