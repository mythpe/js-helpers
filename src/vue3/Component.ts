/*
 * MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
 * Email: mythpe@gmail.com
 * Mobile: +966590470092
 * Website: https://www.4myth.com
 * Github: https://github.com/mythpe
 */

import { App, defineAsyncComponent } from 'vue'

export const initComponents = (app: App) => {
  // Datatable
  app.component('MDatatable', defineAsyncComponent(() => import('../components/datatable/MDatatable.vue')))
  app.component('MDtAvatar', defineAsyncComponent(() => import('../components/datatable/MDtAvatar.vue')))
  app.component('MDtBtn', defineAsyncComponent(() => import('../components/datatable/MDtBtn.vue')))
  app.component('MDtContextmenuItems', defineAsyncComponent(() => import('../components/datatable/MDtContextmenuItems.vue')))

  // Form
  app.component('MAvatarViewer', defineAsyncComponent(() => import('../components/form/MAvatarViewer.vue')))
  app.component('MAxios', defineAsyncComponent(() => import('../components/form/MAxios.vue')))
  app.component('MBtn', defineAsyncComponent(() => import('../components/form/MBtn.vue')))
  app.component('MCheckbox', defineAsyncComponent(() => import('../components/form/MCheckbox.vue')))
  app.component('MCkeditor', defineAsyncComponent(() => import('../components/form/MCkeditor.vue')))
  app.component('MRadio', defineAsyncComponent(() => import('../components/form/MRadio.vue')))
  app.component('MDate', defineAsyncComponent(() => import('../components/form/MDate.vue')))
  app.component('MEditor', defineAsyncComponent(() => import('../components/form/MEditor.vue')))
  app.component('MEmail', defineAsyncComponent(() => import('../components/form/MEmail.vue')))
  app.component('MFile', defineAsyncComponent(() => import('../components/form/MFile.vue')))
  app.component('MForm', defineAsyncComponent(() => import('../components/form/MForm.vue')))
  app.component('MInput', defineAsyncComponent(() => import('../components/form/MInput.vue')))
  app.component('MInputLabel', defineAsyncComponent(() => import('../components/form/MInputLabel.vue')))
  app.component('MMobile', defineAsyncComponent(() => import('../components/form/MMobile.vue')))
  app.component('MOptions', defineAsyncComponent(() => import('../components/form/MOptions.vue')))
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
  app.component('MBlock', defineAsyncComponent(() => import('../components/grid/MBlock.vue')))
  app.component('MCard', defineAsyncComponent(() => import('../components/grid/MCard.vue')))
  app.component('MCol', defineAsyncComponent(() => import('../components/grid/MCol.vue')))
  app.component('MColumn', defineAsyncComponent(() => import('../components/grid/MColumn.vue')))
  app.component('MContainer', defineAsyncComponent(() => import('../components/grid/MContainer.vue')))
  // app.component('MDraggable', defineAsyncComponent(() => import('../components/grid/MDraggable.vue')))
  app.component('MList', defineAsyncComponent(() => import('../components/grid/MList.vue')))
  app.component('MNoResultImg', defineAsyncComponent(() => import('../components/grid/MNoResultImg.vue')))
  app.component('MRow', defineAsyncComponent(() => import('../components/grid/MRow.vue')))

  // Modal
  app.component('MDialog', defineAsyncComponent(() => import('../components/modal/MDialog.vue')))
  app.component('MModalMenu', defineAsyncComponent(() => import('../components/modal/MModalMenu.vue')))
  app.component('MTooltip', defineAsyncComponent(() => import('../components/modal/MTooltip.vue')))

  // Transition
  app.component('MTransition', defineAsyncComponent(() => import('../components/transition/MTransition.vue')))
  app.component('MFadeTransition', defineAsyncComponent(() => import('../components/transition/MFadeTransition.vue')))
  app.component('MFadeXTransition', defineAsyncComponent(() => import('../components/transition/MFadeXTransition.vue')))

  // Typography
  app.component('MHelpRow', defineAsyncComponent(() => import('../components/typography/MHelpRow.vue')))
  app.component('MTypingString', defineAsyncComponent(() => import('../components/typography/MTypingString.vue')))
}
