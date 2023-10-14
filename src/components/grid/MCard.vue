<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<template>
  <q-card
    class="m--card"
    v-bind="$attrs"
  >
    <slot
      v-if="!loading"
      name="card-title"
    />
    <template v-if="title !== undefined || $slots['after-title'] || $slots['title']">
      <q-toolbar :class="`${color ? `bg-${color}` : '' } text-white app--card__toolbar ${(center ? 'text-center' : '')}`">
        <q-toolbar-title class="app--card__title">
          <template v-if="loading">
            <q-skeleton
              width="200px"
            />
          </template>
          <template v-else>
            {{ __(title) }}
          </template>
          <slot
            v-if="!loading"
            :loading="loading"
            name="title"
          />
        </q-toolbar-title>
        <slot
          v-if="!loading"
          name="after-title"
        />
      </q-toolbar>
      <q-separator />
    </template>
    <q-card-section :class="`${padding !== undefined ? ( !padding ? 'q-pa-none' : padding?.length > 0 ? padding : '' ) : ''} `">
      <MContainer>
        <slot :name="loading ? 'loading' : 'default'" />
      </MContainer>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>

import { MCardProps } from './models'

interface Props {
  readonly loading?: MCardProps['loading'];
  readonly title?: MCardProps['title'];
  readonly center?: MCardProps['center'];
  readonly color?: MCardProps['color'];
  readonly padding?: MCardProps['padding'];
}

withDefaults(defineProps<Props>(), {
  loading: () => !1,
  title: undefined,
  center: () => !1,
  color: () => 'primary',
  padding: () => !1
})
</script>

<script lang="ts">
export default {
  name: 'MCard',
  inheritAttrs: !1
}
</script>

<style>
.m--card {

}
</style>
