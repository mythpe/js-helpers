<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <q-btn v-bind="{...($myth.vueConfig.button||{}),...$attrs}">
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
import { useSlots } from 'vue'
const _slots = useSlots()
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>
