<!--
  - MyTh Ahmed Faiz Copyright © 2016-2024 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>

import { useInputHelper } from '../../composables'
import { MHelpRowProps as Props } from './models'

interface P {
  icon?: Props['icon'];
  text?: Props['text'];
  tooltip?: Props['tooltip'];
}

const props = withDefaults(defineProps<P>(), {
  icon: undefined,
  text: undefined,
  tooltip: () => !1
})
const { inputProps } = useInputHelper(() => props, 'helpRow')
defineOptions({ name: 'MHelpRow', inheritAttrs: !1 })
</script>

<template>
  <q-icon
    v-if="!!text && tooltip"
    class="cursor-pointer"
    name="ion-ios-information-circle-outline"
    right
    size="19px"
    v-bind="{...$myth.options.helpRowIcon,...$attrs}"
  >
    <q-tooltip
      anchor="center end"
      class="bg-transparent text-black text-justify"
      self="center start"
      transition-hide="jump-right"
      transition-show="jump-left"
    >
      <q-card style="max-width: 280px">
        <q-card-section style="font-size: 13px">
          {{ __(text) }}
        </q-card-section>
      </q-card>
    </q-tooltip>
  </q-icon>
  <q-item
    v-else-if="!!text && !tooltip"
    dense
    v-bind="{...$myth.options.helpRowItem,...$attrs}"
  >
    <q-item-section
      side
      thumbnail
      top
    >
      <q-icon
        :name="inputProps.icon || 'ion-ios-information-circle-outline'"
        size="19px"
      />
    </q-item-section>
    <q-item-section top>
      <q-item-label caption>
        {{ __(text) }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>
