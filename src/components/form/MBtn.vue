<!--
  - MyTh Ahmed Faiz Copyright © 2022 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - https://www.4myth.com
  -->

<script lang="ts" setup>
import { QBtn as BaseBtn } from 'quasar'
import { defineProps } from 'vue'
import { MBtnProps } from './models'

interface Props extends MBtnProps {
  color?: string | undefined
}

withDefaults(defineProps<Props>(), {
  color: 'primary'
})

const def = window.MyThVue3Plugin.options?.button || {}
</script>

<script lang="ts">
export default {
  inheritAttrs: !1
}
</script>

<template>
  <base-btn
    :color="color"
    v-bind="{...def,...$attrs}"
  >
    <slot />
    <template #loading>
      <slot name="loading">
        <q-spinner-hourglass />
      </slot>
    </template>
  </base-btn>
</template>
