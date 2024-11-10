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

import { MDatatableDialogsOptions, MDatatableProps } from './models'
import { computed, UnwrapRef } from 'vue'

interface Props {
  items: MDatatableProps['contextItems'],
  item: UnwrapRef<MDatatableDialogsOptions['item']>,
  index: UnwrapRef<MDatatableDialogsOptions['index']>,
  displayMode?: 'icon' | 'item'
}

const props = withDefaults(defineProps<Props>(), {
  items: () => ([]),
  item: undefined,
  index: undefined,
  displayMode: () => 'icon'
})
const itemMode = computed(() => props.displayMode === 'item')
defineOptions({ name: 'MDtContextmenuItems', inheritAttrs: !1 })
</script>

<template>
  <template v-if="item !== undefined && index !== undefined">
    <template
      v-for="(m,i) in items"
      :key="`MDtContextmenuItems-i${i}`"
    >
      <MDtBtn
        v-if="typeof m.showIf === 'function' ? m.showIf(item,index) : m.showIf"
        :[m.name]="!0"
        :label="itemMode && m.label === undefined ? __(m.tooltip || m.attr?.label || m.attr?.tooltip ||m.name) : (m.label !== undefined ? __(m.label || m.name) :
          undefined)"
        :list-item="itemMode"
        :tooltip="m.tooltip !== undefined ? m.tooltip : (m.label === undefined ? m.name : undefined)"
        v-bind="m.attr"
        @click="m.click ? m.click(item,index) : undefined"
      />
    </template>
  </template>
</template>
