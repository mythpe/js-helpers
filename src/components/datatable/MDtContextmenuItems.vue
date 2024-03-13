<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <template v-if="item !== undefined && index !== undefined">
    <template
      v-for="(contextmenuItem,i) in items"
      :key="i"
    >
      <MDtBtn
        v-if="typeof contextmenuItem.showIf === 'function' ? contextmenuItem.showIf(item,index) : contextmenuItem.showIf"
        :[contextmenuItem.name]="!0"
        :label="contextmenuItem.label !== undefined ? __(contextmenuItem.label || contextmenuItem.name) : undefined"
        :list-item="displayMode==='item'"
        :tooltip="contextmenuItem.tooltip !== undefined ? contextmenuItem.tooltip : (contextmenuItem.label === undefined ? contextmenuItem.name : undefined)"
        v-bind="{...($myth.options.dt?.contextmenu?.btn||{}),...(contextmenuItem.attr||{}),...$attrs}"
        @click="contextmenuItem.click ? contextmenuItem.click(item,index) : undefined"
      />
    </template>
  </template>
</template>

<script
  lang="ts"
  setup
>

import { MDatatableDialogsOptions, MDatatableProps } from './models'
import { UnwrapRef } from 'vue'

interface Props {
  items: MDatatableProps['contextItems'],
  item: UnwrapRef<MDatatableDialogsOptions['item']>,
  index: UnwrapRef<MDatatableDialogsOptions['index']>,
  displayMode?: 'icon' | 'item'
}

withDefaults(defineProps<Props>(), {
  items: () => ([]),
  item: undefined,
  index: undefined,
  displayMode: () => 'icon'
})

</script>

<script lang="ts">
export default {
  name: 'MDtContextmenuItems',
  inheritAttrs: !1
}
</script>
