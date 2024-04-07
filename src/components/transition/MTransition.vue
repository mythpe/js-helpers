<!--
  - MyTh Ahmed Faiz Copyright © 2016-2023 All rights reserved.
  - Email: mythpe@gmail.com
  - Mobile: +966590470092
  - Website: https://www.4myth.com
  - Github: https://github.com/mythpe
  -->

<script lang="ts" setup>
import { MTransitionProps } from './models'

interface Props {
  enterIn?: MTransitionProps['enterIn'];
  enterOut?: MTransitionProps['enterOut'];
  slow?: MTransitionProps['slow'];
}

withDefaults(defineProps<Props>(), {
  enterIn: () => 'fadeIn',
  enterOut: () => 'fadeOut',
  slow: () => !0
})
</script>

<template>
  <TransitionGroup
    :enter-active-class="`animated ${enterIn} ${slow ? 'slow' : ''}`"
    :leave-active-class="`animated ${enterOut}`"
    appear
    v-bind="$attrs"
  >
    <slot />
  </TransitionGroup>
</template>

<script lang="ts">
export default {
  name: 'MTransition',
  inheritAttrs: !1
}
</script>
