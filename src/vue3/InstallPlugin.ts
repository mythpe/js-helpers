/*
 * MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * https://www.4myth.com
 */

import { App, defineAsyncComponent } from 'vue'
import { MyThVue3InstallOptions } from '../types'
import { useMyTh } from './MyThVue3'

/**
 * Install Plugin
 * @param app
 * @param i18n
 * @param api
 * @param options
 */
export default async function install (app: App, {
  i18n,
  api,
  options
}: MyThVue3InstallOptions) {
  window.MyThVue3Plugin.i18n = i18n
  window.MyThVue3Plugin.api = api
  window.MyThVue3Plugin.options = options ?? {}
  app.config.globalProperties.$myth = useMyTh()

  // Datatable
  app.component('MDatatable', defineAsyncComponent(() => import('../components/datatable/MDatatable.vue')))
  app.component('MDtAvatar', defineAsyncComponent(() => import('../components/datatable/MDtAvatar.vue')))
  app.component('MDtBtn', defineAsyncComponent(() => import('../components/datatable/MDtBtn.vue')))

  // Form
  app.component('MAvatarViewer', defineAsyncComponent(() => import('../components/form/MAvatarViewer.vue')))
  app.component('MAxios', defineAsyncComponent(() => import('../components/form/MAxios.vue')))
  app.component('MBtn', defineAsyncComponent(() => import('../components/form/MBtn.vue')))
  app.component('MCheckbox', defineAsyncComponent(() => import('../components/form/MCheckbox.vue')))
  app.component('MDate', defineAsyncComponent(() => import('../components/form/MDate.vue')))
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
}
