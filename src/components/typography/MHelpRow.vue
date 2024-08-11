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
}

const props = withDefaults(defineProps<P>(), {
  icon: undefined,
  text: undefined
})
const { inputProps } = useInputHelper(() => props, 'helpRow')
</script>

<template>
  <MRow
    v-if="!!text"
    class="items-center m--input__help"
    v-bind="$myth.options.helpRow"
  >
    <slot>
      <q-icon
        :name="inputProps.icon || 'ion-ios-help-circle-outline'"
        left
        size="20px"
      />
      <span class="text-caption">{{ __(text) }}</span>
    </slot>
  </MRow>
</template>
