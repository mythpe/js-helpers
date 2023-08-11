<!--
  - MyTh Ahmed Faiz Copyright © 2022-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<template>
  <q-img
    :ratio="1"
    fit="contain"
    src="../../assets/icons/no-result.png"
    v-bind="$attrs"
    width="50px"
  >
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
  </q-img>
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
