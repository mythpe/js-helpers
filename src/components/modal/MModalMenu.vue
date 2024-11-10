<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->
<script
  lang="ts"
  setup
>

import { MModalMenuProps } from './models'
import { useMyth } from '../../vue3'

interface Props {
  noCloseBtn?: MModalMenuProps['noCloseBtn'];
  position?: MModalMenuProps['position'];
}

const $myth = useMyth()
const { options, tools } = $myth
withDefaults(defineProps<Props>(), {
  noCloseBtn: () => !1,
  position: () => 'bottom'
})
defineOptions({ name: 'MModalMenu', inheritAttrs: !1 })
</script>

<template>
  <q-popup-proxy
    :breakpoint="tools.popupBreakpoint as any"
    :position="position"
    allow-focus-outside
    class="m--modal_menu shadow-24"
    maximized
    no-backdrop-dismiss
    no-shake
    v-bind="{...options.modalMenu,...$attrs}"
  >
    <q-card v-bind="options.modalMenuOptions?.card">
      <slot />
      <template v-if="!noCloseBtn">
        <q-separator class="lt-md" />
        <q-item
          v-close-popup
          class="lt-md"
          clickable
          v-bind="options.modalMenuOptions?.closeBtn"
        >
          <q-item-section>
            <q-item-label header>
              {{ __('myth.titles.close') }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-card>
  </q-popup-proxy>
</template>
