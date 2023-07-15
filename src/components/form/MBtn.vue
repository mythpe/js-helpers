<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<template>
  <q-btn v-bind="{...def,...$attrs}">
    <template
      v-for="(k,v) in _slots"
      #[v]="scope"
    >
      <template v-if="Boolean(scope)">
        <slot
          :name="v"
          v-bind="scope"
        />
      </template>
      <template v-else>
        <slot :name="v" />
      </template>
    </template>
    <template #loading>
      <slot name="loading">
        <q-spinner-hourglass />
      </slot>
    </template>
  </q-btn>
</template>

<script lang="ts" setup>
import { getMyThPluginOptions } from '../../utils/Const'
import { useSlots } from 'vue'

const def = getMyThPluginOptions().options?.button || {}

const _slots = useSlots()
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
