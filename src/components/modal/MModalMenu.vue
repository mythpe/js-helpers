<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <q-popup-proxy
    :breakpoint="$myth.tools.popupBreakpoint"
    :position="position"
    :transition-hide="position === 'top' ? $myth.tools.transitions.slideUpFade.hide : $myth.tools.transitions.slideDownFade.hide"
    :transition-show="position === 'top' ? $myth.tools.transitions.slideUpFade.show : $myth.tools.transitions.slideDownFade.show"
    allow-focus-outside
    class="m--modal_menu shadow-24"
    maximized
    no-backdrop-dismiss
    no-shake
    persistent
    v-bind="{...($myth.options.modalMenu?.props),...($attrs || {})}"
  >
    <q-card v-bind="$myth.options.modalMenu?.card">
      <slot />
      <template v-if="!closeBtnProps">
        <q-separator class="lt-md" />
        <q-item
          v-close-popup
          class="lt-md"
          clickable
          v-bind="$myth.options.modalMenu?.closeBtn"
        >
          <q-item-section>
            <q-item-label header>
              {{ $t('myth.titles.close') }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-card>
  </q-popup-proxy>
</template>

<script
  lang="ts"
  setup
>

import { MModalMenuProps } from './models'
import { computed } from 'vue'

interface Props {
  noCloseBtn?: MModalMenuProps['noCloseBtn'];
  position?: MModalMenuProps['position'];
}

const props = withDefaults(defineProps<Props>(), {
  noCloseBtn: () => !1,
  position: () => 'bottom'
})
const closeBtnProps = computed(() => props.noCloseBtn !== undefined && props.noCloseBtn !== !1 && props.noCloseBtn !== null)
</script>

<script
  lang="ts"
>

export default {
  name: 'MModalMenu',
  inheritAttrs: !1
}
</script>

<style>
.m--modal_menu {

}
</style>
