<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
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
      v-for="(k,v) in ($slots as Readonly<QImgSlots>)"
      #[v]
    >
      <slot :name="v" />
    </template>
  </q-img>
</template>

<script lang="ts" setup>
import { QImgSlots } from 'quasar'
</script>

<script lang="ts">
export default {
  name: 'MNoResultImg',
  inheritAttrs: !1
}
</script>
